import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Select } from 'antd';
const data = [
  { month: 'Jan', earnings: 500 },
  { month: 'Feb', earnings: 650 },
  { month: 'Mar', earnings: 800 },
  { month: 'Apr', earnings: 950 },
  { month: 'May', earnings: 1100 },
  { month: 'Jun', earnings: 1300 },
  { month: 'Jul', earnings: 1500 },
  { month: 'Aug', earnings: 1700 },
  { month: 'Sep', earnings: 1900 },
  { month: 'Oct', earnings: 2100 },
  { month: 'Nov', earnings: 2300 },
  { month: 'Dec', earnings: 2500 },
];

function EarningGrowth() {
  const [year, setYear] = useState('2025');
  const handleSelectChange = (value) => {
    setYear(value);
  };
  return (
    <div className="w-full  h-[350px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[var(--font-color)] font-bold mb-4">Earning Growth</h1>
        <Select defaultValue={year} style={{ width: 120 }} onChange={handleSelectChange}>
          <Select.Option value="2025">2025</Select.Option>
          <Select.Option value="2024">2024</Select.Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={350}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="earnings"
            stroke="var(--primary-color)"
            fill="var(--secondary-color)"
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EarningGrowth;
