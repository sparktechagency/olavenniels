import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Select } from 'antd';
const months = [
  { month: 'Jan', active: 5 },
  { month: 'Feb', active: 8 },
  { month: 'Mar', active: 12 },
  { month: 'Apr', active: 5 },
  { month: 'May', active: 18 },
  { month: 'Jun', active: 2 },
  { month: 'Jul', active: 25 },
  { month: 'Aug', active: 25 },
  { month: 'Sep', active: 8 },
  { month: 'Oct', active: 12 },
  { month: 'Nov', active: 15 },
  { month: 'Dec', active: 18 },
];

function UserGrowthChart() {
  const [year, setYear] = useState('2025');
  const handleSelectChange = (value) => {
    setYear(value);
  };
  return (
    <div className="w-full h-[350px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[var(--font-color)] font-bold mb-4">User Growth</h1>
        <Select defaultValue={year} style={{ width: 120 }} onChange={handleSelectChange}>
          <Select.Option value="2025">2025</Select.Option>
          <Select.Option value="2024">2024</Select.Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={months}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            width={40}
            radius={[4, 4, 0, 0]}
            dataKey="active"
            fill="var(--secondary-color)"
            name="User Growth"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserGrowthChart;
