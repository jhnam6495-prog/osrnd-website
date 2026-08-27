// 사업실적 관리자 CRUD Server Actions
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assertAdminSession } from '../../lib/auth'
import { parseUploadedFile } from '../../lib/blob-store'
import { createProject, deleteProject, updateProject, TAG_OPTIONS, type ProjectInput } from '../../lib/projects'

function readProjectInput(formData: FormData): ProjectInput {
  const year = String(formData.get('year') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const content_ko = String(formData.get('content_ko') ?? '').trim()
  const content_en = String(formData.get('content_en') ?? '').trim()
  const tagIndex = Number(formData.get('tagIndex') ?? 0)
  const tag = TAG_OPTIONS[tagIndex] ?? TAG_OPTIONS[0]

  if (!year || !date || !content_ko) {
    throw new Error('연도, 날짜, 한글 내용은 필수입니다.')
  }

  return {
    year,
    date,
    content_ko,
    content_en: content_en || content_ko,
    tag_ko: tag.ko,
    tag_en: tag.en,
    image: parseUploadedFile(formData.get('image')),
  }
}

function revalidateProjectRoutes() {
  revalidatePath('/admin/projects')
  revalidatePath('/record-list')
}

export async function createProjectAction(formData: FormData): Promise<void> {
  await assertAdminSession()
  await createProject(readProjectInput(formData))
  revalidateProjectRoutes()
  redirect('/admin/projects')
}

export async function updateProjectAction(id: string, formData: FormData): Promise<void> {
  await assertAdminSession()
  await updateProject(id, readProjectInput(formData))
  revalidateProjectRoutes()
  redirect('/admin/projects')
}

export async function deleteProjectAction(id: string): Promise<void> {
  await assertAdminSession()
  await deleteProject(id)
  revalidateProjectRoutes()
}
