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
    img: {
        width: '100%',
        height: 210,
        marginTop: 18,
    },
    textView: {
        textAlign: 'left',
        margin: 40,
    },
    divBtn: {
        marginTop: 20,
        alignItems: 'center',
    },
    fgtPassword: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        textDecorationLine: "underline",
    }

})