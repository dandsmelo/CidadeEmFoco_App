import StyledButton from "@/components/Button";
import StyledInputs from "@/components/StyledInputs";
import StyledTitle from "@/components/StyledTitle";
import StyledView from "@/components/StyledView";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { style } from "./style";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useFlashMessage } from "@/components/FlashMessageContext";

export default function RedefinirSenha() {
    const { email } = useLocalSearchParams(); 
    const [novaSenha, setNovaSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showMessage } = useFlashMessage(); 

    const redefinirSenha = async () => {
        if (!novaSenha || novaSenha.length < 6) {
            showMessage("A senha deve ter pelo menos 6 caracteres.", "warning");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/usuario/redefinir-senha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, novaSenha }),
            });

            if (response.ok) {
                showMessage("Senha redefinida com sucesso!", "success");
                router.replace("/login");
            } else {
                const erro = await response.json();
                showMessage(erro.message || "Erro ao redefinir a senha.", "warning");
            }
        } catch (err) {
            showMessage("Não foi possível conectar ao servidor.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledView>
            <View style={style.containerImg}>
                <Icon name="chevron-left" size={25} style={style.icon} onPress={() => router.push('/login')}/>
                <Image source={require('@/assets/images/redefinirSenha.png')} style={style.img} />
            </View>
            <View style={style.titleDiv}>
                <StyledTitle title="Redefinir senha" style={style.title}/>
            </View>
            <View>
                <StyledInputs 
                icon="lock" 
                placeholder="Nova senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity
                style={style.inputIconRight}
                onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                    <Icon
                    name={mostrarSenha ? "eye" : "eye-slash"}
                    size={20}
                    color="#898989"
                    />
                    </TouchableOpacity>
            </View>
            <View style={style.buttonDiv}>
                <StyledButton text="Redefinir" background="azul" onPress={redefinirSenha}/>
            </View>
        </StyledView>
    );
}