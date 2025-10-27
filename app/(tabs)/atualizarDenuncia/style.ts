import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const Style = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flex: 1,
        width: '100%',
        alignItems: 'center',

    },

    divCard: {
        width:'100%',
        height: '100%',
        backgroundColor: Colors.background,
        alignItems: 'center',
    },

    card:{   
        marginTop: 20,
    },

    divImg:{
        alignItems: 'center',
        marginTop: 15,
    },

    img:{
        height: 130,
        width: 260,
    },

    divText:{
        marginTop: 10,
        flexDirection: 'column',
    },

    divElements: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    textI:{
        marginTop: 5,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        marginLeft: 10,
    },

    icon:{
        marginRight: 3,
    },


    titulo:{
        marginTop: 30,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'PoppinsMedium',
    },

    text:{
        fontSize: 16,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        textAlign: 'justify',
        marginBottom: 10,
    },

    labelText: {
        marginTop: 5,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'PoppinsMedium',
    },

    buttonI:{
        backgroundColor: Colors.verde, 
        padding: 8,
        borderRadius: 10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 5,
    },

    textButton:{
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: 'PoppinsSemibold',
        marginLeft: 6,
        marginRight: 6,
    },
    comentarios: {
        borderColor: Colors.cinza,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        padding: 5,
        borderWidth: 1,
        marginBottom: 15,
        color: '#2e2e2e',
    },

})