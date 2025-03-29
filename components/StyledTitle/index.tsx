import { useCustomFonts } from "@/assets/fonts/Fonts";
import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import { StyleSheet } from "react-native";


interface Props {
    title: string
}

export default function StyledTitle(props: Props) {
  const { title } = props;

  const fontsLoaded = useCustomFonts()

  if (!fontsLoaded) {
    return null; 
  }
  return (
    <Text style={style.text}>{title}</Text>
  );
}

const style = StyleSheet.create({
    text: {
        color: Colors.primary,
        fontFamily: 'PoppinsSemiBold',
        fontSize: 20,
    },
})
