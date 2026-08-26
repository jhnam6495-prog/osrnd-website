// 관리자 로그인 페이지
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useTranslation } from '../../hooks/useTranslation'

function AdminLogin({ onNavigate }) {
  const { lang } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onNavigate('admin-dashboard')
    } catch (err) {
      setError(lang === 'ko' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '0 20px'
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <img
              src="/osrnd-logo.png"
              alt="OSRnD 오에스알앤디㈜"
              style={{ height: '44px', mixBlendMode: 'lighten' }}
            />
          </div>
          <p style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 3, fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>Admin Dashboard</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 36 }}>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--white)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
            {lang === 'ko' ? '관리자 로그인' : 'Admin Login'}
          </h2>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 8 }}>
              {lang === 'ko' ? '이메일' : 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@osrnd.com"
              style={{
                width: '100%', padding: '11px 14px', background: 'var(--panel)',
                border: '1px solid var(--border)', color: 'var(--white)', fontSize: 14,
                fontFamily: "'DM Mono', monospace", outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: 2, color: 'var(--muted)', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: 8 }}>
              {lang === 'ko' ? '비밀번호' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '11px 14px', background: 'var(--panel)',
                border: '1px solid var(--border)', color: 'var(--white)', fontSize: 14,
                fontFamily: "'DM Mono', monospace", outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(204,34,0,0.1)', border: '1px solid rgba(204,34,0,0.3)', color: '#ff6b6b', fontSize: 13, marginBottom: 18 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', background: loading ? 'var(--muted)' : 'var(--cyan)',
              border: 'none', color: 'var(--bg)', fontSize: 12, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase', fontFamily: "'DM Mono', monospace",
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
            }}
          >
            {loading ? (lang === 'ko' ? '로그인 중...' : 'Signing in...') : (lang === 'ko' ? '로그인' : 'Sign In')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a onClick={() => onNavigate('home')} style={{ fontSize: 12, color: 'var(--muted)', cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Mono', monospace" }}>
            {lang === 'ko' ? '← 홈으로 돌아가기' : '← Back to Home'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin