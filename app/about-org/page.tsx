// 조직도 페이지 — 하드코딩 SVG (CMS 대상 아님)
import PageHero from '../components/PageHero'
import { getDictionary } from '../lib/i18n/dictionary'

const BW = 160
const BH = 44
const VW = 900

const engCX = 180
const salesCX = 450
const rndCX = 720
const ceoCX = 450

const ceoX = ceoCX - BW / 2
const vpX = ceoCX - BW / 2
const engX = engCX - BW / 2
const salesX = salesCX - BW / 2
const rndX = rndCX - BW / 2

const y0 = 30
const y1 = 150
const y2 = 280
const y3 = 400

const midY = y0 + BH + (y1 - y0 - BH) / 2

const team1CX = engCX - 90
const team2CX = engCX + 90

function Box({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={BW} height={BH} rx={5} fill="var(--card)" stroke={color} strokeWidth={1.5} />
      <text x={x + BW / 2} y={y + BH / 2 + 5} textAnchor="middle" fill="white" fontSize={13} fontFamily="Arial, sans-serif">
        {label}
      </text>
    </g>
  )
}

function Ln({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,180,216,0.5)" strokeWidth={1.5} />
}

export default async function AboutOrgPage() {
  const { lang, t } = await getDictionary()
  const isKo = lang === 'ko'

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('nav.about'), href: '/about-intro' },
          { label: t('org.bc') },
        ]}
        title={t('org.title')}
        description={t('org.subtitle')}
      />

      <div className="outer">
        <div className="sec">
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px 20px', overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${VW} 500`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
              <Box x={ceoX} y={y0} label={isKo ? '대표이사' : 'CEO'} color="var(--cyan)" />
              <Ln x1={ceoCX} y1={y0 + BH} x2={ceoCX} y2={y1} />
              <Ln x1={ceoCX} y1={midY} x2={rndCX} y2={midY} />
              <Ln x1={rndCX} y1={midY} x2={rndCX} y2={y2} />

              <Box x={vpX} y={y1} label={isKo ? '부사장' : 'Vice President'} color="var(--cyan)" />
              <Ln x1={ceoCX} y1={y1 + BH} x2={ceoCX} y2={y2} />
              <Ln x1={ceoCX} y1={(y1 + BH + y2) / 2} x2={engCX} y2={(y1 + BH + y2) / 2} />
              <Ln x1={engCX} y1={(y1 + BH + y2) / 2} x2={engCX} y2={y2} />

              <Box x={engX} y={y2} label={isKo ? '엔지니어링부' : 'Engineering Dept.'} color="#2E75B6" />
              <Box x={salesX} y={y2} label={isKo ? '기술영업부' : 'Tech. Sales Dept.'} color="#9c27b0" />
              <Box x={rndX} y={y2} label={isKo ? '연구전담부서' : 'R&D Dept.'} color="var(--orange)" />

              <Ln x1={engCX} y1={y2 + BH} x2={engCX} y2={y3 - 40} />
              <Ln x1={team1CX} y1={y3 - 40} x2={team2CX} y2={y3 - 40} />
              <Ln x1={team1CX} y1={y3 - 40} x2={team1CX} y2={y3} />
              <Ln x1={team2CX} y1={y3 - 40} x2={team2CX} y2={y3} />

              <Box x={team1CX - BW / 2} y={y3} label={isKo ? '엔지니어링1팀' : 'Eng. Team 1'} color="#2E75B6" />
              <Box x={team2CX - BW / 2} y={y3} label={isKo ? '엔지니어링2팀' : 'Eng. Team 2'} color="#2E75B6" />

              <Ln x1={salesCX} y1={y2 + BH} x2={salesCX} y2={y3} />
              <Box x={salesX} y={y3} label={isKo ? '영업/업무지원팀' : 'Sales/Admin Team'} color="#9c27b0" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
