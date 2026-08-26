// 임베디드 제품 페이지
import { useTranslation } from '../../hooks/useTranslation'
import embeddedProduct from '../../assets/images/embedded-product.png'

function ProdEmbedded({ onNavigate }) {
  const { lang, t } = useTranslation()

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <span>{t('embedded.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('embedded.title')}</h1>
        <p>{t('embedded.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow">{t('embedded.eyebrow')}</div>
            <h2 className="stitle">
              <em>{lang === 'ko' ? '임베디드' : 'Embedded'}</em><br />
              <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: 3 }}>{t('embedded.subtitle2')}</span>
            </h2>

            {/* 제품 사양 */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', margin: '28px 0', overflow: 'hidden' }}>
              <div style={{ padding: '12px 20px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>{t('embedded.spec.label')}</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    [t('embedded.spec.pcbdesign'), t('embedded.spec.pcbdesign.val')],
                    [t('embedded.spec.pcbmake'), t('embedded.spec.pcbmake.val')],
                    [t('embedded.spec.firmware'), t('embedded.spec.firmware.val')],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 16px', background: 'rgba(0,180,216,0.05)', fontSize: 10, letterSpacing: 1, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", width: 110, whiteSpace: 'nowrap' }}>{label}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: 'var(--cyan)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              {t('embedded.feats.label')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['embedded.feat1', 'embedded.feat2', 'embedded.feat3'].map(key => (
                < div className="prod-feat" key={key} > {t(key)}</div>
              ))}
            </div>
            <button className="btn-o" onClick={() => onNavigate('inquiry')}>{t('common.cta.inquiry')}</button>
          </div>

          {/* 제품 이미지 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={embeddedProduct} alt="Embedded PCB" style={{ width: '100%', height: 320, objectFit: 'cover', background: 'var(--card)', padding: 24, transition: 'transform 0.4s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.12)', padding: '14px 18px' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8 }}>
                <span style={{ color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", fontSize: 10 }}>{t('embedded.model.label')}</span><br />
                {lang === 'ko' ? '임베디드 PCB' : 'Embedded PCB'}<br />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t('embedded.model.by')}</span>
              </p>
            </div>
          </div>
        </div>
      </div></div >
    </>
  )
}

export default ProdEmbedded