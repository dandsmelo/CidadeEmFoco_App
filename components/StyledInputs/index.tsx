import { TextInput, View } from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
    icon: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;

}

export default function StyledInputs(props: Props) {
    const { icon, placeholder, value, onChangeText, ...rest } = props;
    return (
        <View>
            <Icon name={icon} solid size={20} color="#898989" style={styles.icon}/>
            <TextInput placeholder={placeholder} { ...rest} style={styles.input} value={value} onChangeText={onChangeText} placeholderTextColor="#898989" />
        </View>
    );
}