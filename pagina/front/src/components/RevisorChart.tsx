import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import  {RevisorChartProps } from '../types';



const RevisorChart: React.FC<RevisorChartProps> = ({ data }) => {
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById('revisorChart') as HTMLCanvasElement;
      if (ctx) {
        const chartData = {
          labels: data.map((edit) => edit.user_revisor),
          datasets: [
            {
              label: 'Area Validada',
              data: data.map((edit) => edit.validated_count),
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

  return <canvas id="revisorChart" />;
};

export default RevisorChart;
