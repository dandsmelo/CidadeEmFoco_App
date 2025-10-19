import { View, Text } from "react-native";
import { style } from "./style";
import { Colors } from "@/constants/Colors";

export default function ServidorHome() {
    return (
        <View style={style.container}>
            <Text style={style.titles}>Confira as denúncias reportadas na sua área de atuação</Text>
            <View style={style.mapView} />
            <View style={style.cardsPView}>
                <View style={style.cardsPequenos}>
                    <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.primary}}>45</Text>
                    <Text style={{fontFamily: "PoppinsMedium", fontSize: 14}}>Denúncias reportadas</Text>
                </View>
                <View style={style.cardsPequenos}>
                    <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.azul}}>20</Text>
                    <Text style={{fontFamily: "PoppinsMedium", fontSize: 14}}>Novas denúncias</Text>
                </View>
            </View>

            <View>
                <Text style={style.titles}>Estatística de desempenho</Text>
                <View style={style.cardView}>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.primary}}>25</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias atualizadas</Text>
                    </View>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.amarelo}}>55%</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>da categoria segurança</Text>
                    </View>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.azul}}>10</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias resolvidas</Text>
                    </View>
                </View>
                <Text style={style.titles}>Denúncias recentes</Text>
            </View>
        </View>
    )
}