import React, { useEffect } from 'react';
import L from 'leaflet';
import wellknown from 'wellknown';
import 'leaflet/dist/leaflet.css';

const GradeMap: React.FC = () => {
  // Função para adicionar WKB ao mapa Leaflet
  const addWKBToMap = (wkb: string, map: L.Map): void => {
    // Converter WKB para GeoJSON
    const geojson = wellknown.parse(wkb);

    // Adicionar GeoJSON ao mapa Leaflet
    L.geoJSON(geojson).addTo(map);
  }

  useEffect(() => {
    // Criar mapa Leaflet
    const map = L.map('map').setView([67.06614946567275, -126.50690025425232], 15);

    // Exemplo de WKB
    const wkb = '0103000000010000000500000000000000000000000000000000000000000000000000000000000000000000000000F03F000000000000F03F';

    // Adicionar um tile layer de exemplo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Adicionar WKB ao mapa
    addWKBToMap(wkb, map);
  }, []);

  return (
    <div id="map" style={{ height: "400px", width: "100%" }}></div>
  );
}

export default GradeMap;
