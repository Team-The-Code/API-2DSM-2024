import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import projetos from '../services/Projetos';

const DrawMap: React.FC = () => {
  const onCreated = async (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const coordinates = layer.getLatLngs()[0]; // Obtenha apenas as coordenadas do primeiro anel
      console.log('Polygon coordinates: ', coordinates);
      
      const coordinate = coordinates.map((point: any) => [point.lng, point.lat]);
// Criando um MultiPolygon
const multiPolygon = {
  type: "MultiPolygon",
  coordinates: [
    [coordinate] // Cada conjunto de pontos forma um polígono
  ]
};

// Convertendo o objeto para uma string JSON
const multiPolygonString = JSON.stringify(multiPolygon);

console.log('MultiPolygon como string: ', multiPolygonString);

// Agora você pode passar multiPolygonString para onde precisar, como uma chamada de função ou para armazenamento em um banco de dados
const response = await projetos.create(multiPolygonString);

      if ('erro' in response) {
        console.error('Error saving polygon:', response.erro);
        alert('Error saving polygon. Please try again.');
      } else {
        console.log('Polygon saved successfully:', response);
        alert('Polygon saved successfully!');
      }
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