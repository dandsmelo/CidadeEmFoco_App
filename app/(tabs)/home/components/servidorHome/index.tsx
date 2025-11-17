import { View, Text, FlatList, ViewToken, useWindowDimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { style } from "./style";
import { Colors } from "@/constants/Colors";
import { DenunciaData, ResumoGeral } from "@/interfaces/DenunciaData";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";
import MapaDenuncias from "@/components/Mapa/Mapa";

interface Props {
    denuncias: DenunciaData[];
}

export default function ServidorHome(props: Props) {  
    const { denuncias } = props;
    const [resumoGeral, setResumoGeral] = React.useState<ResumoGeral>();
    const ultimasDenuncias = denuncias.slice(-3).reverse();
    const { showMessage } = useFlashMessage();

    const [currentIndex, setCurrentIndex] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const { width } = useWindowDimensions();

    const getStatusColor = (status: string) => {
      switch (status) {
        case "Pendente":
          return Colors.vermelho;
        case "Rejeitada":
          return Colors.cinza;
        case "Em análise":
          return Colors.amarelo;
        case "Em andamento":
          return Colors.azul; 
        case "Resolvida":
          return Colors.verde;
        default:
          return Colors.vermelho; 
      }
    };

    const handlePress = (denuncia: DenunciaData) => {
        router.push({ pathname: "/atualizarDenuncia", params: { id: denuncia._id } });
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = width * 0.9 + 10; 
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setCurrentIndex(index);
    };

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
        fetchResumoGeral();
    }, []);

    return (
        <View style={style.container}>
            <Text style={style.titles}>Confira as denúncias reportadas na sua área de atuação</Text>
            <MapaDenuncias denuncias={denuncias} />

            <View>
                <Text style={style.titles}>Estatística de desempenho</Text>
                <View style={style.cardView}>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.primary}}>{resumoGeral?.totalDenuncias}</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias atualizadas</Text>
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
                <Text style={style.titles}>Denúncias recentes</Text>
                {ultimasDenuncias.length > 0 ? (
                    <FlatList
                    data={ultimasDenuncias}
                    keyExtractor={(item, index) => item._id ?? index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width * 0.82 + 16} 
                    contentContainerStyle={{ paddingHorizontal: (width - width * 0.9) / 2 , marginTop: 10}}
                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                    pagingEnabled
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    viewabilityConfig={viewabilityConfig}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <View style={[style.flashCards, { width: width * 0.82 }]}>
                                <View style={style.topCard}>
                                    <Text style={style.title}>{item.titulo}</Text>
                                    <Text style={style.data}>
                                    {new Date(item.data).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View style={style.endCard}>
                                    <Text style={style.category}>{item.categoria}</Text>
                                    <Text
                                    style={[
                                        style.status,
                                        { backgroundColor: getStatusColor(item.status) },
                                    ]}
                                    >
                                    {item.status}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    />
                 ) : (
                    <Text style={{ fontFamily: "PoppinsMedium", marginTop: 10 }}>
                        Nenhuma denúncia recente encontrada.
                    </Text>
                )}
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                    }}
                >
                    {ultimasDenuncias.map((_, index) => (
                    <View
                        key={index}
                        style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor: index === currentIndex ? Colors.primary : "#ccc",
                        }}
                    />
                    ))}
                </View>
            </View>
        </View>
    )
}