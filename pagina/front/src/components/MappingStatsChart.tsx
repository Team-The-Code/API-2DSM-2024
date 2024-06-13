import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import  { BarChartProps } from '../types';



const MappingStatsChart: React.FC<BarChartProps> = ({ data }) => {
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById('mappingChart') as HTMLCanvasElement;
      if (ctx) {
        const chartData = {
          labels: data.map((stat) => stat.name),
          datasets: [
            {
              label: 'Quantidade de Mapeamento',
              data: data.map((stat) => stat.total_changes),
              backgroundColor: '#f99f48',
              borderColor: '#f69100',
              borderWidth: 1,
            },
          ],
        };

        const newChart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        setChart(newChart);
      }
    }
  }, [data]);

  return <canvas id="mappingChart" />;
};

export default MappingStatsChart;
