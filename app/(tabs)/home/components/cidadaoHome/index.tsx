import { View, Text } from "react-native";
import { style } from "./style";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import React from "react";
import ModalStatusDenuncia from "./components/modalStatusDenuncia";

export default function CidadaoHome() {
    const [modalDenuncia, setModalDenuncia] = React.useState<boolean>(false);
    return (
        <View style={style.container}>
            <Text style={style.titles}>Confira suas denúncias reportadas</Text>
            <View style={style.mapView} />
            <View>
                <Text style={style.titles}>Estatística da cidade</Text>
                <View style={style.cardView}>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.primary}}>45</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias reportadas</Text>
                    </View>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.amarelo}}>55%</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>da categoria segurança</Text>
                    </View>
                    <View style={style.infoCard}>
                        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: 35, color: Colors.azul}}>20</Text>
                        <Text style={{fontFamily: "PoppinsMedium", fontSize: 12}}>denúncias resolvidas</Text>
                    </View>
                </View>
                <Text style={style.titles}>Minhas denúncias</Text>
                <View style={style.denunciaView}>
                    <View style={style.cardTitle}>
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 14}}>27 denúncias</Text>
                        <TouchableOpacity onPress={() => setModalDenuncia(true)}>
                            <Text style={{ fontFamily: "PoppinsMedium", fontSize: 12, color: Colors.cinza}}>Ver todas</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.cardLines}>
                        <Text style={style.text}>Pendente</Text>
                        <Text style={style.text}>2</Text>
                    </View>
                    <View style={style.cardLines}>
                        <Text style={style.text}>Em análise</Text>
                        <Text style={style.text}>4</Text>
                    </View>
                    <View style={style.cardLines}>
                        <Text style={style.text}>Rejeitada</Text>
                        <Text style={style.text}>4</Text>
                    </View>
                </View>
            </View>
            <ModalStatusDenuncia 
                visible={modalDenuncia}
                onClose={() => setModalDenuncia(false)}    
            />
        </View>
    )
}