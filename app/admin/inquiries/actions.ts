// 상담문의 관리자 Server Actions — 생성 없음(공개 접수만), 조회·상태변경·답변·삭제만 존재.
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assertAdminSession } from '../../lib/auth'
import { deleteInquiry, saveInquiryReply, updateInquiryStatus, type InquiryStatus } from '../../lib/inquiries'

function revalidateInquiryRoutes(id?: string) {
  revalidatePath('/admin/inquiries')
  if (id) revalidatePath(`/admin/inquiries/${id}`)
}

export async function updateStatusAction(id: string, formData: FormData): Promise<void> {
  await assertAdminSession()
  const status = formData.get('status')
  if (status !== 'new' && status !== 'processing' && status !== 'done') {
    throw new Error('잘못된 상태 값입니다.')
  }
  await updateInquiryStatus(id, status satisfies InquiryStatus)
  revalidateInquiryRoutes(id)
}

export async function saveReplyAction(id: string, formData: FormData): Promise<void> {
  await assertAdminSession()
  const reply = String(formData.get('reply') ?? '').trim()
  if (!reply) throw new Error('답변 내용을 입력해주세요.')
  await saveInquiryReply(id, reply)
  revalidateInquiryRoutes(id)
  redirect('/admin/inquiries')
}

export async function deleteInquiryAction(id: string): Promise<void> {
  await assertAdminSession()
  await deleteInquiry(id)
  revalidateInquiryRoutes()
}
