import { useCustomFonts } from "@/assets/fonts/Fonts";
import NavBar from "@/components/NavBar";
import { View, Image, Text, TouchableOpacity, TextInput} from "react-native";
import Card from "@/components/Card";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';




export default function EditarDenuncia(){

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Você precisa permitir acesso à galeria para continuar.');
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImagemUrl(result.assets[0].uri);
        }
    };
    

    const fontsLoaded = useCustomFonts()
    if(!fontsLoaded){
        return null;
    }

    const [isEditing, setIsEditing] = useState(false);
    const [titulo, setTitulo] = useState("Titulo denúncia")
    const [imagemUrl, setImagemUrl] = useState(""); 
    const [endereco, setEndereco] = useState("R. Abacaxi, 123");
    const [data, setData] = useState("12/02/2025");
    const [descricao, setDescricao] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");

    const handleEditarSalvar = () => {
        if (isEditing) {
            console.log("Salvando denúncia...", { endereco, data, descricao });
        }
        setIsEditing(!isEditing);
    };



    return(
        <View style={Style.container}>
            <View style={Style.navBar}>
                <TouchableOpacity>
                <Icon name="chevron-left" size={25} style={Style.iconNavBar}/>
                </TouchableOpacity>
                {isEditing ? (
                    <>
                    <TextInput
                    style={Style.inputTitulo}
                    value={titulo}
                    onChangeText={setTitulo}
                    />
                    </>
                ) : (
                    <Text style={Style.textTitulo}>{titulo}</Text>
                )}
            </View>
        
            <View style={Style.divCard}>

                <View style={Style.card}>
                    <Card>
                        <View style={Style.divImg}>
                            {isEditing ? (
                                <TouchableOpacity onPress={selecionarImagem}>
                                    <Image 
                                    source={imagemUrl ? { uri: imagemUrl } : require('@/assets/images/placeholder-image.jpg')}
                                    style={Style.img}
                                    />
                                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 12, fontFamily: 'PoppinsMedium' }}>
                                        Clique na imagem para alterar
                                        </Text>
                                </TouchableOpacity>
                            
                            ) : (
                                <Image
                                source={imagemUrl ? { uri: imagemUrl } : require('@/assets/images/placeholder-image.jpg')}
                                style={Style.img}
                                />
                            )}
                            
                        </View>
                        <View style={Style.divText}>
                            <Icon name="map-pin" size={25} color="#000000" style={Style.icon}></Icon>
                            {isEditing ? (
                                <>
                                <TextInput
                                    style={Style.input}
                                    value={endereco}
                                    onChangeText={setEndereco}
                                    maxLength={20}
                                />
                                <TextInput
                                        style={Style.input}
                                        value={data}
                                        onChangeText={setData}
                                />
                                </>
                            ) : (
                                <>
                                <Text style={Style.textI}>{endereco}</Text>
                                <Text style={Style.textII}>{data}</Text>
                                </>
                            )}
                        </View>

                        <View>
                            <Text style={Style.titulo}>Descrição</Text>
                            {isEditing ? (
                                <TextInput
                                style={[Style.descricaoInput, { height: 100, textAlignVertical: 'top' }]}
                                value={descricao}
                                onChangeText={setDescricao}
                                multiline
                                maxLength={150}
                                />
                            ) : (
                                <Text style={Style.text}>{descricao}</Text>
                            )}
                        </View>

                        <View>
                            <TouchableOpacity style={isEditing ? Style.buttonEditar : Style.button} onPress={handleEditarSalvar} >
                                <Icon name={isEditing ? "check" : "pencil-alt"} size={18} color="#FFFFFF" style={Style.iconButton}></Icon>
                                <Text style={Style.textButton}>
                                {isEditing ? "Salvar alterações" : "Editar denúncia"}
                                </Text>
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