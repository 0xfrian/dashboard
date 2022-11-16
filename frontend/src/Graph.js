// === Node Packages === 
import React from 'react';
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
import { Line } from 'react-chartjs-2';

// === ChartJS ===
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: "Monthly Spending",
            color: "black",
        },
    },
    scales: {
        x: {
            grid: {
                color: "black",
            },
            title: {
                display: true,
                text: "Month",
                color: "black",
            },
            ticks: {
                color: "black",
            }
        },
        y: {
            grid: {
                color: "black",
            },
            title: {
                display: true,
                text: "Spending",
                color: "black",
            },
            ticks: {
                color: "black",
            }
        },
    },
};

const labels = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August",
    "September", "October", "November", "December",
];

const datasets = [
    { 
        label: "",
        borderColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
];

const data = {
    labels,
    datasets,
};

function Graph() {
    return (
      <div className="graph-container silver shadow border">
          <h2 className="section-heading">
              Graph
          </h2>
          <Line options={options} data={data} />
      </div>
    );
}

export default Graph;

