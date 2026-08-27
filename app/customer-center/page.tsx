// 고객센터 허브 페이지 — 공지사항/상담문의로 안내
import Link from 'next/link'
import PageHero from '../components/PageHero'
import { getDictionary } from '../lib/i18n/dictionary'

export default async function CustomerCenterPage() {
  const { t } = await getDictionary()

  return (
    <>
      <PageHero breadcrumbs={[{ label: t('common.home'), href: '/' }, { label: t('support.bc') }]} title={t('support.title')} description={t('support.ph.desc')} />

      <div className="outer">
        <div className="sec">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)', maxWidth: 860, margin: '0 auto' }}>
            <Link href="/notice" className="cc-card" style={{ borderTop: '2px solid var(--cyan)' }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>📋</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: 'var(--white)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
                {t('support.notice.title')}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>{t('support.notice.desc')}</p>
              <div
                style={{
                  display: 'inline-block',
                  padding: '9px 24px',
                  border: '1px solid var(--cyan)',
                  color: 'var(--cyan)',
                  fontSize: 11,
                  letterSpacing: 2,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {t('support.notice.cta')}
              </div>
            </Link>
            <Link href="/inquiry" className="cc-card" style={{ borderTop: '2px solid var(--orange)' }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: 'var(--white)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
                {t('support.inquiry.title')}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>{t('support.inquiry.desc')}</p>
              <div
                style={{
                  display: 'inline-block',
                  padding: '9px 24px',
                  border: '1px solid var(--orange)',
                  color: 'var(--orange)',
                  fontSize: 11,
                  letterSpacing: 2,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {t('support.inquiry.cta')}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
