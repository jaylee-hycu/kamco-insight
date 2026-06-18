import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" />
        <XAxis dataKey="yr" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
        <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }}
          tickFormatter={v => v.toLocaleString()} />
        <Tooltip
          contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }}
          labelStyle={{ color: '#e5e7eb' }}
          itemStyle={{ color: '#60a5fa' }}
          formatter={v => [`${v.toLocaleString()}건`, '매각건수']}
        />
        <Line type="monotone" dataKey="cnt" stroke="#60a5fa" strokeWidth={2}
          dot={{ fill: '#60a5fa', r: 3 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
