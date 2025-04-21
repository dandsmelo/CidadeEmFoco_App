import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    cardView: {
        display: 'flex',
        marginTop: 20,
        fontFamily: 'PoppinsRegular',
    },
    title: {
        borderColor: Colors.cinza,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        padding: 5,
        borderWidth: 1,
        marginBottom: 15,
    },
    addImage: {
        backgroundColor: Colors.background,
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
    },
    textInput: {
        fontFamily: 'PoppinsRegular',
        marginLeft: 5,
        fontSize: 16,
        padding: 5,
    },
    description: {
        borderColor: Colors.cinza,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        padding: 5,
        borderWidth: 1,
        height: 80,
        marginBottom: 15,
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
        height: 50,
        width: 260,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: Colors.verde,
    },
    textBtn: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        width: '100%',
        textAlign: 'center',
    }
})