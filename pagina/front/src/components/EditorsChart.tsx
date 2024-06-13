import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import  {EditorChartProps } from '../types';



const EditorChart: React.FC<EditorChartProps> = ({ data }) => {
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById('editorsChart') as HTMLCanvasElement;
      if (ctx) {
        const chartData = {
          labels: data.map((edit) => edit.name),
          datasets: [
            {
              label: 'Quantidade de Mapeamento',
              data: data.map((edit) => edit.total_grids),
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

  return <canvas id="editorsChart" />;
};

export default EditorChart;
