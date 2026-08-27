// 임베디드 제품 페이지
import Link from 'next/link'
import PageHero from '../components/PageHero'
import { getDictionary } from '../lib/i18n/dictionary'

export default async function ProdEmbeddedPage() {
  const { lang, t } = await getDictionary()
  const isKo = lang === 'ko'

  const specs: [string, string][] = [
    [t('embedded.spec.pcbdesign'), t('embedded.spec.pcbdesign.val')],
    [t('embedded.spec.pcbmake'), t('embedded.spec.pcbmake.val')],
    [t('embedded.spec.firmware'), t('embedded.spec.firmware.val')],
  ]

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t('common.home'), href: '/' }, { label: t('embedded.bc') }]}
        title={t('embedded.title')}
        description={t('embedded.ph.desc')}
      />

      <div className="outer">
        <div className="sec">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">{t('embedded.eyebrow')}</div>
              <h2 className="stitle">
                <em>{isKo ? '임베디드' : 'Embedded'}</em>
                <br />
                <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.35)', letterSpacing: 3 }}>{t('embedded.subtitle2')}</span>
              </h2>

              <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', margin: '28px 0', overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', background: 'rgba(0,180,216,0.08)', borderBottom: '1px solid var(--border)' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--cyan)',
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('embedded.spec.label')}
                  </p>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {specs.map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td
                          style={{
                            padding: '12px 16px',
                            background: 'rgba(0,180,216,0.05)',
                            fontSize: 10,
                            letterSpacing: 1,
                            color: 'var(--cyan)',
                            fontFamily: 'var(--font-label)',
                            width: 110,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {label}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 14,
                  color: 'var(--cyan)',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                {t('embedded.feats.label')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                {['embedded.feat1', 'embedded.feat2', 'embedded.feat3'].map((key) => (
                  <div className="prod-feat" key={key}>
                    {t(key)}
                  </div>
                ))}
              </div>
              <Link className="btn-o" href="/inquiry">
                {t('common.cta.inquiry')}
              </Link>
            </div>

            {/* 제품 이미지 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div className="hz" style={{ border: '1px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/embedded-product.PNG"
                  alt="Embedded PCB"
                  style={{ height: 320, objectFit: 'cover', background: 'var(--card)', padding: 24 }}
                />
              </div>
              <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.12)', padding: '14px 18px' }}>
                <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8 }}>
                  <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-label)', fontSize: 10 }}>{t('embedded.model.label')}</span>
                  <br />
                  {isKo ? '임베디드 PCB' : 'Embedded PCB'}
                  <br />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t('embedded.model.by')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
