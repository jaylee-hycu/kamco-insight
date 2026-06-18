import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

export default function BidrateChart({ regionData, prptData }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* 지역별 낙찰가율 */}
      <div>
        <p style={{ color: '#9ca3af', fontSize: 13, margin: '0 0 12px' }}>지역별 평균 낙찰가율 (%)</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 40, left: 90, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }}
              tickFormatter={v => `${v}%`} domain={[0, 'auto']} />
            <YAxis type="category" dataKey="sdnm" stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 11 }} width={85} interval={0} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }}
              labelStyle={{ color: '#e5e7eb' }}
              itemStyle={{ color: '#a78bfa' }}
              formatter={v => [`${v}%`, '평균 낙찰가율']}
            />
            <ReferenceLine x={100} stroke="#ef4444" strokeDasharray="4 4" />
            <Bar dataKey="avg_rto" fill="#a78bfa" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 용도별 낙찰가율 */}
      <div>
        <p style={{ color: '#9ca3af', fontSize: 13, margin: '0 0 12px' }}>용도별 평균 낙찰가율 (%)</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={prptData} margin={{ top: 5, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" />
            <XAxis dataKey="prpt_item_nm" stroke="#6b7280"
              tick={false}
              height={10}
            />
            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }}
              tickFormatter={v => `${v}%`} 
              domain={[0, 120]}
              allowDataOverflow={true}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }}
              labelStyle={{ color: '#e5e7eb' }}
              formatter={(v, name) => [
                name === 'avg_rto' ? `${v}%` : `${Number(v).toLocaleString()}건`,
                name === 'avg_rto' ? '평균 낙찰가율' : '건수'
              ]}
            />
            <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '100%', fill: '#ef4444', fontSize: 11 }} />
            <Bar dataKey="avg_rto" fill="#38bdf8" radius={[4, 4, 0, 0]} 
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
