// 공지사항 페이지
import PageHero from '../components/PageHero'
import NoticeAccordion from './NoticeAccordion'
import { getDictionary } from '../lib/i18n/dictionary'
import { listNotices } from '../lib/notices'

export default async function NoticePage() {
  const { lang, t } = await getDictionary()
  const notices = await listNotices()

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('common.home'), href: '/' },
          { label: t('support.bc'), href: '/customer-center' },
          { label: t('notice.bc') },
        ]}
        title={t('notice.title')}
        description={t('notice.ph.desc')}
      />

      <div className="outer">
        <div className="sec">
          <NoticeAccordion
            notices={notices}
            lang={lang}
            labels={{
              num: t('notice.col.num'),
              title: t('notice.col.title'),
              date: t('notice.col.date'),
              views: t('notice.col.views'),
              badge: t('notice.badge'),
              empty: t('notice.empty'),
            }}
          />
        </div>
      </div>
    </>
  )
}
