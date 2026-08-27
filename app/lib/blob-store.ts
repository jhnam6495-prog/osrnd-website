// Vercel Blob을 파일 저장소이자 JSON 데이터 저장소로 함께 쓰는 공용 헬퍼.
// {section}-data/{id}.json 은 게시물 메타데이터, {section}-files/{path} 는 첨부파일.
// 목록 조회(listRecords)는 CDN 캐시를 건너뛴다 — 관리자가 방금 수정한 내용이 바로 반영되어야 하므로.
import { del, get, list, put } from '@vercel/blob'

export function makeId(): string {
  return crypto.randomUUID()
}

export async function listRecords<T>(prefix: string): Promise<T[]> {
  const { blobs } = await list({ prefix })
  const jsonBlobs = blobs.filter((b) => b.pathname.endsWith('.json'))

  const records: (T | null)[] = await Promise.all(
    jsonBlobs.map(async (b): Promise<T | null> => {
      try {
        const res = await fetch(b.url, { cache: 'no-store' })
        if (!res.ok) return null
        return (await res.json()) as T
      } catch {
        return null
      }
    })
  )

  return records.filter((r) => r !== null) as T[]
}

export async function getRecord<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: 'public', useCache: false })
    if (!result || result.statusCode !== 200) return null
    const text = await new Response(result.stream).text()
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

export async function putJson(pathname: string, data: unknown, opts?: { allowOverwrite?: boolean }): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: opts?.allowOverwrite ?? false,
  })
}

export async function deleteBlobs(urlsOrPathnames: string[]): Promise<void> {
  if (urlsOrPathnames.length === 0) return
  await del(urlsOrPathnames)
}

export interface UploadedFile {
  name: string
  url: string
  downloadUrl: string
  size: number
}

/** Server Action의 FormData에서 hidden input으로 넘어온 업로드 메타데이터(JSON 문자열)를 파싱 */
export function parseUploadedFiles(raw: FormDataEntryValue | null): UploadedFile[] {
  if (typeof raw !== 'string' || !raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (parsed === null || parsed === undefined) return []
    return Array.isArray(parsed) ? parsed.filter((v): v is UploadedFile => v !== null) : [parsed]
  } catch {
    return []
  }
}

/** 단일 파일용 편의 함수 — BlobFileInput 하나짜리 필드에서 쓴다 */
export function parseUploadedFile(raw: FormDataEntryValue | null): UploadedFile | null {
  return parseUploadedFiles(raw)[0] ?? null
}
