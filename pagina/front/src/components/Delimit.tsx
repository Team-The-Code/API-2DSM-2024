import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import axios from 'axios';

const DrawMap: React.FC = () => {
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const coordinates = layer.getLatLngs();
      console.log('polygonCoordinates: ', coordinates);

      // Enviar as coordenadas para o servidor
      axios.post('/projetos/create', { coordinates })
        .then(response => {
          console.log('Polygon saved successfully:', response.data);
        })
        .catch(error => {
          console.error('Error saving polygon:', error);
        });
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
