// 홈페이지 — Phase 1은 헤더/푸터/디자인 토큰/다국어 셸까지만 담당.
// 히어로/사업분야/제품/고객사/CTA 등 실제 홈 콘텐츠는 Phase 2(정적 페이지 이관)에서 채운다.
import { getDictionary } from './lib/i18n/dictionary'

export default async function HomePage() {
  const { t } = await getDictionary()

  return (
    <div className="outer">
      <div className="sec">
        <div className="eyebrow">OSRnD</div>
        <h1 className="stitle">{t('nav.about', '오에스알앤디㈜', 'OSRnD Co., Ltd.')}</h1>
        <p className="sdesc">
          {t(
            'home.placeholder.desc',
            '홈페이지 리비전이 진행 중입니다. 헤더·푸터·다국어 전환·디자인 토큰이 이 단계에서 먼저 구축되었습니다.',
            'The site revision is in progress. Header, footer, language switching, and design tokens are being built first in this phase.'
          )}
        </p>
      </div>
    </div>
  )
}
