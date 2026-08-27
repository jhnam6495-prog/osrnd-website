// 인증현황 CMS 데이터 계층 — documents-data/{id}.json + documents-files/{path}.
// 기존 AboutCert.jsx는 사업자등록증/R&D인증서/ISO 3종/특허 2종을 전부 하드코딩했다(CMS 없음) —
// 이 섹션이 그 하드코딩을 실제 CMS로 승격하는 부분이라 필드는 새로 설계했다.
// 원본의 3단 레이아웃(2열 카드 / ISO 3열 / 특허 3열 + "준비중" 플레이스홀더)은 통합된 단일
// DocumentGrid 카드 스타일로 단순화했다 — 실제 관리자가 자유롭게 추가/삭제할 수 있게 되면서
// "준비중" 플레이스홀더 카드 자체가 의미가 없어졌기 때문. category는 그룹 라벨로만 쓰인다.
import { deleteBlobs, getRecord, listRecords, makeId, putJson, type UploadedFile } from './blob-store'

export type AccentColor = 'cyan' | 'orange'

export interface DocumentDetail {
  label_ko: string
  label_en: string
  value_ko: string
  value_en: string
}

export interface DocumentEntry {
  id: string
  category_ko: string
  category_en: string
  badge_ko: string
  badge_en: string
  title_ko: string
  title_en: string
  accentColor: AccentColor
  details: DocumentDetail[]
  desc_ko: string
  desc_en: string
  displayImage: UploadedFile | null
  originalPdf: UploadedFile | null
  order: number
  createdAt: string
}

export type DocumentInput = Omit<DocumentEntry, 'id' | 'createdAt'>

const DATA_PREFIX = 'documents-data/'
export const DOCUMENTS_FILE_PREFIX = 'documents-files'

function pathOf(id: string): string {
  return `${DATA_PREFIX}${id}.json`
}

export async function listDocuments(): Promise<DocumentEntry[]> {
  const docs = await listRecords<DocumentEntry>(DATA_PREFIX)
  return docs.sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt))
}

export async function getDocument(id: string): Promise<DocumentEntry | null> {
  return getRecord<DocumentEntry>(pathOf(id))
}

export async function createDocument(input: DocumentInput): Promise<DocumentEntry> {
  const doc: DocumentEntry = { ...input, id: makeId(), createdAt: new Date().toISOString() }
  await putJson(pathOf(doc.id), doc)
  return doc
}

export async function updateDocument(id: string, input: DocumentInput): Promise<void> {
  const existing = await getDocument(id)
  if (!existing) throw new Error('문서를 찾을 수 없습니다.')

  // 새로 올린 파일로 교체됐으면 이전 파일은 정리한다(고아 blob 방지).
  const staleUrls: string[] = []
  if (existing.displayImage && existing.displayImage.url !== input.displayImage?.url) staleUrls.push(existing.displayImage.url)
  if (existing.originalPdf && existing.originalPdf.url !== input.originalPdf?.url) staleUrls.push(existing.originalPdf.url)

  const updated: DocumentEntry = { ...existing, ...input }
  await putJson(pathOf(id), updated, { allowOverwrite: true })
  if (staleUrls.length > 0) await deleteBlobs(staleUrls)
}

export async function deleteDocument(id: string): Promise<void> {
  const existing = await getDocument(id)
  const fileUrls = [existing?.displayImage?.url, existing?.originalPdf?.url].filter((u): u is string => Boolean(u))
  await deleteBlobs([pathOf(id), ...fileUrls])
}
