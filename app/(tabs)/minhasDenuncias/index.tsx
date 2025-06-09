import NavBar from "@/components/NavBar";
import { View, Text, ScrollView } from "react-native";
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Card from "@/components/Card";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DenunciaData } from "@/interfaces/DenunciaData";
import { TouchableOpacity } from "react-native";
import { router } from 'expo-router';

export default function MinhasDenuncias() {
    const [denuncias, setDenuncias] = React.useState<DenunciaData[]>([]);
    const [tipoUsuario, setTipoUsuario] = React.useState<string | null>(null);
    const fontsLoaded = useCustomFonts()
        
    if (!fontsLoaded) {
      return null; 
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

    const handleCardPress = (denuncia: DenunciaData) => {
      if (tipoUsuario === "servidorPublico") {
        router.push({ pathname: "/atualizarDenuncia", params: { id: denuncia._id } });
      } else {
        router.push({ pathname: "/editarDenuncia", params: { id: denuncia._id } });
      }
    };

    useEffect(() => {
        fetchDenuncias();
    }, []);

    return (
        <View style={style.container}>
            <NavBar title={tipoUsuario === "servidorPublico" ? "Denúncias" : "Minhas denúncias"} />
            <ScrollView>
              <View style={style.cardView}>
                  {denuncias.map((denuncia, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCardPress(denuncia)}>
                      <Card>
                        <View style={style.topCard}>
                          <Text style={style.title}>{denuncia.titulo}</Text>
                          <Text style={style.data}>
                            {new Date(denuncia.data).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={style.endCard}>
                          <Text style={style.category}>{denuncia.categoria}</Text>
                          <Text style={style.status}>{denuncia.status}</Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
        </View>
    )
}