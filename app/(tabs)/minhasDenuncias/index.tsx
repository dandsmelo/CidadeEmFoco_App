import NavBar from "@/components/NavBar";
import { View, Text, ScrollView } from "react-native";
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Card from "@/components/Card";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DenunciaData } from "@/interfaces/DenunciaData";

export default function MinhasDenuncias() {
    const [denuncias, setDenuncias] = React.useState<DenunciaData[]>([]);
    const fontsLoaded = useCustomFonts()
        
          if (!fontsLoaded) {
            return null; 
          }
    
    const fetchDenuncias = async () => {
        try {
        const token = await AsyncStorage.getItem("token");
        const usuarioId = await AsyncStorage.getItem("userId");

        if (!token || !usuarioId) {
          alert("Usuário não autenticado");
          return;
        }

        const response = await fetch(`http://localhost:3000/denuncia/usuario/${usuarioId}`, {
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
        console.error(error);
        alert("Erro ao carregar denúncias");
      }
    };

    useEffect(() => {
        fetchDenuncias();
    }, []);

    return (
        <View style={style.container}>
            <NavBar title="Minhas denúncias"/>
            <View style={style.cardView}>
                {denuncias.map((denuncia, index) => (
                <Card key={index}>
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
                ))}
            </View>
        </View>
    )
}