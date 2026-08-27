// 공지사항 관리자 CRUD Server Actions — 매 액션 시작 시 세션을 자체 재검증한다(proxy.ts 주석 참고).
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assertAdminSession } from '../../lib/auth'
import { createNotice, deleteNotice, updateNotice, type NoticeInput } from '../../lib/notices'

function readNoticeInput(formData: FormData): NoticeInput {
  const title_ko = String(formData.get('title_ko') ?? '').trim()
  const title_en = String(formData.get('title_en') ?? '').trim()
  const content_ko = String(formData.get('content_ko') ?? '').trim()
  const content_en = String(formData.get('content_en') ?? '').trim()

  if (!title_ko || !content_ko) {
    throw new Error('한글 제목과 내용은 필수입니다.')
  }

  return {
    title_ko,
    title_en: title_en || title_ko,
    content_ko,
    content_en: content_en || content_ko,
    pinned: formData.get('pinned') === 'on',
    featured: formData.get('featured') === 'on',
  }
}

function revalidateNoticeRoutes() {
  revalidatePath('/admin/notices')
  revalidatePath('/notice')
  revalidatePath('/')
}

export async function createNoticeAction(formData: FormData): Promise<void> {
  await assertAdminSession()
  await createNotice(readNoticeInput(formData))
  revalidateNoticeRoutes()
  redirect('/admin/notices')
}

export async function updateNoticeAction(id: string, formData: FormData): Promise<void> {
  await assertAdminSession()
  await updateNotice(id, readNoticeInput(formData))
  revalidateNoticeRoutes()
  redirect('/admin/notices')
}

export async function deleteNoticeAction(id: string): Promise<void> {
  await assertAdminSession()
  await deleteNotice(id)
  revalidateNoticeRoutes()
}
