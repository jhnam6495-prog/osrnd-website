// 메인 앱 — 페이지 라우팅 및 전체 통합
import { useState, useEffect, useCallback } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Nav from './components/Nav'
import Footer from './components/Footer'

// 홈
import HomePage from './sections/home/HomePage'

// 회사소개
import AboutIntro from './sections/about/AboutIntro'
import AboutPhilosophy from './sections/about/AboutPhilosophy'
import AboutHistory from './sections/about/AboutHistory'
import AboutOrg from './sections/about/AboutOrg'
import AboutCert from './sections/about/AboutCert'
import AboutLocation from './sections/about/AboutLocation'

// 사업분야
import BizFactory from './sections/business/BizFactory'
import BizRnd from './sections/business/BizRnd'

// 제품소개
import ProdBeOne from './sections/products/ProdBeOne'
import ProdPsd from './sections/products/ProdPsd'
import ProdPanel from './sections/products/ProdPanel'

// 사업실적
import RecordList from './sections/projects/RecordList'
import Clients from './sections/projects/Clients'

// 고객센터
import CustomerCenter from './sections/support/CustomerCenter'
import Notice from './sections/support/Notice'
import Inquiry from './sections/support/Inquiry'

// 관리자
import AdminLogin from './sections/admin/AdminLogin'
import AdminDashboard from './sections/admin/AdminDashboard'

// 페이지 컴포넌트 맵 (Nav의 onNavigate ID와 일치해야 함)
const PAGE_MAP = {
  'home':              HomePage,
  'about-intro':       AboutIntro,
  'about-philosophy':  AboutPhilosophy,
  'about-history':     AboutHistory,
  'about-org':         AboutOrg,
  'about-cert':        AboutCert,
  'about-location':    AboutLocation,
  'biz-factory':       BizFactory,
  'biz-rnd':           BizRnd,
  'prod-beone':        ProdBeOne,
  'prod-psd':          ProdPsd,
  'prod-panel':        ProdPanel,
  'record-list':       RecordList,
  'clients':           Clients,
  'customer-center':   CustomerCenter,
  'notice':            Notice,
  'inquiry':           Inquiry,
  'admin':             AdminLogin,
  'admin-dashboard':   AdminDashboard,
}

function App() {
  const [page, setPage] = useState('home')

  // 페이지 이동 시 스크롤 최상단으로
  const navigate = useCallback((id) => {
    setPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // IntersectionObserver — 페이드인 애니메이션
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fi').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [page])

  const PageComponent = PAGE_MAP[page] || HomePage
  const isAdmin = page === 'admin' || page === 'admin-dashboard'

  // 관리자 페이지는 Nav/Footer 없이 단독 렌더링
  if (isAdmin) {
    return <PageComponent onNavigate={navigate} />
  }

  return (
    <LanguageProvider>
      <Nav onNavigate={navigate} currentPage={page} />
      <main>
        <PageComponent onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </LanguageProvider>
  )
}

export default App
