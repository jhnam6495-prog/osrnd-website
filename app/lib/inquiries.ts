// 상담문의 CMS 데이터 계층 — inquiries-data/{id}.json. 다른 4개 섹션과 달리 비대칭 흐름:
// 공개 측은 작성만(관리자 CRUD 아님), 관리자 측은 조회·답변·상태변경만 한다. 파일 첨부 없음.
import { deleteBlobs, getRecord, listRecords, makeId, putJson } from './blob-store'
import type { Lang } from './i18n/dictionary'

export type InquiryStatus = 'new' | 'processing' | 'done'

export const INQUIRY_TYPE_KEYS = ['robot-welding', 'paint-logistics', 'plc', 'mes', 'servo', 'beone', 'PSD5-24', 'panel', 'other'] as const

export type InquiryType = (typeof INQUIRY_TYPE_KEYS)[number]

/** 관리자 화면 전용 — 내부 직원이 보는 목록이라 원본처럼 한글 라벨만 사용 */
export const ADMIN_INQUIRY_TYPE_LABEL: Record<string, string> = {
  'robot-welding': '로봇 용접 자동화',
  'paint-logistics': '도장/물류 자동화',
  plc: 'PLC 자동화 설비',
  mes: '생산관리 시스템',
  servo: '서보모터 제어',
  beone: '비원 (Be-One)',
  'PSD5-24': '생산현황판 (PSD5-24)',
  panel: '제어반 / 동력반',
  other: '기타 문의',
}

export interface Inquiry {
  id: string
  name: string
  phone: string
  email: string
  company: string
  inquiry_type: string
  message: string
  status: InquiryStatus
  lang: Lang
  reply: string | null
  repliedAt: string | null
  createdAt: string
}

export type InquiryInput = {
  name: string
  phone: string
  email: string
  company: string
  inquiry_type: string
  message: string
  lang: Lang
}

const PREFIX = 'inquiries-data/'

function pathOf(id: string): string {
  return `${PREFIX}${id}.json`
}

export async function listInquiries(): Promise<Inquiry[]> {
  const inquiries = await listRecords<Inquiry>(PREFIX)
  return inquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  return getRecord<Inquiry>(pathOf(id))
}

/** 공개 문의 접수 — 인증 불필요 */
export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  const inquiry: Inquiry = { ...input, id: makeId(), status: 'new', reply: null, repliedAt: null, createdAt: new Date().toISOString() }
  await putJson(pathOf(inquiry.id), inquiry)
  return inquiry
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  const existing = await getInquiry(id)
  if (!existing) throw new Error('문의를 찾을 수 없습니다.')
  await putJson(pathOf(id), { ...existing, status }, { allowOverwrite: true })
}

export async function saveInquiryReply(id: string, reply: string): Promise<void> {
  const existing = await getInquiry(id)
  if (!existing) throw new Error('문의를 찾을 수 없습니다.')
  const updated: Inquiry = { ...existing, reply, repliedAt: new Date().toISOString(), status: 'done' }
  await putJson(pathOf(id), updated, { allowOverwrite: true })
}

export async function deleteInquiry(id: string): Promise<void> {
  await deleteBlobs([pathOf(id)])
}
