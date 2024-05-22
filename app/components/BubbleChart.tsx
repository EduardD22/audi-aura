"use client";

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SectionTitle from "./SectionTitle";
import { HiDotsVertical } from "react-icons/hi";

interface BubbleChartProps {
  data: {
    id: string;
    title: string;
    artist: string;
    energy: number;
    valence: number;
    popularity: number;
  }[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { title, artist, energy, valence, popularity } = payload[0].payload;
      return (
        <div className="bg-secondary p-4 shadow rounded text-text">
          <h3 className="font-bold">{title}</h3>
          <p>Artist: {artist}</p>
          <p>Energy: {energy.toFixed(2)}</p>
          <p>Valence: {valence.toFixed(2)}</p>
          <p>Popularity: {popularity}</p>
        </div>
      );
    }
    return null;
  };

  // Color scale based on valence
  const getColor = (valence: number) => {
    const coldColor = [87, 117, 144];
    const warmColor = [220, 53, 69];

    const interpolate = (a: number, b: number, t: number) => {
      return a + (b - a) * t;
    };

    const rgb = [
      interpolate(coldColor[0], warmColor[0], valence),
      interpolate(coldColor[1], warmColor[1], valence),
      interpolate(coldColor[2], warmColor[2], valence),
    ];

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };

  return (
    <div className="rounded-lg bg-secondary border border-border">
      <SectionTitle title="Song Bubble Chart" Icon={HiDotsVertical} />
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis
            type="number"
            dataKey="energy"
            name="Energy"
            unit=""
            tick={{ fontSize: 12, fill: "var(--text-opacity)" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="valence"
            name="Valence"
            unit=""
            tick={{ fontSize: 12, fill: "var(--text-opacity)" }}
            tickLine={false}
            axisLine={false}
          />
          <ZAxis type="number" dataKey="popularity" range={[100, 1000]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
          />
          <Scatter name="Songs" data={data}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(entry.valence)}
                stroke="var(--text)"
                strokeWidth={2}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;
