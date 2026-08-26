// 푸터 컴포넌트
import { useTranslation } from '../hooks/useTranslation'

function Footer({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="ft-in">
        <div className="ft-grid">
          {/* 회사 정보 */}
          <div className="ft-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img
                src="/osrnd-logo.png"
                alt="OSRnD 오에스알앤디㈜"
                style={{ height: '40px', mixBlendMode: 'lighten' }}
              />
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 }}>
              {t('footer.address')}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--cyan)' }}>
              052-296-3734
            </p>
          </div>

          {/* 회사소개 */}
          <div className="ft-col">
            <h5>{t('footer.col.company')}</h5>
            <ul>
              <li><a onClick={() => onNavigate('about-intro')}>{t('footer.overview')}</a></li>
              <li><a onClick={() => onNavigate('about-philosophy')}>{t('footer.philosophy')}</a></li>
              <li><a onClick={() => onNavigate('about-history')}>{t('footer.history')}</a></li>
              <li><a onClick={() => onNavigate('about-org')}>{t('footer.org')}</a></li>
              <li><a onClick={() => onNavigate('about-cert')}>{t('footer.cert')}</a></li>
              <li><a onClick={() => onNavigate('about-location')}>{t('footer.location')}</a></li>
            </ul>
          </div>

          {/* 사업/제품 */}
          <div className="ft-col">
            <h5>{t('footer.col.biz')}</h5>
            <ul>
              <li><a onClick={() => onNavigate('biz-factory')}>{t('footer.factory')}</a></li>
              <li><a onClick={() => onNavigate('biz-rnd')}>{t('footer.rnd')}</a></li>
              <li><a onClick={() => onNavigate('prod-beone')}>{t('footer.beone')}</a></li>
              <li><a onClick={() => onNavigate('prod-psd')}>{t('footer.psd')}</a></li>
              <li><a onClick={() => onNavigate('prod-panel')}>{t('footer.panel')}</a></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="ft-col">
            <h5>{t('footer.col.contact')}</h5>
            <ul>
              <li><a onClick={() => onNavigate('record-list')}>{t('footer.records')}</a></li>
              <li><a onClick={() => onNavigate('clients')}>{t('footer.clients')}</a></li>
              <li><a onClick={() => onNavigate('notice')}>{t('footer.notice')}</a></li>
              <li><a onClick={() => onNavigate('inquiry')}>{t('footer.inquiry')}</a></li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.legal')}</p>
          {/* 관리자 링크 — 방문자 눈에 띄지 않게 */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
