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
    topoImg: {
        width: "100%",
        alignItems: "center",
        height: 256,
        position: "relative",
    },
    icon: {
        position: "absolute",
        alignSelf: "flex-start",
        color: "white",
        top: 0,
        margin: 15,
    },
      topoIcon: {
        position: "absolute",
        alignSelf: "flex-start",
        color: "white",
        top: 40,
        margin: 15,
    },
    img: {
        marginTop: 100,
        width: 320,
        height: 180,
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
    divBtn: {
        marginTop: 20,
        alignItems: 'center',
    },
    fgtPassword: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        textDecorationLine: "underline",
        color: "#FFFFFF",
    }

})