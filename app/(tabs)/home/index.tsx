import { router } from 'expo-router';
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { UsuarioData } from '@/interfaces/UsuarioData';
import { DenunciaData } from '@/interfaces/DenunciaData';
import CidadaoHome from './components/cidadaoHome';
import ServidorHome from './components/servidorHome';
/* import MapaDenuncias from '@/components/Mapa/MapaDenuncias'; */

export default function Home(){
    const [tipoUsuario, setTipoUsuario] = React.useState<string | null>(null);
    const [usuario, setUsuario] = React.useState<UsuarioData>();
    const [denuncias, setDenuncias] = React.useState<DenunciaData[]>([]);
    const [fotoPerfil, setFotoPerfil] = React.useState<string | null>(null);
    const fontsLoaded = useCustomFonts()
    if (!fontsLoaded){
        return null;
    }

    const carregarFotoLocal = async () => {
        const usuarioId = await AsyncStorage.getItem("userId");
        if (!usuarioId) return;

        const fotoSalva = await AsyncStorage.getItem(`fotoPerfil_${usuarioId}`);
        setFotoPerfil(fotoSalva || null);
    };



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
        carregarFotoLocal();
    }, []);


    return (
        <View style={Style.container}>
            <View style={Style.header}>
                <TouchableOpacity onPress={() => router.push('/usuario')} style={Style.divHeader}>
                    <Image
                        source={
                            fotoPerfil
                                ? { uri: fotoPerfil }
                                : require("@/assets/images/user.png")
                        }
                        style={Style.img}
                    />
                </TouchableOpacity>
                <Text style={Style.textHeader}>{usuario?.nome}</Text>
            </View> 
            <ScrollView>
                <View style={Style.body}>
                    {tipoUsuario === "cidadao" ? (
                        <CidadaoHome />
                    ) : (
                        <ServidorHome denuncias={denuncias}/>
                    )}
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
                                <TouchableOpacity onPress={() => router.push('/home')}>
                                    <Icon name="map-marker-alt" size={35} color="#ffff" style={Style.icone} />
                                </TouchableOpacity>
                            {tipoUsuario === "cidadao" ?  (
                                    <TouchableOpacity onPress={() => router.push('/criarDenuncia')}>
                                        <Icons name="add-circle" size={45} color="#ffff" style={Style.icone} />
                                    </TouchableOpacity>
                            ): ''}
                                <TouchableOpacity onPress={() => router.push('/minhasDenuncias')}>
                                    <Icon name="clipboard-list" size={35} color="#ffff" style={Style.icone} />
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}