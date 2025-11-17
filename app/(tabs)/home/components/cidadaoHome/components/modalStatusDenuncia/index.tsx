import { DenunciaCount } from "@/interfaces/DenunciaData";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

interface Props {
    visible: boolean;
    onClose: () => void;
    denunciasCount?: DenunciaCount;
}

export default function ModalStatusDenuncia( props: Props) {
    const {visible, onClose, denunciasCount} = props;

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
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 14}}>{`${denunciasCount?.total} denúncias`}</Text>
                        <TouchableOpacity onPress={onClose} style={style.closeIcon}>
                            <MaterialIcons name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <View style={style.viewLines}>
                        <View style={style.cardLines}>
                            <Text style={style.text}>Pendente</Text>
                            <Text style={style.text}>{denunciasCount?.porStatus.pendente}</Text>
                        </View>
                        <View style={style.cardLines}>
                            <Text style={style.text}>Em análise</Text>
                            <Text style={style.text}>{denunciasCount?.porStatus.em_analise}</Text>
                        </View>
                        <View style={style.cardLines}>
                            <Text style={style.text}>Em andamento</Text>
                            <Text style={style.text}>{denunciasCount?.porStatus.em_andamento}</Text>
                        </View>
                        <View style={style.cardLines}>
                            <Text style={style.text}>Resolvida</Text>
                            <Text style={style.text}>{denunciasCount?.porStatus.resolvida}</Text>
                        </View>
                        <View style={style.cardLines}>
                            <Text style={style.text}>Rejeitada</Text>
                            <Text style={style.text}>{denunciasCount?.porStatus.rejeitada}</Text>
                        </View>
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
        justifyContent: "space-between",
        width: "100%",
        marginTop: 3,
    },
    text: {
        fontFamily: "PoppinsMedium",
        fontSize: 12,
    }
})