import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { CadastroStyle } from "./cadastroStyle";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { router } from 'expo-router';

export default function Cadastro(){


    const fontsLoaded = useCustomFonts()

    if (!fontsLoaded) {
      return null; 
    }

    const [nomeCompleto, setNomeCompleto] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const handleCadastro =() =>{}

    return(
        <ScrollView>
        <View style={CadastroStyle.container}>

            <View style={CadastroStyle.topoImg}>
            <TouchableOpacity style={CadastroStyle.topoIcon}>
                <Icon name="chevron-left" size={25} color="#FFFFFF" onPress={() => router.push('/')}/>
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
