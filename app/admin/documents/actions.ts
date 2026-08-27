// 인증현황 관리자 CRUD Server Actions
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assertAdminSession } from '../../lib/auth'
import { parseUploadedFile } from '../../lib/blob-store'
import { createDocument, deleteDocument, updateDocument, type DocumentDetail, type DocumentInput } from '../../lib/documents'

const MAX_DETAILS = 6

function readDetails(formData: FormData): DocumentDetail[] {
  const details: DocumentDetail[] = []
  for (let i = 0; i < MAX_DETAILS; i++) {
    const label_ko = String(formData.get(`details.${i}.label_ko`) ?? '').trim()
    const label_en = String(formData.get(`details.${i}.label_en`) ?? '').trim()
    const value_ko = String(formData.get(`details.${i}.value_ko`) ?? '').trim()
    const value_en = String(formData.get(`details.${i}.value_en`) ?? '').trim()
    if (!label_ko && !value_ko) continue
    details.push({ label_ko, label_en: label_en || label_ko, value_ko, value_en: value_en || value_ko })
  }
  return details
}

function readDocumentInput(formData: FormData): DocumentInput {
  const category_ko = String(formData.get('category_ko') ?? '').trim()
  const category_en = String(formData.get('category_en') ?? '').trim()
  const badge_ko = String(formData.get('badge_ko') ?? '').trim()
  const badge_en = String(formData.get('badge_en') ?? '').trim()
  const title_ko = String(formData.get('title_ko') ?? '').trim()
  const title_en = String(formData.get('title_en') ?? '').trim()
  const desc_ko = String(formData.get('desc_ko') ?? '').trim()
  const desc_en = String(formData.get('desc_en') ?? '').trim()
  const accentColor = formData.get('accentColor') === 'orange' ? 'orange' : 'cyan'
  const order = Number(formData.get('order') ?? 0) || 0

  if (!title_ko) {
    throw new Error('제목(한글)은 필수입니다.')
  }

  return {
    category_ko,
    category_en: category_en || category_ko,
    badge_ko,
    badge_en: badge_en || badge_ko,
    title_ko,
    title_en: title_en || title_ko,
    accentColor,
    details: readDetails(formData),
    desc_ko,
    desc_en: desc_en || desc_ko,
    displayImage: parseUploadedFile(formData.get('displayImage')),
    originalPdf: parseUploadedFile(formData.get('originalPdf')),
    order,
  }
}

function revalidateDocumentRoutes() {
  revalidatePath('/admin/documents')
  revalidatePath('/about-cert')
}

export async function createDocumentAction(formData: FormData): Promise<void> {
  await assertAdminSession()
  await createDocument(readDocumentInput(formData))
  revalidateDocumentRoutes()
  redirect('/admin/documents')
}

export async function updateDocumentAction(id: string, formData: FormData): Promise<void> {
  await assertAdminSession()
  await updateDocument(id, readDocumentInput(formData))
  revalidateDocumentRoutes()
  redirect('/admin/documents')
}

export async function deleteDocumentAction(id: string): Promise<void> {
  await assertAdminSession()
  await deleteDocument(id)
  revalidateDocumentRoutes()
}
