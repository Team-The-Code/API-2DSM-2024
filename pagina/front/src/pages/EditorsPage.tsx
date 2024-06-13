import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EditorProps} from '../types';
import html2pdf from 'html2pdf.js';
import EditorChart from '../components/EditorsChart';
import editor from '../services/editor';

const EditorsPage: React.FC = () => {
    const [editor1, setEditor1] = useState<EditorProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof EditorProps; direction: 'ascending' | 'descending' } | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const response = await editor.tarefaEditor();
            if ('erro' in response) {
                setError(response.erro);
            } else {
                setEditor1(response);
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

    const requestSort = (key: keyof EditorProps) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedEditor = React.useMemo(() => {
        let sortableEditor = [...editor1];
        if (sortConfig !== null) {
            sortableEditor.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableEditor;
    }, [editor1, sortConfig]);

    const getSortIndicator = (key: keyof EditorProps) => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return null;
    };

    return (
        <Container>
            <Title>Mapeamento por Projeto</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {editor1.length > 0 && <EditorChart data={editor1} />}
            <EditorTable>
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => requestSort('name')}>
                                Nome do Projeto {getSortIndicator('name')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('total_grids')}>
                                Grades {getSortIndicator('total_grids')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('validated_grids')}>
                               Grades Validadas{getSortIndicator('validated_grids')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('finished_grids')}>
                               Grades Validadas{getSortIndicator('finished_grids')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('finished_area')}>
                                Grades Finalizadas {getSortIndicator('finished_area')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('total_area')}>
                                Área total {getSortIndicator('total_area')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('editor_id')}>
                                Editor {getSortIndicator('editor_id')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() => requestSort('finish_count')}>
                                Total {getSortIndicator('finish_count')}
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEditor.map((edit) => (
                        <tr key={edit.idproject}>
                            <td>{edit.name}</td>
                            <td>{edit.total_grids}</td>
                            <td>{edit.finished_grids}</td>
                            <td>{edit.validated_grids}</td>
                            <td>{edit.finished_area}</td>
                            <td>{edit.total_area}</td>
                            <td>{edit.editor_id}</td>
                            <td>{edit.finish_count.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </EditorTable>
            <div className="end_button">
                <section className="actions">
                    <button onClick={handlePrintContent}>Imprimir Conteúdo</button>
                </section>
            </div>
        </Container>
    );
};

export default EditorsPage;

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

const EditorTable = styled.table`
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
