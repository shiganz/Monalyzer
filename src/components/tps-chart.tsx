// components/TPSChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import useGetChainStats from "@/hooks/useGetChainStats";
import { CustomTooltipProps, TPSData } from "@/type";

export default function TPSChart() {
  const [data, setData] = useState<TPSData[]>([]);
  const {
    data: stats,
    error: TPSChartError,
    isError,
    isLoading,
  } = useGetChainStats();

  useEffect(() => {
    if (stats) {
      setData(prev => [
        ...prev.slice(-9),
        { timestamp: new Date().toLocaleTimeString(), tps: stats.tps },
      ]);
    }
  }, [stats]);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg">
        <div className="animate-pulse text-white">Loading TPS Chart...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg">
        <h1 className="text-red-500">Chart Error: {TPSChartError.message}</h1>
      </div>
    );
  }

  // Custom Tooltip for better styling
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
          <p className="text-white font-semibold">{`Time: ${label}`}</p>
          <p className="text-blue-400">{`TPS: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-4  tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Transactions Per Second (TPS)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="timestamp"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#374151" }}
            dy={24}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#374151" }}
            tickFormatter={value => `${value} TPS`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              color: "#ffffff",
              fontSize: "14px",
            }}
          />
          <Line
            type="monotone"
            dataKey="tps"
            stroke="url(#colorTps)"
            strokeWidth={3}
            activeDot={{
              r: 6,
              fill: "#ffffff",
              stroke: "#3b82f6",
              strokeWidth: 2,
            }}
            dot={false}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
