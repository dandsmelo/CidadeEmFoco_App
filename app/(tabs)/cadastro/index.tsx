import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { CadastroStyle } from "./cadastroStyle";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';



export default function Cadastro(){
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts()

    if (!fontsLoaded) {
      return null; 
    }

    const [nomeCompleto, setNomeCompleto] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const handleCadastro = async () =>{
        if (!nomeCompleto || !telefone || !email || !senha || !confirmarSenha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
            alert("Por favor, insira um número de telefone válido.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

         const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
         if (!senhaRegex.test(senha)) {
            alert("A senha deve ter pelo menos 6 caracteres e conter letras e números.");
            return;
        }

        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await fetch("http://10.0.2.2:3000/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nomeCompleto,
                    telefone: telefone,
                    email: email,
                    senha: senha
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                setNomeCompleto("");
                setTelefone("");
                setEmail("");
                setSenha("");
                setConfirmarSenha("");
    } else {
      alert(data.message || "Erro ao cadastrar. Tente novamente.");
    }

    } catch (error) {
    console.error(error);
    alert("Erro de conexão com o servidor. Verifique sua internet ou tente mais tarde.");
    } finally {
    setIsLoading(false);
  }
}


    return(
        <ScrollView>
        <View style={CadastroStyle.container}>

            <View style={CadastroStyle.topoImg}>
            <TouchableOpacity style={CadastroStyle.topoIcon}>
                <Icon name="chevron-left" size={25} color="#FFFFFF"/>
            </TouchableOpacity>
                <Image source={require('@/assets/images/cadastro.png')} style={CadastroStyle.img} />
            </View>

            <View style={CadastroStyle.bodyText}>

            <View style={CadastroStyle.topoTexto}>
            <Text style={CadastroStyle.title}>Registre-se</Text>
            <Text style={CadastroStyle.text}>"A sua contribuição é valiosa. Ajude a tornar nossa cidade um lugar mais seguro!”</Text>
            </View>

            <View style={CadastroStyle.bodyInput}>
            
            <View>
            <Icon name="user-alt" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Nome Completo"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="mobile-alt" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            maxLength={11}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="envelope" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="lock" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#898989"
            />
            </View>

            <View>
            <Icon name="lock" size={20} color="#898989" style={CadastroStyle.inputIcon} />
            <TextInput
            style={CadastroStyle.input}
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholderTextColor="#898989"
            />
            </View>

            </View>

            <View>
            <TouchableOpacity style={CadastroStyle.button} onPress={handleCadastro}>
                <Text style={CadastroStyle.textButton}>Cadastrar</Text>
            </TouchableOpacity>
            </View>

            </View>
            
        </View>
        </ScrollView>
    )
}
