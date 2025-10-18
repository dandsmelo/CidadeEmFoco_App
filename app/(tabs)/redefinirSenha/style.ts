import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
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
        marginTop: 100,
        width: 320,
        height: 180,
    },
    titleDiv: {
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 40,
        width: '100%',
    },
    buttonDiv: {
        marginTop: 10,
    },
    inputIconRight: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
        topoImg: {
        width: "100%",
        alignItems: "center",
        height: 256,
        position: "relative",
    },
      topoIcon: {
        position: "absolute",
        alignSelf: "flex-start",
        color: "white",
        top: 40,
        margin: 15,
    },
        textView: {
        textAlign: 'left',
        margin: 40,
    },
    title: {
        fontSize: 30,
        color: "#FFFFFF",
        fontFamily: "PoppinsSemiBold",
        marginBottom: 5,
        textAlign: "center",
    },
    text: {
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        marginBottom: 10,
        color: "#FFFFFF",
        textAlign: "center",
    },

})