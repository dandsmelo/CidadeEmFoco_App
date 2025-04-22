import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    circle: {
        width: 120,       
        height: 120,         
        borderRadius: 60,
        backgroundColor: Colors.cinza,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
    name: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 20,
        color: 'white',
        marginTop: 10,
    },
    inputsView: {
        marginTop: 50,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 50,
        width: 300,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    text: {
        fontFamily: 'PoppinsMedium',
        fontSize: 18,
    },
})