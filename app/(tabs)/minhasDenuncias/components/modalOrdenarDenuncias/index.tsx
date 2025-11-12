import { MaterialIcons } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useState } from "react";


interface Props {
    visible: boolean;
    onClose: () => void;
    onSort: (type: "categoria" | "status" | "data" | "titulo") => void; 
}

export default function ModalOrdenarDenuncia( props: Props) {
    const { visible, onClose, onSort } = props;
    const [selectedOption, setSelectedOption] = useState<"categoria" | "status" | "data" | "titulo" | null>(null);

  function handleOrdenar() {
    if (selectedOption) {
      onSort(selectedOption) 
      onClose();
    }
  }


    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={style.overlay}>
                <View style={style.container}>

                    <View style={style.headView}>
                        <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 22}}>Ordenar</Text>
                        <TouchableOpacity onPress={onClose} style={style.closeIcon}>
                            <MaterialIcons name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>

                    <View style={style.viewLines}>
                        <View>
                            <TouchableOpacity 
                            style={[style.cardLines, selectedOption === "categoria" && style.selected]}
                            onPress={() => setSelectedOption("categoria")}
                            >
                                <Text style={style.text}>Categoria</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity 
                            style={[style.cardLines, selectedOption === "status" && style.selected]}
                            onPress={() => setSelectedOption("status")}
                            >
                                <Text style={style.text}>Status</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                            style={[style.cardLines, selectedOption === "data" && style.selected]}
                            onPress={() => setSelectedOption("data")}>
                                <Text style={style.text}>Data</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[style.cardLines, selectedOption === "titulo" && style.selected]}
                                onPress={() => setSelectedOption("titulo")}
                                >
                                <Text style={style.text}>Título</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    
                    <View style={style.Divbuttons}>
                        <TouchableOpacity style={style.buttons} onPress={handleOrdenar}>
                            <Text style={style.textButton}>Ordenar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View> 
        </Modal>
    )

}

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: 'white',
        height: 'auto',
        width: 350,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    headView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    closeIcon: {
        zIndex: 1,
        color: 'gray',
        display: 'flex',
        flexDirection: 'row'
    },
    viewLines: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        paddingRight: 10,
    },
    cardLines: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        width: "100%",
        borderRadius: 8,
        marginTop: 6,
        backgroundColor: "rgba(167, 163, 170, 0.1)",        
    },
    selected: {
        backgroundColor: "rgba(106, 13, 173, 0.1)",
    },
    text: {
        fontFamily: "PoppinsMedium",
        fontSize: 18,
        paddingLeft: 10, 
    },

    Divbuttons:{
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 30,
    },
    buttons: {
        backgroundColor: Colors.primary,
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        display: 'flex',
        justifyContent: "center",
        gap: 7,
        alignItems: "center",
        flexDirection: 'row',
        marginRight: 18,
        marginLeft: 18,
            
    },
    textButton: {
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 16,
    },
})