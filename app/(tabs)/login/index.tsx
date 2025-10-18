import { View, Text, Image,   TouchableOpacity, } from "react-native";
import { style } from "./style";
import StyledView from "@/components/StyledView";
import StyledTitle from "@/components/StyledTitle";
import StyledInputs from "@/components/StyledInputs";
import StyledButton from "@/components/Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconI from "react-native-vector-icons/Entypo";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { router } from 'expo-router';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";
import { LinearGradient } from "expo-linear-gradient";


export default function Login() {
  const fontsLoaded = useCustomFonts();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const { showMessage } = useFlashMessage();

  const handleLogin = async () => {
  if (!email || !senha) {
    showMessage('Preencha todos os campos', "warning");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.needVerification) {
        
        await AsyncStorage.setItem('tempToken', data.token);
        await AsyncStorage.setItem('phoneNumber', data.phoneNumber);
        await AsyncStorage.setItem('email', email);

      
        router.push('/duplaAutenticacao');
      } else {
        
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('userType', data.userType);

        showMessage('Usuário logado com sucesso', "success");
        router.push('/mapa');
      }
    } else {
      showMessage('Usuário ou senha incorretos', "warning")
    }
  } catch (error) {
    showMessage('Erro ao conectar ao servidor', "error");
  }
};


  if (!fontsLoaded) return null;

  return (
    <StyledView>
      <LinearGradient colors={["#6A0DAD", "#2C0547"]} locations={[0, 0.57]} style={style.container}> 
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

      <View style={style.textView}>
        <Text style={style.title}>Login</Text>
        <Text style={style.text}>
          "Seja a voz da sua comunidade. Denuncie e inspire mudanças!"
        </Text>
      </View>

      <View>
        <StyledInputs
          icon="user"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <StyledInputs
          icon="lock"
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!senhaVisivel}
          showToggle={true}
          onToggleVisibility={() => setSenhaVisivel(!senhaVisivel)}
        />
      </View>
      
      <View style={style.divBtn}>
        <StyledButton text="Logar" background="amarelo" onPress={handleLogin} />
        <Text
        style={style.fgtPassword}
        onPress={async () => {
          if (!email) {
            alert('Por favor, preencha o email para redefinir a senha.');
            return;
          }

          try {
            const response = await fetch('http://localhost:3000/usuario/enviarCodigoRedefinirSenha', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
              alert('Código enviado com sucesso');
              router.push({ pathname: '/esqueciMinhaSenha', params: { email } });
            } else {
              alert(data.message || 'Não foi possível enviar o código.');
            }
          } catch (error) {
            console.log(error);
            alert('Erro ao enviar código.');
          }
        }}
      >
        Esqueci minha senha
      </Text>


      </View>
      </LinearGradient> 
    </StyledView>
  );
}
