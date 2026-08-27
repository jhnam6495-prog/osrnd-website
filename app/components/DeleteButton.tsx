// 확인 대화상자(confirm())를 거친 뒤에만 폼을 제출하는 삭제 버튼 — 모든 CMS 섹션 공용.
'use client'

export default function DeleteButton({
  label = '삭제',
  confirmText = '정말 삭제하시겠습니까? 되돌릴 수 없습니다.',
}: {
  label?: string
  confirmText?: string
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault()
      }}
      style={{
        background: 'transparent',
        border: '1px solid rgba(204,34,0,0.4)',
        color: 'rgba(204,34,0,0.85)',
        fontSize: 11,
        padding: '6px 14px',
        cursor: 'pointer',
        fontFamily: 'var(--font-label)',
      }}
    >
      {label}
    </button>
  )
}
