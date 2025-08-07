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
  { month: 'Jan', users: 500 },
  { month: 'Feb', users: 650 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 950 },
  { month: 'May', users: 1100 },
  { month: 'Jun', users: 1300 },
  { month: 'Jul', users: 1500 },
  { month: 'Aug', users: 1700 },
  { month: 'Sep', users: 1900 },
  { month: 'Oct', users: 2100 },
  { month: 'Nov', users: 2300 },
  { month: 'Dec', users: 2500 },
];

function SubscriptionGrowth() {
  const [year, setYear] = useState('2025');
  const handleSelectChange = (value) => {
    setYear(value);
  };
  return (
    <div className="w-full h-[350px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[var(--font-color)] font-bold mb-4">Subscription Growth</h1>
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
          syncId="anyId"
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
            dataKey="users"
            stroke="var(--primary-color)"
            fill="var(--secondary-color)"
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubscriptionGrowth;
