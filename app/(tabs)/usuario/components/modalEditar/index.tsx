import StyledButton from "@/components/Button";
import { View, Text, TextInput, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export default function ModalEdicao({ title, visible, onClose }: Props) {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null;

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
              <TextInput style={style.text} placeholder="Dandara Melo" />
              <MaterialIcons name="edit" size={25} />
            </View>
            <StyledButton text="Salvar" background="primary" onPress={onClose} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
