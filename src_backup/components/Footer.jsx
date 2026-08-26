// 푸터 컴포넌트
import { useLanguage, t } from '../contexts/LanguageContext'

function Footer({ onNavigate }) {
  const { lang } = useLanguage()

  return (
    <footer>
      <div className="ft-in">
        <div className="ft-grid">
          {/* 회사 정보 */}
          <div className="ft-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="logo-icon" style={{ width: 32, height: 32, fontSize: 10 }}>OS</div>
              <div>
                <div className="logo-main" style={{ fontSize: 14 }}>OSRnD</div>
                <div className="logo-sub">One-Stop R&D</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 }}>
              {t(lang,
                '울산광역시 북구 산성로 40, 821호\n(UKIC, 효문동)',
                '821, Sansung-ro 40, Buk-gu\nUlsan, Korea (UKIC)'
              )}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--cyan)' }}>
              052-296-3734
            </p>
          </div>

          {/* 회사소개 */}
          <div className="ft-col">
            <h5>{t(lang, '회사소개', 'Company')}</h5>
            <ul>
              <li><a onClick={() => onNavigate('about-intro')}>{t(lang, '회사 개요', 'Company Overview')}</a></li>
              <li><a onClick={() => onNavigate('about-philosophy')}>{t(lang, '추구 이념', 'Philosophy')}</a></li>
              <li><a onClick={() => onNavigate('about-history')}>{t(lang, '회사 연혁', 'History')}</a></li>
              <li><a onClick={() => onNavigate('about-org')}>{t(lang, '조직도', 'Organization')}</a></li>
              <li><a onClick={() => onNavigate('about-cert')}>{t(lang, '인증현황', 'Certifications')}</a></li>
              <li><a onClick={() => onNavigate('about-location')}>{t(lang, '오시는 길', 'Location')}</a></li>
            </ul>
          </div>

          {/* 사업/제품 */}
          <div className="ft-col">
            <h5>{t(lang, '사업/제품', 'Business')}</h5>
            <ul>
              <li><a onClick={() => onNavigate('biz-factory')}>{t(lang, '공장자동화', 'Factory Automation')}</a></li>
              <li><a onClick={() => onNavigate('biz-rnd')}>{t(lang, '연구개발 (R&D)', 'R&D')}</a></li>
              <li><a onClick={() => onNavigate('prod-beone')}>{t(lang, '비원 (Be-One)', 'Be-One')}</a></li>
              <li><a onClick={() => onNavigate('prod-psd')}>{t(lang, '생산현황판', 'Production Display')}</a></li>
              <li><a onClick={() => onNavigate('prod-panel')}>{t(lang, '제어반/동력반', 'Control Panels')}</a></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="ft-col">
            <h5>{t(lang, '연락처', 'Contact')}</h5>
            <ul>
              <li><a onClick={() => onNavigate('record-list')}>{t(lang, '사업실적', 'Project Records')}</a></li>
              <li><a onClick={() => onNavigate('clients')}>{t(lang, '고객사 / 협력사', 'Clients & Partners')}</a></li>
              <li><a onClick={() => onNavigate('notice')}>{t(lang, '공지사항', 'Notice')}</a></li>
              <li><a onClick={() => onNavigate('inquiry')}>{t(lang, '상담문의', 'Inquiry')}</a></li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <p>{t(lang, '© 2025 오에스알앤디㈜ (OSRnD Co., Ltd.) All rights reserved.', '© 2025 OSRnD Co., Ltd. (오에스알앤디㈜) All rights reserved.')}</p>
          <p>{t(lang, '사업자등록번호 620-81-51336 | 대표이사 권오수 | 울산광역시 북구 산성로 40, 821호', 'Business Reg. No. 620-81-51336 | CEO: Kwon Ohsoo | 821 Sansung-ro 40, Buk-gu, Ulsan, Korea')}</p>
          {/* 관리자 링크 — 방문자 눈에 띄지 않게 */}
          <p style={{ marginTop: 12 }}>
            <a
              onClick={() => onNavigate('admin')}
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}
            >
              관리자
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
