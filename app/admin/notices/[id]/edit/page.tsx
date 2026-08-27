// 공지사항 수정
import { notFound } from 'next/navigation'
import AdminTopBar from '../../../../components/AdminTopBar'
import NoticeForm from '../../NoticeForm'
import { getNotice } from '../../../../lib/notices'
import { updateNoticeAction } from '../../actions'

export default async function EditNoticePage(props: PageProps<'/admin/notices/[id]/edit'>) {
  const { id } = await props.params
  const notice = await getNotice(id)
  if (!notice) notFound()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">공지사항 수정</h1>
          <div style={{ marginTop: 24 }}>
            <NoticeForm action={updateNoticeAction.bind(null, id)} notice={notice} />
          </div>
        </div>
      </div>
    </>
  )
}
