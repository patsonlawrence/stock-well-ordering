"use client";
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell,
} from 'recharts';

type DashboardData = {
  totalCustomersVisitors: Array<{ month: string; visitors: number; transactions: number }>;
  salesByDivision: Array<{ division: string; sales: number }>;
  averagePriceAndUnits: Array<{ month: string; price_per_transaction: number; units_per_transaction: number }>;
  salesByCity: Array<{ city: string; percentage: number }>;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch('/api/dashboardProcurement')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF5', '#FF6384'];

  return (
    <div>
      <h1>Retail KPI Dashboard</h1>
      
      <div>
        <h2>Total Customers & Visitors</h2>
        <BarChart width={600} height={300} data={data.totalCustomersVisitors}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visitors" fill="#8884d8" />
          <Bar dataKey="transactions" fill="#82ca9d" />
        </BarChart>
      </div>

      <div>
        <h2>Sales by Division</h2>
        <BarChart width={500} height={300} data={data.salesByDivision}>
          <XAxis dataKey="division" />
          <YAxis />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>

      <div>
        <h2>Average Price & Units per Transaction</h2>
        <LineChart width={600} height={300} data={data.averagePriceAndUnits}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price_per_transaction" stroke="#8884d8" />
          <Line type="monotone" dataKey="units_per_transaction" stroke="#82ca9d" />
        </LineChart>
      </div>

      <div>
        <h2>Sales by City</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data.salesByCity}
            dataKey="percentage"
            nameKey="city"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.salesByCity.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
