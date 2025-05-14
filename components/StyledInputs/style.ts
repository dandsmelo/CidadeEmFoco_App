import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        fontFamily: 'PoppinsSemiBold',
        height: 50,
        width: 300,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        color: Colors.cinza,
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
    }
})