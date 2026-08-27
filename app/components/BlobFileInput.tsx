// 파일 첨부 입력 — 선택 즉시 브라우저에서 Blob으로 직접 업로드(presigned URL)하고,
// 완료된 파일 메타데이터(JSON)만 hidden input으로 폼에 실어 보낸다. 원본 파일 바이트는
// 서버(Server Action)로 절대 넘어가지 않는다 — Vercel 서버리스 함수의 ~4.5MB 요청 본문 캡을 피하기 위함.
'use client'

import { useRef, useState } from 'react'
import { uploadPresigned } from '@vercel/blob/client'
import type { UploadedFile } from '../lib/blob-store'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  letterSpacing: 2,
  color: 'var(--cyan)',
  fontFamily: 'var(--font-label)',
  textTransform: 'uppercase',
  marginBottom: 6,
}

export default function BlobFileInput({
  name,
  pathPrefix,
  label,
  accept,
  defaultFiles,
}: {
  name: string
  pathPrefix: string
  label: string
  accept?: string
  defaultFiles?: UploadedFile[]
}) {
  const [files, setFiles] = useState<UploadedFile[]>(defaultFiles ?? [])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    try {
      // 한글 등 비-ASCII 파일명을 그대로 경로에 쓰면 presigned 토큰 검증 단계에서 실패한다.
      const pathname = `${pathPrefix}/${Date.now()}-${encodeURIComponent(file.name)}`
      const blob = await uploadPresigned(pathname, file, {
        access: 'public',
        handleUploadUrl: '/api/blob-upload',
      })
      setFiles([{ name: file.name, url: blob.url, downloadUrl: blob.downloadUrl, size: file.size }])
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeFile = () => setFiles([])

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {/* 실제 파일 input에는 name을 주지 않는다 — 원본 파일이 폼 제출에 절대 섞이지 않도록 */}
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} disabled={uploading} style={{ fontSize: 13, color: 'var(--muted)' }} />
      {uploading && <p style={{ fontSize: 12, color: 'var(--cyan)', marginTop: 6 }}>업로드 중...</p>}
      {error && <p style={{ fontSize: 12, color: 'var(--orange)', marginTop: 6 }}>{error}</p>}
      {files.map((f) => (
        <div key={f.url} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 260 }}>{f.name}</span>
          <button type="button" onClick={removeFile} style={{ background: 'transparent', border: 'none', color: 'var(--orange)', cursor: 'pointer', fontSize: 11 }}>
            제거
          </button>
        </div>
      ))}
      <input type="hidden" name={name} value={JSON.stringify(files[0] ?? null)} />
    </div>
  )
}
