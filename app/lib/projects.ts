// 사업실적 CMS 데이터 계층 — projects-data/{id}.json. history.ts와 동일한 패턴 +
// 선택적 대표 이미지 1장(원본엔 없던 필드지만, 현재 데이터를 강제로 바꾸지 않도록 옵셔널로 추가).
import { deleteBlobs, getRecord, listRecords, makeId, putJson, type UploadedFile } from './blob-store'

export const TAG_OPTIONS: { ko: string; en: string }[] = [
  { ko: '자동화/시운전', en: 'Auto/Comm.' },
  { ko: '용접자동화', en: 'Weld Auto.' },
  { ko: '해외/시운전', en: 'US / Comm.' },
  { ko: '해외/용접', en: 'US / Weld' },
  { ko: '부품공급', en: 'Parts Supply' },
  { ko: '해외/다수', en: 'US / Multiple' },
]

export interface ProjectRecord {
  id: string
  year: string
  date: string
  content_ko: string
  content_en: string
  tag_ko: string
  tag_en: string
  image: UploadedFile | null
  createdAt: string
}

export type ProjectInput = Omit<ProjectRecord, 'id' | 'createdAt'>

const PREFIX = 'projects-data/'

function pathOf(id: string): string {
  return `${PREFIX}${id}.json`
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const records = await listRecords<ProjectRecord>(PREFIX)
  return records.sort((a, b) => a.date.localeCompare(b.date))
}

export async function getProject(id: string): Promise<ProjectRecord | null> {
  return getRecord<ProjectRecord>(pathOf(id))
}

export async function createProject(input: ProjectInput): Promise<ProjectRecord> {
  const record: ProjectRecord = { ...input, id: makeId(), createdAt: new Date().toISOString() }
  await putJson(pathOf(record.id), record)
  return record
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  const existing = await getProject(id)
  if (!existing) throw new Error('사업실적을 찾을 수 없습니다.')
  if (existing.image && existing.image.url !== input.image?.url) await deleteBlobs([existing.image.url])
  const updated: ProjectRecord = { ...existing, ...input }
  await putJson(pathOf(id), updated, { allowOverwrite: true })
}

export async function deleteProject(id: string): Promise<void> {
  const existing = await getProject(id)
  const urls = existing?.image ? [existing.image.url] : []
  await deleteBlobs([pathOf(id), ...urls])
}

export type YearGroup = { year: string; color: string; records: ProjectRecord[] }

const YEAR_COLORS = ['var(--cyan)', 'var(--orange)']

/** 연도별 내림차순 그룹, 년도마다 색상을 번갈아 지정(기존 RecordList.jsx 로직) */
export function groupProjectsByYear(records: ProjectRecord[]): YearGroup[] {
  const grouped = new Map<string, ProjectRecord[]>()
  for (const record of records) {
    const list = grouped.get(record.year) ?? []
    list.push(record)
    grouped.set(record.year, list)
  }
  return [...grouped.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, yearRecords], i) => ({ year, color: YEAR_COLORS[i % 2], records: yearRecords }))
}

