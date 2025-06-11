import StyledButton from "@/components/Button";
import { View, Text, TextInput, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  if (!fontsLoaded) return null;

  const handleSalvar = async () => {
    const token = await AsyncStorage.getItem("token");
    const usuarioId = await AsyncStorage.getItem("userId");
    const tipo = await AsyncStorage.getItem("userType");

    if (!token || !usuarioId || !tipo) {
      alert("Usuário não autenticado");
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
        alert("Sucesso, usuário atualizado");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        alert(data.message || "Erro ao atualizar");
      }
    } catch (err) {
      alert("Erro ao atualizar usuário");
    }
  };

  useEffect(() => {
    if (visible) setValor(valorInicial || "");
  }, [visible, valorInicial]);

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
            <Text style={style.title}>Alterar {title}</Text>
            <View style={style.input}>
              <TextInput
                style={style.text}
                placeholder={`Digite o novo ${title}`}
                value={valor}
                onChangeText={setValor}
              />
              <MaterialIcons name="edit" size={25} />
            </View>
            <StyledButton text="Salvar" background="primary" onPress={handleSalvar} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
