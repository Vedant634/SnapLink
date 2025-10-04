import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
 
  const labels = graphData?.map((item) => item.clickDate);
  const userPerDaya = graphData?.map((item) => item.count);

  const data = {
    labels:
      graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
          graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
          graphData.length > 0 ? "#4f46e5" : "rgba(79, 70, 229, 0.1)", 
        borderRadius: 8,
        barThickness: 30,
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#1f2937", 
          font: {
            family: "Arial",
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#f9fafb",
        titleColor: "#111827", 
        bodyColor: "#374151", 
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4b5563", 
          callback: function (value) {
            return Number.isInteger(value) ? value.toString() : "";
          },
        },
        grid: {
          color: "rgba(209, 213, 219, 0.2)", 
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: "#111827", 
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          color: "#4b5563", 
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Date",
          color: "#111827",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[360px] sm:h-[500px] px-2 sm:px-6 py-4 bg-white rounded-2xl shadow-md border border-gray-200">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
