import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./chart.css";

// Format date
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

// Calculate month-on-month returns
const calculateMonthlyReturns = (data) => {
  if (!data || data.length === 0) return [];
  const monthlyReturns = [];
  let prevNAV = data[0].NAV;
  data.forEach((row, index) => {
    const ret = index > 0 ? ((row.NAV - prevNAV) / prevNAV) * 100 : 0;
    monthlyReturns.push({
      date: formatDate(row.Date),
      Equity: row.NAV, // Changed NAV to Equity
      return: parseFloat(ret.toFixed(2)),
    });
    prevNAV = row.NAV;
  });
  return monthlyReturns;
};

function EquityCurveChart({ data }) {
  console.log(data, "data");
  if (!data || data.length === 0) return <p>No data available</p>;

  // Calculate drawdown and monthly returns
  let peak = data[0].NAV;
  const chartData = calculateMonthlyReturns(data).map((row) => {
    const equityValue = row.Equity;
    if (equityValue > peak) peak = equityValue;
    const drawdown = ((equityValue - peak) / peak) * 100;
    return {
      ...row,
      drawdown: parseFloat(drawdown.toFixed(2)),
    };
  });

  return (
    <div className="chart_wrapper">
      <ResponsiveContainer>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            label={{
              value: "Equity / Drawdown (%)", // Updated label
              angle: -90,
              position: "insideLeft",
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Monthly Return (%)",
              angle: 90,
              position: "insideRight",
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name) =>
              name === "Equity" ? [`₹${value}`, name] : [`${value}%`, name]
            }
          />
          <Legend verticalAlign="top" height={36} />

          <Bar
            yAxisId="right"
            dataKey="return"
            fill="#82ca9d"
            name="Monthly Return (%)"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Equity"
            stroke="#002345"
            strokeWidth={2}
            dot={false}
            name="Equity"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="drawdown"
            stroke="#ff4d4f"
            strokeWidth={2}
            dot={false}
            name="Drawdown (%)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EquityCurveChart;
