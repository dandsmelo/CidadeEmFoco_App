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

    topoIcon:{
        position: "absolute",
        alignSelf: "flex-start",
        color: "white",
        top: 0,
        margin: 15,
    },

    img: {
        width: '100%',
        height: 260, 
        marginTop: 35,
        resizeMode: 'contain',
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


    //TEXTO

    divTittle:{
        marginBottom:10,
        marginTop: 60,

    },

    bodyText:{
        backgroundColor:"#E8E8E8",
        width: '100%',
        height: '100%',
    },

    texto:{
        fontSize: 17,
        fontFamily: 'PoppinsRegular',
        marginBottom: 8,
    },

    textoI:{
        fontSize: 17,
        fontFamily: 'PoppinsRegular',
    },

    divTexto:{
        marginLeft: 40,
        marginRight: 40,
    },

    //INPUT

    containerInput:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    input:{
        backgroundColor: "#FFFFFF",
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        paddingLeft: 5,
        paddingRight: 5,
        color: "#000000",
        width: 42,
        height: 42,
        justifyContent: 'center',
        textAlign: 'center' 
    },

    inputEmail:{
        backgroundColor: "#FFFFFF",
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: "#000000",
        marginBottom: 15,
        width: 300,
    },

    inputIcon:{
        top: 20,
        left: 55,
        position: 'absolute',
        zIndex: 1,

    },

    //BOTÃO

    containerbtn:{
        alignItems: 'center',
        marginTop: 20,
    }

    
})