import NavBar from "@/components/NavBar";
import { View, Text } from "react-native";
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import Card from "@/components/Card";

export default function MinhasDenuncias() {
    const fontsLoaded = useCustomFonts()
        
          if (!fontsLoaded) {
            return null; 
          }

    return (
        <View style={style.container}>
            <NavBar title="Minhas denúncias"/>
            <View style={style.cardView}>
                <Card>
                    <View style={style.topCard}>
                        <Text style={style.title}>Título</Text>
                        <Text style={style.data}>12/05/2025</Text>
                    </View>
                    <View style={style.endCard}>
                        <Text style={style.category}>Buraco</Text>
                        <Text style={style.status}>Pendente</Text>
                    </View>
                </Card>
            </View>
        </View>
    )
}