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

  const fontsLoaded = useCustomFonts()

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem("userId", data.userId);
        alert('Usuário logado');
        router.push('/mapa')
      } else {
        alert( data.message || 'Usuário ou senha incorretos');
      }

    } catch (error) {
      console.log(error);
      alert('Não foi possível conectar ao servidor');
    }
  };
  
      if (!fontsLoaded) {
        return null; 
      }

  return (
    <StyledView>
      <View style={style.containerImg}>
        <Icon name="chevron-left" size={25} style={style.icon} onPress={() => router.push('/')}/>
        <Image source={require('@/assets/images/loginImg.png')} style={style.img} />
      </View>
      <View style={style.textView}>
        <StyledTitle title="Bem vindo de volta" />
        <Text style={style.text}>"Seja a voz da sua comunidade. Denuncie e inspire mudanças!"</Text>
      </View>
      <View>
        <StyledInputs icon="user" placeholder="Email" value= {email} onChangeText={setEmail}/>
        <StyledInputs icon="lock" placeholder="Senha" value= {senha} onChangeText={setSenha} />
      </View>
      <View style={style.divBtn}>
        <StyledButton text="Logar" background="amarelo" onPress={handleLogin}/>
        <Text 
          style={style.fgtPassword}
          onPress={() => router.push('/esqueciMinhaSenha')}
        >
          Esqueci minha senha
        </Text>
      </View>
    </StyledView>
  );
}

