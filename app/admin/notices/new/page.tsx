// 새 공지사항 작성
import AdminTopBar from '../../../components/AdminTopBar'
import NoticeForm from '../NoticeForm'
import { createNoticeAction } from '../actions'

export default function NewNoticePage() {
  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">새 공지사항 작성</h1>
          <div style={{ marginTop: 24 }}>
            <NoticeForm action={createNoticeAction} />
          </div>
        </div>
      </div>
    </>
  )
}
