import React, { memo, useState } from 'react';
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
import years from './helperYears';
import { useGetUserGrowthQuery } from '../../../../Redux/Apis/service/statusApis';

function UserGrowthChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, isLoading } = useGetUserGrowthQuery(year)
  const handleSelectChange = (value) => {
    setYear(value);
  };
  if (isLoading) {
    return <div className='w-full h-[350px] bg-[var(--primary-color)]' />
  }
  return (
    <div className="w-full h-[350px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[var(--font-color)] font-bold mb-4">User Growth</h1>
        <Select defaultValue={year} style={{ width: 120 }} onChange={handleSelectChange}>
          {Array.isArray(years) && years.map((year) => (
            <Select.Option key={year} value={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data?.monthlyGrowth}
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
            dataKey="count"
            fill="var(--secondary-color)"
            name="User Growth"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(UserGrowthChart);
