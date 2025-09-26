import { router } from 'expo-router';
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { UsuarioData } from '@/interfaces/UsuarioData';
import { DenunciaData } from '@/interfaces/DenunciaData';
/* import MapaDenuncias from '@/components/Mapa/MapaDenuncias'; */

export default function Mapa(){
    const [tipoUsuario, setTipoUsuario] = React.useState<string | null>(null);
    const [usuario, setUsuario] = React.useState<UsuarioData>();
    const [denuncias, setDenuncias] = React.useState<DenunciaData[]>([]);
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

    const fetchDenuncias = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const usuarioId = await AsyncStorage.getItem("userId");
        const tipo = await AsyncStorage.getItem("userType");

        if (!token || !usuarioId || !tipo) {
          alert("Usuário não autenticado");
          return;
        }

        setTipoUsuario(tipo);

        const url = tipo === "servidorPublico"
          ? "http://localhost:3000/denuncia"
          : `http://localhost:3000/denuncia/usuario/${usuarioId}`;

        const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
          setDenuncias(data);
        } else {
          alert(data.message || "Erro ao buscar denúncias");
        }
      } catch (error) {
        alert("Erro ao carregar denúncias");
      }
    };

    useEffect(() => {
        fetchUsuario();
        fetchTipoUsuario();
        fetchDenuncias();
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
                    <Text style={Style.textMapa}>Mapa de Denúncias</Text>
                </View>

                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {denuncias.length > 0 ? (
                        <MapaDenuncias denuncias={denuncias} />
                    ) : (
                        <View style={Style.divNoContent}>
                            <Text style={Style.noContentText}>Não há denúncias registradas.</Text>
                        </View>
                    )}
                </View> */}

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