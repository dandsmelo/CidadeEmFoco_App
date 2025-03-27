import { View, Text, Image, TouchableOpacity } from 'react-native';
import { InitialPageStyles } from './initialPageStyle';
import { useCustomFonts } from '@/assets/fonts/Fonts';

export default function InitialPage() {
  const fontsLoaded = useCustomFonts()

  if (!fontsLoaded) {
    return null; 
  }
  return (
    <View style={InitialPageStyles.container}>
      <Image source={require('../../assets/images/location.png')} style={InitialPageStyles.img} />
      <Text style={InitialPageStyles.title}>Cidade em Foco</Text>
      <Text style={InitialPageStyles.caption}>"Cada problema reportado é um passo em direção à solução."</Text>
      <View>
        <TouchableOpacity  style={InitialPageStyles.button}>
          <Text style={InitialPageStyles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={InitialPageStyles.button}>
          <Text style={InitialPageStyles.btnText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


