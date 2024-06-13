import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RevisorProps } from '../types';
import html2pdf from 'html2pdf.js';
import RevisorChart from '../components/RevisorChart';
import editor from '../services/editor';

const RevisorPage: React.FC = () => {
    const [revisor1, setRevisor] = useState<RevisorProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof RevisorProps; direction: 'ascending' | 'descending' } | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await editor.tarefaRevisor();
                if ('erro' in response) {
                    setError(response.erro);
                } else {
                    setRevisor(response);
                }
            } catch (err) {
                setError('Failed to fetch data');
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

    const requestSort = (key: keyof RevisorProps) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof RevisorProps) => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return null;
    };

    const sortedRevisor = [...revisor1];
    if (sortConfig !== null) {
        sortedRevisor.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    return (
        <Container>
            <Title>Mapeamento por Projeto</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {revisor1.length > 0 && <RevisorChart data={revisor1} />}
            <div id="printable-content">
                <RevisorTable>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={() => requestSort('validated_count')}>
                                    Validadas {getSortIndicator('validated_count')}
                                </button>
                            </th>
                            <th>
                                <button onClick={() => requestSort('in_progress_count')}>
                                    Em Progresso {getSortIndicator('in_progress_count')}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRevisor.map((revisor, index) => (
                            <tr key={index}>
                                <td>{revisor.validated_count}</td>
                                <td>{revisor.in_progress_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </RevisorTable>
            </div>
            <div className="end_button">
                <section className="actions">
                    <button onClick={handlePrintContent}>Imprimir Conteúdo</button>
                </section>
            </div>
        </Container>
    );
};

export default RevisorPage;

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

const RevisorTable = styled.table`
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
