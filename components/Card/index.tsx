import { useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native";

interface Props {
    children: React.ReactNode
}

export default function Card(props: Props) {
    const { children } = props;
    const { width } = useWindowDimensions();
    return (
        <View style={[style.container, { width: width * 0.95 }]}>
            {children}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    }
})