// 상담문의 페이지 — 연락처 정보(정적) + 문의 작성 폼(Server Action)
import PageHero from '../components/PageHero'
import InquiryForm from './InquiryForm'
import { getDictionary } from '../lib/i18n/dictionary'
import { INQUIRY_TYPE_KEYS } from '../lib/inquiries'

export default async function InquiryPage() {
  const { lang, t } = await getDictionary()

  const typeOptions = INQUIRY_TYPE_KEYS.map((key) => ({ value: key, label: t(`inquiry.type.${key}`) }))

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('support.bc'), href: '/customer-center' },
          { label: t('inquiry.bc') },
        ]}
        title={t('inquiry.title')}
        description={t('inquiry.ph.desc')}
      />

      <div className="outer">
        <div className="sec">
          <div className="contact-wrap">
            {/* 연락처 정보 */}
            <div className="cinfo">
              <div className="eyebrow">{t('inquiry.contact.eyebrow')}</div>
              <div>
                <div className="clabel">{t('inquiry.phone.label')}</div>
                <div className="cval" style={{ fontSize: 24, fontWeight: 700, color: 'var(--cyan)', fontFamily: 'var(--font-label)' }}>
                  052-296-3734
                </div>
              </div>
              <div className="cdiv" />
              <div>
                <div className="clabel">{t('inquiry.fax.label')}</div>
                <div className="cval" style={{ fontFamily: 'var(--font-label)' }}>052-296-3736</div>
              </div>
              <div className="cdiv" />
              <div>
                <div className="clabel">{t('inquiry.email.label')}</div>
                <div className="cval">osrnd@osrnd.com</div>
              </div>
              <div className="cdiv" />
              <div>
                <div className="clabel">{t('inquiry.hours.label')}</div>
                <div className="cval">{t('inquiry.hours.val')}</div>
              </div>
              <div className="cdiv" />
              <div>
                <div className="clabel">{t('inquiry.addr.label')}</div>
                <div className="cval">{t('inquiry.addr.val')}</div>
              </div>
              <div className="cdiv" />
              <div style={{ background: 'var(--card)', padding: 20, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 10, letterSpacing: 3, color: 'var(--cyan)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', marginBottom: 10 }}>
                  {t('inquiry.quick')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a
                    href="tel:052-296-3734"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', textDecoration: 'none' }}
                  >
                    <span>📞</span>
                    <span style={{ fontSize: 13, color: 'var(--white)', fontFamily: 'var(--font-label)' }}>052-296-3734</span>
                  </a>
                  <a
                    href="mailto:osrnd@osrnd.com"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(245,124,0,0.08)', border: '1px solid rgba(245,124,0,0.2)', textDecoration: 'none' }}
                  >
                    <span>✉️</span>
                    <span style={{ fontSize: 13, color: 'var(--white)', fontFamily: 'var(--font-label)' }}>osrnd@osrnd.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 문의 양식 */}
            <div>
              <div className="eyebrow">{t('inquiry.form.eyebrow')}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--white)', marginBottom: 22, letterSpacing: 1, textTransform: 'uppercase' }}>
                {t('inquiry.form.title')}
              </h3>
              <InquiryForm
                lang={lang}
                typeOptions={typeOptions}
                labels={{
                  formEyebrow: t('inquiry.form.eyebrow'),
                  formTitle: t('inquiry.form.title'),
                  successTitle: t('inquiry.success.title'),
                  successDesc: t('inquiry.success.desc'),
                  newInquiry: t('inquiry.new'),
                  name: t('inquiry.name.label'),
                  namePh: t('inquiry.name.ph'),
                  phone: t('inquiry.phone.field'),
                  email: t('inquiry.email.field'),
                  company: t('inquiry.company.field'),
                  companyPh: t('inquiry.company.ph'),
                  type: t('inquiry.type.field'),
                  typePh: t('inquiry.type.ph'),
                  message: t('inquiry.msg.field'),
                  messagePh: t('inquiry.msg.ph'),
                  privacy: t('inquiry.privacy'),
                  sending: t('inquiry.sending'),
                  submit: t('inquiry.submit'),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
