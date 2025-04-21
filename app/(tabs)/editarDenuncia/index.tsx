import { useCustomFonts } from "@/assets/fonts/Fonts";
import NavBar from "@/components/NavBar";
import { View, Image, Text, TouchableOpacity} from "react-native";
import Card from "@/components/Card";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';



export default function EditarDenuncia(){
    const fontsLoaded = useCustomFonts()
    if(!fontsLoaded){
        return null;
    }

    return(
        <View style={Style.container}>
            
            <NavBar title="Titulo denúncia"/>
        
            <View style={Style.divCard}>

                <View style={Style.card}>
                    <Card>
                        <View style={Style.divImg}>
                            <Image source={require('@/assets/images/paisagem.png')} style={Style.img}></Image>
                        </View>
                        <View style={Style.divText}>
                            <Icon name="map-pin" size={25} color="#000000" style={Style.icon}></Icon>
                            <Text style={Style.textI}>R. Abacaxi, 123</Text>
                            <Text style={Style.textII}>12/02/2025</Text>
                        </View>

                        <View>
                            <Text style={Style.titulo}>Descrição</Text>
                            <Text style={Style.text}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took.
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity style={Style.button}>
                                <Icon name="pencil-alt" size={18} color="#FFFFFF" style={Style.iconButton}></Icon>
                                <Text style={Style.textButton}>Editar denúncia</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Style.button}>
                                <Icon name="trash" size={18} color="#FFFFFF" style={Style.iconButton}></Icon>
                                <Text style={Style.textButton}>Excluir denúncia</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>

                
                

            </View>

        </View>
    )
}