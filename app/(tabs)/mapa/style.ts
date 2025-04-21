import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const Style = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flex: 1,
        width: '100%',
    },

    //HEADER

    header:{
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        width: '100%',
        height: '12%',
        alignItems: 'center'
    },

    //TEXTO HEADER

    textI:{
        fontSize: 15,
        fontFamily: 'PoppinsRegular',
        color: '#FFFFFF'
    },

    textII:{
        fontSize: 15,
        fontFamily: 'PoppinsMedium',
        color: '#FFFFFF'
    },

    divTextHeader:{
        marginLeft: 12,
        
    },

    //IMAGEM HEADER

    divImg:{
        marginLeft: 10,

    },

    img:{
        width: 45,
        height: 45,
    },

    //BODY

    body:{
        backgroundColor:"#E8E8E8",
        width: '100%',
        height: '100%',
    },

    textMapa:{
        fontSize: 25,
        fontFamily: 'PoppinsMedium',
    },

    textMapaI:{
        fontSize: 20,
        fontFamily: 'PoppinsMedium',
    },

    textBody:{
        marginLeft: 15,
        marginTop: 20,
    },

    divImgMapa:{
        marginTop: 20,

    },

    imgMapa:{
        width: '100%',
        height: 360, 
    },

    //FOOTER



    card:{
        backgroundColor:'#FFFFFF',
        width: 210,
        height: 60,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    divCard:{
        alignItems: 'center',
        marginTop:  40,
    },

    btn:{
        backgroundColor: Colors.background,
        width: 43,
        height: 43,
        borderRadius: 30,
        marginLeft: 6,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnI:{
        backgroundColor: '#8FCF57',
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