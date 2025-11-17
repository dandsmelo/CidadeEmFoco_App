import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";
import { DenunciaData } from "@/interfaces/DenunciaData";

interface Props {
    denuncias: DenunciaData[];
}

export default function MapaDenuncias(props: Props) {
    const { denuncias } = props
  if (!denuncias || denuncias.length === 0) {
    return <View style={{ padding: 20 }}><Text>Nenhuma denúncia encontrada.</Text></View>;
  }

  const first = denuncias[0];

  useEffect(() => {
    console.log("Mapa carregou!", denuncias);
    }, [denuncias]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: first.latitude ?? 0,
          longitude: first.longitude ?? 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {denuncias.map((d) => (
          <Marker
            key={d._id}
            coordinate={{
              latitude: d.latitude ?? 0,
              longitude: d.longitude ?? 0,
            }}
            title={d.titulo}
            description={d.categoria}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
