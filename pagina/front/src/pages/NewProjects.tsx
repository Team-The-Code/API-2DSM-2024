// src/pages/ProjectsPage.tsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Project } from "../types";
import DrawMap from "../components/DrawMap";
import Projetos from "../services/Projetos";

const ProjectsPage: React.FC = () => {
  const [projetos, setProjetos] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a lista de projetos

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
  // Função para tratar o clique do botã

  return (
    <Container>
      <Title>Cadastrar Novo Projeto</Title>
      <DrawMap/>

      <Title>Projetos Cadastrados</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StatsTable>
        <thead>
          <tr>
            <th>Numero do Projeto</th>
            <th>Nome do Projeto</th>
            <th>Área Total (km²)</th>
            <th>Ação</th> {/* Adicionando o cabeçalho para a coluna de ação */}
          </tr>
        </thead>
        <tbody>
          {projetos.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.nome}</td>
              <td>{project.tamanho}</td>
              <td>
                <Button>
                  Carregar Grade de {project.nome}
                </Button>
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
