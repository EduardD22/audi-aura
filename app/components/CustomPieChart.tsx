"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import SectionTitle from "./SectionTitle";
import { HiDotsVertical } from "react-icons/hi";

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomPieChart: React.FC<PieChartProps> = ({ data }) => {
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  const formatLabel = (entry: any) => {
    const percentage = ((entry.value / totalValue) * 100).toFixed(0);
    return `${entry.name} (${percentage}%)`;
  };
  return (
    <div className="rounded-lg bg-secondary border border-border">
      <SectionTitle title="Top Genres" Icon={HiDotsVertical} />
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={formatLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
