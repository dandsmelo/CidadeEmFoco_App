import { Colors } from "@/constants/Colors"
import { View, Text } from "react-native"
import { StyleSheet } from "react-native";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Icon from "react-native-vector-icons/FontAwesome5";
import { router } from 'expo-router';

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
            <View style={styles.circle}>
                <Icon 
                    name="chevron-left" 
                    size={18} 
                    style={styles.icon} 
                    onPress={() => router.push('/mapa')}
                />
            </View>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 70,
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
    },
    text: {
        color: Colors.primary,
        fontFamily: 'PoppinsSemiBold',
        fontSize: 22,
        marginLeft: 10,
    },
    icon: {
        color: "white",
        top: 0,
        margin: 15,
    },
})