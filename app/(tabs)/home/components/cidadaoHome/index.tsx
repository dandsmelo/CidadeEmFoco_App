import { View, Text } from "react-native";
import { style } from "./style";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ModalStatusDenuncia from "./components/modalStatusDenuncia";
import { DenunciaCount, ResumoGeral } from "@/interfaces/DenunciaData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";

export default function CidadaoHome() {
    const [modalDenuncia, setModalDenuncia] = React.useState<boolean>(false);
    const [denunciasCount, setDenunciasCount] = React.useState<DenunciaCount>();
    const [resumoGeral, setResumoGeral] = React.useState<ResumoGeral>();

    const { showMessage } = useFlashMessage();
    
    const fetchDenunciasCount = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const usuarioId = await AsyncStorage.getItem("userId");
            const tipo = await AsyncStorage.getItem("userType");

            if (!token || !usuarioId || !tipo) {
                alert("Usuário não autenticado");
                return;
            }

            const response = await fetch(`http://localhost:3000/denuncia/usuario/${usuarioId}/count`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json();
            if(response.ok) {
                setDenunciasCount(data);
            } else {
                showMessage(data.message || "Erro ao carregar contagem das denúncias");
            }
        } catch (error) {
            showMessage("Erro ao carregar contagem das denúncias");
        }
    }

    const fetchResumoGeral = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                alert("Usuário não autenticado");
                return;
            }

            const response = await fetch("http://localhost:3000/denuncia/resumo/geral", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setResumoGeral(data);
            } else {
                showMessage(data.message || "Erro ao carregar resumo geral");
            }

        } catch (error) {
            showMessage("Erro ao carregar resumo geral");
        }
    };

    useEffect(() => {
        fetchDenunciasCount();
        fetchResumoGeral();
    }, []);

    return (
        <View style={style.container}>
            <Text style={style.titles}>Confira suas denúncias reportadas</Text>
            <View style={style.mapView} />
            <View>
                <Text style={style.titles}>Estatística da cidade</Text>
                <View style={style.cardView}>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.primary}}>{resumoGeral?.totalDenuncias}</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias reportadas</Text>
                    </View>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.amarelo}}>{resumoGeral?.categoriaMaisComum.total}</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>{`da categoria ${resumoGeral?.categoriaMaisComum.categoria}`}</Text>
                    </View>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.azul}}>{resumoGeral?.resolvidas}</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias resolvidas</Text>
                    </View>
                </View>
                <Text style={style.titles}>Minhas denúncias</Text>
                <View style={style.denunciaView}>
                    <View style={style.cardTitle}>
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 14}}>{`${denunciasCount?.total} denúncias`}</Text>
                        <TouchableOpacity onPress={() => setModalDenuncia(true)}>
                            <Text style={{ fontFamily: "PoppinsMedium", fontSize: 12, color: Colors.cinza}}>Ver todas</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.cardLines}>
                        <Text style={style.text}>Pendente</Text>
                        <Text style={style.text}>{denunciasCount?.porStatus.pendente}</Text>
                    </View>
                    <View style={style.cardLines}>
                        <Text style={style.text}>Em análise</Text>
                        <Text style={style.text}>{denunciasCount?.porStatus.em_analise}</Text>
                    </View>
                    <View style={style.cardLines}>
                        <Text style={style.text}>Rejeitada</Text>
                        <Text style={style.text}>{denunciasCount?.porStatus.rejeitada}</Text>
                    </View>
                </View>
            </View>
            <ModalStatusDenuncia 
                visible={modalDenuncia}
                onClose={() => setModalDenuncia(false)} 
                denunciasCount={denunciasCount}   
            />
        </View>
    )
}