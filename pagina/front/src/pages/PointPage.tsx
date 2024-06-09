import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PointersByProjectProps, ErrorProps } from '../types';
import { Stats } from '../services';
import PointersStatsChart from '../components/PointersStatsChart';
import html2pdf from 'html2pdf.js';


const PointersStatsPage: React.FC = () => {
  const [stats, setStats] = useState<PointersByProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await Stats.pointersByProject();
      if ('erro' in response) {
        setError(response.erro);
      } else {
        setStats(response);
      }
    };

    fetchStats();
  }, []);
  const handlePrintContent = () => {
    const element = document.getElementById('printable-content');
    if (element) {
      const opt = {
        margin: 1,
        filename: 'relatorio.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }
  };


  return (
    <Container>
    <Title>Estatísticas de Apontamentos por Projeto</Title>
    {error && <ErrorMessage>{error}</ErrorMessage>}
    {stats.length > 0 && <PointersStatsChart data={stats} />}
    <StatsTable>
      <thead>
        <tr>
          <th>Nome do Projeto</th>
          <th>Quantidade de Apontamentos</th>
          <th>Apontamentos Finalizados</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) => (
          <tr key={stat.idproject}>
            <td>{stat.name}</td>
            <td>{stat.total_pointers}</td>
            <td>{stat.finished_pointers}</td>
          </tr>
        ))}
      </tbody>
    </StatsTable>
    <div className="end_button">
        <section className="actions">
          <button onClick={handlePrintContent}>Imprimir Conteúdo</button>
        </section>
      </div>
    </Container>
  );
};

export default PointersStatsPage;

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  margin-left:18%;
  margin-top:7%;
    .actions button {
    background-color: #ff6900; /* Cor laranja */
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    border-radius: 5px;
  }

  .actions button:hover {
    background-color: #ff8c00; /* Cor laranja mais escura para o hover */
  }
`;


const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
