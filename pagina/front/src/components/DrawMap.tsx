// src/components/DrawMap.tsx

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import projetos from '../services/Projetos';

const DrawMap: React.FC = () => {

  const onCreated = async (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const coordinates = layer.getLatLngs()[0].map((coord: any) => [coord.lng, coord.lat]);

      console.log('Coordinates:', coordinates);

      // Formatar o GeoJSON
      const geoJson = {
        coordinates: [[coordinates]]
      };
      console.log(geoJson)
      // Enviar as coordenadas formatadas e o nome para o servidor
      const response = await projetos.create(geoJson);
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
    <div>
      <input
        type="text"
        style={{ marginBottom: '10px', padding: '5px' }}
      />
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
    </div>
  );
};

export default DrawMap;
