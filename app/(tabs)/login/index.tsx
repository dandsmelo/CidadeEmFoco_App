import { View, Text, Image } from "react-native";
import { style } from "./style";
import StyledView from "@/components/StyledView";
import StyledTitle from "@/components/StyledTitle";
import StyledInputs from "@/components/StyledInputs";
import StyledButton from "@/components/Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { router } from 'expo-router';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const fontsLoaded = useCustomFonts();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const handleLogin = async () => {
  if (!email || !senha) {
    alert('Preencha todos os campos');
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

        alert('Usuário logado com sucesso');
        router.push('/mapa');
      }
    } else {
      alert(data.message || 'Usuário ou senha incorretos');
    }
  } catch (error) {
    console.log('Erro no login:', error);
    alert('Erro ao conectar ao servidor');
  }
};


  if (!fontsLoaded) return null;

  return (
    <StyledView>
      <View style={style.containerImg}>
        <Icon
          name="chevron-left"
          size={25}
          style={style.icon}
          onPress={() => router.push('/')}
        />
        <Image source={require('@/assets/images/loginImg.png')} style={style.img} />
      </View>

      <View style={style.textView}>
        <StyledTitle title="Bem vindo de volta" />
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
    </StyledView>
  );
}
