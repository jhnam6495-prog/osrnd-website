// 공지사항 CMS 데이터 계층 — notices-data/{id}.json. blob-store.ts 공용 헬퍼 위에 구축.
// 이 섹션이 5개 CMS 섹션 중 기준(reference) 구현이므로, projects/documents/history/inquiries도
// 동일한 얇은 도메인 레이어 패턴(lib/{section}.ts + admin/{section}/actions.ts)을 그대로 따른다.
import { deleteBlobs, getRecord, listRecords, makeId, putJson } from './blob-store'

export interface Notice {
  id: string
  title_ko: string
  title_en: string
  content_ko: string
  content_en: string
  pinned: boolean
  featured: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export type NoticeInput = {
  title_ko: string
  title_en: string
  content_ko: string
  content_en: string
  pinned: boolean
  featured: boolean
}

const PREFIX = 'notices-data/'

function pathOf(id: string): string {
  return `${PREFIX}${id}.json`
}

/** documents.ts와 동일한 이유로 방어적 정규화 — 스키마와 다른(필드 누락) 레코드가 내려와도 항상 안전한 값으로 채운다. */
function normalizeNotice(raw: Notice): Notice {
  return {
    id: raw.id,
    title_ko: raw.title_ko ?? '',
    title_en: raw.title_en ?? '',
    content_ko: raw.content_ko ?? '',
    content_en: raw.content_en ?? '',
    pinned: raw.pinned ?? false,
    featured: raw.featured ?? false,
    views: typeof raw.views === 'number' && !Number.isNaN(raw.views) ? raw.views : 0,
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? raw.createdAt ?? '',
  }
}

export async function listNotices(): Promise<Notice[]> {
  const notices = (await listRecords<Notice>(PREFIX)).map(normalizeNotice)
  return notices.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return b.createdAt.localeCompare(a.createdAt)
  })
}

/** 홈 팝업 노출 대상만 — pinned(목록 상단 고정)와는 별개 필드 */
export async function listFeaturedNotices(): Promise<Notice[]> {
  const notices = await listNotices()
  return notices.filter((n) => n.featured)
}

export async function getNotice(id: string): Promise<Notice | null> {
  const notice = await getRecord<Notice>(pathOf(id))
  return notice ? normalizeNotice(notice) : null
}

export async function createNotice(input: NoticeInput): Promise<Notice> {
  const now = new Date().toISOString()
  const notice: Notice = { ...input, id: makeId(), views: 0, createdAt: now, updatedAt: now }
  await putJson(pathOf(notice.id), notice)
  return notice
}

export async function updateNotice(id: string, input: NoticeInput): Promise<void> {
  const existing = await getNotice(id)
  if (!existing) throw new Error('공지사항을 찾을 수 없습니다.')
  const updated: Notice = { ...existing, ...input, updatedAt: new Date().toISOString() }
  await putJson(pathOf(id), updated, { allowOverwrite: true })
}

export async function deleteNotice(id: string): Promise<void> {
  await deleteBlobs([pathOf(id)])
}

export async function incrementNoticeViews(id: string): Promise<void> {
  const existing = await getNotice(id)
  if (!existing) return
  await putJson(pathOf(id), { ...existing, views: existing.views + 1 }, { allowOverwrite: true })
}
