import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function RegionChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" horizontal={false} />
        <XAxis type="number" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }}
          tickFormatter={v => v.toLocaleString()} />
        <YAxis type="category" dataKey="rgn_div_nm" stroke="#6b7280"
          tick={{ fill: '#9ca3af', fontSize: 12 }} width={95} interval={0} />
        <Tooltip
          contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }}
          labelStyle={{ color: '#e5e7eb' }}
          itemStyle={{ color: '#34d399' }}
          formatter={v => [`${v.toLocaleString()}건`, '매각건수']}
        />
        <Bar dataKey="cnt" fill="#34d399" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
