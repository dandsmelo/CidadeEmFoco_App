import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: '100%',
        backgroundColor: Colors.primary,
        top: 0,
        position: 'absolute',
    },
    title: {
        color: Colors.primary,
    },
    textView: {
        display: 'flex',
        textAlign: 'left',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    caption: {
        width: 250,
        margin: 20,
    }

})