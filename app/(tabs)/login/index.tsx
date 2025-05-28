import { View, Text, Image } from "react-native";
import { style } from "./style";
import StyledView from "@/components/StyledView";
import StyledTitle from "@/components/StyledTitle";
import StyledInputs from "@/components/StyledInputs";
import StyledButton from "@/components/Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { router } from 'expo-router';

export default function Login() {

  const fontsLoaded = useCustomFonts()
  
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
        <StyledInputs icon="user" placeholder="Username"/>
        <StyledInputs icon="lock" placeholder="Senha" />
      </View>
      <View style={style.divBtn}>
        <StyledButton text="Logar" background="amarelo"/>
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

