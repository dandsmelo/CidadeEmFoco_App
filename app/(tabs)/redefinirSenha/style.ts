import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        height: 230,
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
    img: {
        width: '100%',
        height: 270,
        marginTop: 35,
        resizeMode: 'contain',
    },
    titleDiv: {
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 40,
        width: '100%',
    },
    title: {
        textAlign: 'left',
        marginLeft: 20, 
    }, 
    buttonDiv: {
        marginTop: 10,
    }

})