// 푸터 — 상호작용이 없어 Server Component로 유지, getDictionary()로 쿠키 기준 언어를 직접 조회한다.
import Link from 'next/link'
import { getDictionary } from '../lib/i18n/dictionary'

export default async function Footer() {
  const { t } = await getDictionary()

  return (
    <footer>
      <div className="ft-in">
        <div className="ft-grid">
          <div className="ft-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/osrnd-logo.png" alt="OSRnD 오에스알앤디㈜" style={{ height: 40, mixBlendMode: 'lighten' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 }}>
              {t('footer.address')}
            </p>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: 12, color: 'var(--cyan)' }}>052-296-3734</p>
          </div>

          <div className="ft-col">
            <h5>{t('footer.col.company')}</h5>
            <ul>
              <li>
                <Link href="/about-intro">{t('footer.overview')}</Link>
              </li>
              <li>
                <Link href="/about-philosophy">{t('footer.philosophy')}</Link>
              </li>
              <li>
                <Link href="/about-history">{t('footer.history')}</Link>
              </li>
              <li>
                <Link href="/about-org">{t('footer.org')}</Link>
              </li>
              <li>
                <Link href="/about-cert">{t('footer.cert')}</Link>
              </li>
              <li>
                <Link href="/about-location">{t('footer.location')}</Link>
              </li>
            </ul>
          </div>

          <div className="ft-col">
            <h5>{t('footer.col.biz')}</h5>
            <ul>
              <li>
                <Link href="/biz-factory">{t('footer.factory')}</Link>
              </li>
              <li>
                <Link href="/biz-rnd">{t('footer.rnd')}</Link>
              </li>
              <li>
                <Link href="/prod-beone">{t('footer.beone')}</Link>
              </li>
              <li>
                <Link href="/prod-psd">{t('footer.psd')}</Link>
              </li>
              <li>
                <Link href="/prod-panel">{t('footer.panel')}</Link>
              </li>
            </ul>
          </div>

          <div className="ft-col">
            <h5>{t('footer.col.contact')}</h5>
            <ul>
              <li>
                <Link href="/record-list">{t('footer.records')}</Link>
              </li>
              <li>
                <Link href="/clients">{t('footer.clients')}</Link>
              </li>
              <li>
                <Link href="/notice">{t('footer.notice')}</Link>
              </li>
              <li>
                <Link href="/inquiry">{t('footer.inquiry')}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.legal')}</p>
        </div>
      </div>
    </footer>
  )
}
