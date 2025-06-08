import React from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const chartColors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center w-full max-w-xs min-w-[220px] mx-auto border border-blue-100 hover:shadow-lg transition-shadow duration-200">
    <h4 className="text-lg font-semibold text-blue-700 mb-1 text-center" style={{marginBottom: 0}}>{title}</h4>
    <div style={{marginTop: 0, width: '100%'}}>{children}</div>
  </div>
);

const AnalyticsCharts = ({ data }) => {
  const totalClicks = data?.totalClicks ?? 0;
  const deviceStats = data?.deviceStats ?? {};
  const browserStats = data?.browserStats ?? {};
  const locationStats = data?.locationStats ?? {};
  const sourceStats = data?.sourceStats ?? {};

  return (
    <div className="w-full flex flex-wrap justify-center gap-6 py-2">
      <Card title="Total Clicks">
        <div className="text-4xl font-bold text-center text-blue-600 my-2">{totalClicks}</div>
      </Card>
      <Card title="Device">
        <Pie
          data={{
            labels: Object.keys(deviceStats),
            datasets: [{ data: Object.values(deviceStats), backgroundColor: chartColors }],
          }}
          options={{ plugins: { legend: { position: "bottom" } }, maintainAspectRatio: false }}
          height={180}
        />
      </Card>
      <Card title="Browser">
        <Doughnut
          data={{
            labels: Object.keys(browserStats),
            datasets: [{ data: Object.values(browserStats), backgroundColor: chartColors }],
          }}
          options={{ plugins: { legend: { position: "bottom" } }, cutout: "70%", maintainAspectRatio: false }}
          height={180}
        />
      </Card>
      <Card title="Location">
        <div className="w-full h-40">
          <Bar
            data={{
              labels: Object.keys(locationStats),
              datasets: [{ label: "Clicks", data: Object.values(locationStats), backgroundColor: "#36A2EB" }],
            }}
            options={{
              indexAxis: "y",
              plugins: { legend: { display: false } },
              scales: { x: { beginAtZero: true } },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </Card>
      <Card title="Source">
        <div className="w-full flex justify-center" style={{marginTop: 0}}>
          <Pie
            data={{
              labels: Object.keys(sourceStats),
              datasets: [{ data: Object.values(sourceStats), backgroundColor: chartColors }],
            }}
            options={{ plugins: { legend: { position: "bottom" } }, maintainAspectRatio: false }}
            height={140}
            width={140}
          />
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
