import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridsByProjectProps } from '../types';
import { Stats } from '../services';
import GridsStatsChart from '../components/GridsStatsChart';
import html2pdf from 'html2pdf.js';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<GridsByProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof GridsByProjectProps; direction: 'ascending' | 'descending' } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await Stats.gridsByProject();
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

  const requestSort = (key: keyof GridsByProjectProps) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedStats = React.useMemo(() => {
    let sortableStats = [...stats];
    if (sortConfig !== null) {
      sortableStats.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStats;
  }, [stats, sortConfig]);

  const getSortIndicator = (key: keyof GridsByProjectProps) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return null;
  };

  return (
    <Container>
      <Title>Grades por Projeto</Title>
      <div id="printable-content">
        <GridsStatsChartWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {stats.length > 0 && <GridsStatsChart data={stats} />}
        </GridsStatsChartWrapper>
        <StatsTableWrapper>
          <StatsTable>
            <thead>
              <tr>
                <th><button onClick={() => requestSort('name')}>Nome do Projeto {getSortIndicator('name')}</button></th>
                <th><button onClick={() => requestSort('total_grids')}>Total de Grades {getSortIndicator('total_grids')}</button></th>
                <th><button onClick={() => requestSort('finished_grids')}>Grades Finalizadas {getSortIndicator('finished_grids')}</button></th>
                <th><button onClick={() => requestSort('total_area')}>Área Total (km²) {getSortIndicator('total_area')}</button></th>
                <th><button onClick={() => requestSort('finished_area')}>Área Finalizada (km²) {getSortIndicator('finished_area')}</button></th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((stat) => (
                <tr key={stat.idproject}>
                  <td>{stat.name}</td>
                  <td>{stat.total_grids}</td>
                  <td>{stat.finished_grids}</td>
                  <td>{stat.total_area}</td>
                  <td>{stat.finished_area}</td>
                </tr>
              ))}
            </tbody>
          </StatsTable>
        </StatsTableWrapper>
      </div>
      <div className="end_button">
        <section className="actions">
          <button onClick={handlePrintContent}>Imprimir Conteúdo</button>
        </section>
      </div>
    </Container>
  );
};

export default StatsPage;

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  margin-left: 18%;
  margin-top: 7%;
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

  th button {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: inherit;
    padding: 0;
    text-align: center;
    width: 100%;
  }

  th button:hover {
    text-decoration: underline;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const GridsStatsChartWrapper = styled.div`
  margin-bottom: 30px;
`;

const StatsTableWrapper = styled.div`
  overflow-x: auto;
`;
