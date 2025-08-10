import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { CadastroStyle } from "./cadastroStyle";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFlashMessage } from "@/components/FlashMessageContext";


export default function Cadastro(){
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState(null);
    const [items, setItems] = useState([
        { label: 'Cidadão', value: 'cidadao' },
        { label: 'Servidor Público', value: 'servidorPublico' }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts()

    if (!fontsLoaded) {
      return null; 
    }

    const [nomeCompleto, setNomeCompleto] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
    const { showMessage } = useFlashMessage();


    const handleCadastro = async () =>{
        if (!nomeCompleto || !telefone || !email || !senha || !confirmarSenha || !tipo) {
            showMessage("Por favor, preencha todos os campos.", 'warning')
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage("Por favor, insira um e-mail válido.", 'warning');
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
            showMessage("A senha deve ter pelo menos 6 caracteres e conter letras e números.", "warning");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nomeCompleto,
                    telefone: telefone,
                    email: email,
                    senha: senha,
                    tipo: tipo
                })
            });

            const data = await response.json();

            if (response.ok) {
                setNomeCompleto("");
                setTelefone("");
                setEmail("");
                setSenha("");
                setConfirmarSenha("");
                setTipo(null);
                showMessage("Usuário cadastrado com sucesso!")
                router.push('/login')
    } else {
        showMessage("Erro ao cadastrar. Tente novamente", 'error')
    }

    } catch (error) {
    showMessage("Erro de conexão com o servidor. Verifique sua internet ou tente mais tarde.", 'error');
    } finally {
    setIsLoading(false);
  }
}

    return(
        <ScrollView>
        <View style={CadastroStyle.container}>

            <View style={CadastroStyle.topoImg}>
            <TouchableOpacity style={CadastroStyle.topoIcon}>
                <Icon name="chevron-left" size={25} color="#FFFFFF" onPress={() => router.push('/')}/>
            </TouchableOpacity>
                <Image source={require('@/assets/images/cadastro.png')} style={CadastroStyle.img} />
            </View>

            <View style={CadastroStyle.bodyText}>

            <View style={CadastroStyle.topoTexto}>
            <Text style={CadastroStyle.title}>Registre-se</Text>
            <Text style={CadastroStyle.text}>"A sua contribuição é valiosa. Ajude a tornar nossa cidade um lugar mais seguro!”</Text>
            </View>

            <View style={CadastroStyle.bodyInput}>
            
            <View>
            <Icon name="user-alt" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Nome Completo"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="mobile-alt" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            maxLength={11}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="envelope" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="lock" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
                style={CadastroStyle.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!senhaVisivel}
                placeholderTextColor="#898989"
            />
            <TouchableOpacity
                style={CadastroStyle.inputIconRight}
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
            <Icon name="lock" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
                style={CadastroStyle.input}
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!confirmarSenhaVisivel}
                placeholderTextColor="#898989"
            />
            <TouchableOpacity
                style={CadastroStyle.inputIconRight}
                onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
            >
                <Icon
                name={confirmarSenhaVisivel ? "eye" : "eye-slash"}
                size={20}
                color="#898989"
                />
            </TouchableOpacity>
            </View>

            <View style={{ zIndex: 1000, marginHorizontal: 40, marginTop: 10 }}>
                <DropDownPicker
                open={open}
                value={tipo}
                items={items}
                setOpen={setOpen}
                setValue={setTipo}
                setItems={setItems}
                placeholder="Tipo de usuário"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    borderColor: '#FFFFFF',
                    height: 50,
                }}
                textStyle={{
                    fontSize: 17,
                    fontFamily: 'PoppinsMedium',
                    color: '#000000',
                }}
                placeholderStyle={{
                    color: '#898989',
                }}
                dropDownContainerStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FFFFFF',
                }}
                />
                </View>

            </View>

            <View>
            <TouchableOpacity style={CadastroStyle.button} onPress={handleCadastro}>
                <Text style={CadastroStyle.textButton}>Cadastrar</Text>
            </TouchableOpacity>
            </View>

            </View>
            
        </View>
        </ScrollView>
    )
}
