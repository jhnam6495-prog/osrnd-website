// 비원 (Be-One) 제품 페이지
import { useTranslation } from '../../hooks/useTranslation'
import beoneProduct from '../../assets/images/beone-product.png'

function ProdBeOne({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('beone.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('beone.title')}</h1>
        <p>{t('beone.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">{t('beone.eyebrow')}</div>
            <h2 className="stitle">
              <em>Be-One</em><br />
              <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: 3 }}>{t('beone.subtitle2')}</span>
            </h2>

            {/* 제품 사양 */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', margin: '28px 0', overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('beone.spec.label')}</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {[
                  [t('beone.spec.model'), 'MRJ4ARJ / MRJ2S_A'],
                  [t('beone.spec.func'), t('beone.spec.func.val')],
                  [t('beone.spec.app'), t('beone.spec.app.val')],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', background: 'rgba(0,180,216,0.05)', fontSize: 10, letterSpacing: 1, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 90 }}>{label}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                  </tr>
                ))}
              </table>
            </div>

            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t('beone.feats.label')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['beone.feat1', 'beone.feat2', 'beone.feat3', 'beone.feat4'].map(key => (
                <div className="prod-feat" key={key}>{t(key)}</div>
              ))}
            </div>

            {/* 작동 원리 */}
            <div style={{ background: 'var(--card)', padding: 20, border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
                {t('beone.how')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.3)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>PLC</p>
                  <p style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>Ethernet</p>
                </div>
                <span style={{ color: 'var(--cyan)', fontSize: 16, fontWeight: 700 }}>⟺</span>
                <div style={{ background: 'linear-gradient(135deg,rgba(0,180,216,0.15),rgba(245,124,0,0.15))', border: '1px solid rgba(0,180,216,0.5)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--white)', fontWeight: 700 }}>BE-ONE</p>
                  <p style={{ fontSize: 9, color: 'var(--cyan)', marginTop: 2 }}>{t('beone.converter')}</p>
                </div>
                <span style={{ color: 'var(--orange)', fontSize: 16, fontWeight: 700 }}>⟺</span>
                <div style={{ background: 'rgba(245,124,0,0.1)', border: '1px solid rgba(245,124,0,0.3)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)' }}>{t('beone.servo.amp')}</p>
                  <p style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>RS232/422</p>
                </div>
                <span style={{ color: 'var(--orange)', fontSize: 14 }}>→</span>
                <div style={{ background: 'rgba(245,124,0,0.1)', border: '1px solid rgba(245,124,0,0.3)', padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)' }}>{t('beone.servo.motor')}</p>
                  <p style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>× N</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t('common.cta.inquiry')}</button>
            </div>
          </div>

          {/* 제품 이미지 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={beoneProduct} alt="Be-One" style={{ width: '100%', height: 320, objectFit: 'contain', background: 'var(--card)', padding: 24, transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.12)', padding: '14px 18px' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8 }}>
                <span style={{ color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", fontSize: 10 }}>{t('beone.model.label')}</span><br />
                MRJ4ARJ / MRJ2S_A<br />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t('beone.model.by')}</span>
              </p>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default ProdBeOne
