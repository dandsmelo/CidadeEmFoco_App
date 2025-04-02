import { View } from "react-native";
import { style } from "./style";

interface Props {
    children: React.ReactNode
}

export default function StyledView(props: Props) {
    const { children } = props;
  return (
    <View style={style.container}>
      {children}
    </View>
  );
}

