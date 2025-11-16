import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
        overflow: 'visible'
    },
    cardView: {
        display: 'flex',
        marginTop: 20,
        fontFamily: 'PoppinsMedium',
        fontSize: 18,
    },
    title: {
        borderColor: Colors.cinza,
        borderRadius: 10,
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        padding: 5,
        borderWidth: 1,
        marginBottom: 15,
        color: '#2e2e2e',
    },
    addImage: {
        backgroundColor: Colors.cinza,
        height: 100,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderColor: Colors.cinza,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10
    },
    textInput: {
        fontFamily: 'PoppinsMedium',
        marginLeft: 5,
        fontSize: 18,
        padding: 5,
        width: '100%',
        color: '#2e2e2e',
    },
    description: {
        borderColor: Colors.cinza,
        borderRadius: 10,
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        padding: 5,
        borderWidth: 1,
        marginBottom: 15,
        color: '#2e2e2e',
        height: 100,
    },
    select: {
        borderColor: Colors.cinza,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        padding: 5,
        borderWidth: 1,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        display: 'flex',
        height: 45,
        width: 'auto',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: Colors.verde,
        justifyContent: 'center',
        marginTop: 10,
    },
    textBtn: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        width: '100%',
        textAlign: 'center',
    }
})