// 공장자동화 페이지
import Link from 'next/link'
import { getDictionary } from '../lib/i18n/dictionary'

export default async function BizFactoryPage() {
  const { t } = await getDictionary()

  const items = [
    { color: 'var(--cyan)', titleKey: 'factory.item1.title', descKey: 'factory.item1.desc' },
    { color: 'var(--cyan)', titleKey: 'factory.item2.title', descKey: 'factory.item2.desc' },
    { color: 'var(--orange)', titleKey: 'factory.item3.title', descKey: 'factory.item3.desc' },
  ]

  const apps = [
    { num: '01', color: 'var(--cyan)', titleKey: 'factory.app1.title', descKey: 'factory.app1.desc' },
    { num: '02', color: 'var(--orange)', titleKey: 'factory.app2.title', descKey: 'factory.app2.desc' },
    { num: '03', color: 'var(--cyan)', titleKey: 'factory.app3.title', descKey: 'factory.app3.desc' },
  ]

  return (
    <>
      <div className="bc">
        <div className="bc-in">
          <Link href="/">{t('common.home')}</Link>›<span>{t('factory.bc')}</span>
        </div>
      </div>

      {/* 히어로 이미지 */}
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/factory-panorama.png"
          alt="Factory"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,12,18,0.3),rgba(8,12,18,0.75))' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Factory Automation
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(30px,5vw,58px)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginTop: 8,
            }}
          >
            {t('factory.title')}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 10 }}>{t('factory.hero.desc')}</p>
        </div>
      </div>

      <div className="outer">
        <div className="sec">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start', marginBottom: 80 }}>
            <div>
              <div className="eyebrow">{t('factory.s1.eyebrow')}</div>
              <h2 className="stitle">
                <span>{t('factory.s1.t1')}</span>
                <em>{t('factory.s1.t2')}</em>
              </h2>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 2, marginBottom: 24 }}>{t('factory.s1.desc')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(({ color, titleKey, descKey }) => (
                  <div
                    key={titleKey}
                    style={{
                      display: 'flex',
                      gap: 16,
                      padding: '16px 20px',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderLeft: `2px solid ${color}`,
                    }}
                  >
                    <div style={{ color, fontSize: 11, flexShrink: 0, paddingTop: 2, fontFamily: 'var(--font-label)' }}>▸</div>
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600, marginBottom: 4 }}>{t(titleKey)}</p>
                      <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7 }}>{t(descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="tech-badges" style={{ marginTop: 20 }}>
                <span className="tech-badge">PLC</span>
                <span className="tech-badge">Robot</span>
                <span className="tech-badge">Welding</span>
                <span className="tech-badge">Vision</span>
                <span className="tech-badge">Servo</span>
              </div>
            </div>
            <div className="hz" style={{ height: 420, border: '1px solid var(--border)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory-robot-1.png" alt="Robot welding" />
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border)', marginBottom: 80 }} />

          {/* 주요 적용 분야 */}
          <div>
            <div className="eyebrow">{t('factory.s2.eyebrow')}</div>
            <h2 className="stitle">
              <span>{t('factory.s2.t1')}</span>
              <em>{t('factory.s2.t2')}</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', marginTop: 36 }}>
              {apps.map(({ num, color, titleKey, descKey }) => (
                <div key={num} style={{ background: 'var(--card)', padding: '36px 28px', borderTop: `2px solid ${color}` }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-logo)',
                      fontSize: 36,
                      color: `rgba(${color === 'var(--cyan)' ? '0,180,216' : '245,124,0'},0.08)`,
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    {num}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 17,
                      color: 'var(--white)',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    {t(titleKey)}
                  </h4>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85 }}>{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
