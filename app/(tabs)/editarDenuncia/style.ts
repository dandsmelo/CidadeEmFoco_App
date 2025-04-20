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
        flexDirection: 'row',

    },

    textI:{
        marginTop: 5,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        marginLeft: 5,
    },

    textII:{
        marginTop: 5,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'PoppinsRegular',
        marginLeft: 30,
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

    iconButton:{ 
    },

    textButton:{
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        marginLeft: 8,
        marginTop: 3,
    }

})