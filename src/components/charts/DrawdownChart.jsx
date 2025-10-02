import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { memo } from "react";

const DrawdownChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Drawdown Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Drawdown"
            stroke="#ef4444"
            fill="#fca5a5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(DrawdownChart);
