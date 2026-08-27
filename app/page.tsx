// 홈페이지 — 히어로, 사업분야, 제품, 고객사, CTA
import Link from 'next/link'
import FadeIn from './components/FadeIn'
import HomeNoticePopup from './components/HomeNoticePopup'
import { getDictionary } from './lib/i18n/dictionary'
import { listFeaturedNotices } from './lib/notices'

const CLIENT_LOGOS = [
  { src: '/images/logo-hwashin.png', alt: '㈜화신' },
  { src: '/images/logo-donghee.png', alt: '동희산업㈜' },
  { src: '/images/logo-hhi.png', alt: 'HD현대로보틱스' },
  { src: '/images/logo-yaskawa.png', alt: '야스카와' },
]

export default async function HomePage() {
  const { lang, t } = await getDictionary()
  const featuredNotices = await listFeaturedNotices()

  return (
    <>
      <HomeNoticePopup notices={featuredNotices} lang={lang} />

      {/* ── 히어로 ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/factory-panorama.png"
            alt="OSRnD"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg,rgba(8,12,18,0.95) 0%,rgba(8,12,18,0.72) 55%,rgba(8,12,18,0.38) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(0,180,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.04) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 44px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 700 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 18px',
                border: '1px solid rgba(0,180,216,0.4)',
                background: 'rgba(0,180,216,0.08)',
                color: 'var(--cyan-l)',
                fontSize: 10,
                letterSpacing: 4,
                marginBottom: 30,
                fontFamily: 'var(--font-label)',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 7, height: 7, background: 'var(--cyan)', borderRadius: '50%', animation: 'blink 2s infinite', display: 'inline-block' }} />
              {t('home.hero.badge')}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(40px,6vw,76px)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#fff',
                marginBottom: 14,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '0.48em', letterSpacing: 5, marginBottom: 8, fontFamily: 'var(--font-label)' }}>
                {t('home.hero.company')}
              </span>
              {t('home.hero.title1')}
              <br />
              <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>{t('home.hero.title2')}</em>
              <br />
              <span style={{ color: 'var(--orange)' }}>{t('home.hero.amp')}</span> {t('home.hero.title3')}
            </h1>

            <p style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: 5, color: 'var(--muted)', marginBottom: 28, textTransform: 'uppercase' }}>
              {t('home.hero.tagline')}
            </p>

            <p
              style={{ fontSize: 15, lineHeight: 2, color: 'rgba(255,255,255,0.6)', maxWidth: 520, marginBottom: 44 }}
              dangerouslySetInnerHTML={{ __html: t('home.hero.desc') }}
            />

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link className="btn-p" href="/biz-factory">
                {t('home.hero.cta.biz')}
              </Link>
              <Link className="btn-o" href="/inquiry">
                {t('home.hero.cta.contact')}
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 0, marginTop: 56, borderTop: '1px solid rgba(0,180,216,0.15)', paddingTop: 28 }}>
              <div style={{ paddingRight: 32, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-logo)', fontSize: 30, fontWeight: 700, color: 'var(--cyan)' }}>
                  11<span style={{ fontSize: 14, color: 'var(--orange)' }}>+</span>
                </div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginTop: 4 }}>
                  {t('home.hero.stat.years')}
                </div>
              </div>
              <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-logo)', fontSize: 30, fontWeight: 700, color: 'var(--orange)' }}>
                  16<span style={{ fontSize: 14, color: 'var(--muted)' }}>+</span>
                </div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginTop: 4 }}>
                  {t('home.hero.stat.eng')}
                </div>
              </div>
              <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-logo)', fontSize: 30, fontWeight: 700, color: 'var(--cyan)' }}>
                  35<span style={{ fontSize: 14, color: 'var(--orange)' }}>{t('home.hero.stat.rev.unit')}</span>
                </div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginTop: 4 }}>
                  {t('home.hero.stat.rev')}
                </div>
              </div>
              <div style={{ paddingLeft: 32 }}>
                <div style={{ fontFamily: 'var(--font-logo)', fontSize: 30, fontWeight: 700, color: 'var(--orange)' }}>
                  100<span style={{ fontSize: 14, color: 'var(--muted)' }}>+</span>
                </div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginTop: 4 }}>
                  {t('home.hero.stat.proj')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: 'var(--muted)',
            fontSize: 9,
            letterSpacing: 4,
            fontFamily: 'var(--font-label)',
            zIndex: 2,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 1, height: 48, background: 'linear-gradient(var(--cyan),transparent)', animation: 'sa 2s infinite' }} />
          <span>{t('home.hero.scroll')}</span>
        </div>
      </section>

      {/* ── 사업분야 ── */}
      <div className="outer alt">
        <FadeIn className="sec">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 56 }}>
            <div>
              <div className="eyebrow">{t('home.biz.eyebrow')}</div>
              <h2 className="stitle">
                <em>{t('home.biz.title1')}</em>
                <br />
                <span>{t('home.biz.title2')}</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.9 }}>{t('home.biz.desc')}</p>
            </div>
            <div className="hz" style={{ height: 260, border: '1px solid var(--border)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory-robot-1.png" alt="Robot welding" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,var(--panel) 0%,transparent 30%)' }} />
            </div>
          </div>
          <div className="str-grid">
            <Link href="/biz-factory" className="str-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="str-icon">🤖</div>
              <h4>{t('home.biz.robot.title')}</h4>
              <p>{t('home.biz.robot.desc')}</p>
              <div className="tech-badges">
                <span className="tech-badge">PLC</span>
                <span className="tech-badge">Robot</span>
                <span className="tech-badge">Welding</span>
              </div>
            </Link>
            <Link href="/biz-factory" className="str-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="str-icon">⚙️</div>
              <h4>{t('home.biz.paint.title')}</h4>
              <p>{t('home.biz.paint.desc')}</p>
              <div className="tech-badges">
                <span className="tech-badge">Conveyor</span>
                <span className="tech-badge">Vision</span>
                <span className="tech-badge">Servo</span>
              </div>
            </Link>
            <Link href="/biz-rnd" className="str-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="str-icon">📊</div>
              <h4>{t('home.biz.mes.title')}</h4>
              <p>{t('home.biz.mes.desc')}</p>
              <div className="tech-badges">
                <span className="tech-badge">MES</span>
                <span className="tech-badge">IoT</span>
                <span className="tech-badge">SCADA</span>
              </div>
            </Link>
            <Link href="/biz-rnd" className="str-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="str-icon">🔬</div>
              <h4>{t('home.biz.rnd.title')}</h4>
              <p>{t('home.biz.rnd.desc')}</p>
              <div className="tech-badges">
                <span className="tech-badge">Servo</span>
                <span className="tech-badge">MCU</span>
                <span className="tech-badge">Protocol</span>
              </div>
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* ── 제품 ── */}
      <div className="outer">
        <FadeIn className="sec">
          <div className="eyebrow">{t('home.prod.eyebrow')}</div>
          <h2 className="stitle">
            <em>{t('home.prod.title1')}</em>
            {t('home.prod.title2')}
          </h2>
          <p className="sdesc">{t('home.prod.desc')}</p>
          <div className="prod-grid">
            <Link href="/prod-beone" className="prod-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="prod-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/beone-product-2.png" alt="Be-One" />
                <span className="prod-tag">{t('home.prod.beone.tag')}</span>
              </div>
              <div className="prod-body">
                <h3>{t('home.prod.beone.title')}</h3>
                <p>{t('home.prod.beone.desc')}</p>
                <div className="prod-feats">
                  <div className="prod-feat">{t('home.prod.beone.feat1')}</div>
                  <div className="prod-feat">{t('home.prod.beone.feat2')}</div>
                </div>
              </div>
            </Link>
            <Link href="/prod-psd" className="prod-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="prod-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/psd5-24.png" alt="PSD5-24" />
                <span className="prod-tag" style={{ background: 'var(--orange)' }}>
                  {t('home.prod.psd.tag')}
                </span>
              </div>
              <div className="prod-body">
                <h3>{t('home.prod.psd.title')}</h3>
                <p>{t('home.prod.psd.desc')}</p>
                <div className="prod-feats">
                  <div className="prod-feat">{t('home.prod.psd.feat1')}</div>
                  <div className="prod-feat">{t('home.prod.psd.feat2')}</div>
                </div>
              </div>
            </Link>
            <Link href="/prod-panel" className="prod-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="prod-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/control-panel-1.png" alt="Control Panel" />
                <span className="prod-tag">{t('home.prod.panel.tag')}</span>
              </div>
              <div className="prod-body">
                <h3>{t('home.prod.panel.title')}</h3>
                <p>{t('home.prod.panel.desc')}</p>
                <div className="prod-feats">
                  <div className="prod-feat">{t('home.prod.panel.feat1')}</div>
                  <div className="prod-feat">{t('home.prod.panel.feat2')}</div>
                </div>
              </div>
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* ── 고객사 ── */}
      <div className="outer alt">
        <FadeIn className="sec">
          <div className="eyebrow">{t('home.clients.eyebrow')}</div>
          <h2 className="stitle">
            <span>{t('home.clients.title1')}</span>
            <em>{t('home.clients.title2')}</em>
          </h2>
          <p className="sdesc">{t('home.clients.desc')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--border)' }}>
            {CLIENT_LOGOS.map(({ src, alt }) => (
              <div key={alt} className="logo-card">
                <div className="logo-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="logo-img" src={src} alt={alt} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link className="btn-o" href="/clients" style={{ display: 'inline-block' }}>
              {t('home.clients.all')}
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* ── CTA ── */}
      <FadeIn className="cta-banner">
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2>{t('home.cta.title')}</h2>
          <p>{t('home.cta.desc')}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn-o" href="/inquiry">
              {t('home.cta.contact')}
            </Link>
            <a className="btn-s" href="tel:052-296-3734">
              {t('home.cta.call')}
            </a>
          </div>
        </div>
      </FadeIn>
    </>
  )
}
