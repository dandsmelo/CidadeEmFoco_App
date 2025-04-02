import { useCustomFonts } from "@/assets/fonts/Fonts";
import { Colors } from "@/constants/Colors";
import { Text, TextStyle } from "react-native";
import { StyleSheet } from "react-native";


interface Props {
    title: string;
    style?: TextStyle;
}

export default function StyledTitle(props: Props) {
  const { title, style } = props;

  const fontsLoaded = useCustomFonts()

  if (!fontsLoaded) {
    return null; 
  }
  return (
    <Text style={[styles.text, style]}>{title}</Text>
  );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.primary,
        fontFamily: 'PoppinsSemiBold',
        fontSize: 26,
    },
})
