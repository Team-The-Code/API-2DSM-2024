import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import Projetos from '../services/Projetos';
import { Quadrado, ErrorProps } from '../types';
import { LatLngExpression } from 'leaflet';

const isCoordinateValid = (coord: number[]): boolean => {
  const [longitude, latitude] = coord;
  return (
    typeof longitude === 'number' &&
    typeof latitude === 'number' &&
    longitude >= -180 && longitude <= 180 &&
    latitude >= -90 && latitude <= 90
  );
};

const GradeMap: React.FC = () => {
  const [error, setError] = useState<any | null>(null);
  const [gradeData, setGradeData] = useState<Quadrado[] | ErrorProps>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Projetos.gradeA();
        if ('error' in response) {
          setError(response.error);
        } else {
          setGradeData(response);
        }
      } catch (error) {
        setError('Error fetching grade data.');
      }
    };

    fetchData();
  }, []);

  const processCoordinates = (coordinates: number[][]) => {
    return coordinates.filter(isCoordinateValid).map((coord: number[]) => {
      return [coord[1], coord[0]] as LatLngExpression; // [latitude, longitude]
    });
  };

  return (
    <MapContainer center={[0, 0]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        attribution='&copy; OpenStreetMap contributors'
      />
      <FeatureGroup>
        {error && <div>{error}</div>}
        {Array.isArray(gradeData) && gradeData.map((item, index) => (
          <Polygon
            key={index}
            positions={processCoordinates(item.coordinates)}
          />
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default GradeMap;
