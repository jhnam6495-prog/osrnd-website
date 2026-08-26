// 관리자 대시보드 — 공지사항 + 문의사항 탭
import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query, serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '../../firebase'

/* ── 날짜 포매터 ────────────────────────────────────────────────────────────── */
function formatDate(createdAt) {
  if (!createdAt) return '-'
  try {
    const d = createdAt.toDate ? createdAt.toDate() : new Date(createdAt)
    return d.toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1)
  } catch { return '-' }
}

/* ── 공통 스타일 ─────────────────────────────────────────────────────────────── */
const S = {
  bg:    { background: '#080c12', minHeight: '100vh', color: '#fff', fontFamily: "'Noto Sans KR', sans-serif" },
  card:  { background: '#0e1420', border: '1px solid rgba(0,180,216,0.15)', padding: 28 },
  input: { width: '100%', padding: '10px 14px', background: '#080c12', border: '1px solid rgba(0,180,216,0.2)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical' },
  label: { display: 'block', fontSize: 10, letterSpacing: 2, color: 'rgba(0,180,216,0.8)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 6 },
  btn:   (color = 'var(--cyan)') => ({ background: color, border: 'none', color: color === 'var(--cyan)' ? '#080c12' : '#fff', padding: '10px 22px', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }),
  btnGhost: { background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '10px 22px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Mono', monospace" },
}

/* ── 처리상태 배지 ─────────────────────────────────────────────────────────── */
const STATUS_MAP = {
  new:        { label: '미처리',  bg: 'rgba(204,34,0,0.15)',    color: '#ff6b6b',       border: 'rgba(204,34,0,0.4)' },
  processing: { label: '처리중',  bg: 'rgba(245,124,0,0.15)',   color: 'var(--orange)', border: 'rgba(245,124,0,0.4)' },
  done:       { label: '완료',    bg: 'rgba(0,180,216,0.12)',   color: 'var(--cyan)',   border: 'rgba(0,180,216,0.3)' },
}

function StatusBadge({ value }) {
  const s = STATUS_MAP[value] || STATUS_MAP.new
  return (
    <span style={{ fontSize: 10, padding: '3px 10px', letterSpacing: 1, fontFamily: "'DM Mono', monospace",
      background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   공지사항 탭
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EMPTY_NOTICE = { title_ko: '', title_en: '', content_ko: '', content_en: '', pinned: false }

function NoticesTab() {
  const [notices, setNotices]               = useState([])
  const [loading, setLoading]               = useState(true)
  const [view, setView]                     = useState('list')   // 'list' | 'form'
  const [editTarget, setEditTarget]         = useState(null)
  const [form, setForm]                     = useState(EMPTY_NOTICE)
  const [saving, setSaving]                 = useState(false)
  const [deleteConfirm, setDeleteConfirm]   = useState(null)

  const fetchNotices = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      docs.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
      setNotices(docs)
    } catch (err) {
      console.error('공지 목록 조회 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchNotices() }, [])

  const handleNew  = () => { setEditTarget(null); setForm(EMPTY_NOTICE); setView('form') }
  const handleEdit = (n) => {
    setEditTarget(n)
    setForm({ title_ko: n.title_ko||'', title_en: n.title_en||'', content_ko: n.content_ko||'', content_en: n.content_en||'', pinned: n.pinned||false })
    setView('form')
  }
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title_ko.trim() || !form.content_ko.trim()) { alert('한글 제목과 내용은 필수입니다.'); return }
    setSaving(true)
    try {
      const data = {
        title_ko:   form.title_ko.trim(),
        title_en:   form.title_en.trim() || form.title_ko.trim(),
        content_ko: form.content_ko.trim(),
        content_en: form.content_en.trim() || form.content_ko.trim(),
        pinned:     form.pinned,
      }
      if (editTarget) {
        await updateDoc(doc(db, 'notices', editTarget.id), data)
      } else {
        await addDoc(collection(db, 'notices'), { ...data, views: 0, createdAt: serverTimestamp() })
      }
      await fetchNotices()
      setView('list')
    } catch (err) {
      alert('저장 실패: ' + err.message)
    } finally {
      setSaving(false)
    }
  }
  const handleDelete = async (id) => {
    try { await deleteDoc(doc(db, 'notices', id)); setDeleteConfirm(null); await fetchNotices() }
    catch (err) { alert('삭제 실패: ' + err.message) }
  }
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))

  /* ─ 목록 뷰 ─ */
  if (view === 'list') return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>공지사항 관리</h2>
        <button type="button" onClick={handleNew} style={S.btn()}>+ 새 공지 작성</button>
      </div>
      <div style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 110px 70px 110px', padding: '10px 16px', borderBottom: '1px solid rgba(0,180,216,0.15)', fontSize: 10, color: 'rgba(0,180,216,0.7)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", gap: 8 }}>
          <span></span><span>제목 (한글)</span><span>작성일</span><span>조회</span><span style={{ textAlign: 'right' }}>관리</span>
        </div>
        {loading ? <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>불러오는 중...</div>
          : notices.length === 0 ? <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>등록된 공지사항이 없습니다.</div>
          : notices.map(n => (
            <div key={n.id} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 110px 70px 110px', padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12 }}>{n.pinned ? '📌' : ''}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title_ko || n.title_en || '(제목 없음)'}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace" }}>{formatDate(n.createdAt)}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace" }}>{n.views ?? 0}</span>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => handleEdit(n)} style={{ background: 'transparent', border: '1px solid rgba(0,180,216,0.4)', color: 'rgba(0,180,216,0.8)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>수정</button>
                {deleteConfirm === n.id
                  ? <><button type="button" onClick={() => handleDelete(n.id)} style={{ background: '#cc2200', border: 'none', color: '#fff', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>확인</button>
                     <button type="button" onClick={() => setDeleteConfirm(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>취소</button></>
                  : <button type="button" onClick={() => setDeleteConfirm(n.id)} style={{ background: 'transparent', border: '1px solid rgba(204,34,0,0.4)', color: 'rgba(204,34,0,0.7)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>삭제</button>}
              </div>
            </div>
          ))}
      </div>
    </>
  )

  /* ─ 작성/수정 폼 ─ */
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button type="button" onClick={() => setView('list')} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', padding: 0 }}>← 목록</button>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{editTarget ? '공지사항 수정' : '새 공지사항 작성'}</h2>
      </div>
      <form onSubmit={handleSave} style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div><label style={S.label}>제목 (한글) *</label><input type="text" value={form.title_ko} onChange={e => setField('title_ko', e.target.value)} required placeholder="공지사항 제목" style={S.input} /></div>
          <div><label style={S.label}>Title (English)</label><input type="text" value={form.title_en} onChange={e => setField('title_en', e.target.value)} placeholder="Notice title in English" style={S.input} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div><label style={S.label}>내용 (한글) *</label><textarea value={form.content_ko} onChange={e => setField('content_ko', e.target.value)} required placeholder="공지 내용. HTML 태그 사용 가능합니다." rows={10} style={S.input} /></div>
          <div><label style={S.label}>Content (English)</label><textarea value={form.content_en} onChange={e => setField('content_en', e.target.value)} placeholder="Enter notice content in English. HTML tags supported." rows={10} style={S.input} /></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, padding: '14px 16px', background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.15)' }}>
          <input type="checkbox" id="pinned-cb" checked={form.pinned} onChange={e => setField('pinned', e.target.checked)} style={{ accentColor: 'var(--cyan)', width: 16, height: 16, cursor: 'pointer' }} />
          <label htmlFor="pinned-cb" style={{ fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>📌 상단 고정 (중요 공지)</label>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={S.btn(saving ? 'rgba(0,180,216,0.4)' : 'var(--cyan)')}>
            {saving ? '저장 중...' : (editTarget ? '수정 완료' : '등록하기')}
          </button>
          <button type="button" onClick={() => setView('list')} style={S.btnGhost}>취소</button>
        </div>
      </form>
    </>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   문의사항 탭
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const STATUS_OPTIONS = [
  { value: 'new',        label: '미처리' },
  { value: 'processing', label: '처리중' },
  { value: 'done',       label: '완료'   },
]

const INQUIRY_TYPE_LABEL = {
  'robot-welding':   '로봇 용접 자동화',
  'paint-logistics': '도장/물류 자동화',
  'plc':             'PLC 자동화 설비',
  'mes':             '생산관리 시스템',
  'servo':           '서보모터 제어',
  'beone':           '비원 (Be-One)',
  'PSD5-24':         '생산현황판 (PSD5-24)',
  'panel':           '제어반 / 동력반',
  'other':           '기타 문의',
}

function InquiriesTab() {
  const [inquiries, setInquiries]       = useState([])
  const [loading, setLoading]           = useState(true)
  const [selected, setSelected]         = useState(null)  // 상세 보기 중인 문의 객체
  const [reply, setReply]               = useState('')
  const [savingReply, setSavingReply]   = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'new' | 'processing' | 'done'

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setInquiries(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('문의 목록 조회 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchInquiries() }, [])

  /* ─ 처리상태 변경 ─ */
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus })
      setInquiries(prev => prev.map(iq => iq.id === id ? { ...iq, status: newStatus } : iq))
      if (selected?.id === id) setSelected(s => ({ ...s, status: newStatus }))
    } catch (err) {
      alert('상태 변경 실패: ' + err.message)
    }
  }

  /* ─ 답변 저장 ─ */
  const handleSaveReply = async () => {
    if (!reply.trim()) { alert('답변 내용을 입력해 주세요.'); return }
    setSavingReply(true)
    try {
      await updateDoc(doc(db, 'inquiries', selected.id), {
        reply,
        repliedAt: serverTimestamp(),
        status: 'done',
      })
      const updated = { ...selected, reply, status: 'done' }
      setSelected(updated)
      setInquiries(prev => prev.map(iq => iq.id === selected.id ? updated : iq))
    } catch (err) {
      alert('답변 저장 실패: ' + err.message)
    } finally {
      setSavingReply(false)
    }
  }

  /* ─ 삭제 ─ */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'inquiries', id))
      setDeleteConfirm(null)
      setInquiries(prev => prev.filter(iq => iq.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (err) {
      alert('삭제 실패: ' + err.message)
    }
  }

  const filtered = statusFilter === 'all' ? inquiries : inquiries.filter(iq => iq.status === statusFilter)

  /* ─ 상세 뷰 ─ */
  if (selected) return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button type="button" onClick={() => { setSelected(null); setReply('') }} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', padding: 0 }}>← 목록</button>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>문의 상세</h2>
      </div>

      <div style={S.card}>
        {/* 헤더 정보 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--border)', marginBottom: 24 }}>
          {[
            ['작성자', selected.name || '-'],
            ['연락처', selected.phone || '-'],
            ['이메일', selected.email || '-'],
            ['회사명', selected.company || '-'],
            ['문의 분야', INQUIRY_TYPE_LABEL[selected.inquiry_type] || selected.inquiry_type || '-'],
            ['접수일', formatDate(selected.createdAt)],
          ].map(([label, val]) => (
            <div key={label} style={{ background: '#0e1420', padding: '12px 18px' }}>
              <p style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(0,180,216,0.7)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{val}</p>
            </div>
          ))}
        </div>

        {/* 문의 내용 */}
        <div style={{ marginBottom: 24, padding: '20px 24px', background: 'rgba(0,180,216,0.03)', border: '1px solid rgba(0,180,216,0.1)', borderLeft: '2px solid var(--cyan)' }}>
          <p style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(0,180,216,0.7)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 12 }}>문의 내용</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
        </div>

        {/* 처리상태 변경 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, padding: '14px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>처리상태:</span>
          <StatusBadge value={selected.status} />
          <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button key={value} type="button" onClick={() => handleStatusChange(selected.id, value)}
                style={{ fontSize: 11, padding: '4px 12px', cursor: 'pointer', fontFamily: "'DM Mono', monospace",
                  background: selected.status === value ? 'rgba(0,180,216,0.2)' : 'transparent',
                  border: selected.status === value ? '1px solid rgba(0,180,216,0.5)' : '1px solid rgba(255,255,255,0.15)',
                  color: selected.status === value ? 'var(--cyan)' : 'rgba(255,255,255,0.5)' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 기존 답변 표시 */}
        {selected.reply && (
          <div style={{ marginBottom: 24, padding: '20px 24px', background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.2)', borderLeft: '2px solid var(--cyan)' }}>
            <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 12 }}>등록된 답변</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>{selected.reply}</p>
          </div>
        )}

        {/* 답변 작성 */}
        <div>
          <label style={S.label}>답변 작성 {selected.reply ? '(수정)' : ''}</label>
          <textarea
            value={reply || selected.reply || ''}
            onChange={e => setReply(e.target.value)}
            placeholder="고객 답변 내용을 입력하세요."
            rows={6}
            style={{ ...S.input, marginBottom: 14 }}
          />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={handleSaveReply} disabled={savingReply} style={S.btn()}>
                {savingReply ? '저장 중...' : '답변 저장'}
              </button>
              <button type="button" onClick={() => { setSelected(null); setReply('') }} style={S.btnGhost}>← 목록으로</button>
            </div>
            {deleteConfirm === selected.id
              ? <div style={{ display: 'flex', gap: 6 }}>
                  <button type="button" onClick={() => handleDelete(selected.id)} style={S.btn('#cc2200')}>삭제 확인</button>
                  <button type="button" onClick={() => setDeleteConfirm(null)} style={S.btnGhost}>취소</button>
                </div>
              : <button type="button" onClick={() => setDeleteConfirm(selected.id)} style={{ background: 'transparent', border: '1px solid rgba(204,34,0,0.4)', color: 'rgba(204,34,0,0.7)', padding: '10px 22px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>삭제</button>}
          </div>
        </div>
      </div>
    </>
  )

  /* ─ 목록 뷰 ─ */
  const newCount = inquiries.filter(iq => iq.status === 'new').length

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
          문의사항 관리
          {newCount > 0 && <span style={{ marginLeft: 10, fontSize: 12, padding: '2px 10px', background: 'rgba(204,34,0,0.2)', border: '1px solid rgba(204,34,0,0.5)', color: '#ff6b6b', fontFamily: "'DM Mono', monospace" }}>
            NEW {newCount}
          </span>}
        </h2>
        <button type="button" onClick={fetchInquiries} style={{ ...S.btnGhost, fontSize: 11 }}>↻ 새로고침</button>
      </div>

      {/* 상태 필터 */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[{ value: 'all', label: `전체 (${inquiries.length})` }, ...STATUS_OPTIONS.map(o => ({ value: o.value, label: `${o.label} (${inquiries.filter(iq => iq.status === o.value).length})` }))].map(({ value, label }) => (
          <button key={value} type="button" onClick={() => setStatusFilter(value)}
            style={{ fontSize: 11, padding: '5px 14px', cursor: 'pointer', fontFamily: "'DM Mono', monospace",
              background: statusFilter === value ? 'rgba(0,180,216,0.15)' : 'transparent',
              border: statusFilter === value ? '1px solid rgba(0,180,216,0.5)' : '1px solid rgba(255,255,255,0.12)',
              color: statusFilter === value ? 'var(--cyan)' : 'rgba(255,255,255,0.45)' }}>
            {label}
          </button>
        ))}
      </div>

      <div style={S.card}>
        {/* 헤더 */}
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 100px 90px 80px 80px', padding: '10px 16px', borderBottom: '1px solid rgba(0,180,216,0.15)', fontSize: 10, color: 'rgba(0,180,216,0.7)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", gap: 8 }}>
          <span>날짜</span><span>제목 / 작성자</span><span>문의분야</span><span>상태</span><span>언어</span><span style={{ textAlign: 'right' }}>관리</span>
        </div>

        {loading ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>문의사항이 없습니다.</div>
        ) : filtered.map(iq => (
          <div key={iq.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 100px 90px 80px 80px', padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', gap: 8,
            background: iq.status === 'new' ? 'rgba(204,34,0,0.03)' : 'transparent' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace" }}>{formatDate(iq.createdAt)}</span>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>{iq.message?.slice(0, 40) || '(내용 없음)'}…</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{iq.name || '-'} {iq.company ? `/ ${iq.company}` : ''}</p>
            </div>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{INQUIRY_TYPE_LABEL[iq.inquiry_type] || '-'}</span>
            <span><StatusBadge value={iq.status} /></span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>{iq.lang || 'ko'}</span>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => { setSelected(iq); setReply(iq.reply || '') }}
                style={{ background: 'transparent', border: '1px solid rgba(0,180,216,0.4)', color: 'rgba(0,180,216,0.8)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>보기</button>
              {deleteConfirm === iq.id
                ? <><button type="button" onClick={() => handleDelete(iq.id)} style={{ background: '#cc2200', border: 'none', color: '#fff', fontSize: 11, padding: '4px 8px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>확인</button>
                   <button type="button" onClick={() => setDeleteConfirm(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', fontSize: 11, padding: '4px 8px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>취소</button></>
                : <button type="button" onClick={() => setDeleteConfirm(iq.id)} style={{ background: 'transparent', border: '1px solid rgba(204,34,0,0.4)', color: 'rgba(204,34,0,0.7)', fontSize: 11, padding: '4px 8px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>삭제</button>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   메인 대시보드 (탭 전환 포함)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('notices') // 'notices' | 'inquiries'

  const handleLogout = async () => {
    await signOut(auth)
    onNavigate('home')
  }

  return (
    <div style={S.bg}>
      {/* 헤더 */}
      <div style={{ background: '#0e1420', borderBottom: '1px solid rgba(0,180,216,0.15)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="logo-icon" style={{ width: 32, height: 32, fontSize: 10 }}>OS</div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(0,180,216,0.8)', letterSpacing: 3, textTransform: 'uppercase' }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a onClick={() => onNavigate('home')} style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>홈</a>
          <button type="button" onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontSize: 11, padding: '6px 14px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>로그아웃</button>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
        {/* 탭 */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderBottom: '1px solid rgba(0,180,216,0.15)' }}>
          {[
            { key: 'notices',   label: '📋  공지사항' },
            { key: 'inquiries', label: '✉️  문의사항' },
          ].map(({ key, label }) => (
            <button key={key} type="button" onClick={() => setActiveTab(key)}
              style={{
                background: 'transparent', border: 'none', padding: '12px 28px', fontSize: 13, cursor: 'pointer',
                fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: 1,
                color: activeTab === key ? 'var(--cyan)' : 'rgba(255,255,255,0.4)',
                borderBottom: activeTab === key ? '2px solid var(--cyan)' : '2px solid transparent',
                marginBottom: -1,
              }}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'notices'   && <NoticesTab />}
        {activeTab === 'inquiries' && <InquiriesTab />}
      </div>
    </div>
  )
}

export default AdminDashboard
