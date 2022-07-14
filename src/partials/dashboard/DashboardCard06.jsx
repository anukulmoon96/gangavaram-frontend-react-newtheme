import { FormControlUnstyledContext } from '@mui/base';
import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06(props) {


  const chartData = props.piechartData.length && {
    labels: [
        "Security Guard",
        "Security Intrusion"
    ],
    datasets: [
        {
            label: "Security",
            data: [
              props.piechartData[0].value,
              props.piechartData[1].value
            ],
            backgroundColor: [
                "#6366f1",
                "#3b82f6"
            ],
            hoverBackgroundColor: [
                "#4f46e5",
                "#3b82f6"
            ],
            hoverBorderColor: "#fff"
        }
    ]
};

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Security </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={props.piechartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            fill={props.piechartData.fill}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" />

        </PieChart>

    </div>
  );
}

export default DashboardCard06;
