// 상담문의 접수 — 공개 액션(인증 불필요)
'use server'

import { createInquiry } from '../lib/inquiries'
import type { Lang } from '../lib/i18n/dictionary'

export type SubmitInquiryState = { status: 'idle' | 'success' | 'error'; message?: string }

export async function submitInquiryAction(_prev: SubmitInquiryState, formData: FormData): Promise<SubmitInquiryState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const company = String(formData.get('company') ?? '').trim()
  const inquiry_type = String(formData.get('inquiry_type') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const lang: Lang = formData.get('lang') === 'en' ? 'en' : 'ko'

  if (!name || !phone || !inquiry_type || !message) {
    return { status: 'error', message: '필수 항목을 입력해주세요.' }
  }

  try {
    await createInquiry({ name, phone, email, company, inquiry_type, message, lang })
    return { status: 'success' }
  } catch {
    return { status: 'error', message: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }
  }
}
