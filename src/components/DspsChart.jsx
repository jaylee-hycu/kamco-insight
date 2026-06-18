import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#60a5fa', '#34d399', '#f59e0b', '#f87171', '#a78bfa', '#fb923c', '#38bdf8', '#4ade80']

export default function DspsChart({ data }) {
  const total = data.reduce((sum, d) => sum + Number(d.cnt), 0)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="cnt"
          nameKey="dsps_div_nm"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }}
          labelStyle={{ color: '#e5e7eb' }}
          formatter={(v, name) => [
            `${Number(v).toLocaleString()}건 (${(Number(v) / total * 100).toFixed(1)}%)`,
            name
          ]}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#9ca3af', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
