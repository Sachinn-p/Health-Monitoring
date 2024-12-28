import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [reminders, setReminders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ type: "", time: "" });

  const addReminder = () => {
    setReminders([...reminders, newReminder]);
    setModalOpen(false);
    setNewReminder({ type: "", time: "" });
  };


  //API 

  // Dummy sensor data for individual graphs
  const timeLabels = ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];
  const temperatureData = [36.5, 36.7, 36.6, 36.8, 36.9, 36.7];
  const spo2Data = [97, 98, 96, 97, 98, 99];
  const heartRateData = [72, 74, 71, 73, 75, 72];

  const createChartData = (label, data, color) => ({
    labels: timeLabels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Health Monitoring Dashboard</h1>
      </header>

      {/* Graph Section */}
      <div className="mt-6 flex flex-wrap justify-center space-x-4">
        {/* Temperature Graph */}
        <div className="inline-flex flex-col bg-white p-4 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-bold mb-4">Temperature (°C)</h2>
          <Line
            data={createChartData("Temperature", temperatureData, "rgba(75, 192, 192, 1)")}
            options={chartOptions}
          />
          <p className="mt-4 text-sm">
            <span className="text-green-600 font-bold">Safe:</span> 36.1°C - 37.2°C <br />
            <span className="text-red-600 font-bold">Risk:</span> Above 38°C or below 35°C
          </p>
        </div>

        {/* SPO2 Graph */}
        <div className="inline-flex flex-col bg-white p-4 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-bold mb-4">SPO2 (%)</h2>
          <Line
            data={createChartData("SPO2", spo2Data, "rgba(255, 99, 132, 1)")}
            options={chartOptions}
          />
          <p className="mt-4 text-sm">
            <span className="text-green-600 font-bold">Safe:</span> 95% - 100% <br />
            <span className="text-red-600 font-bold">Risk:</span> Below 90%
          </p>
        </div>

        {/* Heart Rate Graph */}
        <div className="inline-flex flex-col bg-white p-4 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-bold mb-4">Heart Rate (bpm)</h2>
          <Line
            data={createChartData("Heart Rate", heartRateData, "rgba(54, 162, 235, 1)")}
            options={chartOptions}
          />
          <p className="mt-4 text-sm">
            <span className="text-green-600 font-bold">Safe:</span> 60 - 100 bpm <br />
            <span className="text-red-600 font-bold">Risk:</span> Above 120 bpm or below 50 bpm
          </p>
        </div>
      </div>

      {/* Reminder Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Reminders</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            + Add Reminder
          </button>
        </div>
        <ul className="mt-4">
          {reminders.map((reminder, idx) => (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow-lg mt-2 flex justify-between items-center"
            >
              <span>
                {reminder.type} at {reminder.time}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() =>
                  setReminders(reminders.filter((_, index) => index !== idx))
                }
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Reminder Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Reminder</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Type</label>
              <select
                className="mt-1 p-2 w-full border rounded-lg"
                value={newReminder.type}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="Physiotherapy">Physiotherapy</option>
                <option value="Water Intake">Water Intake</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Time</label>
              <input
                type="time"
                className="mt-1 p-2 w-full border rounded-lg"
                value={newReminder.time}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, time: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={addReminder}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
