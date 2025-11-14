import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        width: '100%',
        backgroundColor: Colors.primary,
        top: 0,
        position: 'relative',
    },
    icon: {
        position: "absolute",
        alignSelf: "flex-start",
        color: "white",
        top: 40,
        left: 10,
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
        marginTop: 50,
      },
    name: {
        fontFamily: 'PoppinsMedium',
        fontSize: 20,
        color: 'white',
        marginTop: 20,
    },
    inputsView: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.background,
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingBottom: 80,
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 55,
        width: 320,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 17,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'PoppinsRegular',
        fontSize: 18,
    },
})