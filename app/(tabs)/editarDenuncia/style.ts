import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const Style = StyleSheet.create({
    container: {
        height: "auto",
        display: 'flex',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.background,
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
        width: 260,
        borderRadius:10,
    },

    divText:{
        marginTop: 10,
        flexDirection: 'row',

    },

    textI:{
        fontSize: 18,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        marginLeft: 5,
    },

    textII:{
        fontSize: 18,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        marginLeft: 5,
    },

    icon:{
        marginRight: 3,
    },


    titulo:{
        marginTop: 10,
        fontSize: 18,
        color: '#000000',
        fontFamily: 'PoppinsSemibold',
    },

    text:{
        fontSize: 18,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        textAlign: 'justify',
        marginBottom: 10,
    },

    button:{
        backgroundColor: Colors.primary, 
        padding: 5,
        borderRadius: 10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    buttonEditar:{
        backgroundColor: Colors.verde, 
        padding: 5,
        borderRadius: 10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

    iconButton:{ 
    },
    iconButtonI:{
        marginRight: 5,
    },

    textButton:{
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: 'PoppinsMedium',
        marginLeft: 8,
        marginTop: 3,
    },
    input: {
        width: '100%',
        paddingVertical: 5,
        fontSize: 18,
        color: '#898989',
        borderWidth: 1,
        borderColor: '#898989',
        borderRadius: 10,
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
        marginLeft: 10,
    },
    inputTitulo:{
        color: Colors.primary,
        fontFamily: 'PoppinsSemiBold',
        fontSize: 22,
        marginLeft: 10,
        marginTop: 10,
    },
    descricaoInput:{
        fontSize: 18,
        color: '#898989',
        borderWidth: 1,
        borderColor: '#898989',
        borderRadius: 10,
        marginBottom: 8,
        fontFamily: 'PoppinsMedium',
        padding: 5,
    
    },
    textTitulo: {
        color: Colors.primary,
        fontFamily: 'PoppinsSemiBold',
        fontSize: 22,
        marginLeft: 10,
        marginTop: 10,
    },
    iconNavBar: {
        color: "white",
    },
    navBar:{
        backgroundColor: 'white',
        height: '13%',
        paddingTop: 30,
        paddingBottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 4.65,
        elevation: 2,
        zIndex: 10,
        overflow: 'visible',
    },
    circle: {
        backgroundColor: Colors.primary, 
        borderRadius: '100%', 
        width: 35, 
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 18,
        marginTop: 10,
    },

    category: {
        width: 150,
        height: 40,
        padding: 7,
        textAlign: 'center',
        backgroundColor: Colors.azul,
        borderRadius: 10,
        color: 'white', 
        fontSize: 18,
        fontFamily: 'PoppinsMedium', 
        marginTop: 10,
    },

})