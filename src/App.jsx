import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import TrendChart from './components/TrendChart'
import RegionChart from './components/RegionChart'
import AmountChart from './components/AmountChart'
import DspsChart from './components/DspsChart'
import SearchTable from './components/SearchTable'

function App() {
  const [trendData, setTrendData] = useState([])
  const [regionData, setRegionData] = useState([])
  const [amountData, setAmountData] = useState([])
  const [dspsData, setDspsData] = useState([])
  const [summary, setSummary] = useState({ total: 0, amount: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)

    // 연도별 집계
    const { data: trend } = await supabase.rpc('get_sale_by_year')
    if (trend) setTrendData(trend)

    // 지역별 집계
    const { data: region } = await supabase.rpc('get_sale_by_region')
    if (region) setRegionData(region)

    // 매각금액 트렌드   
    const { data: amount } = await supabase.rpc('get_amount_by_year')
    if (amount) setAmountData(amount)

    // 처분방식 파이차트 (수의/입찰 비율)  
    const { data: dsps } = await supabase.rpc('get_sale_by_dsps')
    if (dsps) setDspsData(dsps)  

    // 전체 요약
    const { count } = await supabase
      .from('kamco_sale')
      .select('*', { count: 'exact', head: true })
    setSummary(prev => ({ ...prev, total: count || 0 }))

    setLoading(false)
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f1117' }}>
      <div style={{ color: '#60a5fa', fontSize: 20 }}>데이터 로딩 중...</div>
    </div>
  )

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', padding: '24px', fontFamily: 'Pretendard, sans-serif' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: 0 }}>
          🏛️ KAMCO AI-Scout
        </h1>
        <p style={{ color: '#6b7280', margin: '4px 0 0' }}>
          국유부동산 매각현황 분석 대시보드
        </p>
      </div>

      {/* 요약 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <SummaryCard title="총 매각 건수" value={`${summary.total.toLocaleString()}건`} color="#60a5fa" />
        <SummaryCard title="데이터 기간" value="2007 ~ 2026" color="#34d399" />
        <SummaryCard title="대상 지역" value="전국 17개 시도" color="#f59e0b" />
      </div>

      {/* 차트 */}
      {/* 1행 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <ChartCard title="📈 연도별 매각 건수">
          <TrendChart data={trendData} />
        </ChartCard>
        <ChartCard title="🗺️ 지역별 매각 현황 (Top 10)">
          <RegionChart data={regionData} />
        </ChartCard>
      </div>

      {/* 2행 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ChartCard title="💰 연도별 매각금액">
          <AmountChart data={amountData} />
        </ChartCard>
        <ChartCard title="🏷️ 처분방식별 비율">
          <DspsChart data={dspsData} />
        </ChartCard>
      </div>

      {/* 검색 테이블 - 여기로 이동 */}
      <div style={{
        background: '#1a1d27', borderRadius: 12, padding: 24,
        border: '1px solid #2d3148', marginTop: 24
      }}>
        <h3 style={{ color: '#e5e7eb', fontSize: 15, fontWeight: 600, margin: '0 0 20px' }}>
          🔍 물건 검색
        </h3>
        <SearchTable />
      </div>

    </div> 
  )
}

function SummaryCard({ title, value, color }) {
  return (
    <div style={{
      background: '#1a1d27', borderRadius: 12, padding: '20px 24px',
      border: `1px solid ${color}33`
    }}>
      <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 8px' }}>{title}</p>
      <p style={{ color, fontSize: 24, fontWeight: 700, margin: 0 }}>{value}</p>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div style={{
      background: '#1a1d27', borderRadius: 12, padding: 24,
      border: '1px solid #2d3148'
    }}>
      <h3 style={{ color: '#e5e7eb', fontSize: 15, fontWeight: 600, margin: '0 0 20px' }}>{title}</h3>
      {children}
    </div>
  )
}

export default App
