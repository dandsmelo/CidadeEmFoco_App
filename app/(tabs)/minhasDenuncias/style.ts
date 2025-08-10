import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
    },
    cardView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
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
        fontSize: 20,
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