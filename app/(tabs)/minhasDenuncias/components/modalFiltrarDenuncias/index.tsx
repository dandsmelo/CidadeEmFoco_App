import { MaterialIcons } from "@expo/vector-icons";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onFilter: (filters: {
    categorias: string[];
    status: string[];
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

type CategoriaKey =
  | "lixo"
  | "iluminacao"
  | "saneamento"
  | "infraestrutura"
  | "seguranca"
  | "outro";

type StatusKey =
  | "Pendente"
  | "Em análise"
  | "Em andamento"
  | "Resolvida"
  | "Rejeitada";

export default function ModalFiltrarDenuncia(props: Props) {
  const { visible, onClose } = props;
  const [expanded, setExpanded] = useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = useState(false);

  const [isDateExpanded, setIsDateExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<"start" | "end" | null>(null);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  const toggleStatusExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsStatusExpanded(!isStatusExpanded);
  };
  const toggleDateExpand = () => {
    setIsDateExpanded((prev) => !prev);
  };

  const [selected, setSelected] = useState<Record<CategoriaKey, boolean>>({
    lixo: false,
    iluminacao: false,
    saneamento: false,
    infraestrutura: false,
    seguranca: false,
    outro: false,
  });
  const toggleCheck = (key: CategoriaKey) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [statusSelected, setStatusSelected] = useState<
    Record<StatusKey, boolean>
  >({
    Pendente: false,
    "Em análise": false,
    "Em andamento": false,
    Resolvida: false,
    Rejeitada: false,
  });
  const toggleStatusCheck = (key: StatusKey) => {
    setStatusSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.overlay}>
        <View style={style.container}>
          <View style={style.headView}>
            <Text style={{ fontFamily: "PoppinsBold", fontSize: 22 }}>
              Filtrar por:{" "}
            </Text>
            <TouchableOpacity onPress={onClose} style={style.closeIcon}>
              <MaterialIcons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={style.viewLines}>
            <View style={style.filtro}>
              <TouchableOpacity onPress={toggleExpand} style={style.header}>
                <Text style={style.expandedIcon}>
                  {expanded ? (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={20}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons name="arrow-right" size={20} color="black" />
                  )}
                </Text>
                <Text style={style.text}>Categoria</Text>
              </TouchableOpacity>
              {expanded && (
                <View style={style.content}>
                  {renderCheck("Lixo", "lixo", selected, toggleCheck)}
                  {renderCheck(
                    "Iluminação",
                    "iluminacao",
                    selected,
                    toggleCheck
                  )}
                  {renderCheck(
                    "Saneamento",
                    "saneamento",
                    selected,
                    toggleCheck
                  )}
                  {renderCheck(
                    "Infraestrutura",
                    "infraestrutura",
                    selected,
                    toggleCheck
                  )}
                  {renderCheck("Segurança", "seguranca", selected, toggleCheck)}
                  {renderCheck("Outro", "outro", selected, toggleCheck)}
                </View>
              )}
            </View>

            <View style={style.filtro}>
              <TouchableOpacity
                onPress={toggleStatusExpand}
                style={style.header}
              >
                <Text style={style.expandedIcon}>
                  {isStatusExpanded ? (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={20}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons name="arrow-right" size={20} color="black" />
                  )}
                </Text>
                <Text style={style.text}>Status</Text>
              </TouchableOpacity>
              {isStatusExpanded && (
                <View style={style.content}>
                  {renderStatusCheck(
                    "Pendente",
                    "Pendente",
                    statusSelected,
                    toggleStatusCheck
                  )}
                  {renderStatusCheck(
                    "Em análise",
                    "Em análise",
                    statusSelected,
                    toggleStatusCheck
                  )}
                  {renderStatusCheck(
                    "Em andamento",
                    "Em andamento",
                    statusSelected,
                    toggleStatusCheck
                  )}
                  {renderStatusCheck(
                    "Resolvida",
                    "Resolvida",
                    statusSelected,
                    toggleStatusCheck
                  )}
                  {renderStatusCheck(
                    "Rejeitada",
                    "Rejeitada",
                    statusSelected,
                    toggleStatusCheck
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={style.Divbuttons}>
            <TouchableOpacity
              style={style.buttons}
              onPress={() => {
                setSelected({
                  lixo: false,
                  iluminacao: false,
                  saneamento: false,
                  infraestrutura: false,
                  seguranca: false,
                  outro: false,
                });
                setStatusSelected({
                  Pendente: false,
                  "Em análise": false,
                  "Em andamento": false,
                  Resolvida: false,
                  Rejeitada: false,
                });
                setStartDate(null);
                setEndDate(null);
              }}
            >
              <Text style={style.textButton}>Limpar Filtros</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.buttons}
              onPress={() => {
                const categoriasSelecionadas = Object.keys(selected).filter(
                  (key) => selected[key as CategoriaKey]
                );
                const statusSelecionados = Object.keys(statusSelected).filter(
                  (key) => statusSelected[key as StatusKey]
                );

                if (startDate && endDate && endDate < startDate) {
                  Alert.alert(
                    "Período inválido",
                    "A data final deve ser posterior à inicial."
                  );
                  return;
                }

                props.onFilter({
                  categorias: categoriasSelecionadas,
                  status: statusSelecionados,
                  startDate,
                  endDate,
                });

                onClose();
              }}
            >
              <Text style={style.textButton}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const renderCheck = (
  label: string,
  key: CategoriaKey,
  selected: Record<CategoriaKey, boolean>,
  toggleCheck: (key: CategoriaKey) => void
) => {
  return (
    <TouchableOpacity
      onPress={() => toggleCheck(key)}
      style={style.checkRow}
      activeOpacity={0.7}
    >
      <View style={[style.checkbox, selected[key] && style.checkboxSelected]}>
        {selected[key] && <View style={style.checkboxMark} />}
      </View>

      <Text style={style.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const renderStatusCheck = (
  label: string,
  key: StatusKey,
  selected: Record<StatusKey, boolean>,
  toggleCheck: (key: StatusKey) => void
) => {
  return (
    <TouchableOpacity
      onPress={() => toggleCheck(key)}
      style={style.checkRow}
      activeOpacity={0.7}
    >
      <View style={[style.checkbox, selected[key] && style.checkboxSelected]}>
        {selected[key] && <View style={style.checkboxMark} />}
      </View>

      <Text style={style.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  content: {
    marginTop: 10,
    gap: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "white",
    height: "auto",
    width: 350,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  filtro: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  headView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  closeIcon: {
    zIndex: 1,
    color: "gray",
  },
  viewLines: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingRight: 10,
  },
  cardLines: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 3,
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedIcon: {
    fontSize: 26,
    marginRight: 10,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    borderColor: "#6a0dad",
  },
  checkboxMark: {
    width: 12,
    height: 12,
    backgroundColor: "#6A0DAD",
    borderRadius: 2,
  },
  checkLabel: {
    fontSize: 16,
  },
  Divbuttons: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 30,
  },
  buttons: {
    backgroundColor: Colors.primary,
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    gap: 7,
    alignItems: "center",
    flexDirection: "row",
    marginRight: 18,
    marginLeft: 18,
  },
  textButton: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  dateButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "PoppinsMedium",
  },
});
