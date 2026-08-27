// 연혁 CMS 데이터 계층 — history-data/{id}.json. notices.ts와 동일한 패턴.
import { deleteBlobs, getRecord, listRecords, makeId, putJson } from './blob-store'

export interface HistoryEntry {
  id: string
  year: string
  content_ko: string
  content_en: string
  createdAt: string
}

export type HistoryInput = {
  year: string
  content_ko: string
  content_en: string
}

const PREFIX = 'history-data/'

function pathOf(id: string): string {
  return `${PREFIX}${id}.json`
}

export async function listHistory(): Promise<HistoryEntry[]> {
  const entries = await listRecords<HistoryEntry>(PREFIX)
  return entries.sort((a, b) => b.year.localeCompare(a.year) || b.createdAt.localeCompare(a.createdAt))
}

export async function getHistoryEntry(id: string): Promise<HistoryEntry | null> {
  return getRecord<HistoryEntry>(pathOf(id))
}

export async function createHistoryEntry(input: HistoryInput): Promise<HistoryEntry> {
  const entry: HistoryEntry = { ...input, id: makeId(), createdAt: new Date().toISOString() }
  await putJson(pathOf(entry.id), entry)
  return entry
}

export async function updateHistoryEntry(id: string, input: HistoryInput): Promise<void> {
  const existing = await getHistoryEntry(id)
  if (!existing) throw new Error('연혁 항목을 찾을 수 없습니다.')
  const updated: HistoryEntry = { ...existing, ...input }
  await putJson(pathOf(id), updated, { allowOverwrite: true })
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  await deleteBlobs([pathOf(id)])
}

/**
 * Blob에 연혁 데이터가 아직 하나도 없을 때(데이터 이관 전 등)의 폴백.
 * 기존 AboutHistory.jsx의 하드코딩 fallbackData를 그대로 이식 — Firestore/Blob 데이터가 이관되면
 * 이 폴백은 더 이상 쓰이지 않는다(그룹 결과가 비어 있을 때만 사용).
 */
