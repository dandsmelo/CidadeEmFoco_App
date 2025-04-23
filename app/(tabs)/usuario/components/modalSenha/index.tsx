import { useCustomFonts } from "@/assets/fonts/Fonts";
import { Keyboard, Modal, TouchableWithoutFeedback, View, Text, TextInput } from "react-native";
import { style } from "./style";
import StyledButton from "@/components/Button";

interface Props {
    visible: boolean;
    onClose: () => void;
}

export default function ModalSenha(props: Props) {
    const { visible, onClose } = props;
    const fontsLoaded = useCustomFonts();
    
      if (!fontsLoaded) return null;

      return (
        <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.modalOverlay}>
                    <View style={style.container}>
                        <Text style={style.title}>Alterar senha</Text>
                        <View>
                            <Text style={style.text}>Senha atual</Text>
                            <TextInput style={style.input}/>
                        </View>
                        <View>
                            <Text style={style.text}>Nova Senha</Text>
                            <TextInput style={style.input} />
                        </View>
                        <StyledButton text="Salvar" background="primary" onPress={onClose}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
      )
}