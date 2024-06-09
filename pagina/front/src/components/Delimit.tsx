import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const DrawMap: React.FC = () => {
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const coordinates = layer.getLatLngs();
      console.log('Polygon coordinates: ', coordinates);
    }
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: false,
            circle: false,
            polyline: false,
            circlemarker: false,
            marker: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default DrawMap;
