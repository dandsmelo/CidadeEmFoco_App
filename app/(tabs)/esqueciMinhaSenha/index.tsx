import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Style } from "./style";
import StyledButton from "@/components/Button";
import StyledTitle from "@/components/StyledTitle";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

export default function EsqueciMinhaSenha() {
    const { email } = useLocalSearchParams();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = Array(6).fill(0).map(() => React.createRef<TextInput>());

    const handleChange = (text: string, index: number) => {
        if (/^\d?$/.test(text)) {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);

            if (text && index < inputRefs.length - 1) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length < 6) {
        alert('Preencha todos os 6 dígitos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/usuario/verificar-sms-redefinirSenha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code: verificationCode }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Código verificado com sucesso!');
            router.push({ pathname: '/redefinirSenha', params: { email } });
        } else {
            alert(data.message || 'O código informado está incorreto.');
        }
    } catch (error) {
        console.log(error);
        alert('Erro ao verificar código. Tente novamente mais tarde.');
    }
    };


    return (
        <View style={Style.container}>

            <View style={Style.containerImg}>
                <TouchableOpacity style={Style.topoIcon} onPress={() => router.push('/login')}>
                    <Icon name="chevron-left" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Image source={require('../../../assets/images/redefinirSenha.png')} style={Style.img} />
            </View>

            <View style={Style.bodyText}>
                <View style={Style.divTexto}>
                    <View style={Style.divTittle}>
                        <StyledTitle title="Esqueci minha senha" />
                    </View>
                    <Text style={Style.texto}>Digite o código enviado para seu telefone</Text>
                </View>

                <View style={Style.containerInput}>
                    {code.map((digit, idx) => (
                        <TextInput
                            key={idx}
                            ref={inputRefs[idx]}
                            style={Style.input}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, idx)}
                            returnKeyType={idx === 5 ? 'done' : 'next'}
                            onSubmitEditing={() => {
                                if (idx < 5) {
                                    inputRefs[idx + 1].current?.focus();
                                } else {
                                    handleVerify();
                                }
                            }}
                        />
                    ))}
                </View>

                <View style={Style.containerbtn}>
                    <StyledButton text="Verificar" background="azul" onPress={handleVerify} />
                </View>
            </View>
        </View>
    );
}
