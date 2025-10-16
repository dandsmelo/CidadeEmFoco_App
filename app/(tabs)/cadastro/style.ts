import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  //TOPO

  topoImg: {
    width: "100%",
    alignItems: "center",
    height: 256,
    position: "relative",
  },

  img: {
    marginTop: 80,
    width: 320,
    height: 180,
  },

  topoIcon: {
    position: "absolute",
    alignSelf: "flex-start",
    color: "white",
    top: 25,
    margin: 15,
  },

  //TEXTO

  /*bodyText: {
    backgroundColor: "#E8E8E8",
    width: "100%",
  },*/

  topoTexto: {
    marginLeft: 40,
    marginRight: 40,
  },

  title: {
    fontSize: 30,
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
  },

  text: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    marginBottom: 40,
    color: "#FFFFFF",
    textAlign: "center",
  },

  //INPUT

  bodyInput: {
    position: "relative",
  },

  input: {
    backgroundColor: "#FFFFFF",
    fontSize: 17,
    fontFamily: "PoppinsMedium",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "#000000",
    paddingLeft: 42,
  },

  inputIcon: {
    top: 20,
    left: 55,
    position: "absolute",
    zIndex: 1,
  },

  inputIconRight: {
    position: "absolute",
    right: 55,
    top: 20,
  },

  //BOTÃO

  button: {
    backgroundColor: "#1663C8",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
    borderColor: "#1663C8",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  },
});
