import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function formatAmt(v) {
  if (v >= 1e12) return `${(v / 1e12).toFixed(1)}조`
  if (v >= 1e8) return `${(v / 1e8).toFixed(0)}억`
  return v.toLocaleString()
}

export default function AmountChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" />
        <XAxis dataKey="yr" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
        <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }}
          tickFormatter={formatAmt} />
        <Tooltip
          contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }}
          labelStyle={{ color: '#e5e7eb' }}
          itemStyle={{ color: '#f59e0b' }}
          formatter={v => [formatAmt(v), '매각금액']}
        />
        <Bar dataKey="total_amt" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
