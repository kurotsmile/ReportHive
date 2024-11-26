//npm install chart.js react-chartjs-2

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Đăng ký các thành phần Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TrendChart = ({ data }) => {
    const chartData = {
        labels: data.labels, // Ví dụ: ['Week 1', 'Week 2', 'Week 3']
        datasets: [
            {
                label: 'Revenue',
                data: data.revenue, // Dữ liệu doanh thu: [1000, 1500, 2000]
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: true,
            },
            {
                label: 'Build Quantity',
                data: data.buildQuantity, // Dữ liệu sản lượng: [50, 80, 120]
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Trend Chart (Revenue vs Build Quantity)',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default TrendChart;
