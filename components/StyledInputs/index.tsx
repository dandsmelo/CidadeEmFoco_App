import { TextInput, View, TouchableOpacity } from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  onToggleVisibility?: () => void;
}

export default function StyledInputs(props: Props) {
  const {
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    showToggle = false,
    onToggleVisibility,
    ...rest
  } = props;

  return (
    <View style={{ position: 'relative', width: 300 }}>
      <Icon name={icon} solid size={20} color="#898989" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#898989"
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {showToggle && (
        <TouchableOpacity onPress={onToggleVisibility} style={styles.iconRight}>
          <Icon
            name={secureTextEntry ? "eye-slash" : "eye"}
            size={20}
            color="#898989"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
