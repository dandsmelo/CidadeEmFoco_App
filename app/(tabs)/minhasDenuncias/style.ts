import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
    },
    buttonView: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 25,
        marginBottom: 0,
    },
    buttons: {
        backgroundColor: Colors.primary,
        padding: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 7,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textButton: {
        color: 'white',
        fontFamily: 'PoppinsRegular',
    },
    cardView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        paddingTop: 10,
    },
    topCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    title: {
        fontFamily: 'PoppinsMedium',
        fontSize: 18,
    },
    data: {
        fontFamily: 'PoppinsRegular',
    },
    endCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    category: {
        padding: 8,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        color: 'white',
        fontFamily: 'PoppinsRegular',
        marginTop: 5,
    },
    status: {
        padding: 8,
        backgroundColor: Colors.vermelho,
        borderRadius: 10,
        color: 'white',
        fontFamily: 'PoppinsRegular',
        marginTop: 5,
    },
    noContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})