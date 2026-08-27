// 인증현황 CMS 데이터 계층 — documents-data/{id}.json + documents-files/{path}.
// 기존 AboutCert.jsx는 사업자등록증/R&D인증서/ISO 3종/특허 2종을 전부 하드코딩했다(CMS 없음) —
// 이 섹션이 그 하드코딩을 실제 CMS로 승격하는 부분이라 필드는 새로 설계했다.
// 원본의 3단 레이아웃(등록증류 2열 / ISO 3열 헤더바 / 특허 3열 헤더바)은 category_ko를 그룹
// 기준으로 쓰는 groupDocumentsByCategory()로 재현한다 — "준비중"/"추가 예정" 플레이스홀더 카드만
// 제외했다(실제 CRUD가 생기면서 그 자리를 채우는 안내용 카드가 의미 없어졌기 때문).
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

/**
 * 저장된 JSON이 현재 스키마와 다르게(필드 누락 등) 내려와도 공개 페이지가 절대 죽지 않도록
 * 방어적으로 기본값을 채운다. CMS 데이터는 시간이 지나며 스키마가 조금씩 바뀔 수 있으므로,
 * "필드가 있다고 가정하고 바로 .length/.map을 부른다" 대신 항상 이 함수를 거친다.
 */
function normalizeDocument(raw: DocumentEntry): DocumentEntry {
  return {
    id: raw.id,
    category_ko: raw.category_ko ?? '',
    category_en: raw.category_en ?? '',
    badge_ko: raw.badge_ko ?? '',
    badge_en: raw.badge_en ?? '',
    title_ko: raw.title_ko ?? '',
    title_en: raw.title_en ?? '',
    accentColor: raw.accentColor === 'orange' ? 'orange' : 'cyan',
    details: Array.isArray(raw.details) ? raw.details : [],
    desc_ko: raw.desc_ko ?? '',
    desc_en: raw.desc_en ?? '',
    displayImage: raw.displayImage ?? null,
    originalPdf: raw.originalPdf ?? null,
    order: typeof raw.order === 'number' ? raw.order : 0,
    createdAt: raw.createdAt ?? '',
  }
}

export async function listDocuments(): Promise<DocumentEntry[]> {
  const docs = await listRecords<DocumentEntry>(DATA_PREFIX)
  return docs.map(normalizeDocument).sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt))
}

export async function getDocument(id: string): Promise<DocumentEntry | null> {
  const doc = await getRecord<DocumentEntry>(pathOf(id))
  return doc ? normalizeDocument(doc) : null
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

export type DocumentCategoryGroup = { category_ko: string; category_en: string; accentColor: AccentColor; documents: DocumentEntry[] }

const UNCATEGORIZED_KEY = '__uncategorized__'

/**
 * 분류(category_ko)별로 묶어 공개 페이지에서 원본처럼 섹션 헤더 + 카드 그리드로 나눠 보여준다.
 * documents는 이미 order로 정렬되어 있으므로, 그룹 등장 순서도 자연히 order를 따른다 —
 * 관리자가 사업자등록증(order 낮음)→ISO(중간)→특허(높음) 순으로 order를 매기면 원본과 동일한
 * 3단 배열이 된다. 분류를 안 채운 문서는 "기타"로 묶인다.
 */
export function groupDocumentsByCategory(documents: DocumentEntry[]): DocumentCategoryGroup[] {
  const order: string[] = []
  const map = new Map<string, DocumentEntry[]>()

  for (const doc of documents) {
    const key = doc.category_ko || UNCATEGORIZED_KEY
    if (!map.has(key)) {
      map.set(key, [])
      order.push(key)
    }
    map.get(key)!.push(doc)
  }

  return order.map((key) => {
    const docsInGroup = map.get(key)!
    return {
      category_ko: key === UNCATEGORIZED_KEY ? '' : key,
      category_en: key === UNCATEGORIZED_KEY ? '' : docsInGroup[0].category_en || key,
      accentColor: docsInGroup[0].accentColor,
      documents: docsInGroup,
    }
  })
}
