import { useCustomFonts } from "@/assets/fonts/Fonts";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { style } from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
import ModalEdicao from "./components/modalEditar";
import React, { useEffect, useState } from "react";
import ModalSenha from "./components/modalSenha";
import Icons from "react-native-vector-icons/Feather";
import IconI from "react-native-vector-icons/Entypo";
import { router } from 'expo-router';
import { UsuarioData } from "@/interfaces/UsuarioData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";
import { useAuth } from "@/hook/auth/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export default function Usuario() {
    const fontsLoaded = useCustomFonts()

    const [modalEditar, setModalEditar] = useState(false);
    const [selectedField, setselectedField] = useState("");
    const [modalSenha, setModalSenha] = useState(false);
    const [usuario, setUsuario] = React.useState<UsuarioData>();
    const { logout } = useAuth();
    const { showMessage } = useFlashMessage();
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);


    const selecionarImagem = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
            showMessage("Permissão negada para acessar a galeria", "error");
            return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setFotoPerfil(uri); 
                const usuarioId = await AsyncStorage.getItem("userId");
                await AsyncStorage.setItem(`fotoPerfil_${usuarioId}`, uri);
                await enviarFotoPerfil(uri); 
                showMessage("Imagem atualizada com sucesso!", "success");
            }
        }catch(error) {
            showMessage("Erro ao selecionar imagem", "error");
        }
    };

    useEffect(() => {
        fetchUsuario();
        carregarFotoLocal();
    }, []);

    const carregarFotoLocal = async () => {
        const usuarioId = await AsyncStorage.getItem("userId");
        if (!usuarioId) return;

        const fotoSalva = await AsyncStorage.getItem(`fotoPerfil_${usuarioId}`);
        if (fotoSalva) {
            setFotoPerfil(fotoSalva);
        } else {
            setFotoPerfil(null); 
        }
    };


    const enviarFotoPerfil = async (uri: string) => {
        const token = await AsyncStorage.getItem("token");
        const usuarioId = await AsyncStorage.getItem("userId");

        const fileUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

        const formData = new FormData();

        formData.append("fotoPerfil", {
            uri: fileUri,
            name: `perfil_${usuarioId}_${Date.now()}.jpg`,
            type: "image/jpeg"
        } as any);

        try {
            const response = await fetch(`http://localhost:3000/usuario/${usuarioId}/foto`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const data = await response.json();
            console.log("Resposta servidor:", data);

        } catch (error) {
            console.error("Erro ao enviar foto:", error);
        }
    };

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
          showMessage("Usuário não autenticado", 'error');
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
                showMessage(data.message || "Erro ao carregar usuário", "error");
            }
        } catch (error) {
            showMessage("Erro ao carregar usuário", "error");
        }
    }

    const handleLogout = async () => {
        try{
          logout();
          router.replace('/login');

        } catch (error) {
          showMessage("Erro ao deslogar. Tente novamente", "error")
        }
    }

    useEffect(() => {
        fetchUsuario()
    }, []);

    return (
        <View>
            <LinearGradient colors={["#6A0DAD", "#2C0547"]} locations={[0, 0.57]} style={style.container}>
                <IconI name="chevron-thin-left" size={25} style={style.icon} onPress={() => router.push('/home')}/>
                <TouchableOpacity style={style.circle} onPress={selecionarImagem}>
                    {fotoPerfil ? (
                        <Image 
                        source={{ uri: fotoPerfil }} 
                        style={{ width: "100%", height: "100%", borderRadius: 100 }}
                        />
                    ) : (
                        <Icon name="user-edit" size={60} style={{ color: "white" }} />
                    )}
                </TouchableOpacity>

                <Text style={style.name}>{usuario?.nome}</Text>
            </LinearGradient>
            <View style={style.inputsView}>
                <TouchableOpacity style={style.btn} onPress={() => openModalEditar("nome")}>
                    <Text style={style.text}>Nome</Text>
                    <IconI name="chevron-thin-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModalEditar("telefone")}>
                    <Text style={style.text}>Telefone</Text>
                    <IconI name="chevron-thin-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModalEditar("email")}>
                    <Text style={style.text}>Email</Text>
                    <IconI name="chevron-thin-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModalSenha()}>
                    <Text style={style.text}>Senha</Text>
                    <IconI name="chevron-thin-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={handleLogout}>
                    <Text style={style.text}>Sair</Text>
                    <IconI name="chevron-thin-right" size={25} />
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
                onSucess={fetchUsuario}
            />
        </View>
    )
}
