import { useCustomFonts } from "@/assets/fonts/Fonts";
import { router } from 'expo-router';
import NavBar from "@/components/NavBar";
import { View, Image, Text, TouchableOpacity, TextInput} from "react-native";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from "@/components/Card";
import { useLocalSearchParams } from "expo-router";
import { DenunciaData } from "@/interfaces/DenunciaData";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";
import DropDownPicker from "react-native-dropdown-picker";

export default function AtualizarDenuncia(){
    const [denuncia, setDenuncia] = React.useState<DenunciaData>();
    const [statusSelecionado, setStatusSelecionado] = React.useState<string | null>(null);
    const { showMessage } = useFlashMessage();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Em análise', value: 'Em análise' },
        { label: 'Em andamento', value: 'Em andamento' },
        { label: 'Resolvida', value: 'Resolvida' },
        { label: 'Rejeitada', value: 'Rejeitada' },
    ]);
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
                showMessage("Denúncia atualizada com sucesso!", "success");
                router.push('/minhasDenuncias');
            } else {
                const error = await response.json();
                showMessage(error.message || "Erro ao atualizar denúncia", "error");
            }
        } catch (error) {
            showMessage("Erro de rede ao atualizar denúncia", "error");
        }
    };

    useEffect(() => {
        fetchDenuncia();
        console.log(statusSelecionado);
    }, []);

    return(
        <View style={Style.container}>
            <NavBar title={denuncia?.titulo!}/>
            <View style={Style.divCard}>
                <View style={Style.card}>
                    <Card>
                        <View style={Style.divImg}>
                            <Image
                                source={
                                    denuncia?.imagem
                                        ? { uri: `http://localhost:3000${denuncia.imagem}` }
                                        : require('@/assets/images/paisagem.png')
                                    }
                                style={Style.img}
                            />

                        </View>
                        <View style={Style.divText}>
                            <View style={Style.divElements}>
                                <Icon name="map-pin" size={20} color="#000000" style={Style.icon}></Icon>
                                <Text style={Style.textI}>{denuncia?.local}</Text>
                            </View>
                            <View style={Style.divElements}>
                                <Icon name='calendar-alt' size={20} color="#000000" />
                                <Text style={Style.textI}>{new Date(denuncia?.data!).toLocaleDateString()}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={Style.titulo}>Descrição</Text>
                            <Text style={Style.text}>{denuncia?.descricao}</Text>
                        </View>

                        <View style={[Style.labelText, { zIndex: 2 }]}>
                            <DropDownPicker
                                open={open}
                                value={statusSelecionado}
                                items={items}
                                setOpen={setOpen}
                                setValue={setStatusSelecionado}
                                setItems={setItems}
                                placeholder="Selecione um status"
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 10,
                                    borderColor: '#000000',
                                    height: 50,
                                }}
                                textStyle={{
                                    fontSize: 16,
                                    fontFamily: 'PoppinsMedium',
                                    color: '#000000',
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: '#FFFFFF',
                                    zIndex: 12,
                                    borderColor: '#000000',
                                }}
                            />                            
                        </View>
                        <View style={Style.labelText}>
                            <Text style={Style.labelText}>Comentários</Text>
                            <TextInput style={Style.comentarios} />
                        </View>
                        <TouchableOpacity style={Style.buttonI} onPress={handleAtualizarDenuncia}>
                            <Text style={Style.textButton}>Atualizar denúncia</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </View>
        </View>
    )
}