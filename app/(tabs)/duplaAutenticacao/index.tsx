import { router } from 'expo-router';
import StyledButton from "@/components/Button";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from 'react';
import { Style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconI from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from '@/components/FlashMessageContext';
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function DuplaAutenticacao() {
  const fontsLoaded = useCustomFonts();
  const [code, setCode] = useState(['', '', '', '', '', '']); 
  const inputRefs = Array(6).fill(0).map(() => React.createRef<TextInput>());
  const { showMessage } = useFlashMessage();
  
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
      const tempToken = await AsyncStorage.getItem('tempToken');
      if (!tempToken) {
        showMessage('Token de verificação ausente. Faça login novamente.', "warning");
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/usuario/verificar-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`
        },
        body: JSON.stringify({ code: verificationCode })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('userType', data.userType);
        await AsyncStorage.removeItem('tempToken'); 

        showMessage('Login realizado com sucesso!', "success");
        router.push('/mapa');
      } else {
        showMessage('O código está incorreto ou expirou.', "warning");
      }

    } catch (error) {
      showMessage('Erro ao verificar o código. Tente novamente.', "error");
    }
  };

  const handleResend = async () => {
    try {
      const tempToken = await AsyncStorage.getItem('tempToken');
      if (!tempToken) {
        showMessage('Token ausente. Faça login novamente.', "warning");
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/usuario/enviar-codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`
        }
      });

      if (response.ok) {
        showMessage('Código reenviado, Verifique seu telefone.', "warning");
        setCode(['', '', '', '', '', '']);
        inputRefs[0].current?.focus();
      } else {
        showMessage('Erro ao reenviar código.', "error");
      }
    } catch (error) {
      showMessage('Erro ao reenviar o código.', "error");
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

            <View >
            <View style={Style.topoTexto}>
              <Text style={Style.text}>Um código foi enviado para o telefone cadastrado</Text>
              <Text style={Style.textI}>Digite o código recebido</Text>
            </View>
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

        <View style={Style.bottomDiv}>
          <TouchableOpacity onPress={handleResend}>
            <Text style={Style.link}>Reenviar código</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
    </LinearGradient>
  );
}
