import { useCustomFonts } from "@/assets/fonts/Fonts";
import { router } from 'expo-router';
import NavBar from "@/components/NavBar";
import { View, Image, Text, TouchableOpacity} from "react-native";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from "@/components/Card";
import { useLocalSearchParams } from "expo-router";
import { DenunciaData } from "@/interfaces/DenunciaData";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AtualizarDenuncia(){
    const [denuncia, setDenuncia] = React.useState<DenunciaData>();
    const [statusSelecionado, setStatusSelecionado] = React.useState<string | null>(null);
    const fontsLoaded = useCustomFonts()
    if(!fontsLoaded){
        return null;
    }

    const { id } = useLocalSearchParams();

    const fetchDenuncia = async () => {
        const token = await AsyncStorage.getItem("token");
        const usuarioId = await AsyncStorage.getItem("userId");
        const tipo = await AsyncStorage.getItem("userType");

        if (!token || !usuarioId || !tipo) {
          alert("Usuário não autenticado");
          return;
        }

        try {
            const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json();
            if(response.ok) {
                setDenuncia(data);
            } else {
                alert(data.message || "Erro ao carregar denúncia");
            }
        } catch (error) {
            alert("Erro ao carregar denúncia");
        }
    }

    const handleAtualizarDenuncia = async () => {
        if (!statusSelecionado) {
            alert("Selecione um status!");
            return;
        }

        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: statusSelecionado }),
            });

            if (response.ok) {
                alert("Denúncia atualizada com sucesso!");
                router.push('/minhasDenuncias');
            } else {
                const error = await response.json();
                alert(error.message || "Erro ao atualizar denúncia");
            }
        } catch (error) {
            alert("Erro de rede ao atualizar denúncia");
        }
    };

    useEffect(() => {
        fetchDenuncia();
    }, []);

    return(
        <View style={Style.container}>
            
            <NavBar title={denuncia?.titulo!}/>
        
            <View style={Style.divCard}>

                <View style={Style.card}>
                    <Card>
                        <View style={Style.divImg}>
                            <Image source={require('@/assets/images/paisagem.png')} style={Style.img}></Image>
                        </View>
                        <View style={Style.divText}>
                            <Icon name="map-pin" size={25} color="#000000" style={Style.icon}></Icon>
                            <Text style={Style.textI}>{denuncia?.local}</Text>
                            <Text style={Style.textII}>{new Date(denuncia?.data!).toLocaleDateString()}</Text>
                        </View>

                        <View>
                            <Text style={Style.titulo}>Descrição</Text>
                            <Text style={Style.text}>{denuncia?.descricao}</Text>
                        </View>

                        <View style={Style.labelText}>
                            <Text style={Style.labelText}>Selecione um status</Text>
                            <View style={Style.divButton}>
                                <TouchableOpacity
                                    style={[
                                    Style.buttonIII,
                                    statusSelecionado === "Em andamento" && { backgroundColor: "#6A0DAD" }
                                    ]}
                                    onPress={() => setStatusSelecionado("Em andamento")}
                                >
                                    <Text
                                    style={[
                                        Style.textButton,
                                        statusSelecionado === "Em andamento" && { color: "#fff" }
                                    ]}
                                    >
                                    Em andamento
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                    Style.buttonII,
                                    statusSelecionado === "Resolvido" && { backgroundColor: "#6A0DAD" }
                                    ]}
                                    onPress={() => setStatusSelecionado("Resolvido")}
                                >
                                    <Text
                                    style={[
                                        Style.textButtonI,
                                        statusSelecionado === "Resolvido" && { color: "#fff" }
                                    ]}
                                    >
                                    Resolvido
                                    </Text>
                                </TouchableOpacity>
                                </View>
                            <TouchableOpacity style={Style.buttonI} onPress={handleAtualizarDenuncia}>
                                <Text style={Style.textButton}>Atualizar denúncia</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </View>

        </View>
    )
}