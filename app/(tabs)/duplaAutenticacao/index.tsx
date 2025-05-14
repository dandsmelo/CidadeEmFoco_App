import StyledButton from "@/components/Button";
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView, Button} from "react-native";
import React from 'react';
import { Style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DuplaAutenticacao(){
    const fontsLoaded = useCustomFonts()
    if (!fontsLoaded) {
        return null; 
    }

    return(
        <View style={Style.container}>

            <View style={Style.containerImg}>
                <TouchableOpacity style={Style.topoIcon}>
                    <Icon name="chevron-left" size={25} color="#FFFFFF"/>
                </TouchableOpacity>
                <Image source={require('@/assets/images/duplaAutenticacao.png')} style={Style.img} />
            </View>

            <View style={Style.bodyText}>

                <View style={Style.divTexto}>
                    <Text style={Style.texto}>Enviamos um código para o número com final ..XXXX</Text>
                </View>

                <View style={Style.divTexto}>
                    <Text style={Style.textoI}>Digite o código recebido</Text>
                </View>

                <View style={Style.containerInput}>
                    <TextInput style={Style.input}></TextInput>
                    <TextInput style={Style.input}></TextInput>
                    <TextInput style={Style.input}></TextInput>
                    <TextInput style={Style.input}></TextInput>
                </View>

                <View style={Style.containerbtn}>
                    <StyledButton text="Verificar" background="azul"></StyledButton>
                </View>

                <View style={Style.bottomDiv}>
                <TouchableOpacity>
                <Text style={Style.link}>Reenviar código</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        
        
    )
}