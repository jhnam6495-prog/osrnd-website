// 생산현황판 (PSD5-24) 제품 페이지
import { useTranslation } from '../../hooks/useTranslation'
import psd324Installed from '../../assets/images/PSD5-24.png'
import psd324Product2 from '../../assets/images/PSD5-24-product-2.png'

function ProdPsd({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('psd.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('psd.ph.title')}</h1>
        <p>{t('psd.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">{t('psd.eyebrow')}</div>
            <h2 className="stitle">
              <em>PSD5-24</em><br />
              <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: 2 }}>{t('psd.subtitle2')}</span>
            </h2>

            {/* 제품 사양 */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', margin: '28px 0', overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', background: 'rgba(245,124,0,0.08)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('psd.spec.label')}</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {[
                  [t('psd.spec.model'), 'PSD5-24 (PSDS5-24)', 'var(--orange)'],
                  [t('psd.spec.func'), t('psd.spec.func.val'), 'var(--orange)'],
                  [t('psd.spec.comm'), t('psd.spec.comm.val'), 'var(--orange)'],
                ].map(([label, value, color]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', background: 'rgba(245,124,0,0.05)', fontSize: 10, letterSpacing: 1, color, fontFamily: "'DM Mono', monospace", width: 90 }}>{label}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                  </tr>
                ))}
              </table>
            </div>

            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t('psd.feats.label')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['psd.feat1', 'psd.feat2', 'psd.feat3'].map(key => (
                <div className="prod-feat" key={key}>{t(key)}</div>
              ))}
            </div>
            <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t('common.cta.inquiry')}</button>
          </div>

          {/* 제품 이미지 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={psd324Installed} alt="PSD5-24" style={{ width: '100%', height: 260, objectFit: 'contain', background: 'var(--card)', padding: 16, transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={psd324Product2} alt="PSD5-24 installed" style={{ width: '100%', height: 220, objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ background: 'rgba(245,124,0,0.05)', border: '1px solid rgba(245,124,0,0.12)', padding: '12px 16px' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>{t('psd.img.caption')}</p>
            </div>
          </div>
        </div>
      </div></div>
    </>
  )
}

export default ProdPsd
