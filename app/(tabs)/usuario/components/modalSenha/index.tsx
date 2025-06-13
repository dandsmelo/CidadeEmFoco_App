import { useCustomFonts } from "@/assets/fonts/Fonts";
import {
  Keyboard,
  Modal,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import StyledButton from "@/components/Button";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSucess: () => void;
}

export default function ModalSenha({ visible, onClose, onSucess }: Props) {
  const fontsLoaded = useCustomFonts();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);

  if (!fontsLoaded) return null;

  const handleSalvar = async () => {
    const token = await AsyncStorage.getItem("token");
    const usuarioId = await AsyncStorage.getItem("userId");

    if (!token || !usuarioId) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert("Erro", "A nova senha deve ser diferente da atual");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuario/${usuarioId}/senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senhaAtual,
          novaSenha,
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Senha atualizada com sucesso ");
        onClose();
        onSucess();
        setSenhaAtual("");
        setNovaSenha("");
      } else {
        Alert.alert("Erro", "Erro ao atualizar senha");
      }
    } catch (err) {
      Alert.alert("Erro", "Erro inesperado ao atualizar a senha");
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.modalOverlay}>
        <View style={style.container}>
          <TouchableOpacity onPress={onClose} style={style.closeIcon}>
            <MaterialIcons name="close" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={style.title}>Alterar senha</Text>

          <View>
            <Text style={style.text}>Senha atual</Text>
            <View style={style.input}>
              <TextInput
                style={style.text}
                secureTextEntry={!showSenhaAtual}
                placeholder="Digite sua senha atual"
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                editable={true}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={() => setShowSenhaAtual(!showSenhaAtual)}
              >
                <MaterialIcons name={showSenhaAtual ? "visibility" : "visibility-off"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={style.text}>Nova senha</Text>
            <View style={style.input}>
              <TextInput
                style={style.text}
                secureTextEntry={!showNovaSenha}
                placeholder="Digite a nova senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                editable={true}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={() => setShowNovaSenha(!showNovaSenha)}
              >
                <MaterialIcons name={showNovaSenha ? "visibility" : "visibility-off"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <StyledButton text="Salvar" background="primary" onPress={handleSalvar} />
        </View>
      </View>
    </Modal>
  );
}
