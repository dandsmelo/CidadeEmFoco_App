import { useCustomFonts } from "@/assets/fonts/Fonts";
import StyledView from "@/components/StyledView";
import { TouchableOpacity, View, Text } from "react-native";
import { style } from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
import ModalEdicao from "./components/modalEditar";
import { useState } from "react";

export default function Usuario() {
    const fontsLoaded = useCustomFonts()

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setselectedField] = useState("");

    const openModal = (campo: string) => {
        setselectedField(campo);
        setModalVisible(true);
    };
            
    if (!fontsLoaded) {
        return null; 
    }

    return (
        <StyledView>
            <View style={style.container}>
                <Icon name="chevron-left" size={25} style={style.icon}/>
                <View style={style.circle}>
                    <Icon name="user-edit" size={60} style={{color: 'white'}}/>
                </View>
                <Text style={style.name}>Dandara Melo</Text>
            </View>
            <View style={style.inputsView}>
                <TouchableOpacity style={style.btn} onPress={() => openModal("nome")}>
                    <Text style={style.text}>Nome</Text>
                    <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModal("telefone")}>
                    <Text style={style.text}>Telefone</Text>
                    <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={() => openModal("email")}>
                    <Text style={style.text}>Email</Text>
                    <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn}>
                    <Text style={style.text}>Senha</Text>
                    <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn}>
                    <Text style={style.text}>Sair</Text>
                    <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
            </View>
            <ModalEdicao
                visible={modalVisible}
                title={selectedField}
                onClose={() => setModalVisible(false)}
            />
        </StyledView>
    )
}
