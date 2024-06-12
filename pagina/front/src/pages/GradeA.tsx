import { useEffect, useState } from "react";
import { Projetos } from "../services";
import styled from "styled-components";
import { Grade } from "../types";



const GradeC: React.FC = () => {
  const [projetos, setProjetos] = useState<Grade[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await Projetos.gradeA();
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
      <Title>Grade de Atibaia</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* <GradeMap/> */}
      <StatsTable>
        <thead>
          <tr>
          <th>Responsável Grade(Analista)</th>
            <th>Total de Quadrados</th>
            <th>Quadrados Finalizados</th>
            <th>Quadrados Andamento</th>
            
          </tr>
        </thead>
        <tbody>
          {projetos.map((projeto, index) => (
            <tr key={index}>
              <td>{projeto.responsavel}</td>
              <td>{projeto.total}</td>
              <td>{projeto.finalizados}</td>
              <td>{projeto.andamento}</td>
              
            </tr>
          ))}
        </tbody>
      </StatsTable>
    </Container>
  );
};

export default GradeC;

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

