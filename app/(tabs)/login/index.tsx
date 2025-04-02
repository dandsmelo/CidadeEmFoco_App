import { View, Text, Image } from "react-native";
import { style } from "./style";
import StyledView from "@/components/StyledView";
import StyledTitle from "@/components/StyledTitle";
import StyledInputs from "@/components/StyledInputs";
import StyledButton from "@/components/Button";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Login() {

  return (
    <StyledView>
      <View style={style.containerImg}>
        <Icon name="chevron-left" size={25} style={style.icon} />
        <Image source={require('@/assets/images/loginImg.png')} style={style.img} />
      </View>
      <View style={style.textView}>
        <StyledTitle title="Bem vindo de volta" />
        <Text>"Seja a voz da sua comunidade. Denuncie e inspire mudanças!"</Text>
      </View>
      <View>
        <StyledInputs icon="user" placeholder="Username"/>
        <StyledInputs icon="lock" placeholder="Senha" />
      </View>
      <View style={style.divBtn}>
        <StyledButton text="Logar" background="amarelo"/>
        <Text style={style.fgtPassword}>
          Esqueci minha senha
        </Text>
      </View>
    </StyledView>
  );
}

