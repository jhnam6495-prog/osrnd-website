// 상담문의 페이지 — Firebase inquiries 컬렉션에 저장
import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { useTranslation } from '../../hooks/useTranslation'

const INQUIRY_TYPE_KEYS = [
  'robot-welding', 'paint-logistics', 'plc', 'mes', 'servo', 'beone', 'PSD5-24', 'panel', 'other',
]

const EMPTY = { name: '', phone: '', email: '', company: '', type: '', message: '', privacy: false }

function Inquiry({ onNavigate }) {
  const { lang, t } = useTranslation()
  const [form, setForm]   = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => {
    const { id, value, type, checked } = e.target
    setForm(f => ({ ...f, [id.replace('iq-', '')]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.type || !form.message) {
      alert(t('inquiry.alert.required'))
      return
    }
    if (!form.privacy) {
      alert(t('inquiry.alert.privacy'))
      return
    }
    setStatus('sending')
    try {
      await addDoc(collection(db, 'inquiries'), {
        name:         form.name.trim(),
        phone:        form.phone.trim(),
        email:        form.email.trim(),
        company:      form.company.trim(),
        inquiry_type: form.type,
        message:      form.message.trim(),
        status:       'new',       // 처리상태: new | processing | done
        lang,                       // 접수 언어
        createdAt:    serverTimestamp(),
      })
      setStatus('success')
    } catch (err) {
      console.error('문의 저장 실패:', err)
      alert(t('inquiry.alert.fail'))
      setStatus('idle')
    }
  }

  const handleReset = () => {
    setForm(EMPTY)
    setStatus('idle')
  }

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t('common.home')}</a> ›
        <a onClick={() => onNavigate('customer-center')}>{t('support.bc')}</a> ›
        <span>{t('inquiry.bc')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t('inquiry.title')}</h1>
        <p>{t('inquiry.ph.desc')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div className="contact-wrap">
          {/* 연락처 정보 */}
          <div className="cinfo">
            <div className="eyebrow">{t('inquiry.contact.eyebrow')}</div>
            <div>
              <div className="clabel">{t('inquiry.phone.label')}</div>
              <div className="cval" style={{ fontSize: 24, fontWeight: 700, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace" }}>052-296-3734</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t('inquiry.fax.label')}</div>
              <div className="cval" style={{ fontFamily: "'DM Mono', monospace" }}>052-296-3736</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t('inquiry.email.label')}</div>
              <div className="cval">osrnd@osrnd.com</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t('inquiry.hours.label')}</div>
              <div className="cval">{t('inquiry.hours.val')}</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t('inquiry.addr.label')}</div>
              <div className="cval">{t('inquiry.addr.val')}</div>
            </div>
            <div className="cdiv"></div>
            <div style={{ background: 'var(--card)', padding: 20, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, letterSpacing: 3, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 10 }}>{t('inquiry.quick')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="tel:052-296-3734" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', textDecoration: 'none' }}>
                  <span>📞</span><span style={{ fontSize: 13, color: 'var(--white)', fontFamily: "'DM Mono', monospace" }}>052-296-3734</span>
                </a>
                <a href="mailto:osrnd@osrnd.com" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(245,124,0,0.08)', border: '1px solid rgba(245,124,0,0.2)', textDecoration: 'none' }}>
                  <span>✉️</span><span style={{ fontSize: 13, color: 'var(--white)', fontFamily: "'DM Mono', monospace" }}>osrnd@osrnd.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* 문의 양식 */}
          <div>
            <div className="eyebrow">{t('inquiry.form.eyebrow')}</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 24, color: 'var(--white)', marginBottom: 22, letterSpacing: 1, textTransform: 'uppercase' }}>
              {t('inquiry.form.title')}
            </h3>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: 28, background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.3)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, color: 'var(--cyan)', marginBottom: 8 }}>{t('inquiry.success.title')}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 20 }}>{t('inquiry.success.desc')}</p>
                <button onClick={handleReset} style={{ background: 'transparent', border: '1px solid rgba(0,180,216,0.4)', color: 'var(--cyan)', padding: '10px 24px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>
                  {t('inquiry.new')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="frow">
                  <div className="fg">
                    <label>{t('inquiry.name.label')}</label>
                    <input type="text" id="iq-name" required placeholder={t('inquiry.name.ph')} value={form.name} onChange={handleChange} />
                  </div>
                  <div className="fg">
                    <label>{t('inquiry.phone.field')}</label>
                    <input type="tel" id="iq-phone" required placeholder="010-0000-0000" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="frow">
                  <div className="fg">
                    <label>{t('inquiry.email.field')}</label>
                    <input type="email" id="iq-email" placeholder="example@email.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="fg">
                    <label>{t('inquiry.company.field')}</label>
                    <input type="text" id="iq-company" placeholder={t('inquiry.company.ph')} value={form.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="fg">
                  <label>{t('inquiry.type.field')}</label>
                  <select id="iq-type" value={form.type} onChange={handleChange}>
                    <option value="">{t('inquiry.type.ph')}</option>
                    {INQUIRY_TYPE_KEYS.map(key => (
                      <option key={key} value={key}>{t(`inquiry.type.${key}`)}</option>
                    ))}
                  </select>
                </div>
                <div className="fg">
                  <label>{t('inquiry.msg.field')}</label>
                  <textarea id="iq-message" required style={{ minHeight: 130 }}
                    placeholder={t('inquiry.msg.ph')}
                    value={form.message} onChange={handleChange} />
                </div>
                {/* 개인정보 동의 */}
                <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.15)', padding: '14px 18px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                    <input type="checkbox" id="iq-privacy" checked={form.privacy} onChange={handleChange} style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--cyan)' }} />
                    <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75 }}>
                      {t('inquiry.privacy')}
                    </span>
                  </label>
                </div>
                <button onClick={handleSubmit} className="fsubmit" disabled={status === 'sending'}>
                  {status === 'sending' ? t('inquiry.sending') : t('inquiry.submit')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div></div>
    </>
  )
}

export default Inquiry
