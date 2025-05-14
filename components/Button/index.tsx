import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props extends TouchableOpacityProps {
    text: string;
    background: keyof typeof Colors;
}

export default function StyledButton(props: Props) {
    const { text, background, ...rest  } = props;

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: Colors[background] }]} {...rest}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 50,
        width: 300,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'PoppinsMedium',
        width: '100%',
        textAlign: 'center',
    }
})