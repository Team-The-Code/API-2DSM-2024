import { useEffect, useState } from "react";
import { Projetos } from "../services";
import styled from "styled-components";
import { Projects } from "../types";
// import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
// import api from "../services/api";
import { Link } from "react-router-dom";

const ProjectsPage: React.FC = () => {
  const [projetos, setProjetos] = useState<Projects[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // const onCreated = async (e: any) => {
  //   const { layerType, layer } = e;
  //   if (layerType === 'polygon') {
  //     const coordinates = layer.getLatLngs()[0].map((coord: any) => [coord.lng, coord.lat]);
  //     const geomGeoJSON = {
  //       type: "Polygon",
  //       coordinates: [coordinates]
  //     };

  //     try {
  //       const response = await api.post('/projetos', { geom: geomGeoJSON });
  //       console.log('Polygon saved successfully:', response.data);
  //     } catch (error) {
  //       console.error('Error saving polygon:', error);
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchStats = async () => {
      const response = await Projetos.limitProjects();
      if ('erro' in response) {
        setError(response.erro);
      } else {
        setProjetos(response);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container>
      {/* <Title>Cadastrar Novo Projeto</Title>
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
      </MapContainer> */}
      <Title>Projetos Cadastrados</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StatsTable>
        <thead>
          <tr>
            <th>Numero do Projeto</th>
            <th>Nome da Cidade</th>
            <th>Area Total (km²)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projetos.map((projeto, index) => (
            <tr key={index}>
              <td>{projeto.id}</td>
              <td>{projeto.nome}</td>
              <td>{projeto.tamanho}</td>
              <td>
                <LinkStyled className="link" to={`/projetos/${projeto.nome}`}><Button>Carregar Grade de {projeto.nome}</Button></LinkStyled>
              </td>
            </tr>
          ))}
        </tbody>
      </StatsTable>
    </Container>
  );
};

export default ProjectsPage;

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  margin-left: 18%;
  margin-top: 7%;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  th,
  td {
    padding: 10px 15px;
    border-bottom: 1px solid #eaeaea;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #ff6900;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  

  &:hover {
    background-color: #e55d00;
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
`;
