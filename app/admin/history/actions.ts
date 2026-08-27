// 연혁 관리자 CRUD Server Actions
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assertAdminSession } from '../../lib/auth'
import { createHistoryEntry, deleteHistoryEntry, updateHistoryEntry, type HistoryInput } from '../../lib/history'

function readHistoryInput(formData: FormData): HistoryInput {
  const year = String(formData.get('year') ?? '').trim()
  const content_ko = String(formData.get('content_ko') ?? '').trim()
  const content_en = String(formData.get('content_en') ?? '').trim()

  if (!year || !content_ko) {
    throw new Error('연도와 한글 내용은 필수입니다.')
  }

  return { year, content_ko, content_en: content_en || content_ko }
}

function revalidateHistoryRoutes() {
  revalidatePath('/admin/history')
  revalidatePath('/about-history')
}

export async function createHistoryAction(formData: FormData): Promise<void> {
  await assertAdminSession()
  await createHistoryEntry(readHistoryInput(formData))
  revalidateHistoryRoutes()
  redirect('/admin/history')
}

export async function updateHistoryAction(id: string, formData: FormData): Promise<void> {
  await assertAdminSession()
  await updateHistoryEntry(id, readHistoryInput(formData))
  revalidateHistoryRoutes()
  redirect('/admin/history')
}

export async function deleteHistoryAction(id: string): Promise<void> {
  await assertAdminSession()
  await deleteHistoryEntry(id)
  revalidateHistoryRoutes()
}
