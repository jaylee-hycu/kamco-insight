import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

function formatAmt(v) {
  if (!v) return '-'
  if (v >= 1e8) return `${(v / 1e8).toFixed(1)}억`
  if (v >= 1e4) return `${(v / 1e4).toFixed(0)}만`
  return `${v.toLocaleString()}원`
}

function ScoreBadge({ score }) {
  const color = score >= 60 ? '#ef4444' : score >= 40 ? '#f59e0b' : '#34d399'
  const label = score >= 60 ? '🔥 고관심' : score >= 40 ? '⚡ 관심' : '✅ 보통'
  return (
    <span style={{
      background: color + '22', color, border: `1px solid ${color}44`,
      borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 600,
      whiteSpace: 'nowrap'
    }}>
      {label} {score}점
    </span>
  )
}

export default function ScoreTable() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    fetchScore()
  }, [limit])

  async function fetchScore() {
    setLoading(true)
    const { data } = await supabase.rpc('get_undervalue_score', { p_limit: limit })
    setRows(data || [])
    setLoading(false)
  }

  return (
    <div>
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <p style={{ color: '#9ca3af', fontSize: 13, margin: 0 }}>
            지역별 평균 낙찰가율 대비 저평가 가능성이 높은 물건 순위
          </p>
          <p style={{ color: '#6b7280', fontSize: 12, margin: '4px 0 0' }}>
            ※ 낙찰가율이 낮은 지역 → 저평가 가능성 높음 (스코어 = 100 - 지역평균낙찰가율)
          </p>
        </div>
        <select
          value={limit}
          onChange={e => setLimit(Number(e.target.value))}
          style={{
            background: '#1a1d27', color: '#e5e7eb', border: '1px solid #2d3148',
            borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer'
          }}
        >
          <option value={20}>Top 20</option>
          <option value={50}>Top 50</option>
          <option value={100}>Top 100</option>
        </select>
      </div>

      {loading ? (
        <div style={{ color: '#60a5fa', padding: 20 }}>스코어 계산 중...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2d3148' }}>
                {['순위', '스코어', '연도', '지역', '소재지', '지목', '면적(㎡)', '매각금액', '처분방식', '지역평균낙찰가율', '계약일'].map(h => (
                  <th key={h} style={{ color: '#6b7280', padding: '8px 12px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid #1f2235',
                  background: i % 2 === 0 ? '#0f1117' : '#13161f'
                }}>
                  <td style={{ color: '#6b7280', padding: '8px 12px', textAlign: 'center' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <ScoreBadge score={row.score} />
                  </td>
                  <td style={{ color: '#9ca3af', padding: '8px 12px' }}>{row.yr}</td>
                  <td style={{ color: '#9ca3af', padding: '8px 12px', whiteSpace: 'nowrap' }}>{row.rgn_div_nm}</td>
                  <td style={{
                    color: '#e5e7eb', padding: '8px 12px',
                    maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>{row.lctn_nm}</td>
                  <td style={{ color: '#9ca3af', padding: '8px 12px' }}>{row.pblb_cland_nm}</td>
                  <td style={{ color: '#9ca3af', padding: '8px 12px', textAlign: 'right' }}>
                    {row.ldgr_sqms?.toLocaleString()}
                  </td>
                  <td style={{ color: '#f59e0b', padding: '8px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatAmt(row.ldgr_amt)}
                  </td>
                  <td style={{ color: '#60a5fa', padding: '8px 12px', whiteSpace: 'nowrap' }}>
                    {row.dsps_div_nm}
                  </td>
                  <td style={{ color: '#a78bfa', padding: '8px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {row.avg_bidrate}%
                  </td>
                  <td style={{ color: '#6b7280', padding: '8px 12px', whiteSpace: 'nowrap' }}>
                    {row.ctrt_ymd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
