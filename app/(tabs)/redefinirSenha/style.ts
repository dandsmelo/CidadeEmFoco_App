import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        height: 210,
        width: '100%',
        backgroundColor: Colors.primary,
        top: 0,
        position: 'relative',
    },
    icon: {
        position: "absolute",
        alignSelf: "flex-start",
        color: "white",
        top: 0,
        margin: 15,
    },
    titleDiv: {
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'left',
        marginLeft: 0,
    },
    title: {
        textAlign: 'left',
    }, 
    buttonDiv: {
        marginTop: 10,
    }

})