"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import SectionTitle from "./SectionTitle";
import { HiDotsVertical } from "react-icons/hi";

interface RadarChartData {
  metric: string;
  [artistName: string]: number | string;
}

interface RadarChartProps {
  data: RadarChartData[];
}

const CustomRadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const artistNames = Object.keys(data[0]).filter((key) => key !== "metric");

  return (
    <div className="rounded-lg bg-secondary border border-border center">
      <SectionTitle title="Top Artists" />
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          {artistNames.map((artistName, index) => (
            <Radar
              key={`radar-${index}`}
              name={artistName}
              dataKey={artistName}
              stroke={`var(--chart-color-${index + 1})`}
              fill={`var(--chart-color-${index + 1})`}
              fillOpacity={0.6}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomRadarChart;
