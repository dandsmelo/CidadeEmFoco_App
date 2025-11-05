import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import StyledView from "@/components/StyledView";
import { style } from "./style";
import { useCustomFonts } from "@/assets/fonts/Fonts";
import { AntDesign } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFlashMessage } from '@/components/FlashMessageContext';
import Icons from 'react-native-vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

export default function CriarDenuncia() {
  const [open, setOpen] = useState(false);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'Lixo', value: 'lixo' },
    { label: 'Iluminação', value: 'iluminacao' },
    { label: 'Saneamento', value: 'saneamento' },
    { label: 'Infraestrutura', value: 'infraestrutura' },
    { label: 'Segurança', value: 'seguranca' },
    { label: 'Outro', value: 'outro' }
  ]);

  const [titulo, setTitulo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [descricao, setDescricao] = useState('');
  const [text, setText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useFlashMessage();
  

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null;

  const handleConfirm = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setText(selectedDate.toLocaleDateString());
    }
  };

  const pickImage = async () => {
    Alert.alert("Selecionar imagem", "De onde você quer adicionar a imagem?", [
      {
        text: "Galeria",
        onPress: async () => {
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!permission.granted) return alert("Permissão de acesso à galeria negada");
          const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'images', quality: 1 });
          if (!result.canceled) setImageUri(result.assets[0].uri);
        },
      },
      {
        text: "Câmera",
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) return alert("Permissão de uso da câmera negada");
          const result = await ImagePicker.launchCameraAsync({ quality: 1 });
          if (!result.canceled) setImageUri(result.assets[0].uri);
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const handleCriarDenuncia = async () => {
    if (!titulo || !endereco || !descricao || !date || !categoria) {
      showMessage("Por favor, preencha todos os campos.", "warning");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch("http://localhost:3000/denuncia", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`,},
        body: JSON.stringify({
          titulo,
          data: date.toISOString(),
          status: "Pendente",         
          descricao,
          categoria,
          local: endereco,
          imagem: null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTitulo("");
        setEndereco("");
        setDescricao("");
        setDate(undefined);
        setCategoria(null);
        setImageUri(null);
        showMessage("Denúncia enviada com sucesso!", "success")
        router.push("/minhasDenuncias");
      } else {
        showMessage(data.message || "Erro ao enviar denúncia.", "error");
      }
    } catch (error) {
      showMessage("Erro de conexão. Tente novamente.", "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={style.container}>
      <NavBar title="Criar denúncia" />
      <ScrollView
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
     >
      <StyledView>
        <View style={style.cardView}>
          <Card>
            <TextInput
              placeholder="Adicione um título à denúncia"
              style={style.title}
              value={titulo}
              onChangeText={setTitulo}
            />

            <TouchableOpacity style={style.addImage} onPress={pickImage}>
              <Icons name="add-circle" size={45} color="#ffff" />
              <Text style={{ fontFamily: 'PoppinsRegular', color: 'white' }}>Adicione uma imagem</Text>
            </TouchableOpacity>

            {imageUri && (
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PoppinsRegular', marginBottom: 5 }}>Imagem selecionada:</Text>
                <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, borderRadius: 10 }} />
              </View>
            )}

            <View style={style.input}>
              <Icon name="map-pin" size={30} color={Colors.cinza} />
              <TextInput
                style={style.textInput}
                placeholder='Adicionar endereço'
                value={endereco}
                onChangeText={setEndereco}
              />
            </View>

            <View>
              <TouchableOpacity onPress={() => setShowPicker(true)} activeOpacity={1} style={style.input}>
                <Icon name='calendar-alt' size={20} color={Colors.cinza} />
                <TextInput
                  value={text}
                  placeholder="Selecionar data"
                  style={style.textInput}
                  onChangeText={(input) => {
                    setText(input);
                    const partes = input.split('/');
                    if (partes.length === 3) {
                      const [dia, mes, ano] = partes;
                      const novaData = new Date(`${ano}-${mes}-${dia}`);
                      if (!isNaN(novaData.getTime())) {
                        setDate(novaData);
                      } else {
                        setDate(undefined); 
                      }
                    } else {
                      setDate(undefined);
                    }
                  }}

                  keyboardType="numeric"
                />
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShowPicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                      setText(selectedDate.toLocaleDateString('pt-BR'));
                    }
                  }}
                />
              )}
            </View>

            <View>
              <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18, marginVertical: 10, color: '#2e2e2e' }}>Descrição</Text>
              <TextInput
                style={style.description}
                placeholder="Escreva a denúncia aqui"
                maxLength={250}
                multiline={true}
                textAlignVertical="top"
                value={descricao}
                onChangeText={setDescricao}
              />
            </View>

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
                borderColor: Colors.cinza,
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

            <TouchableOpacity style={style.button} onPress={handleCriarDenuncia}>
              <Text style={style.textBtn}>Criar denúncia</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </StyledView>
    </ScrollView>
    </View>
  );
}
