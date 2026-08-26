// 조직도 페이지
import { useTranslation } from '../../hooks/useTranslation'

function AboutOrg({ onNavigate }) {
  const { lang, t } = useTranslation()

  const isKo = lang === 'ko'

  const BW = 160
  const BH = 44
  const VW = 900

  // X 중심 좌표 - 3개 부서 균등 배치
  const engCX  = 180   // 엔지니어링부 중심
  const salesCX = 450  // 기술영업부 중심
  const rndCX  = 720   // 연구전담부서 중심

  const ceoCX  = 450   // 대표이사/부사장 중심
  const ceoX   = ceoCX - BW / 2
  const vpX    = ceoCX - BW / 2
  const engX   = engCX - BW / 2
  const salesX = salesCX - BW / 2
  const rndX   = rndCX - BW / 2

  // Y 좌표
  const y0 = 30    // 대표이사
  const y1 = 150   // 부사장
  const y2 = 280   // 3개 부서
  const y3 = 400   // 하위팀

  // 대표이사-부사장 선의 중간점 Y
  const midY = y0 + BH + (y1 - y0 - BH) / 2

  const box = (x, y, label, color) => (
    <g key={label}>
      <rect x={x} y={y} width={BW} height={BH} rx={5}
        fill="var(--card)" stroke={color} strokeWidth={1.5} />
      <text x={x + BW / 2} y={y + BH / 2 + 5}
        textAnchor="middle" fill="white"
        fontSize={13} fontFamily="Arial, sans-serif">{label}</text>
    </g>
  )

  const ln = (x1, y1, x2, y2, key) => (
    <line key={key} x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(0,180,216,0.5)" strokeWidth={1.5} />
  )

  // 엔지니어링 하위팀 간격
  const team1CX = engCX - 90
  const team2CX = engCX + 90

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('about-intro')}>{t('nav.about')}</a> ›
        <span>{t('org.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('org.title')}</h1>
        <p>{t('org.subtitle')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px 20px', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${VW} 500`} width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block' }}>

            {/* ── 대표이사 ── */}
            {box(ceoX, y0, isKo ? '대표이사' : 'CEO', 'var(--cyan)')}

            {/* 대표이사 → 부사장 수직선 */}
            {ln(ceoCX, y0 + BH, ceoCX, y1, 'ceo-vp')}

            {/* 선 중간 → 연구전담부서 수평선 */}
            {ln(ceoCX, midY, rndCX, midY, 'mid-rnd-h')}
            {/* 수평선 끝 → 연구전담부서 상단 수직선 */}
            {ln(rndCX, midY, rndCX, y2, 'rnd-down')}

            {/* ── 부사장 ── */}
            {box(vpX, y1, isKo ? '부사장' : 'Vice President', 'var(--cyan)')}

            {/* 부사장 → 기술영업부 수직선 */}
            {ln(ceoCX, y1 + BH, ceoCX, y2, 'vp-sales-v')}

            {/* 수직선 중간점에서 엔지니어링부로 수평선 */}
            {ln(ceoCX, (y1 + BH + y2) / 2, engCX, (y1 + BH + y2) / 2, 'vp-eng-h')}

            {/* 엔지니어링부 상단으로 수직선 */}
            {ln(engCX, (y1 + BH + y2) / 2, engCX, y2, 'eng-v')}
            
            {/* ── 엔지니어링부 ── */}
            {box(engX, y2, isKo ? '엔지니어링부' : 'Engineering Dept.', '#2E75B6')}

            {/* ── 기술영업부 ── */}
            {box(salesX, y2, isKo ? '기술영업부' : 'Tech. Sales Dept.', '#9c27b0')}

            {/* ── 연구전담부서 ── */}
            {box(rndX, y2, isKo ? '연구전담부서' : 'R&D Dept.', 'var(--orange)')}

            {/* 엔지니어링부 → 1팀, 2팀 */}
            {ln(engCX, y2 + BH, engCX, y3 - 40, 'eng-sub-v')}
            {ln(team1CX, y3 - 40, team2CX, y3 - 40, 'eng-sub-h')}
            {ln(team1CX, y3 - 40, team1CX, y3, 'team1-v')}
            {ln(team2CX, y3 - 40, team2CX, y3, 'team2-v')}

            {/* ── 엔지니어링1팀 ── */}
            {box(team1CX - BW / 2, y3, isKo ? '엔지니어링1팀' : 'Eng. Team 1', '#2E75B6')}

            {/* ── 엔지니어링2팀 ── */}
            {box(team2CX - BW / 2, y3, isKo ? '엔지니어링2팀' : 'Eng. Team 2', '#2E75B6')}

            {/* 기술영업부 → 영업/업무지원팀 */}
            {ln(salesCX, y2 + BH, salesCX, y3, 'sales-sub-v')}

            {/* ── 영업/업무지원팀 ── */}
            {box(salesX, y3, isKo ? '영업/업무지원팀' : 'Sales/Admin Team', '#9c27b0')}

          </svg>
        </div>
      </div></div>
    </>
  )
}

export default AboutOrg