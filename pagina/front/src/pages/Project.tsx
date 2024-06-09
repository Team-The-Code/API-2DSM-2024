import React from 'react';
import styled from 'styled-components';
import DrawMap from '../components/Delimit';

const ProjectAreaPage: React.FC = () => {
  return (
    <Container>
      <Title>Delimitar Área do Projeto</Title>
      <DrawMapWrapper>
        <DrawMap/>
      </DrawMapWrapper>
    </Container>
  );
};

export default ProjectAreaPage;

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  margin-left:18%;
  margin-top:7%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const DrawMapWrapper = styled.div`
  height: 500px;
  margin-bottom: 30px;
`;