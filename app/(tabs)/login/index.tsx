import { View, Text } from "react-native";
import { style } from "./style";
import StyledView from "@/components/StyledView";
import StyledTitle from "@/components/StyledTitle";

export default function Login() {
  return (
    <StyledView>
      <View style={style.containerImg}>
        <Text>jsdjhdjdscbs</Text>
      </View>
      <View style={style.textView}>
        <StyledTitle title="Bem vindo de volta" />
        <Text>"Seja a voz da sua comunidade. Denuncie e inspire mudanças!"</Text>
      </View>
    </StyledView>
  );
}

