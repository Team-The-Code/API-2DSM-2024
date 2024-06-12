import * as wkx from 'wkx';

interface GeoJSON {
    type: string;
    coordinates: number[][] | number[][][]; // Atualizado para lidar com polígonos também
}

const wkbHex = '0106000020EF7C00000100000001030000000100000009000000DA14D31D168115418C4E36FC43675C41D08DEA52EB7F1541425AD5392F675C41902BBF5EE17E1541B3368C9222675C414B02086BD77D154118C93DEB15675C41BC6C27918D7D1541AEB7BC4506675C41EC751196627D154107503E5001675C41EC751196627D154148171F7F63675C4110269F9A1981154148171F7F63675C41DA14D31D168115418C4E36FC43675C41';

const wkbBuffer = Buffer.from(wkbHex, 'hex');
const geometry = wkx.Geometry.parse(wkbBuffer);

if (geometry) {
  const geoJSON: GeoJSON = geometry.toGeoJSON() as GeoJSON; // Aqui usamos 'as GeoJSON' para garantir que o tipo seja GeoJSON
  console.log('Tipo de geometria:', geoJSON.type); // Exibe o tipo de geometria
  console.log('Coordenadas:', geoJSON.coordinates); // Exibe as coordenadas de latitude e longitude em formato GeoJSON
} else {
  console.error('Falha ao analisar a geometria.');
}
