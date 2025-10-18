import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const Style = StyleSheet.create({
    container: {
    height: "100%",
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  topoImg: {
    width: "100%",
    alignItems: "center",
    height: 256,
    position: "relative",
  },

  img: {
    marginTop: 80,
    width: 300,
    height: 270,
  },

  topoIcon: {
    position: "absolute",
    alignSelf: "flex-start",
    color: "white",
    top: 40,
    margin: 15,
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
    topoTexto: {
    marginLeft: 40,
    marginRight: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: "PoppinsRegular",
    marginBottom: 40,
    marginTop: 120,
    color: "#FFFFFF",
  },
  textI: {
    fontSize: 20,
    fontFamily: "PoppinsRegular",
    marginBottom: 20,
    color: "#FFFFFF",
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
        width: 45,
        height: 45,
        justifyContent: 'center',
        textAlign: 'center' 
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
        textDecorationLine: "underline",
        color: "#FFFFFF",
    }

    
})