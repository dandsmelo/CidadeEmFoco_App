import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Style } from "./style";
import StyledButton from "@/components/Button";
import StyledTitle from "@/components/StyledTitle";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconI from "react-native-vector-icons/Entypo";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useFlashMessage } from "@/components/FlashMessageContext";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EsqueciMinhaSenha() {
    const { email } = useLocalSearchParams();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = Array(6).fill(0).map(() => React.createRef<TextInput>());
    const { showMessage } = useFlashMessage();
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) return null;
    
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
        showMessage('Preencha todos os 6 dígitos.', "warning");
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
            showMessage('Código verificado com sucesso!', "success");
            router.push({ pathname: '/redefinirSenha', params: { email } });
        } else {
            showMessage(data.message || 'O código informado está incorreto.', "warning");
        }
    } catch (error) {
        showMessage('Erro ao verificar código. Tente novamente mais tarde.', "error");
    }
    };


    return (
        <LinearGradient colors={["#6A0DAD", "#2C0547"]} locations={[0, 0.57]} style={Style.container}>
        <KeyboardAwareScrollView
        style={{ flex: 1 }} 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} 
        enableOnAndroid={true} 
        extraScrollHeight={30} 
        showsVerticalScrollIndicator={false}
        >
                  <View style={Style.topoImg}>
                          <TouchableOpacity style={Style.topoIcon}>
                            <IconI
                              name="chevron-thin-left"
                              size={25}
                              color="#FFFFFF"
                              onPress={() => router.push("/")}
                            />
                          </TouchableOpacity>
                          <Image
                            source={require("@/assets/images/duplaAutenticacao.png")}
                            style={Style.img}
                          />
                        </View>
            <View style={Style.textView}>
                    <Text style={Style.title}>Esqueci minha senha</Text>
                    <Text style={Style.text}>Um código foi enviado para o telefone cadastrado</Text>
                    <Text style={Style.textI}>Digite o código recebido</Text>
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
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}
