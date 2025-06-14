'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

export default function TradingChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Simplified data generation
      const labels = Array.from({ length: 100 }, (_, i) => new Date(Date.now() - (100 - i) * 3600000));
      let lastValue = 100;
      const data = labels.map(() => {
        lastValue = lastValue * (0.998 + Math.random() * 0.004);
        return lastValue;
      });

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data,
            borderColor: 'rgba(74, 222, 128, 0.7)',
            borderWidth: 1.5,
            fill: false,
            tension: 0.1,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { x: { display: false }, y: { display: false } },
          plugins: { legend: { display: false } },
          interaction: {
            mode: 'index',
            intersect: false
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} className="h-full w-full" />;
}