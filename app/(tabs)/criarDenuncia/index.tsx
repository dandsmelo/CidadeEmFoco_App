import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import StyledView from "@/components/StyledView";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { AntDesign } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CriarDenuncia() {
  const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState(null);
    const [items, setItems] = useState([
    { label: 'Lixo', value: 'lixo' },
    { label: 'Iluminação', value: 'iluminação' },
    { label: 'Saneamento', value: 'saneamento' },
    { label: 'Infraestrutura', value: 'infraestrutura' },
    { label: 'segurança', value: 'segurança' },
    { label: 'Outro', value: 'outro' }
    ]);


    const [date, setDate] = useState<Date | undefined>(undefined);
    const [text, setText] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [categoria, setCategoria] = useState<string>('');
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleConfirm = (_: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
        setDate(selectedDate);
        setText(selectedDate.toLocaleDateString());
        }
    };

    const pickImage = async () => {
        Alert.alert(
          "Selecionar imagem",
          "De onde você quer adicionar a imagem?",
          [
            {
              text: "Galeria",
              onPress: async () => {
                const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (!permission.granted) {
                  alert("Permissão de acesso à galeria negada");
                  return;
                }
      
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: 'images',
                    quality: 1,
                  });
                  
      
                if (!result.canceled) {
                  setImageUri(result.assets[0].uri);
                }
              },
            },
            {
              text: "Câmera",
              onPress: async () => {
                const permission = await ImagePicker.requestCameraPermissionsAsync();
                if (!permission.granted) {
                  alert("Permissão de uso da câmera negada");
                  return;
                }
      
                const result = await ImagePicker.launchCameraAsync({
                  quality: 1,
                });
      
                if (!result.canceled) {
                  setImageUri(result.assets[0].uri);
                }
              },
            },
            {
              text: "Cancelar",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
      };

    const fontsLoaded = useCustomFonts()
            
    if (!fontsLoaded) {
        return null; 
    }

    return (
      <ScrollView style={style.background}>
        <StyledView>
            <NavBar title="Criar denúncia" />
            <View style={style.cardView}>
                <Card>
                    <TextInput placeholder="Adicione um título a denúncia" style={style.title}/>
                    <TouchableOpacity style={style.addImage} onPress={pickImage}>
                        <AntDesign name="pluscircle" size={60} color="white" />
                        <Text style={{fontFamily: 'PoppinsRegular', color: 'white'}}>Adicione uma imagem</Text>
                    </TouchableOpacity>
                    {imageUri && (
                        <View style={{ marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'PoppinsRegular', marginBottom: 5 }}>Imagem selecionada:</Text>
                            <Image
                            source={{ uri: imageUri }}
                            style={{ width: 200, height: 200, borderRadius: 10 }}
                            resizeMode="cover"
                            />
                        </View>
                    )}
                    <View style={style.input}>
                        <AntDesign name="pluscircle" size={20} color="#2e2e2e" />
                        <TextInput style={style.textInput} placeholder='Adicionar endereço'>
                        </TextInput>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setShowPicker(true)} activeOpacity={1} style={style.input}>
                            <Icon name='calendar-alt' size={20} style={{color: '2e2e2e'}}/>
                            <TextInput
                            value={text}
                            onChangeText={setText}
                            placeholder="Selecionar data"
                            style={style.textInput}
                            />
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleConfirm}
                            />
                        )}
                    </View>
                    <View>
                        <Text style={{fontFamily: 'PoppinsSemiBold', fontSize: 18, marginVertical: 10, color:'#2e2e2e'}}>Descrição</Text>
                        <TextInput 
                        style={style.description} 
                        placeholder="Escreva a denúncia aqui"
                        maxLength={250}
                        multiline={true}
                        textAlignVertical="top"
                        />
                    </View>

                    <View >

                        <DropDownPicker
                          open={open}
                          value={tipo}
                          items={items}
                          setOpen={setOpen}
                          setValue={setTipo}
                          setItems={setItems}
                          placeholder="Selecione categoria"
                          style={{
                              backgroundColor: '#FFFFFF',
                              borderRadius: 10,
                              borderColor: '#2e2e2e',
                              height: 50,
                          }}
                          textStyle={{
                              fontSize: 18,
                              fontFamily: 'PoppinsMedium',
                              color: '#2e2e2e',
                          }}
                          placeholderStyle={{
                              color: '#2e2e2e',
                              fontSize: 18,
                          }}
                          dropDownContainerStyle={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#FFFFFF',
                          }}
                        />
                      </View>


                    <TouchableOpacity style={style.button}>
                        <Text style={style.textBtn}>Criar denúncia</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </StyledView>
        </ScrollView>
    )
}
