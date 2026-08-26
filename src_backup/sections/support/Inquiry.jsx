// 상담문의 페이지 — Firebase inquiries 컬렉션에 저장
import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { useLanguage, t } from '../../contexts/LanguageContext'

const INQUIRY_TYPES = [
  { value: 'robot-welding',   ko: '공장자동화 — 로봇 용접 자동화',   en: 'Factory Automation — Robot Welding' },
  { value: 'paint-logistics', ko: '공장자동화 — 도장/물류 자동화',   en: 'Factory Automation — Paint/Logistics' },
  { value: 'plc',             ko: '공장자동화 — PLC 자동화 설비',    en: 'Factory Automation — PLC Equipment' },
  { value: 'mes',             ko: '연구개발 — 생산관리 시스템',       en: 'R&D — Production Management' },
  { value: 'servo',           ko: '연구개발 — 서보모터 제어',         en: 'R&D — Servo Motor Control' },
  { value: 'beone',           ko: '제품 — 비원 (Be-One)',           en: 'Product — Be-One' },
  { value: 'PSD5-24',         ko: '제품 — 생산현황판 (PSD5-24)',    en: 'Product — Production Display' },
  { value: 'panel',           ko: '제품 — 제어반 / 동력반',          en: 'Product — Control Panels' },
  { value: 'other',           ko: '기타 문의',                       en: 'Other Inquiry' },
]

const EMPTY = { name: '', phone: '', email: '', company: '', type: '', message: '', privacy: false }

function Inquiry({ onNavigate }) {
  const { lang } = useLanguage()
  const [form, setForm]   = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => {
    const { id, value, type, checked } = e.target
    setForm(f => ({ ...f, [id.replace('iq-', '')]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.type || !form.message) {
      alert(t(lang, '필수 항목을 모두 입력해 주세요.', 'Please fill in all required fields.'))
      return
    }
    if (!form.privacy) {
      alert(t(lang, '개인정보 수집·이용에 동의해 주세요.', 'Please agree to the privacy policy.'))
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
      alert(t(lang, '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'Submission failed. Please try again later.'))
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
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <a onClick={() => onNavigate('customer-center')}>{t(lang, '고객센터', 'Support')}</a> ›
        <span>{t(lang, '상담문의', 'Inquiry')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '상담문의', 'Inquiry')}</h1>
        <p>{t(lang, '프로젝트 문의, 제품 구매, 기술 상담 — 언제든지 연락주세요.', 'Project inquiries, product purchases, technical consultations — contact us anytime.')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        <div className="contact-wrap">
          {/* 연락처 정보 */}
          <div className="cinfo">
            <div className="eyebrow">{t(lang, '연락처 정보', 'Contact Information')}</div>
            <div>
              <div className="clabel">{t(lang, '대표 전화', 'Phone')}</div>
              <div className="cval" style={{ fontSize: 24, fontWeight: 700, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace" }}>052-296-3734</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t(lang, '팩스', 'Fax')}</div>
              <div className="cval" style={{ fontFamily: "'DM Mono', monospace" }}>052-296-3736</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t(lang, '이메일', 'Email')}</div>
              <div className="cval">osrnd@osrnd.com</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t(lang, '상담시간', 'Business Hours')}</div>
              <div className="cval">{t(lang, '월–금 09:00~18:00', 'Mon–Fri 09:00~18:00 KST')}</div>
            </div>
            <div className="cdiv"></div>
            <div>
              <div className="clabel">{t(lang, '주소', 'Address')}</div>
              <div className="cval">{t(lang, '울산광역시 북구 산성로 40, 821호', '821, Sansung-ro 40, Buk-gu, Ulsan')}</div>
            </div>
            <div className="cdiv"></div>
            <div style={{ background: 'var(--card)', padding: 20, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, letterSpacing: 3, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 10 }}>{t(lang, '빠른 연락', 'Quick Contact')}</p>
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
            <div className="eyebrow">{t(lang, '문의 양식', 'Inquiry Form')}</div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 24, color: 'var(--white)', marginBottom: 22, letterSpacing: 1, textTransform: 'uppercase' }}>
              {t(lang, '문의 내용 작성', 'Send Us a Message')}
            </h3>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: 28, background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.3)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
                <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, color: 'var(--cyan)', marginBottom: 8 }}>{t(lang, '문의가 접수되었습니다!', 'Inquiry Submitted!')}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 20 }}>{t(lang, '담당자가 영업일 기준 1~2일 내 연락드리겠습니다.', 'Our team will contact you within 1-2 business days.')}</p>
                <button onClick={handleReset} style={{ background: 'transparent', border: '1px solid rgba(0,180,216,0.4)', color: 'var(--cyan)', padding: '10px 24px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>
                  {t(lang, '새 문의 작성', 'New Inquiry')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="frow">
                  <div className="fg">
                    <label>{t(lang, '성함 *', 'Full Name *')}</label>
                    <input type="text" id="iq-name" required placeholder={t(lang, '홍길동', 'John Smith')} value={form.name} onChange={handleChange} />
                  </div>
                  <div className="fg">
                    <label>{t(lang, '연락처 *', 'Phone *')}</label>
                    <input type="tel" id="iq-phone" required placeholder="010-0000-0000" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="frow">
                  <div className="fg">
                    <label>{t(lang, '이메일', 'Email')}</label>
                    <input type="email" id="iq-email" placeholder="example@email.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="fg">
                    <label>{t(lang, '회사명', 'Company')}</label>
                    <input type="text" id="iq-company" placeholder={t(lang, '회사명 (선택)', 'Company (optional)')} value={form.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="fg">
                  <label>{t(lang, '문의 분야 *', 'Inquiry Type *')}</label>
                  <select id="iq-type" value={form.type} onChange={handleChange}>
                    <option value="">{t(lang, '선택해 주세요', 'Please select')}</option>
                    {INQUIRY_TYPES.map(({ value, ko, en }) => (
                      <option key={value} value={value}>{t(lang, ko, en)}</option>
                    ))}
                  </select>
                </div>
                <div className="fg">
                  <label>{t(lang, '문의 내용 *', 'Message *')}</label>
                  <textarea id="iq-message" required style={{ minHeight: 130 }}
                    placeholder={t(lang, '프로젝트 내용, 수량, 납기 등 상세 내용을 기재해 주세요.', 'Please describe project details, quantities, delivery schedule, etc.')}
                    value={form.message} onChange={handleChange} />
                </div>
                {/* 개인정보 동의 */}
                <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.15)', padding: '14px 18px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                    <input type="checkbox" id="iq-privacy" checked={form.privacy} onChange={handleChange} style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--cyan)' }} />
                    <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75 }}>
                      {t(lang,
                        '[필수] 개인정보 수집·이용에 동의합니다. 수집항목: 성함, 연락처, 이메일, 회사명. 이용목적: 상담문의 처리 및 회신. 보유기간: 1년.',
                        '[Required] I agree to the collection and use of personal information. Items: name, phone, email, company. Purpose: inquiry processing. Retention: 1 year.'
                      )}
                    </span>
                  </label>
                </div>
                <button onClick={handleSubmit} className="fsubmit" disabled={status === 'sending'}>
                  {status === 'sending' ? t(lang, '전송 중...', 'Sending...') : t(lang, '문의 접수하기', 'Submit Inquiry')}
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
