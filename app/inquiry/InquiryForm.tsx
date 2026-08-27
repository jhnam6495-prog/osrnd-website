// 상담문의 작성 폼 — useActionState로 Server Action 결과(성공/에러)를 반영.
// 필수 입력(이름/연락처/문의유형/내용/개인정보동의)은 원본의 alert() 대신 HTML required로 대체.
'use client'

import { useActionState } from 'react'
import { submitInquiryAction, type SubmitInquiryState } from './actions'
import type { Lang } from '../lib/i18n/dictionary'

const initialState: SubmitInquiryState = { status: 'idle' }

export default function InquiryForm({
  lang,
  typeOptions,
  labels,
}: {
  lang: Lang
  typeOptions: { value: string; label: string }[]
  labels: {
    formEyebrow: string
    formTitle: string
    successTitle: string
    successDesc: string
    newInquiry: string
    name: string
    namePh: string
    phone: string
    email: string
    company: string
    companyPh: string
    type: string
    typePh: string
    message: string
    messagePh: string
    privacy: string
    sending: string
    submit: string
  }
}) {
  const [state, formAction, pending] = useActionState(submitInquiryAction, initialState)

  if (state.status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: 28, background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.3)' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--cyan)', marginBottom: 8 }}>{labels.successTitle}</h4>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 20 }}>{labels.successDesc}</p>
        <a
          href="/inquiry"
          style={{
            display: 'inline-block',
            background: 'transparent',
            border: '1px solid rgba(0,180,216,0.4)',
            color: 'var(--cyan)',
            padding: '10px 24px',
            fontSize: 12,
            textDecoration: 'none',
            fontFamily: 'var(--font-label)',
            letterSpacing: 1,
          }}
        >
          {labels.newInquiry}
        </a>
      </div>
    )
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input type="hidden" name="lang" value={lang} />

      <div className="frow">
        <div className="fg">
          <label>{labels.name}</label>
          <input type="text" name="name" required placeholder={labels.namePh} />
        </div>
        <div className="fg">
          <label>{labels.phone}</label>
          <input type="tel" name="phone" required placeholder="010-0000-0000" />
        </div>
      </div>

      <div className="frow">
        <div className="fg">
          <label>{labels.email}</label>
          <input type="email" name="email" placeholder="example@email.com" />
        </div>
        <div className="fg">
          <label>{labels.company}</label>
          <input type="text" name="company" placeholder={labels.companyPh} />
        </div>
      </div>

      <div className="fg">
        <label>{labels.type}</label>
        <select name="inquiry_type" required defaultValue="">
          <option value="" disabled>
            {labels.typePh}
          </option>
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="fg">
        <label>{labels.message}</label>
        <textarea name="message" required style={{ minHeight: 130 }} placeholder={labels.messagePh} />
      </div>

      <div style={{ background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.15)', padding: '14px 18px' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" name="privacy" required style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--cyan)' }} />
          <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75 }}>{labels.privacy}</span>
        </label>
      </div>

      {state.status === 'error' && state.message && <p style={{ fontSize: 12.5, color: 'var(--orange)' }}>{state.message}</p>}

      <button type="submit" className="fsubmit" disabled={pending}>
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  )
}
