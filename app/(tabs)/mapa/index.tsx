import { router } from 'expo-router';
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { UsuarioData } from '@/interfaces/UsuarioData';

export default function Mapa(){
    const [tipoUsuario, setTipoUsuario] = React.useState<string | null>(null);
    const [usuario, setUsuario] = React.useState<UsuarioData>();
    const fontsLoaded = useCustomFonts()
    if (!fontsLoaded){
        return null;
    }

    const fetchUsuario = async () => {
        try {
            const usuarioId = await AsyncStorage.getItem("userId");
            const token = await AsyncStorage.getItem("token");

            const response = await fetch(`http://localhost:3000/usuario/${usuarioId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
            },
            })

            const data = await response.json()

            if(response.ok) {
                setUsuario(data);
            } else {
                alert(data.message || "Erro ao buscar usuário");
            }
        } catch (error) {
            alert("Erro ao carregar usuário");
        }
    }

    const fetchTipoUsuario = async () => {
        const tipo = await AsyncStorage.getItem("userType");
        setTipoUsuario(tipo);
    }

    useEffect(() => {
        fetchUsuario();
        fetchTipoUsuario();
    }, []);

    return(
        <View style={Style.container}>
            
            <View style={Style.header}>

                <View style={Style.divImg}>
                    <TouchableOpacity onPress={() => router.push('/usuario')}>
                        <Image source={require('@/assets/images/user.png')} style={Style.img} />
                    </TouchableOpacity>
                </View>

                <View style={Style.divTextHeader}>
                    <Text style={Style.textI}>Olá,</Text>
                    <Text style={Style.textII}>{usuario?.nome}</Text>
                </View>

            </View> 

            <View style={Style.body}>

                <View style={Style.textBody}>
                    <Text style={Style.textMapa}>Mapa</Text>
                    <Text style={Style.textMapaI}>de denúncias</Text>
                </View>

                <View style={Style.divImgMapa}>
                    <Image source={require('@/assets/images/mapa.png')} style={Style.imgMapa} />
                </View>

                <View style={Style.divCard}>
                    <View style={Style.card}>
                        <View style={Style.btn}>
                            <TouchableOpacity onPress={() => router.push('/mapa')}>
                                <Icon name="map-marker-alt" size={29} color="#000000" style={Style.icone} />
                            </TouchableOpacity>
                        </View>
                        {tipoUsuario === "cidadao" ?  (
                            <View style={Style.btn}>
                                <TouchableOpacity onPress={() => router.push('/criarDenuncia')}>
                                    <Icons name="add-circle-outline" size={35} color="#000000" style={Style.icone} />
                                </TouchableOpacity>
                            </View>
                        ): ''}
                        <View style={Style.btn}>
                            <TouchableOpacity onPress={() => router.push('/minhasDenuncias')}>
                                <Icon name="clipboard-list" size={29} color="#000000" style={Style.icone} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}