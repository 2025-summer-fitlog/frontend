import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const DailyView = ({ dailyData, workouts, onWorkoutChange, onStatusChange, onAddWorkout }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [newWorkout, setNewWorkout] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('○');

  useEffect(() => {
    if (!dailyData || !dailyData.workouts || dailyData.workouts.length === 0) return;

    const totalScore = dailyData.workouts.reduce((acc, cur) => acc + cur.score, 0);
    const averageScore = Math.round(totalScore / dailyData.workouts.length);

    const data = {
      labels: ['평균 점수', '남은 점수'],
      datasets: [
        {
          data: [averageScore, 100 - averageScore],
          backgroundColor: ['#9ADBF6', '#E5E5E5'],
          borderWidth: 1
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      cutout: '70%'
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data,
      options
    });
  }, [dailyData]);

  const handleAddWorkout = () => {
    if (!newWorkout.trim()) return;
    onAddWorkout(newWorkout.trim(), selectedStatus);
    setNewWorkout('');
    setSelectedStatus('○');
  };

  return (
    <div className="daily-container">
      <canvas ref={chartRef} width="300" height="300"></canvas>
      <p className="score-text">평균 점수: {dailyData?.averageScore ?? '-'}점</p>
    </div>
  );
};

export default DailyView;
