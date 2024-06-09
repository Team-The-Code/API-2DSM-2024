import React from 'react';
import { Bar } from 'react-chartjs-2';
import { GridsByProjectProps, GridsStatsChartProps } from '../types';
const GridsStatsChart: React.FC<GridsStatsChartProps> = ({ data }) => {
    // Extrair os dados necessários para o gráfico
    const projectNames = data.map((stat) => stat.name);
    const totalGrids = data.map((stat) => stat.total_grids);
    const finishedGrids = data.map((stat) => stat.finished_grids);
  
    // Dados do gráfico
    const chartData = {
      labels: projectNames,
      datasets: [
        {
          label: 'Total de Grades',
          data: totalGrids,
          backgroundColor: '#f99f48',
          borderWidth: 1,
        },
        {
          label: 'Grades Finalizadas',
          data: finishedGrids,
          backgroundColor: '#f56f04',
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return (
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  };
  
  export default GridsStatsChart;