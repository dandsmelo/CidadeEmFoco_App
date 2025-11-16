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
        height: 150,
        width: 340,
        borderRadius:10,
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
        display: 'flex',
        height: 45,
        width: 'auto',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: Colors.verde,
        justifyContent: 'center',
        marginTop: 10,
    },

    textButton:{
        fontSize: 20,
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        width: '100%',
        textAlign: 'center',
    },
    comentarios: {
        borderColor: '#000000',
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        padding: 5,
        borderWidth: 1,
        marginBottom: 15,
        color: '#000000',
        height: 50,
    },

})