import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { Style } from "./style";
import StyledButton from "@/components/Button";
import StyledTitle from "@/components/StyledTitle";
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function EsqueciMinhaSenha(){
    return(
        <View style={Style.container}>

            <View style={Style.containerImg}>
                <TouchableOpacity style={Style.topoIcon}>
                    <Icon name="chevron-left" size={30} color="#FFFFFF"/>
                </TouchableOpacity>
                <Image source={require('../../../assets/images/redefinirSenha.png')} style={Style.img} />
            </View>

            <View style={Style.bodyText}>

            <View style={Style.divTexto}>
                <View style={Style.divTittle}><StyledTitle title="Esqueci minha senha"></StyledTitle></View>
                <Text style={Style.texto}>Um código foi enviado para o email cadastrado</Text>
            </View>

            <View style={Style.divTexto}>
                <Text style={Style.textoI}>Digite o código recebido</Text>
            </View>

            <View style={Style.containerInput}>
                <TextInput style={Style.input}></TextInput>
                <TextInput style={Style.input} ></TextInput>
                <TextInput style={Style.input}></TextInput>
                <TextInput style={Style.input}></TextInput>
            </View>

            <View style={Style.containerbtn} >
                <StyledButton text="Redefinir" background="azul"/>
            </View>

            </View>

        </View>
    )
}