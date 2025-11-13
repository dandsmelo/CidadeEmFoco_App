import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { style } from "./style";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconI from "react-native-vector-icons/Entypo";
import { router } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { useFlashMessage } from "@/components/FlashMessageContext";
import { LinearGradient } from "expo-linear-gradient";

interface EstadoIBGE {
  id: number;
  nome: string;
  sigla: string;
}

interface CidadeIBGE {
  id: number;
  nome: string;
}

export default function Cadastro() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState(null);
  const [items, setItems] = useState([
    { label: "Cidadão", value: "cidadao" },
    { label: "Servidor Público", value: "servidorPublico" },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const { showMessage } = useFlashMessage();

  const [estados, setEstados] = useState<{ label: string; value: string }[]>(
    []
  );
  const [cidades, setCidades] = useState<{ label: string; value: string }[]>(
    []
  );
  const [estado, setEstado] = useState<string | null>(null);
  const [cidade, setCidade] = useState<string | null>(null);
  const [openEstado, setOpenEstado] = useState(false);
  const [openCidade, setOpenCidade] = useState(false);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        const estadosFormatados = data
          .sort((a: EstadoIBGE, b: EstadoIBGE) => a.nome.localeCompare(b.nome))
          .map((estado: EstadoIBGE) => ({
            label: `${estado.nome} (${estado.sigla})`,
            value: estado.sigla,
          }));
        setEstados(estadosFormatados);
      })
      .catch((error) => console.error("Erro ao carregar estados:", error));
  }, []);

  useEffect(() => {
    if (estado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
      )
        .then((res) => res.json())
        .then((data: CidadeIBGE[]) => {
          const cidadesFormatadas = data.map((cidade) => ({
            label: cidade.nome,
            value: cidade.nome,
          }));
          setCidades(cidadesFormatadas);
        })
        .catch((error) => console.error("Erro ao carregar cidades:", error));
    } else {
      setCidades([]);
    }
  }, [estado]);

  const handleCadastro = async () => {
    if (
      !nomeCompleto ||
      !telefone ||
      !email ||
      !senha ||
      !confirmarSenha ||
      !tipo
    ) {
      showMessage("Por favor, preencha todos os campos.", "warning");
      return;
    }

    if (!estado || !cidade) {
      showMessage("Por favor, selecione o estado e a cidade.", "warning");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Por favor, insira um e-mail válido.", "warning");
      return;
    }

    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      showMessage("Por favor, insira um número de telefone válido.", "warning");
      return;
    }

    if (senha !== confirmarSenha) {
      showMessage("As senhas não coincidem.", "warning");
      return;
    }

    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!senhaRegex.test(senha)) {
      showMessage(
        "A senha deve ter pelo menos 6 caracteres e conter letras e números.",
        "warning"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeCompleto,
          telefone: telefone,
          email: email,
          senha: senha,
          tipo: tipo,
          estado: estado,
          cidade: cidade,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNomeCompleto("");
        setTelefone("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setTipo(null);
        showMessage("Usuário cadastrado com sucesso!");
        router.push("/login");
      } else {
        showMessage("Erro ao cadastrar. Tente novamente", "error");
      }
    } catch (error) {
      showMessage(
        "Erro de conexão com o servidor. Verifique sua internet ou tente mais tarde.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#6A0DAD", "#2C0547"]}
      locations={[0, 0.57]}
      style={style.container}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        enableOnAndroid={true}
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.topoImg}>
          <TouchableOpacity style={style.topoIcon}>
            <IconI
              name="chevron-thin-left"
              size={25}
              color="#FFFFFF"
              onPress={() => router.push("/")}
            />
          </TouchableOpacity>
          <Image
            source={require("@/assets/images/cadastro.png")}
            style={style.img}
          />
        </View>

        <View /*style={style.bodyText}*/>
          <View style={style.topoTexto}>
            <Text style={style.title}>Registre-se</Text>
            <Text style={style.text}>
              "A sua contribuição é valiosa. Ajude a tornar nossa cidade um
              lugar mais seguro!”
            </Text>
          </View>

          <View style={style.bodyInput}>
            <View>
              <Icon
                name="user-alt"
                size={20}
                color="#898989"
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Nome Completo"
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholderTextColor="#898989"
              />
            </View>

            <View>
              <Icon
                name="mobile-alt"
                size={20}
                color="#898989"
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Telefone"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
                maxLength={11}
                placeholderTextColor="#898989"
              />
            </View>

            <View>
              <Icon
                name="envelope"
                size={20}
                color="#898989"
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#898989"
              />
            </View>

            <View>
              <Icon
                name="lock"
                size={20}
                color="#898989"
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!senhaVisivel}
                placeholderTextColor="#898989"
              />
              <TouchableOpacity
                style={style.inputIconRight}
                onPress={() => setSenhaVisivel(!senhaVisivel)}
              >
                <Icon
                  name={senhaVisivel ? "eye" : "eye-slash"}
                  size={20}
                  color="#898989"
                />
              </TouchableOpacity>
            </View>

            <View>
              <Icon
                name="lock"
                size={20}
                color="#898989"
                style={style.inputIcon}
              />
              <TextInput
                style={style.input}
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!confirmarSenhaVisivel}
                placeholderTextColor="#898989"
              />
              <TouchableOpacity
                style={style.inputIconRight}
                onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
              >
                <Icon
                  name={confirmarSenhaVisivel ? "eye" : "eye-slash"}
                  size={20}
                  color="#898989"
                />
              </TouchableOpacity>
            </View>

            <View style={{ zIndex: 1, marginHorizontal: 40, marginTop: 10 }}>
              <DropDownPicker
                open={open}
                value={tipo}
                items={items}
                setOpen={setOpen}
                setValue={setTipo}
                setItems={setItems}
                placeholder="Tipo de usuário"
                listMode="SCROLLVIEW"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  borderColor: "#FFFFFF",
                  height: 50,
                }}
                textStyle={{
                  fontSize: 17,
                  fontFamily: "PoppinsMedium",
                  color: "#000000",
                }}
                placeholderStyle={{
                  color: "#898989",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF",
                }}
              />
            </View>

            <View style={{ zIndex: 2, marginHorizontal: 40, marginTop: 10 }}>
              <DropDownPicker
                open={openEstado}
                value={estado}
                items={estados}
                setOpen={setOpenEstado}
                setValue={setEstado}
                setItems={setEstados}
                placeholder="Selecione o Estado"
                listMode="SCROLLVIEW"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  borderColor: "#FFFFFF",
                  height: 50,
                }}
                textStyle={{
                  fontSize: 17,
                  fontFamily: "PoppinsMedium",
                  color: "#000000",
                }}
                placeholderStyle={{ color: "#898989" }}
                dropDownContainerStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF",
                }}
              />
            </View>

            <View style={{ zIndex: 800, marginHorizontal: 40, marginTop: 10 }}>
              <DropDownPicker
                open={openCidade}
                value={cidade}
                items={cidades}
                setOpen={setOpenCidade}
                setValue={setCidade}
                setItems={setCidades}
                placeholder={
                  estado ? "Selecione a Cidade" : "Selecione primeiro o Estado"
                }
                disabled={!estado}
                listMode="SCROLLVIEW"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  borderColor: "#FFFFFF",
                  height: 50,
                }}
                textStyle={{
                  fontSize: 17,
                  fontFamily: "PoppinsMedium",
                  color: "#000000",
                }}
                placeholderStyle={{ color: "#898989" }}
                dropDownContainerStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF",
                }}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity style={style.button} onPress={handleCadastro}>
              <Text style={style.textButton}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}
