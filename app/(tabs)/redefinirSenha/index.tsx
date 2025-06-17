import StyledButton from "@/components/Button";
import StyledInputs from "@/components/StyledInputs";
import StyledTitle from "@/components/StyledTitle";
import StyledView from "@/components/StyledView";
import { View, Image, Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { style } from "./style";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function RedefinirSenha() {
    const { email } = useLocalSearchParams(); 
    const [novaSenha, setNovaSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);

    const redefinirSenha = async () => {
        if (!novaSenha || novaSenha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
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
                alert("Senha redefinida com sucesso!");
                router.replace("/login");
            } else {
                const erro = await response.json();
                alert(erro.message || "Erro ao redefinir a senha.");
            }
        } catch (err) {
            alert("Não foi possível conectar ao servidor.");
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