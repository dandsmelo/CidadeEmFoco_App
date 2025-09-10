import { View, Text, Image, TouchableOpacity } from 'react-native';
import { style } from './style';
import { useCustomFonts } from '@/assets/fonts/Fonts';
import { router } from 'expo-router';

export default function InitialPage() {
  const fontsLoaded = useCustomFonts()

  if (!fontsLoaded) {
    return null; 
  }
  return (
    <View style={style.container}>
      <Image source={require('@/assets/images/logo.png')} style={style.img} />
      <Text style={style.title}>Cidade em Foco</Text>
      <Text style={style.caption}>"Cada problema reportado é um passo em direção à solução."</Text>
      <View>
        <TouchableOpacity  
          style={style.button}
          onPress={() => router.push('/login')}
        >
          <Text style={style.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={style.button}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={style.btnText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


