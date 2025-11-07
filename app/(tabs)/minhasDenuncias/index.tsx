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
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import ModalOrdenarDenuncia from "./components/modalOrdenarDenuncias";
import ModalFiltrarDenuncia from "./components/modalFiltrarDenuncias";

export default function MinhasDenuncias() {
    const [modalDenunciaOrdenar, setModalDenunciaOrdenar] = React.useState<boolean>(false);
    const [modalDenunciaFiltrar, setModalDenunciaFiltrar] = React.useState<boolean>(false);
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
              <View style={style.buttonView}>
                <TouchableOpacity onPress={() => setModalDenunciaOrdenar(true)} style={style.buttons}>
                  <Text style={style.textButton}>Ordenar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalDenunciaFiltrar(true)} style={style.buttons}>
                  <Icon name="filter" size={15} style={{color: 'white'}}/>
                  <Text style={style.textButton}>Filtrar</Text>
                </TouchableOpacity>
              </View>
              <View style={style.cardView}>
                  {denuncias.length > 0 ? denuncias.map((denuncia, index) => (
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
                          <Text style={[style.status, { backgroundColor: getStatusColor(denuncia.status) }]}>
                            {denuncia.status}
                          </Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  )) : (
                    <View style={style.noContent}>
                      <Text style={style.data}>Não há denúncias registradas.</Text>
                    </View>
                  )}
              </View>
            </ScrollView>
            <ModalOrdenarDenuncia 
                            visible={modalDenunciaOrdenar}
                            onClose={() => setModalDenunciaOrdenar(false)}    
                        />
            <ModalFiltrarDenuncia 
                            visible={modalDenunciaFiltrar}
                            onClose={() => setModalDenunciaFiltrar(false)}    
                        />

        </View>
    )
}