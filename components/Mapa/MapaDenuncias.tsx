/* import React, { useEffect } from 'react';
import { Platform, View, StyleSheet, Dimensions } from 'react-native';
import { DenunciaData } from '@/interfaces/DenunciaData';

const { width } = Dimensions.get('window');

interface Props {
  denuncias: DenunciaData[];
}

export default function MapaDenuncias({ denuncias }: Props) {
    const { MapContainer, TileLayer, Marker, Popup, useMap } = require('react-leaflet');
    const L = require('leaflet');

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    function AjustarView({ denuncias }: { denuncias: DenunciaData[] }) {
        const map = useMap();

        useEffect(() => {
            const pontos = denuncias
            .filter(d => d.latitude && d.longitude)
            .map(d => [d.latitude, d.longitude] as [number, number]);

            if (pontos.length > 0) {
            map.fitBounds(pontos, { padding: [50, 50] });
            }
        }, [denuncias, map]);

        return null;
    }

    return (
      <MapContainer
         center={[denuncias[0]?.latitude || 0, denuncias[0]?.longitude || 0]}
         zoom={9}
         style={{
            height: 450,
            width: 370,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AjustarView denuncias={denuncias} />
        {denuncias.map((d, index) =>
          d.latitude && d.longitude ? (
            <Marker key={index} position={[d.latitude, d.longitude]} icon={redIcon}>
              <Popup>{d.titulo}</Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    );
}

 */
