import { Colors } from "@/constants/Colors"
import { View, Text } from "react-native"
import { StyleSheet } from "react-native";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
    title: string,
}

export default function NavBar(props: Props) {
    const { title } = props;

     const fontsLoaded = useCustomFonts()
    
      if (!fontsLoaded) {
        return null; 
      }

    return (
        <View style={styles.container}>
            <Icon name="chevron-left" size={25} style={styles.icon}/>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        height: 70,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 24,
        marginLeft: 10,
    },
    icon: {
        color: "white",
        top: 0,
        margin: 15,
    },
})