import StyledButton from "@/components/Button";
import StyledInputs from "@/components/StyledInputs";
import StyledTitle from "@/components/StyledTitle";
import StyledView from "@/components/StyledView";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconI from "react-native-vector-icons/Entypo";
import { style } from "./style";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useFlashMessage } from "@/components/FlashMessageContext";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomFonts } from "@/assets/fonts/Fonts";

export default function RedefinirSenha() {
    const { email } = useLocalSearchParams(); 
    const [novaSenha, setNovaSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showMessage } = useFlashMessage(); 
    const fontsLoaded = useCustomFonts();

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
    
    if (!fontsLoaded) return null;

    return (
    <LinearGradient colors={["#6A0DAD", "#2C0547"]} locations={[0, 0.57]} style={style.container}>
       <View style={style.topoImg}>
         <TouchableOpacity style={style.topoIcon}>
           <IconI
             name="chevron-thin-left"
             size={25}
             color="#FFFFFF"
             onPress={() => router.push("/login")}
           />
         </TouchableOpacity>
         <Image
           source={require("@/assets/images/cadastro.png")}
           style={style.img}
         />
       </View>
       <View style={style.textView}>
        <Text style={style.title}>Redefinir senha</Text>
        <Text style={style.text}>"Seja a voz da sua comunidade. Denuncie e inspire mudanças!"</Text>
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
                <StyledButton text="Redefinir" background="amarelo" onPress={redefinirSenha}/>
            </View>
    </LinearGradient> 
    );
}