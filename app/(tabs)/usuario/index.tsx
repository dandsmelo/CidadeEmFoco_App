import { useCustomFonts } from "@/assets/fonts/Fonts";
import { TouchableOpacity, View, Text } from "react-native";
import { style } from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
import ModalEdicao from "./components/modalEditar";
import React, { useEffect, useState } from "react";
import ModalSenha from "./components/modalSenha";
import Icons from "react-native-vector-icons/Feather";
import { router } from 'expo-router';
import { UsuarioData } from "@/interfaces/UsuarioData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Usuario() {
    const fontsLoaded = useCustomFonts()

    const [modalEditar, setModalEditar] = useState(false);
    const [selectedField, setselectedField] = useState("");
    const [modalSenha, setModalSenha] = useState(false);
    const [usuario, setUsuario] = React.useState<UsuarioData>();

    const openModalEditar = (campo: string) => {
        setselectedField(campo);
        setModalEditar(true);
    };

    const openModalSenha = () => {{
        setModalSenha(true);
    }}
            
    if (!fontsLoaded) {
        return null; 
    }

    const fetchUsuario = async () => {
        const token = await AsyncStorage.getItem("token");
        const usuarioId = await AsyncStorage.getItem("userId");
        const tipo = await AsyncStorage.getItem("userType");

        if (!token || !usuarioId || !tipo) {
          alert("Usuário não autenticado");
          return;
        }

        try {
            const response = await fetch(`http://localhost:3000/usuario/${usuarioId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json();
            if(response.ok) {
                setUsuario(data);
            } else {
                alert(data.message || "Erro ao carregar usuário");
            }
        } catch (error) {
            alert("Erro ao carregar usuário");
        }
    }

    const handleLogout = async () => {
        try{
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("userId");
          await AsyncStorage.removeItem("userType");
          router.replace('/login');

        } catch (error) {
          alert("Erro ao deslogar. Tente novamente")
        }
    }

    useEffect(() => {
        fetchUsuario()
    }, []);

    return (
        <View>
            <View style={style.container}>
                <Icon name="chevron-left" size={25} style={style.icon} onPress={() => router.push('/mapa')}/>
                <View style={style.circle}>
                    <Icon name="user-edit" size={60} style={{color: 'white'}}/>
                </View>
                <Text style={style.name}>{usuario?.nome}</Text>
            </View>
            <View style={style.inputsView}>
                <TouchableOpacity style={style.btn} onPress={() => openModalEditar("nome")}>
                    <Text style={style.text}>Nome</Text>
                    <Icons name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModalEditar("telefone")}>
                    <Text style={style.text}>Telefone</Text>
                    <Icons name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModalEditar("email")}>
                    <Text style={style.text}>Email</Text>
                    <Icons name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModalSenha()}>
                    <Text style={style.text}>Senha</Text>
                    <Icons name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={handleLogout}>
                    <Text style={style.text}>Sair</Text>
                    <Icons name="chevron-right" size={25} />
                </TouchableOpacity>
            </View>
            <ModalEdicao
                visible={modalEditar}
                title={selectedField}
                onClose={() => setModalEditar(false)}
                onSuccess={fetchUsuario}
                valorInicial={
                selectedField === "nome"
                    ? usuario?.nome
                    : selectedField === "telefone"
                    ? usuario?.telefone
                    : selectedField === "email"
                    ? usuario?.email
                    : ""
                }
            />
            <ModalSenha 
                visible={modalSenha} 
                onClose={() => setModalSenha(false)}
            />
        </View>
    )
}
