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
  bg: { background: '#080c12', minHeight: '100vh', color: '#fff', fontFamily: "'Noto Sans KR', sans-serif" },
  card: { background: '#0e1420', border: '1px solid rgba(0,180,216,0.15)', padding: 28 },
  input: { width: '100%', padding: '10px 14px', background: '#080c12', border: '1px solid rgba(0,180,216,0.2)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical' },
  label: { display: 'block', fontSize: 10, letterSpacing: 2, color: 'rgba(0,180,216,0.8)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 6 },
  btn: (color = 'var(--cyan)') => ({ background: color, border: 'none', color: color === 'var(--cyan)' ? '#080c12' : '#fff', padding: '10px 22px', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }),
  btnGhost: { background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '10px 22px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Mono', monospace" },
}

/* ── 처리상태 배지 ─────────────────────────────────────────────────────────── */
const STATUS_MAP = {
  new: { label: '미처리', bg: 'rgba(204,34,0,0.15)', color: '#ff6b6b', border: 'rgba(204,34,0,0.4)' },
  processing: { label: '처리중', bg: 'rgba(245,124,0,0.15)', color: 'var(--orange)', border: 'rgba(245,124,0,0.4)' },
  done: { label: '완료', bg: 'rgba(0,180,216,0.12)', color: 'var(--cyan)', border: 'rgba(0,180,216,0.3)' },
}

function StatusBadge({ value }) {
  const s = STATUS_MAP[value] || STATUS_MAP.new
  return (
    <span style={{
      fontSize: 10, padding: '3px 10px', letterSpacing: 1, fontFamily: "'DM Mono', monospace",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`
    }}>
      {s.label}
    </span>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   공지사항 탭
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EMPTY_NOTICE = { title_ko: '', title_en: '', content_ko: '', content_en: '', pinned: false }

function NoticesTab() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list')   // 'list' | 'form'
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState(EMPTY_NOTICE)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

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

  const handleNew = () => { setEditTarget(null); setForm(EMPTY_NOTICE); setView('form') }
  const handleEdit = (n) => {
    setEditTarget(n)
    setForm({ title_ko: n.title_ko || '', title_en: n.title_en || '', content_ko: n.content_ko || '', content_en: n.content_en || '', pinned: n.pinned || false })
    setView('form')
  }
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title_ko.trim() || !form.content_ko.trim()) { alert('한글 제목과 내용은 필수입니다.'); return }
    setSaving(true)
    try {
      const data = {
        title_ko: form.title_ko.trim(),
        title_en: form.title_en.trim() || form.title_ko.trim(),
        content_ko: form.content_ko.trim(),
        content_en: form.content_en.trim() || form.content_ko.trim(),
        pinned: form.pinned,
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
  { value: 'new', label: '미처리' },
  { value: 'processing', label: '처리중' },
  { value: 'done', label: '완료' },
]

const INQUIRY_TYPE_LABEL = {
  'robot-welding': '로봇 용접 자동화',
  'paint-logistics': '도장/물류 자동화',
  'plc': 'PLC 자동화 설비',
  'mes': '생산관리 시스템',
  'servo': '서보모터 제어',
  'beone': '비원 (Be-One)',
  'PSD5-24': '생산현황판 (PSD5-24)',
  'panel': '제어반 / 동력반',
  'other': '기타 문의',
}

function InquiriesTab() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)  // 상세 보기 중인 문의 객체
  const [reply, setReply] = useState('')
  const [savingReply, setSavingReply] = useState(false)
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
                style={{
                  fontSize: 11, padding: '4px 12px', cursor: 'pointer', fontFamily: "'DM Mono', monospace",
                  background: selected.status === value ? 'rgba(0,180,216,0.2)' : 'transparent',
                  border: selected.status === value ? '1px solid rgba(0,180,216,0.5)' : '1px solid rgba(255,255,255,0.15)',
                  color: selected.status === value ? 'var(--cyan)' : 'rgba(255,255,255,0.5)'
                }}>
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
            style={{
              fontSize: 11, padding: '5px 14px', cursor: 'pointer', fontFamily: "'DM Mono', monospace",
              background: statusFilter === value ? 'rgba(0,180,216,0.15)' : 'transparent',
              border: statusFilter === value ? '1px solid rgba(0,180,216,0.5)' : '1px solid rgba(255,255,255,0.12)',
              color: statusFilter === value ? 'var(--cyan)' : 'rgba(255,255,255,0.45)'
            }}>
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
          <div key={iq.id} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 100px 90px 80px 80px', padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', gap: 8,
            background: iq.status === 'new' ? 'rgba(204,34,0,0.03)' : 'transparent'
          }}>
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
   회사연혁 탭
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EMPTY_HISTORY = { year: '', content_ko: '', content_en: '' }

function HistoryTab() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list')
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState(EMPTY_HISTORY)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const initialHistoryData = [
    { year: '2026', content_ko: '02월 06일 — ISO 9001/14001/45001 인증', content_en: 'Feb 6 — ISO 9001/14001/45001 certification' },
    { year: '2026', content_ko: '03월 18일 — 부설연구전담부서 설립 인정', content_en: 'Mar 18 — Accreditation of in-house dedicated research department' },
    { year: '2025', content_ko: '현재 운영 중 — 국내외 자동차 부품사 대상 공장자동화 프로젝트 수행', content_en: 'Ongoing — factory automation projects for domestic and international automotive parts manufacturers' },
    { year: '2025', content_ko: '임직원 16명 + 협력사 3명 (2025년 8월 기준)', content_en: '16 staff + 3 partner personnel (as of August 2025)' },
    { year: '2025', content_ko: '07월 28일 — 미국법인(OSRND USA, INC) 설립', content_en: 'Jul 28 — U.S. subsidiary established' },
    { year: '2025', content_ko: '사업장: 1022 Hillcrest Parkway, Suite 306, Dublin, GA, 31021, USA', content_en: 'Location: 1022 Hillcrest Parkway, Suite 306, Dublin, GA, 31021, USA' },
    { year: '2024', content_ko: '02월 — ㈜화신 LX3-CHASSIS라인 설치 공사 및 시운전', content_en: 'Feb — Hwashin LX3-CHASSIS line installation and commissioning' },
    { year: '2024', content_ko: '04월 — 수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', content_en: 'Apr — Automation parts and cable supply to Soosung Precision Machinery' },
    { year: '2024', content_ko: '07월 — ㈜화신 LQ2-CHASSIS라인 설치 공사 및 시운전', content_en: 'Jul — Hwashin LQ2-CHASSIS line installation and commissioning' },
    { year: '2024', content_ko: '10월 — ㈜화신 JG1 BPC라인 설치 공사 및 시운전', content_en: 'Oct — Hwashin JG1 BPC line installation and commissioning' },
    { year: '2023', content_ko: '01월 — ㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 공사 및 시운전', content_en: 'Jan — Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning' },
    { year: '2023', content_ko: '07월 — ㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 공사 및 시운전', content_en: 'Jul — Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning' },
    { year: '2023', content_ko: '09월 — ㈜화신 TSD-AO1 CHASSIS라인 설치 공사 및 시운전', content_en: 'Sep — Hwashin TSD-AO1 CHASSIS line installation and commissioning' },
    { year: '2023', content_ko: '10월 — ㈜화신 Nea-CHASSI라인 설치 공사 및 시운전', content_en: 'Oct — Hwashin Nea-CHASSI line installation and commissioning' },
    { year: '2022', content_ko: '03월 — ㈜화신 미국법인 NX4a 차종 차체/샤시 설치 공사 및 시운전', content_en: 'Mar — Hwashin US Corp. NX4a body/chassis installation and commissioning' },
    { year: '2022', content_ko: '06월 — ㈜화신 미국법인 J3 차종 샤시 생산라인 설치 공사 및 시운전', content_en: 'Jun — Hwashin US Corp. J3 chassis production line installation and commissioning' },
    { year: '2022', content_ko: '09월 — ㈜화신 MV_ME 차종 샤시 생산라인 설치 공사 및 시운전', content_en: 'Sep — Hwashin MV_ME chassis production line installation and commissioning' },
    { year: '2022', content_ko: '11월 — ㈜화신 CN7 PE 차종 샤시 생산라인 설치 공사 및 시운전', content_en: 'Nov — Hwashin CN7 PE chassis production line installation and commissioning' },
    { year: '2021', content_ko: '01월 — ㈜화신 미국법인 NX4a_DL3 차종 생산 라인 시운전', content_en: 'Jan — Hwashin US Corp. NX4a_DL3 production line commissioning' },
    { year: '2021', content_ko: '03월 — ㈜화신 NE 차종 생산 라인 시운전', content_en: 'Mar — Hwashin NE production line commissioning' },
    { year: '2021', content_ko: '08월 — ㈜화신 미국법인 VW 차종 라인 시운전', content_en: 'Aug — Hwashin US Corp. VW line commissioning' },
    { year: '2021', content_ko: '11월 — ㈜화신 미국법인 NQ5a 차종 외 다수', content_en: 'Nov — Hwashin US Corp. NQ5a and multiple other projects' },
    { year: '2014', content_ko: '01월 01일 — 오에스알앤디㈜ 설립', content_en: 'January 1 — OSRnD Co., Ltd. founded' },
    { year: '2014', content_ko: '울산광역시 북구 산성로 40, 821호 (UKIC, 효문동)', content_en: 'Location: 821, Sansung-ro 40, Buk-gu, Ulsan (UKIC)' },
    { year: '2014', content_ko: '공장자동화 및 연구개발 사업 개시', content_en: 'Factory automation and R&D business commenced' },
    { year: '2007', content_ko: '06월 09일 — 울산 북구 효문동 812-1번지로 사업장 이전', content_en: 'Jun 9 — Relocated to 812-1, Hyomun-dong, Buk-gu, Ulsan' },
    { year: '2004', content_ko: '01월 03일 — OSRnD로 회사명 변경 (대표: 권오수)', content_en: 'Jan 3 — Company renamed to OSRnD (CEO: Kwon Oh-soo)' },
    { year: '2004', content_ko: '사업장: 울산 중구 학성동 427-3번지', content_en: 'Location: 427-3, Hakseong-dong, Jung-gu, Ulsan' },
    { year: '2001', content_ko: '07월 01일 — e-kos 설립 (대표: 권오수)', content_en: 'Jul 1 — e-kos founded (CEO: Kwon Oh-soo)' },
    { year: '2001', content_ko: '사업장: 울산 북구 화봉동 884-12번지', content_en: 'Location: 884-12, Hwabong-dong, Buk-gu, Ulsan' },
  ]

  const handleUploadInitialHistory = async () => {
    if (items.length > 0) {
      alert('이미 Firestore에 데이터가 있습니다. 중복 업로드를 방지하기 위해 업로드를 중단합니다.')
      return
    }
    if (!window.confirm('기존 연혁 데이터를 Firestore에 업로드합니다. 계속하시겠습니까?')) return
    setUploading(true)
    try {
      for (const item of initialHistoryData) {
        await addDoc(collection(db, 'history'), { ...item, createdAt: serverTimestamp() })
      }
      alert('업로드 완료! 총 ' + initialHistoryData.length + '개 항목이 저장되었습니다.')
      setUploaded(true)
      await fetchItems()
    } catch (err) {
      alert('업로드 실패: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'history'), orderBy('year', 'desc'))
      const snap = await getDocs(q)
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('연혁 조회 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const handleNew = () => { setEditTarget(null); setForm(EMPTY_HISTORY); setView('form') }
  const handleEdit = (item) => {
    setEditTarget(item)
    setForm({ year: item.year || '', content_ko: item.content_ko || '', content_en: item.content_en || '' })
    setView('form')
  }
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.year.trim() || !form.content_ko.trim()) { alert('연도와 한글 내용은 필수입니다.'); return }
    setSaving(true)
    try {
      const data = {
        year: form.year.trim(),
        content_ko: form.content_ko.trim(),
        content_en: form.content_en.trim() || form.content_ko.trim(),
      }
      if (editTarget) {
        await updateDoc(doc(db, 'history', editTarget.id), data)
      } else {
        await addDoc(collection(db, 'history'), { ...data, createdAt: serverTimestamp() })
      }
      await fetchItems()
      setView('list')
    } catch (err) {
      alert('저장 실패: ' + err.message)
    } finally {
      setSaving(false)
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'history', id))
      setDeleteConfirm(null)
      await fetchItems()
    } catch (err) {
      alert('삭제 실패: ' + err.message)
    }
  }
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))

  /* ─ 목록 뷰 ─ */
  if (view === 'list') return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>회사연혁 관리</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={handleNew} style={S.btn()}>+ 새 연혁 추가</button>
          {items.length === 0 && (
            <button type="button" onClick={handleUploadInitialHistory} disabled={uploading || uploaded}
              style={S.btn(uploading || uploaded ? 'rgba(245,124,0,0.4)' : 'var(--orange)')}>
              {uploading ? '업로드 중...' : uploaded ? '업로드 완료' : '📥 기존 데이터 업로드'}
            </button>
          )}
        </div>
      </div>
      <div style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 120px', padding: '10px 16px', borderBottom: '1px solid rgba(0,180,216,0.15)', fontSize: 10, color: 'rgba(0,180,216,0.7)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", gap: 8 }}>
          <span>연도</span><span>내용 (한글)</span><span>내용 (영문)</span><span style={{ textAlign: 'right' }}>관리</span>
        </div>
        {loading
          ? <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>불러오는 중...</div>
          : items.length === 0
            ? <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>등록된 연혁이 없습니다.</div>
            : items.map(item => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 120px', padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: 'var(--cyan)', fontWeight: 700 }}>{item.year}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.content_ko}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.content_en}</span>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => handleEdit(item)} style={{ background: 'transparent', border: '1px solid rgba(0,180,216,0.4)', color: 'rgba(0,180,216,0.8)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>수정</button>
                  {deleteConfirm === item.id
                    ? <><button type="button" onClick={() => handleDelete(item.id)} style={{ background: '#cc2200', border: 'none', color: '#fff', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>확인</button>
                      <button type="button" onClick={() => setDeleteConfirm(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>취소</button></>
                    : <button type="button" onClick={() => setDeleteConfirm(item.id)} style={{ background: 'transparent', border: '1px solid rgba(204,34,0,0.4)', color: 'rgba(204,34,0,0.7)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>삭제</button>}
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
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{editTarget ? '연혁 수정' : '새 연혁 추가'}</h2>
      </div>
      <form onSubmit={handleSave} style={S.card}>
        <div style={{ marginBottom: 18 }}>
          <label style={S.label}>연도 * (예: 2026)</label>
          <input type="text" value={form.year} onChange={e => setField('year', e.target.value)}
            required placeholder="예) 2026" style={{ ...S.input, maxWidth: 300 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={S.label}>내용 (한글) *</label>
            <textarea value={form.content_ko} onChange={e => setField('content_ko', e.target.value)}
              required placeholder="연혁 내용을 입력하세요." rows={6} style={S.input} />
          </div>
          <div>
            <label style={S.label}>Content (English)</label>
            <textarea value={form.content_en} onChange={e => setField('content_en', e.target.value)}
              placeholder="Enter history content in English." rows={6} style={S.input} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={S.btn(saving ? 'rgba(0,180,216,0.4)' : 'var(--cyan)')}>
            {saving ? '저장 중...' : (editTarget ? '수정 완료' : '추가하기')}
          </button>
          <button type="button" onClick={() => setView('list')} style={S.btnGhost}>취소</button>
        </div>
      </form>
    </>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   사업실적 탭
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EMPTY_RECORD = { year: '', date: '', content_ko: '', content_en: '', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' }

const TAG_OPTIONS = [
  { ko: '자동화/시운전', en: 'Auto/Comm.' },
  { ko: '용접자동화', en: 'Weld Auto.' },
  { ko: '해외/시운전', en: 'US / Comm.' },
  { ko: '해외/용접', en: 'US / Weld' },
  { ko: '부품공급', en: 'Parts Supply' },
  { ko: '해외/다수', en: 'US / Multiple' },
]

function RecordsTab() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list')
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState(EMPTY_RECORD)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const initialRecordsData = [
    { year: '2026', date: '2026.01', content_ko: '㈜화신 NX5a 차체라인 설치 및 시운전', content_en: 'Hwashin NX5a body line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2026', date: '2026.02', content_ko: '㈜화신 LX3a HEV 차종 설치 및 시운전', content_en: 'Hwashin LX3a HEV model installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2026', date: '2026.02', content_ko: '㈜화신 MX5a EREV 차체라인 설치 및 시운전', content_en: 'Hwashin MX5a EREV body line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2026', date: '2026.02', content_ko: '㈜화신 NX5a & MX5a EREV 샤시라인 설치 및 시운전', content_en: 'Hwashin NX5a & MX5a EREV chassis line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2025', date: '2025.01', content_ko: '㈜화신 JG1 BPC라인 설치 및 시운전', content_en: 'Hwashin JG1 BPC line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2025', date: '2025.04', content_ko: '수성정밀기계㈜ 포구청소기 자동화 부품 및 케이블 공급', content_en: 'Soosung Precision — port cleaner automation parts and cable supply', tag_ko: '부품공급', tag_en: 'Parts Supply' },
    { year: '2025', date: '2025.05', content_ko: '㈜화신 R2 CHASSIS라인 설치 및 시운전', content_en: 'Hwashin R2 CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2025', date: '2025.07', content_ko: '㈜화신 P833 CHASSIS라인 설치 및 시운전', content_en: 'Hwashin P833 CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2025', date: '2025.09', content_ko: '㈜화신 NQ5a PE HEV라인 설치 및 시운전', content_en: 'Hwashin NQ5a PE HEV line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2024', date: '2024.02', content_ko: '㈜화신 LX3-CHASSIS라인 설치 및 시운전', content_en: 'Hwashin LX3-CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2024', date: '2024.04', content_ko: '수성정밀기계㈜ ABC 부품 및 케이블 공급', content_en: 'Soosung Precision — automation parts and cable supply', tag_ko: '부품공급', tag_en: 'Parts Supply' },
    { year: '2024', date: '2024.07', content_ko: '㈜화신 LQ2-CHASSIS라인 설치 및 시운전', content_en: 'Hwashin LQ2-CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2024', date: '2024.10', content_ko: '㈜화신 JG1 BPC라인 설치 및 시운전', content_en: 'Hwashin JG1 BPC line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2023', date: '2023.01', content_ko: '㈜화신 MVa-Mea NO.1 WELD LINE / 샤시 설치 및 시운전', content_en: 'Hwashin MVa-Mea NO.1 WELD LINE / chassis installation and commissioning', tag_ko: '용접자동화', tag_en: 'Weld Auto.' },
    { year: '2023', date: '2023.07', content_ko: '㈜화신 미국법인 MQ4a RR U/ARM WELD 설치 및 시운전', content_en: 'Hwashin US Corp. MQ4a RR U/ARM WELD installation and commissioning', tag_ko: '해외/용접', tag_en: 'US / Weld' },
    { year: '2023', date: '2023.09', content_ko: '㈜화신 TSD-AO1 CHASSIS라인 설치 및 시운전', content_en: 'Hwashin TSD-AO1 CHASSIS line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2023', date: '2023.10', content_ko: '㈜화신 Nea-CHASSI라인 설치 및 시운전', content_en: 'Hwashin Nea-CHASSI line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2022', date: '2022.03', content_ko: '㈜화신 미국법인 NX4a 차종 차체/샤시 설치 및 시운전', content_en: 'Hwashin US Corp. NX4a body/chassis installation and commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.' },
    { year: '2022', date: '2022.06', content_ko: '㈜화신 미국법인 J3 차종 샤시 생산라인 설치 및 시운전', content_en: 'Hwashin US Corp. J3 chassis production line installation and commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.' },
    { year: '2022', date: '2022.09', content_ko: '㈜화신 MV_ME 차종 샤시 생산라인 설치 및 시운전', content_en: 'Hwashin MV_ME chassis production line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2022', date: '2022.11', content_ko: '㈜화신 CN7 PE 차종 샤시 생산라인 설치 및 시운전', content_en: 'Hwashin CN7 PE chassis production line installation and commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2021', date: '2021.01', content_ko: '㈜화신 미국법인 NX4a_DL3 차종 생산 라인 시운전', content_en: 'Hwashin US Corp. NX4a_DL3 production line commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.' },
    { year: '2021', date: '2021.03', content_ko: '㈜화신 NE 차종 생산 라인 시운전', content_en: 'Hwashin NE production line commissioning', tag_ko: '자동화/시운전', tag_en: 'Auto/Comm.' },
    { year: '2021', date: '2021.08', content_ko: '㈜화신 미국법인 VW 차종 라인 시운전', content_en: 'Hwashin US Corp. VW line commissioning', tag_ko: '해외/시운전', tag_en: 'US / Comm.' },
    { year: '2021', date: '2021.11', content_ko: '㈜화신 미국법인 NQ5a 차종 외 다수', content_en: 'Hwashin US Corp. NQ5a and multiple other models', tag_ko: '해외/다수', tag_en: 'US / Multiple' },
  ]

  const handleUploadInitialRecords = async () => {
    if (items.length > 0) {
      alert('이미 Firestore에 데이터가 있습니다. 중복 업로드를 방지하기 위해 업로드를 중단합니다.')
      return
    }
    if (!window.confirm('기존 사업실적 데이터를 Firestore에 업로드합니다. 계속하시겠습니까?')) return
    setUploading(true)
    try {
      for (const item of initialRecordsData) {
        await addDoc(collection(db, 'records'), { ...item, createdAt: serverTimestamp() })
      }
      alert('업로드 완료! 총 ' + initialRecordsData.length + '개 항목이 저장되었습니다.')
      setUploaded(true)
      await fetchItems()
    } catch (err) {
      alert('업로드 실패: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'records'), orderBy('year', 'desc'))
      const snap = await getDocs(q)
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('사업실적 조회 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const handleNew = () => { setEditTarget(null); setForm(EMPTY_RECORD); setView('form') }
  const handleEdit = (item) => {
    setEditTarget(item)
    setForm({
      year: item.year || '',
      date: item.date || '',
      content_ko: item.content_ko || '',
      content_en: item.content_en || '',
      tag_ko: item.tag_ko || '자동화/시운전',
      tag_en: item.tag_en || 'Auto/Comm.',
    })
    setView('form')
  }
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.year.trim() || !form.content_ko.trim()) { alert('연도와 한글 내용은 필수입니다.'); return }
    setSaving(true)
    try {
      const data = {
        year: form.year.trim(),
        date: form.date.trim(),
        content_ko: form.content_ko.trim(),
        content_en: form.content_en.trim() || form.content_ko.trim(),
        tag_ko: form.tag_ko,
        tag_en: form.tag_en,
      }
      if (editTarget) {
        await updateDoc(doc(db, 'records', editTarget.id), data)
      } else {
        await addDoc(collection(db, 'records'), { ...data, createdAt: serverTimestamp() })
      }
      await fetchItems()
      setView('list')
    } catch (err) {
      alert('저장 실패: ' + err.message)
    } finally {
      setSaving(false)
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'records', id))
      setDeleteConfirm(null)
      await fetchItems()
    } catch (err) {
      alert('삭제 실패: ' + err.message)
    }
  }
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleTagChange = (ko) => {
    const found = TAG_OPTIONS.find(t => t.ko === ko)
    if (found) setForm(f => ({ ...f, tag_ko: found.ko, tag_en: found.en }))
  }

  /* ─ 목록 뷰 ─ */
  if (view === 'list') return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>사업실적 관리</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={handleNew} style={S.btn()}>+ 새 실적 추가</button>
          {items.length === 0 && (
            <button type="button" onClick={handleUploadInitialRecords} disabled={uploading || uploaded}
              style={S.btn(uploading || uploaded ? 'rgba(245,124,0,0.4)' : 'var(--orange)')}>
              {uploading ? '업로드 중...' : uploaded ? '업로드 완료' : '📥 기존 데이터 업로드'}
            </button>
          )}
        </div>
      </div>
      <div style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '70px 90px 1fr 100px 120px', padding: '10px 16px', borderBottom: '1px solid rgba(0,180,216,0.15)', fontSize: 10, color: 'rgba(0,180,216,0.7)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", gap: 8 }}>
          <span>연도</span><span>날짜</span><span>내용 (한글)</span><span>태그</span><span style={{ textAlign: 'right' }}>관리</span>
        </div>
        {loading
          ? <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>불러오는 중...</div>
          : items.length === 0
            ? <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>등록된 사업실적이 없습니다.</div>
            : items.map(item => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '70px 90px 1fr 100px 120px', padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: 'var(--cyan)', fontWeight: 700 }}>{item.year}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Mono', monospace" }}>{item.date}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.content_ko}</span>
                <span style={{ fontSize: 10, color: 'var(--cyan)', fontFamily: "'DM Mono', monospace" }}>{item.tag_ko}</span>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => handleEdit(item)} style={{ background: 'transparent', border: '1px solid rgba(0,180,216,0.4)', color: 'rgba(0,180,216,0.8)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>수정</button>
                  {deleteConfirm === item.id
                    ? <><button type="button" onClick={() => handleDelete(item.id)} style={{ background: '#cc2200', border: 'none', color: '#fff', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>확인</button>
                      <button type="button" onClick={() => setDeleteConfirm(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>취소</button></>
                    : <button type="button" onClick={() => setDeleteConfirm(item.id)} style={{ background: 'transparent', border: '1px solid rgba(204,34,0,0.4)', color: 'rgba(204,34,0,0.7)', fontSize: 11, padding: '4px 10px', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>삭제</button>}
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
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{editTarget ? '실적 수정' : '새 실적 추가'}</h2>
      </div>
      <form onSubmit={handleSave} style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.label}>연도 * (예: 2026)</label>
            <input type="text" value={form.year} onChange={e => setField('year', e.target.value)}
              required placeholder="예) 2026" style={{ ...S.input, maxWidth: 200 }} />
          </div>
          <div>
            <label style={S.label}>날짜 (예: 2026.01)</label>
            <input type="text" value={form.date} onChange={e => setField('date', e.target.value)}
              placeholder="예) 2026.01" style={{ ...S.input, maxWidth: 200 }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div>
            <label style={S.label}>내용 (한글) *</label>
            <textarea value={form.content_ko} onChange={e => setField('content_ko', e.target.value)}
              required placeholder="사업실적 내용을 입력하세요." rows={4} style={S.input} />
          </div>
          <div>
            <label style={S.label}>Content (English)</label>
            <textarea value={form.content_en} onChange={e => setField('content_en', e.target.value)}
              placeholder="Enter record content in English." rows={4} style={S.input} />
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={S.label}>태그 선택</label>
          <select value={form.tag_ko} onChange={e => handleTagChange(e.target.value)}
            style={{ ...S.input, maxWidth: 300, cursor: 'pointer' }}>
            {TAG_OPTIONS.map(({ ko }) => (
              <option key={ko} value={ko}>{ko}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={S.btn(saving ? 'rgba(0,180,216,0.4)' : 'var(--cyan)')}>
            {saving ? '저장 중...' : (editTarget ? '수정 완료' : '추가하기')}
          </button>
          <button type="button" onClick={() => setView('list')} style={S.btnGhost}>취소</button>
        </div>
      </form>
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
          <img
            src="/src/assets/images/osrnd-logo.png"
            alt="OSRnD 오에스알앤디㈜"
            style={{ height: '32px', mixBlendMode: 'lighten' }}
          />
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
            { key: 'notices', label: '📋  공지사항' },
            { key: 'inquiries', label: '✉️  문의사항' },
            { key: 'history', label: '📅  회사연혁' },
            { key: 'records', label: '📊  사업실적' },
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

        {activeTab === 'notices' && <NoticesTab />}
        {activeTab === 'inquiries' && <InquiriesTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'records' && <RecordsTab />}
      </div>
    </div>
  )
}

export default AdminDashboard
