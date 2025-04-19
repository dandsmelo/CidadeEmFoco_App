import { useCustomFonts } from "@/assets/fonts/Fonts";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function Mapa(){
    const fontsLoaded = useCustomFonts()
    if (!fontsLoaded){
        return null;
    }

    return(
        <View style={Style.container}>
            
            <View style={Style.header}>

            <View style={Style.divImg}>
                <Image source={require('@/assets/images/user.png')} style={Style.img} />
            </View>

            <View style={Style.divTextHeader}>
                <Text style={Style.textI}>Olá,</Text>
                <Text style={Style.textII}>Usuário</Text>
            </View>

            </View> 

            <View style={Style.body}>

                <View style={Style.textBody}>
                    <Text style={Style.textMapa}>Mapa</Text>
                    <Text style={Style.textMapaI}>de denúncias</Text>
                </View>

                <View style={Style.divImgMapa}>
                    <Image source={require('@/assets/images/mapa.png')} style={Style.imgMapa} />
                </View>

                <View style={Style.divCard}>
                    <View style={Style.card}>
                        <View style={Style.btnI}>
                            <TouchableOpacity>
                                <Icon name="map-marker-alt" size={29} color="#000000" style={Style.icone} />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.btn}>
                            <TouchableOpacity>
                                <Icon name="plus-circle" size={29} color="#000000" style={Style.icone} />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.btn}>
                            <TouchableOpacity>
                                <Icon name="clipboard-list" size={29} color="#000000" style={Style.icone} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}