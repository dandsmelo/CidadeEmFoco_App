import StyledButton from "@/components/Button";
import StyledInputs from "@/components/StyledInputs";
import StyledTitle from "@/components/StyledTitle";
import StyledView from "@/components/StyledView";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { style } from "./style";

export default function RedefinirSenha() {
    return (
        <StyledView>
            <View style={style.containerImg}>
                <Icon name="chevron-left" size={25} style={style.icon}/>
                <Image source={require('@/assets/images/redefinirSenha.png')} style={style.img} />
            </View>
            <View style={style.titleDiv}>
                <StyledTitle title="Redefinir senha" style={style.title}/>
            </View>
            <View>
                <StyledInputs icon="lock" placeholder="Nova senha"/>
            </View>
            <View style={style.buttonDiv}>
                <StyledButton text="Redefinir" background="azul"/>
            </View>
        </StyledView>
    );
}