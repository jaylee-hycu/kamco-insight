import { useState } from 'react'
import { supabase } from '../supabase'

const REGIONS = [
  '서울특별시','부산광역시','대구광역시','인천광역시','광주광역시',
  '대전광역시','울산광역시','세종특별자치시','경기도','강원특별자치도',
  '충청북도','충청남도','전라남도','전북특별자치도','경상북도','경상남도','제주특별자치도'
]

const DSPS = [
  '처분(매각수의)','처분(매각입찰)','처분(무상관리전환)',
  '처분(무상귀속)','처분(무상양여)','처분(사용승인)',
  '처분(유상관리전환)','처분(유상양여)'
]

function formatAmt(v) {
  if (!v) return '-'
  if (v >= 1e8) return `${(v / 1e8).toFixed(1)}억`
  return `${v.toLocaleString()}원`
}

export default function SearchTable() {
  const [rgn, setRgn] = useState('')
  const [yr, setYr] = useState('')
  const [dsps, setDsps] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch() {
    setLoading(true)
    setSearched(true)
    const { data } = await supabase.rpc('get_sale_list', {
      p_rgn: rgn || null,
      p_yr: yr ? parseInt(yr) : null,
      p_dsps: dsps || null,
      p_limit: 50,
      p_offset: 0,
    })
    setRows(data || [])
    setLoading(false)
  }

  const selectStyle = {
    background: '#1a1d27', color: '#e5e7eb', border: '1px solid #2d3148',
    borderRadius: 8, padding: '8px 12px', fontSize: 13, cursor: 'pointer', minWidth: 160
  }

  const btnStyle = {
    background: '#3b82f6', color: '#fff', border: 'none',
    borderRadius: 8, padding: '8px 24px', fontSize: 13,
    cursor: 'pointer', fontWeight: 600
  }

  return (
    <div>
      {/* 필터 */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <select style={selectStyle} value={rgn} onChange={e => setRgn(e.target.value)}>
          <option value="">전체 지역</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select style={selectStyle} value={yr} onChange={e => setYr(e.target.value)}>
          <option value="">전체 연도</option>
          {Array.from({length: 20}, (_, i) => 2026 - i).map(y =>
            <option key={y} value={y}>{y}년</option>
          )}
        </select>

        <select style={selectStyle} value={dsps} onChange={e => setDsps(e.target.value)}>
          <option value="">전체 처분방식</option>
          {DSPS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <button style={btnStyle} onClick={handleSearch}>🔍 검색</button>

        <button style={{ ...btnStyle, background: '#374151' }} onClick={() => {
          setRgn(''); setYr(''); setDsps(''); setRows([]); setSearched(false)
        }}>초기화</button>
      </div>

      {/* 결과 */}
      {loading && <div style={{ color: '#60a5fa', padding: 20 }}>검색 중...</div>}

      {!loading && searched && (
        <>
          <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>
            검색결과: <span style={{ color: '#e5e7eb', fontWeight: 600 }}>{rows.length}건</span> (최대 50건)
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2d3148' }}>
                  {['연도','지역','소재지','재산구분','지목','면적(㎡)','계약금액','처분방식','계약일'].map(h => (
                    <th key={h} style={{ color: '#6b7280', padding: '8px 12px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={9} style={{ color: '#6b7280', padding: 20, textAlign: 'center' }}>검색 결과가 없습니다</td></tr>
                ) : rows.map((row, i) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #1f2235', background: i % 2 === 0 ? '#0f1117' : '#13161f' }}>
                    <td style={{ color: '#9ca3af', padding: '8px 12px' }}>{row.yr}</td>
                    <td style={{ color: '#9ca3af', padding: '8px 12px', whiteSpace: 'nowrap' }}>{row.rgn_div_nm}</td>
                    <td style={{ color: '#e5e7eb', padding: '8px 12px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.lctn_nm}</td>
                    <td style={{ color: '#9ca3af', padding: '8px 12px', whiteSpace: 'nowrap' }}>{row.prpt_div_nm}</td>
                    <td style={{ color: '#9ca3af', padding: '8px 12px' }}>{row.pblb_cland_nm}</td>
                    <td style={{ color: '#9ca3af', padding: '8px 12px', textAlign: 'right' }}>{row.ldgr_sqms?.toLocaleString()}</td>
                    <td style={{ color: '#f59e0b', padding: '8px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatAmt(row.ldgr_amt)}</td>
                    <td style={{ color: '#60a5fa', padding: '8px 12px', whiteSpace: 'nowrap' }}>{row.dsps_div_nm}</td>
                    <td style={{ color: '#9ca3af', padding: '8px 12px', whiteSpace: 'nowrap' }}>{row.ctrt_ymd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
