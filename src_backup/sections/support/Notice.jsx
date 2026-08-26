// 공지사항 페이지 — Firestore 연동 (기존 DB 구조: title_ko/title_en, content_ko/content_en, pinned, createdAt)
import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, query, orderBy, updateDoc, doc, increment } from 'firebase/firestore'
import { db } from '../../firebase'
import { useLanguage, t } from '../../contexts/LanguageContext'

// Firestore Timestamp → 날짜 문자열 변환
function formatDate(createdAt) {
  if (!createdAt) return '-'
  try {
    const d = createdAt.toDate ? createdAt.toDate() : new Date(createdAt)
    return d.toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1)
  } catch {
    return '-'
  }
}

function Notice({ onNavigate }) {
  const { lang } = useLanguage()
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const viewedRef = useRef(new Set())

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        // pinned 우선 정렬 (기존 HTML과 동일)
        docs.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
        setNotices(docs)
      } catch (err) {
        console.error('공지사항 조회 실패:', err)
        setError(err.message || '데이터를 불러올 수 없습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchNotices()
  }, [])

  // 공지 클릭 — 아코디언 토글 + 조회수 1회 증가
  const handleOpen = async (notice) => {
    const isOpening = selected !== notice.id
    setSelected(isOpening ? notice.id : null)
    if (isOpening && !viewedRef.current.has(notice.id)) {
      viewedRef.current.add(notice.id)
      try {
        await updateDoc(doc(db, 'notices', notice.id), { views: increment(1) })
        setNotices(ns => ns.map(n => n.id === notice.id ? { ...n, views: (n.views ?? 0) + 1 } : n))
      } catch (_) {}
    }
  }

  // 현재 언어에 맞는 제목/내용 반환 (fallback 포함)
  const getTitle   = (n) => lang === 'ko' ? (n.title_ko   || n.title_en   || '') : (n.title_en   || n.title_ko   || '')
  const getContent = (n) => lang === 'ko' ? (n.content_ko || n.content_en || '') : (n.content_en || n.content_ko || '')

  // pinned 제외한 일반 글 번호 계산
  const normalNotices = notices.filter(n => !n.pinned)

  return (
    <>
      <div className="bc"><div className="bc-in">
        <a onClick={() => onNavigate('home')}>{t(lang, '홈', 'Home')}</a> ›
        <a onClick={() => onNavigate('customer-center')}>{t(lang, '고객센터', 'Support')}</a> ›
        <span>{t(lang, '공지사항', 'Notice')}</span>
      </div></div>
      <div className="ph"><div className="ph-in">
        <h1>{t(lang, '공지사항', 'Notice')}</h1>
        <p>{t(lang, '오에스알앤디㈜의 공지 및 새소식입니다.', 'Announcements and news from OSRnD Co., Ltd.')}</p>
      </div></div>

      <div className="outer"><div className="sec">
        {/* 테이블 헤더 */}
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 130px 80px', padding: '12px 22px', background: 'var(--card)', border: '1px solid var(--border)', fontSize: 10, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>
          <span>{t(lang, '번호', 'No.')}</span>
          <span>{t(lang, '제목', 'Title')}</span>
          <span>{t(lang, '작성일', 'Date')}</span>
          <span>{t(lang, '조회', 'Views')}</span>
        </div>

        {/* 로딩 */}
        {loading && (
          <div style={{ padding: '80px 0', textAlign: 'center', border: '1px solid rgba(0,180,216,0.06)' }}>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>{t(lang, '불러오는 중...', 'Loading...')}</p>
          </div>
        )}

        {/* 오류 */}
        {!loading && error && (
          <div style={{ padding: '48px 24px', border: '1px solid rgba(204,34,0,0.2)', background: 'rgba(204,34,0,0.05)' }}>
            <p style={{ fontSize: 13, color: 'var(--orange)', marginBottom: 8 }}>{t(lang, '데이터를 불러올 수 없습니다.', 'Failed to load data.')}</p>
            <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>{error}</p>
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && !error && notices.length === 0 && (
          <div style={{ padding: '80px 0', textAlign: 'center', border: '1px solid rgba(0,180,216,0.06)' }}>
            <p style={{ fontSize: 36, marginBottom: 14 }}>📭</p>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>{t(lang, '등록된 공지사항이 없습니다.', 'No notices available.')}</p>
          </div>
        )}

        {/* 목록 */}
        {!loading && !error && notices.map((notice) => {
          const isPinned = notice.pinned
          const rowNum = isPinned ? null : normalNotices.length - normalNotices.indexOf(notice)
          const isOpen = selected === notice.id

          return (
            <div key={notice.id}>
              {/* 목록 행 */}
              <div
                onClick={() => handleOpen(notice)}
                style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr 130px 80px',
                  padding: '15px 22px',
                  border: `1px solid rgba(0,180,216,${isPinned ? '0.15' : '0.06'})`,
                  borderBottom: '1px solid rgba(0,180,216,0.08)',
                  cursor: 'pointer', transition: 'background 0.2s',
                  background: isOpen ? 'var(--cyan-d)' : (isPinned ? 'rgba(0,180,216,0.04)' : 'transparent'),
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--cyan-d)'}
                onMouseLeave={e => e.currentTarget.style.background = isOpen ? 'var(--cyan-d)' : (isPinned ? 'rgba(0,180,216,0.04)' : 'transparent')}
              >
                {/* 번호 / 공지 배지 */}
                <span>
                  {isPinned
                    ? <span style={{ background: 'var(--cyan)', color: 'var(--bg)', padding: '2px 7px', fontSize: 9, letterSpacing: 1, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>
                        {t(lang, '공지', 'NOTICE')}
                      </span>
                    : <span style={{ fontSize: 13, color: 'var(--muted)' }}>{rowNum}</span>
                  }
                </span>
                {/* 제목 */}
                <span style={{ fontSize: 14, color: isOpen ? 'var(--cyan)' : 'rgba(255,255,255,0.88)', fontWeight: isOpen ? 600 : 400 }}>
                  {getTitle(notice)}
                </span>
                {/* 날짜 */}
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                  {formatDate(notice.createdAt)}
                </span>
                {/* 조회수 */}
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                  {notice.views ?? 0}
                </span>
              </div>

              {/* 상세 내용 — 아코디언 */}
              {isOpen && (
                <div style={{ padding: '28px 28px 28px 80px', background: 'rgba(0,180,216,0.03)', borderBottom: '1px solid rgba(0,180,216,0.1)', borderLeft: '2px solid var(--cyan)' }}>
                  <div
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: getContent(notice) }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div></div>
    </>
  )
}

export default Notice
