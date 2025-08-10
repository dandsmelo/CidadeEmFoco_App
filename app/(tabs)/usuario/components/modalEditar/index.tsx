import StyledButton from "@/components/Button";
import { View, Text, TextInput, Modal, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSuccess?: () => void;
  valorInicial?: string;
}

export default function ModalEdicao({ title, visible, onClose, onSuccess, valorInicial }: Props) {
  const fontsLoaded = useCustomFonts();
  const [valor, setValor] = React.useState(valorInicial || "");
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);
  const { showMessage } = useFlashMessage(); 

  if (!fontsLoaded) return null;

  const handleSalvar = async () => {
    const token = await AsyncStorage.getItem("token");
    const usuarioId = await AsyncStorage.getItem("userId");
    const tipo = await AsyncStorage.getItem("userType");

    if (!token || !usuarioId || !tipo) {
      showMessage("Usuário não autenticado", "error");
      return;
    }

    try {
      const payload = { [title]: valor };

      const response = await fetch(`http://localhost:3000/usuario/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Sucesso, usuário atualizado", "success");
        setIsEditing(false);
        onClose();
        onSuccess?.();
      } else {
        showMessage(data.message || "Erro ao atualizar", "error");
      }
    } catch (err) {
      showMessage("Erro ao atualizar usuário", "error");
    }
  };

  useEffect(() => {
    if (visible) {
      setValor(valorInicial || "");
      setIsEditing(false);
    }
  }, [visible, valorInicial]);

  const handleEditPress = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus(); 
    }, 100);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.modalOverlay}>
          <View style={style.container}>
            <TouchableOpacity onPress={onClose} style={style.closeIcon}>
              <MaterialIcons name="close" size={24} color="gray" />
            </TouchableOpacity>

            <Text style={style.title}>Alterar {title}</Text>

            <View style={style.input}>
              <TextInput
                ref={inputRef}
                style={[style.text, { flex: 1 }]}
                placeholder={`Digite o novo ${title}`}
                value={valor}
                onChangeText={setValor}
                editable={isEditing}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={handleEditPress}>
                <MaterialIcons name="edit" size={25} color={isEditing ? "#6A0DAD" : "#000"} />
              </TouchableOpacity>
            </View>

            <StyledButton text="Salvar" background="primary" onPress={handleSalvar} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
