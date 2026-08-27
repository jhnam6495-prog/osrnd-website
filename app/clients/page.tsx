// 고객사 / 협력사 페이지 — CMS 대상 아님(현재도 하드코딩)
import PageHero from '../components/PageHero'
import { getDictionary } from '../lib/i18n/dictionary'

type ClientEntry = { img: string; nameKo: string; nameEn: string; catKo: string; catEn: string }

const AUTO_CLIENTS: ClientEntry[] = [
  { img: '/images/logo-hwashin.png', nameKo: '㈜화신', nameEn: 'Hwashin', catKo: '자동차부품', catEn: 'Auto Parts' },
  { img: '/images/logo-hwashin-precision.png', nameKo: '㈜화신정공', nameEn: 'Hwashin Precision', catKo: '자동차부품', catEn: 'Auto Parts' },
  { img: '/images/logo-simwon.png', nameKo: '심원㈜', nameEn: 'Simwon', catKo: '자동차부품', catEn: 'Auto Parts' },
  { img: '/images/logo-donghee.png', nameKo: '동희산업㈜', nameEn: 'Donghee Industrial', catKo: '자동차부품', catEn: 'Auto Parts' },
]

const ROBOT_CLIENTS: ClientEntry[] = [
  { img: '/images/logo-hhi.png', nameKo: 'HD현대로보틱스', nameEn: 'HD Hyundai Robotics', catKo: '로봇 관련', catEn: 'Robotics' },
  { img: '/images/logo-yaskawa.png', nameKo: '한국야스카와㈜', nameEn: 'Yaskawa Korea', catKo: '로봇 관련', catEn: 'Robotics' },
]

const RND_CLIENTS: ClientEntry[] = [
  { img: '/images/logo-soosung.png', nameKo: '수성정밀기계㈜', nameEn: 'Soosung Precision', catKo: 'R&D 관련', catEn: 'R&D' },
  { img: '/images/logo-hwashin.png', nameKo: '㈜화신', nameEn: 'Hwashin', catKo: 'R&D 관련', catEn: 'R&D' },
]

const PARTNERS = [
  {
    abbr: '두일',
    color: 'var(--cyan)',
    nameKo: '두일계전',
    nameEn: 'Dooil Electric',
    typeKo: '제작/설치공사',
    typeEn: 'Fabrication / Installation',
    descKo: '전기 제작 및 설치 공사 분야 협력사',
    descEn: 'Partner for electrical fabrication and installation work',
  },
  {
    abbr: 'NS',
    color: 'var(--orange)',
    nameKo: 'NS전자',
    nameEn: 'NS Electronics',
    typeKo: '연구개발',
    typeEn: 'R&D',
    descKo: '연구개발 분야 기술 협력사',
    descEn: 'Technology partner for R&D activities',
  },
  {
    abbr: '동호 · 현창',
    color: 'var(--cyan)',
    nameKo: '동호전기상사 · 현창전기산업',
    nameEn: 'Dongho Electric · Hyunchang',
    typeKo: '자재',
    typeEn: 'Materials',
    descKo: '전기 자재 공급 협력사',
    descEn: 'Electrical materials supply partners',
  },
  {
    abbr: '청운 · LAPP',
    color: 'var(--orange)',
    nameKo: '청운전기 · LAPP Korea',
    nameEn: 'Chungun Electric · LAPP Korea',
    typeKo: '자재',
    typeEn: 'Materials',
    descKo: '케이블 및 자재 공급 협력사',
    descEn: 'Cable and materials supply partners',
  },
]

function ClientCard({ img, nameKo, nameEn, catKo, catEn, isKo }: ClientEntry & { isKo: boolean }) {
  return (
    <div className="logo-card">
      <div className="logo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo-img" src={img} alt={nameKo} />
      </div>
      <p className="logo-name">{isKo ? nameKo : nameEn}</p>
      <p className="logo-cat">{isKo ? catKo : catEn}</p>
    </div>
  )
}

function SectionHeader({ color, labelKo, labelEn, isKo }: { color: string; labelKo: string; labelEn: string; isKo: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      <span style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 3, color, textTransform: 'uppercase' }}>
        {isKo ? labelKo : labelEn}
      </span>
      <div style={{ flex: 1, height: 1, background: color === 'var(--cyan)' ? 'rgba(0,180,216,0.2)' : 'rgba(245,124,0,0.2)' }} />
    </div>
  )
}

export default async function ClientsPage() {
  const { lang, t } = await getDictionary()
  const isKo = lang === 'ko'

  return (
    <>
      <PageHero breadcrumbs={[{ label: t('common.home'), href: '/' }, { label: t('clients.bc') }]} title={t('clients.title')} description={t('clients.ph.desc')} />

      <div className="outer">
        <div className="sec">
          {/* 고객사 */}
          <div style={{ marginBottom: 90 }}>
            <div className="eyebrow">Our Clients</div>
            <h2 className="stitle">{t('clients.sec.title')}</h2>

            <div style={{ marginTop: 40, marginBottom: 32 }}>
              <SectionHeader color="var(--cyan)" labelKo="자동차 부품 관련" labelEn="Automotive Parts" isKo={isKo} />
              <div className="client-grid">
                {AUTO_CLIENTS.map((c) => (
                  <ClientCard key={c.nameKo} {...c} isKo={isKo} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <SectionHeader color="var(--orange)" labelKo="로봇 관련" labelEn="Robotics" isKo={isKo} />
              <div className="client-grid">
                {ROBOT_CLIENTS.map((c) => (
                  <ClientCard key={c.nameKo} {...c} isKo={isKo} />
                ))}
                <div style={{ background: 'rgba(22,32,48,0.4)' }} />
                <div style={{ background: 'rgba(22,32,48,0.4)' }} />
                <div style={{ background: 'rgba(22,32,48,0.4)' }} />
              </div>
            </div>

            <div>
              <SectionHeader color="var(--cyan)" labelKo="연구개발 관련" labelEn="R&D Related" isKo={isKo} />
              <div className="client-grid">
                {RND_CLIENTS.map((c) => (
                  <ClientCard key={c.nameKo + c.catKo} {...c} isKo={isKo} />
                ))}
                <div style={{ background: 'rgba(22,32,48,0.4)' }} />
                <div style={{ background: 'rgba(22,32,48,0.4)' }} />
                <div style={{ background: 'rgba(22,32,48,0.4)' }} />
              </div>
            </div>
          </div>

          {/* 협력사 */}
          <div>
            <div className="eyebrow">Our Partners</div>
            <h2 className="stitle">{t('clients.partners.title')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', marginTop: 40 }}>
              {PARTNERS.map(({ abbr, color, nameKo, nameEn, typeKo, typeEn, descKo, descEn }) => (
                <div key={nameKo} style={{ background: 'var(--card)', padding: '36px 24px', textAlign: 'center', borderTop: `2px solid ${color}` }}>
                  <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        border: `1px solid ${color === 'var(--cyan)' ? 'rgba(0,180,216,0.3)' : 'rgba(245,124,0,0.3)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-logo)', fontSize: abbr.length > 4 ? 11 : 14, fontWeight: 700, color }}>{abbr}</span>
                    </div>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: nameKo.length > 8 ? 15 : 17, fontWeight: 700, color: 'var(--white)', letterSpacing: 1, marginBottom: 6 }}>
                    {isKo ? nameKo : nameEn}
                  </h4>
                  <p style={{ fontSize: 10, letterSpacing: 2, color, fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginBottom: 8 }}>
                    {isKo ? typeKo : typeEn}
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7 }}>{isKo ? descKo : descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
