import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const Style = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flex: 1,
        width: '100%',
        backgroundColor: Colors.background,
    },

    //HEADER

    header:{
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        width: '100%',
        height: '13%',
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    //TEXTO HEADER


    divHeader:{
        marginLeft: 12,
        marginTop: 20,
    },

    textHeader:{
        fontSize: 17,
        fontFamily: 'PoppinsSemiBold',
        color: '#FFFFFF',
        marginLeft: 12,
        marginTop: 20,
    },

    divNoContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 450,
    },

    noContentText: {
        fontSize: 17,
        fontFamily: 'PoppinsRegular',
    },

    //IMAGEM HEADER

    img:{
        width: 45,
        height: 45,
        borderRadius: 100,
    },

    //BODY

    body:{
        width: '100%',
        height: '100%',
    },

    divImgMapa:{
        marginTop: 20,

    },

    //FOOTER

    divCard:{
        alignItems: 'center',
        marginTop:  40,
        position: "sticky",
        bottom: 50,
    },

    card:{
        backgroundColor: Colors.primary,
        width: '90%',
        height: 60,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 80,
        justifyContent: 'space-between',
        
    },

    
    btn:{
        width: 43,
        height: 43,
        borderRadius: 30,
        marginLeft: 6,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icone:{
       
    }

})