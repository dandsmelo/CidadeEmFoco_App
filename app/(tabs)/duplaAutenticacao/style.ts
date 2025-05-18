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
        resizeMode: 'contain',
    },

    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 290,
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
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
        marginBottom: 20,
        marginTop: 40,
    },

    textoI:{
        fontSize: 18,
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
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        color: "#898989",
        paddingLeft: 42,
        width: 50,
        height: 50,
        
    },

    //BOTÃO

    containerbtn:{
        alignItems: 'center',
        marginTop: 20,
    },

    //LINK
    bottomDiv:{
        alignItems: 'center',
    },

    link:{
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        textDecorationLine: 'underline',
    }

    
})