/** Blob에 실적 데이터가 아직 없을 때(데이터 이관 전)의 폴백 — 기존 RecordList.jsx 하드코딩 그대로 이식 */
export const PROJECTS_FALLBACK: YearGroup[] = [
  {
    year: '2026',
    color: 'var(--cyan)',
    records: [
      { id: 'fb-2026-1', year: '2026', date: '2026.01', content_ko: '㈜화신 NX5a 차체라인 설치 및 시운전', content_en: 'Hwashin NX5a body line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2026-2', year: '2026', date: '2026.02', content_ko: '㈜화신 LX3a HEV 차종 설치 및 시운전', content_en: 'Hwashin LX3a HEV model installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2026-3', year: '2026', date: '2026.02', content_ko: '㈜화신 MX5a EREV 차체라인 설치 및 시운전', content_en: 'Hwashin MX5a EREV body line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2026-4', year: '2026', date: '2026.02', content_ko: '㈜화신 NX5a & MX5a EREV 샤시라인 설치 및 시운전', content_en: 'Hwashin NX5a & MX5a EREV chassis line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
    ],
  },
  {
    year: '2025',
    color: 'var(--orange)',
    records: [
      { id: 'fb-2025-1', year: '2025', date: '2025.01', content_ko: '㈜화신 JG1 BPC라인 설치 및 시운전', content_en: 'Hwashin JG1 BPC line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2025-2', year: '2025', date: '2025.04', content_ko: '수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', content_en: 'Soosung Precision — port cleaner automation parts and cable supply', tag_ko: '부품공급', tag_en: 'Parts Supply', image: null, createdAt: '' },
      { id: 'fb-2025-3', year: '2025', date: '2025.05', content_ko: '㈜화신 R2 CHASSIS라인 설치 및 시운전', content_en: 'Hwashin R2 CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2025-4', year: '2025', date: '2025.07', content_ko: '㈜화신 P833 CHASSIS라인 설치 및 시운전', content_en: 'Hwashin P833 CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2025-5', year: '2025', date: '2025.09', content_ko: '㈜화신 NQ5a PE HEV라인 설치 및 시운전', content_en: 'Hwashin NQ5a PE HEV line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
    ],
  },
  {
    year: '2024',
    color: 'var(--cyan)',
    records: [
      { id: 'fb-2024-1', year: '2024', date: '2024.02', content_ko: '㈜화신 LX3-CHASSIS라인 설치 및 시운전', content_en: 'Hwashin LX3-CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2024-2', year: '2024', date: '2024.04', content_ko: '수성정밀기계㈜ ABC 부품 및 케이블 공급', content_en: 'Soosung Precision — automation parts and cable supply', tag_ko: '부품공급', tag_en: 'Parts Supply', image: null, createdAt: '' },
      { id: 'fb-2024-3', year: '2024', date: '2024.07', content_ko: '㈜화신 LQ2-CHASSIS라인 설치 및 시운전', content_en: 'Hwashin LQ2-CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2024-4', year: '2024', date: '2024.10', content_ko: '㈜화신 JG1 BPC라인 설치 및 시운전', content_en: 'Hwashin JG1 BPC line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
    ],
  },
  {
    year: '2023',
    color: 'var(--orange)',
    records: [
      { id: 'fb-2023-1', year: '2023', date: '2023.01', content_ko: '㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 및 시운전', content_en: 'Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning', tag_ko: '용접자동화', tag_en: 'Weld Auto.', image: null, createdAt: '' },
      { id: 'fb-2023-2', year: '2023', date: '2023.07', content_ko: '㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 및 시운전', content_en: 'Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning', tag_ko: '해외/용접', tag_en: 'US / Weld', image: null, createdAt: '' },
      { id: 'fb-2023-3', year: '2023', date: '2023.09', content_ko: '㈜화신 TSD-AO1 CHASSIS라인 설치 및 시운전', content_en: 'Hwashin TSD-AO1 CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2023-4', year: '2023', date: '2023.10', content_ko: '㈜화신 Nea-CHASSI라인 설치 및 시운전', content_en: 'Hwashin Nea-CHASSI line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
    ],
  },
  {
    year: '2022',
    color: 'var(--cyan)',
    records: [
      { id: 'fb-2022-1', year: '2022', date: '2022.03', content_ko: '㈜화신 미국법인 NX4a 차종 차체/샤시 설치 및 시운전', content_en: 'Hwashin US Corp. NX4a body/chassis installation and commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.', image: null, createdAt: '' },
      { id: 'fb-2022-2', year: '2022', date: '2022.06', content_ko: '㈜화신 미국법인 J3 차종 샤시 생산라인 설치 및 시운전', content_en: 'Hwashin US Corp. J3 chassis production line installation and commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.', image: null, createdAt: '' },
      { id: 'fb-2022-3', year: '2022', date: '2022.09', content_ko: '㈜화신 MV_ME 차종 샤시 생산라인 설치 및 시운전', content_en: 'Hwashin MV_ME chassis production line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2022-4', year: '2022', date: '2022.11', content_ko: '㈜화신 CN7 PE 차종 샤시 생산라인 설치 및 시운전', content_en: 'Hwashin CN7 PE chassis production line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
    ],
  },
  {
    year: '2021',
    color: 'var(--orange)',
    records: [
      { id: 'fb-2021-1', year: '2021', date: '2021.01', content_ko: '㈜화신 미국법인 NX4a_DL3 차종 생산 라인 시운전', content_en: 'Hwashin US Corp. NX4a_DL3 production line commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.', image: null, createdAt: '' },
      { id: 'fb-2021-2', year: '2021', date: '2021.03', content_ko: '㈜화신 NE 차종 생산 라인 시운전', content_en: 'Hwashin NE production line commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.', image: null, createdAt: '' },
      { id: 'fb-2021-3', year: '2021', date: '2021.08', content_ko: '㈜화신 미국법인 VW 차종 라인 시운전', content_en: 'Hwashin US Corp. VW line commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.', image: null, createdAt: '' },
      { id: 'fb-2021-4', year: '2021', date: '2021.11', content_ko: '㈜화신 미국법인 NQ5a 차종 외 다수', content_en: 'Hwashin US Corp. NQ5a and multiple other models', tag_ko: '해외/다수', tag_en: 'US / Multiple', image: null, createdAt: '' },
    ],
  },
]
