import { useCustomFonts } from "@/assets/fonts/Fonts";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import StyledButton from "@/components/Button";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from "@/components/FlashMessageContext";

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
  const { showMessage } = useFlashMessage();

  if (!fontsLoaded) return null;

  const handleSalvar = async () => {
    const token = await AsyncStorage.getItem("token");
    const usuarioId = await AsyncStorage.getItem("userId");

    if (!token || !usuarioId) {
      showMessage("Usuário não autenticado", "error");
      return;
    }

    if (senhaAtual === novaSenha) {
      showMessage("A nova senha deve ser diferente da atual", "warning");
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
        showMessage("Senha atualizada com sucesso", "success");
        onClose();
        onSucess();
        setSenhaAtual("");
        setNovaSenha("");
      } else {
        showMessage("Erro ao atualizar senha", "error");
      }
    } catch (err) {
      showMessage("Erro inesperado ao atualizar a senha", "error");
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
