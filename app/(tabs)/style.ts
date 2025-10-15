import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    backgroundColor: "#6A0DAD",
    height: "100%",
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 300,
    height: 220,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    color: "white",
    fontFamily: "PoppinsSemiBold",
  },
  caption: {
    width: 250,
    fontSize: 14,
    textAlign: "center",
    color: "white",
    marginTop: 40,
    marginBottom: 50,
    fontFamily: "PoppinsMedium",
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 15,
  },

  btnText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    color: "#2C0547",
  },
});
