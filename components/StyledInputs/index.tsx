import { TextInput, View, Image} from "react-native";
import { styles } from "./style";

interface Props {
    children: React.ReactNode,
    title: string,
}

export default function StyledInputs(props: Props) {
    const { children, title } = props;
    <View style={styles.container}>
        {children}
        <TextInput>
            {title}
        </TextInput>
    </View>
}