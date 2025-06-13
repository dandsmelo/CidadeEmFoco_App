import { useCustomFonts } from "@/assets/fonts/Fonts";
import NavBar from "@/components/NavBar";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView} from "react-native";
import Card from "@/components/Card";
import { Style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarDenuncia(){
    const { id } = useLocalSearchParams();

    const [open, setOpen] = useState(false);
    const [categoria, setCategoria] = useState<string | null>('buraco');
    const [items, setItems] = useState([
    { label: 'Lixo', value: 'lixo' },
    { label: 'Iluminação', value: 'iluminação' },
    { label: 'Saneamento', value: 'saneamento' },
    { label: 'Infraestrutura', value: 'infraestrutura' },
    { label: 'segurança', value: 'segurança' },
    { label: 'Outro', value: 'outro' }
    ]);


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

    useEffect(() => {
        const buscarDenuncia = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const denuncia = await response.json();

                setTitulo(denuncia.titulo);
                setEndereco(denuncia.local);
                setDescricao(denuncia.descricao);
                setCategoria(denuncia.categoria);
                setData(denuncia.data.substring(0, 10));
                // setImagemUrl(denuncia.imagem); // Quando tiver o upload da imagem no backend
            } catch (err) {
                console.error(err);
            }
        };

        buscarDenuncia();
    }, []);

    const handleEditarSalvar = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    titulo,
                    data: new Date(data).toISOString(),
                    status: "Pendente",
                    descricao,
                    categoria,
                    local: endereco,
                    imagem: null 
                }),
            });

            if (response.ok) {
                alert("Denúncia atualizada com sucesso!");
                setIsEditing(false);
                router.push("/minhasDenuncias");
            } else {
                const dataError = await response.json();
                alert(dataError.message || "Erro ao atualizar denúncia.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão. Tente novamente.");
        }
    };

    const handleExcluirDenuncia = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Denúncia excluída com sucesso!");
                router.push("/minhasDenuncias");
            } else {
                const dataError = await response.json();
                alert(dataError.message || "Erro ao excluir denúncia.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão. Tente novamente.");
        }
    };




    return(
        <ScrollView style={Style.backgroud}>
        <View style={Style.container}>
            <View style={Style.navBar}>
                <TouchableOpacity>
                <Icon name="chevron-left" size={25} style={Style.iconNavBar} onPress={() => router.push('/minhasDenuncias')} />
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
                            <Icon name="map-marked-alt" size={23} color="#000000" style={Style.iconButton}></Icon>
                            {isEditing ? (
                                <>
                                <TextInput
                                    style={Style.input}
                                    value={endereco}
                                    onChangeText={setEndereco}
                                    maxLength={20}
                                />
                                </>
                            ) : (
                                <>
                                <Text style={Style.textI}>{endereco}</Text>
                                </>
                            )}
                        </View>

                        <View style={Style.divText}>
                            <Icon name="calendar-alt" size={23} color="#000000" style={Style.iconButtonI}></Icon>
                            {isEditing ? (
                                <>
                                <TextInput
                                        style={Style.input}
                                        value={data}
                                        onChangeText={setData}
                                />
                                </>
                            ) : (
                                <>
                                <Text style={Style.textII}>{data}</Text>
                                </>
                            )}
                        </View>
                        

                        
                            
                        <View style={{ zIndex: 1000, marginTop: 10 }}>
                            {isEditing ? (
                            <DropDownPicker
                            open={open}
                            value={categoria}
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategoria}
                            setItems={setItems}
                            placeholder="Selecione categoria"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                borderColor: '#898989',
                                height: 50,
                            }}
                            textStyle={{
                                fontSize: 17,
                                fontFamily: 'PoppinsMedium',
                                color: '#898989',
                            }}
                            placeholderStyle={{
                                color: '#000000',
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#898989',
                            }}
                            />
                            ) : (
                            <Text style={Style.category}>{categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : "Sem categoria"}</Text>
                            )}
                        </View>
                
                     

                        <View>
                            <Text style={Style.titulo}>Descrição</Text>
                            {isEditing ? (
                                <TextInput
                                style={[Style.descricaoInput, { height: 350, textAlignVertical: 'top' }]}
                                value={descricao}
                                onChangeText={setDescricao}
                                multiline
                                maxLength={250}
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
                                <Icon name="trash" size={20} color="#FFFFFF" style={Style.iconButton}></Icon>
                                <Text style={Style.textButton} onPress={handleExcluirDenuncia}>Excluir denúncia</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>

                
                

            </View>

        </View>
        </ScrollView>
    )
}