import { TextInput, View } from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
    icon: string;
    placeholder: string;
}

export default function StyledInputs(props: Props) {
    const { icon, placeholder, ...rest } = props;
    return (
        <View style={styles.container}>
            <Icon name={icon} solid size={25} />
            <TextInput placeholder={placeholder} { ...rest} style={styles.input} />
        </View>
    );
}