export const HISTORY_FALLBACK: { year: string; items: { id: string; content_ko: string; content_en: string }[] }[] = [
  {
    year: '2026',
    items: [
      { id: 'fallback-2026-1', content_ko: '현재 운영 중 — 국내외 자동차 부품사 대상 공장자동화 프로젝트 수행', content_en: 'Ongoing — factory automation projects for domestic and international automotive parts manufacturers' },
      { id: 'fallback-2026-2', content_ko: '임직원 16명 + 협력사 3명 (2026년 3월 기준)', content_en: '16 staff + 3 partner personnel (as of March 2026)' },
      { id: 'fallback-2026-3', content_ko: '02월 06일 — ISO 9001/14001/45001 인증', content_en: 'Feb 6 — ISO 9001/14001/45001 certification' },
      { id: 'fallback-2026-4', content_ko: '03월 18일 — 부설연구전담부서 설립 인정', content_en: 'Mar 18 — Accreditation of in-house dedicated research department' },
    ],
  },
  {
    year: '2025',
    items: [
      { id: 'fallback-2025-1', content_ko: '07월 28일 — 미국법인(OSRND USA, INC) 설립', content_en: 'Jul 28 — U.S. subsidiary established' },
      { id: 'fallback-2025-2', content_ko: '사업장: 1022 Hillcrest Parkway, Suite 306, Dublin, GA, 31021, USA', content_en: 'Location: 1022 Hillcrest Parkway, Suite 306, Dublin, GA, 31021, USA' },
    ],
  },
  {
    year: '2024',
    items: [
      { id: 'fallback-2024-1', content_ko: '02월 — ㈜화신 LX3-CHASSIS라인 설치 공사 및 시운전', content_en: 'Feb — Hwashin LX3-CHASSIS line installation and commissioning' },
      { id: 'fallback-2024-2', content_ko: '04월 — 수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', content_en: 'Apr — Automation parts and cable supply to Soosung Precision Machinery' },
      { id: 'fallback-2024-3', content_ko: '07월 — ㈜화신 LQ2-CHASSIS라인 설치 공사 및 시운전', content_en: 'Jul — Hwashin LQ2-CHASSIS line installation and commissioning' },
      { id: 'fallback-2024-4', content_ko: '10월 — ㈜화신 JG1 BPC라인 설치 공사 및 시운전', content_en: 'Oct — Hwashin JG1 BPC line installation and commissioning' },
    ],
  },
  {
    year: '2023',
    items: [
      { id: 'fallback-2023-1', content_ko: '01월 — ㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 공사 및 시운전', content_en: 'Jan — Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning' },
      { id: 'fallback-2023-2', content_ko: '07월 — ㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 공사 및 시운전', content_en: 'Jul — Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning' },
      { id: 'fallback-2023-3', content_ko: '09월 — ㈜화신 TSD-AO1 CHASSIS라인 설치 공사 및 시운전', content_en: 'Sep — Hwashin TSD-AO1 CHASSIS line installation and commissioning' },
      { id: 'fallback-2023-4', content_ko: '10월 — ㈜화신 Nea-CHASSI라인 설치 공사 및 시운전', content_en: 'Oct — Hwashin Nea-CHASSI line installation and commissioning' },
    ],
  },
  {
    year: '2022',
    items: [
      { id: 'fallback-2022-1', content_ko: '03월 — ㈜화신 미국법인 NX4a 차종 차체/샤시 설치 공사 및 시운전', content_en: 'Mar — Hwashin US Corp. NX4a body/chassis installation and commissioning' },
      { id: 'fallback-2022-2', content_ko: '06월 — ㈜화신 미국법인 J3 차종 샤시 생산라인 설치 공사 및 시운전', content_en: 'Jun — Hwashin US Corp. J3 chassis production line installation and commissioning' },
      { id: 'fallback-2022-3', content_ko: '09월 — ㈜화신 MV_ME 차종 샤시 생산라인 설치 공사 및 시운전', content_en: 'Sep — Hwashin MV_ME chassis production line installation and commissioning' },
      { id: 'fallback-2022-4', content_ko: '11월 — ㈜화신 CN7 PE 차종 샤시 생산라인 설치 공사 및 시운전', content_en: 'Nov — Hwashin CN7 PE chassis production line installation and commissioning' },
    ],
  },
  {
    year: '2021',
    items: [
      { id: 'fallback-2021-1', content_ko: '01월 — ㈜화신 미국법인 NX4a_DL3 차종 생산 라인 시운전', content_en: 'Jan — Hwashin US Corp. NX4a_DL3 production line commissioning' },
      { id: 'fallback-2021-2', content_ko: '03월 — ㈜화신 NE 차종 생산 라인 시운전', content_en: 'Mar — Hwashin NE production line commissioning' },
      { id: 'fallback-2021-3', content_ko: '08월 — ㈜화신 미국법인 VW 차종 라인 시운전', content_en: 'Aug — Hwashin US Corp. VW line commissioning' },
      { id: 'fallback-2021-4', content_ko: '11월 — ㈜화신 미국법인 NQ5a 차종 외 다수', content_en: 'Nov — Hwashin US Corp. NQ5a and multiple other projects' },
    ],
  },
  {
    year: '2014',
    items: [
      { id: 'fallback-2014-1', content_ko: '01월 01일 — 오에스알앤디㈜ 설립', content_en: 'January 1 — OSRnD Co., Ltd. founded' },
      { id: 'fallback-2014-2', content_ko: '울산광역시 북구 산성로 40, 821호 (UKIC, 효문동)', content_en: 'Location: 821, Sansung-ro 40, Buk-gu, Ulsan (UKIC)' },
      { id: 'fallback-2014-3', content_ko: '공장자동화 및 연구개발 사업 개시', content_en: 'Factory automation and R&D business commenced' },
    ],
  },
  {
    year: '2007',
    items: [{ id: 'fallback-2007-1', content_ko: '06월 09일 — 울산 북구 효문동 812-1번지로 사업장 이전', content_en: 'Jun 9 — Relocated to 812-1, Hyomun-dong, Buk-gu, Ulsan' }],
  },
  {
    year: '2004',
    items: [
      { id: 'fallback-2004-1', content_ko: '01월 03일 — OSRnD로 회사명 변경 (대표: 권오수)', content_en: 'Jan 3 — Company renamed to OSRnD (CEO: Kwon Oh-soo)' },
      { id: 'fallback-2004-2', content_ko: '사업장: 울산 중구 학성동 427-3번지', content_en: 'Location: 427-3, Hakseong-dong, Jung-gu, Ulsan' },
    ],
  },
  {
    year: '2001',
    items: [
      { id: 'fallback-2001-1', content_ko: '07월 01일 — e-kos 설립 (대표: 권오수)', content_en: 'Jul 1 — e-kos founded (CEO: Kwon Oh-soo)' },
      { id: 'fallback-2001-2', content_ko: '사업장: 울산 북구 화봉동 884-12번지', content_en: 'Location: 884-12, Hwabong-dong, Buk-gu, Ulsan' },
    ],
  },
]

/** 연도별로 묶어 공개 페이지 타임라인 카드 형태로 반환 */
export function groupHistoryByYear(entries: HistoryEntry[]): { year: string; items: HistoryEntry[] }[] {
  const grouped = new Map<string, HistoryEntry[]>()
  for (const entry of entries) {
    const year = entry.year.slice(0, 4)
    const list = grouped.get(year) ?? []
    list.push(entry)
    grouped.set(year, list)
  }
  return [...grouped.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([year, items]) => ({ year, items }))
}
