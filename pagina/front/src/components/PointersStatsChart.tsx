import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PointersByProjectProps, PointersStatsChartProps } from '../types';


const PointersStatsChart: React.FC<PointersStatsChartProps> = ({ data }) => {
    const projectNames = data.map((stat) => stat.name);
    const totalPointers = data.map((stat) => stat.total_pointers);
    const finishedPointers = data.map((stat) => stat.finished_grids);
  
    const chartData = {
      labels: projectNames,
      datasets: [
        {
          label: 'Total de Ponteiros',
          data: totalPointers,
          backgroundColor: '#f99f48',
          borderWidth: 1,
        },
        {
          label: 'Ponteiros Finalizados',
          data: finishedPointers,
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
  
  export default PointersStatsChart;