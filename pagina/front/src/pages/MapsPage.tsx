import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MappingByProjectProps } from '../types';
import { Stats } from '../services';
import MappingStatsChart from '../components/MappingStatsChart';
import html2pdf from 'html2pdf.js';

const MappingStatsPage: React.FC = () => {
    const [stats, setStats] = useState<MappingByProjectProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof MappingByProjectProps; direction: 'ascending' | 'descending' } | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const response = await Stats.mappingByProject();
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

    const requestSort = (key: keyof MappingByProjectProps) => {
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

    const getSortIndicator = (key: keyof MappingByProjectProps) => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return null;
    };

    return (
        <Container>
            <Title>Mapeamento por Projeto</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {stats.length > 0 && <MappingStatsChart data={stats} />}
            <StatsTable>
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => requestSort('name')}>
                                Nome do Projeto {getSortIndicator('name')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('total_changes')}>
                                Quantidade de Mapeamento {getSortIndicator('total_changes')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('area_changes')}>
                                Área Mapeada (km²) {getSortIndicator('area_changes')}
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedStats.map((stat) => (
                        <tr key={stat.idproject}>
                            <td>{stat.name}</td>
                            <td>{stat.total_changes}</td>
                            <td>{stat.area_changes.toFixed(2)}</td>
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

export default MappingStatsPage;

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
