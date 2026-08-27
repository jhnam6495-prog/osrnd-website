// 새 연혁 항목 작성
import AdminTopBar from '../../../components/AdminTopBar'
import HistoryForm from '../HistoryForm'
import { createHistoryAction } from '../actions'

export default function NewHistoryPage() {
  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">새 연혁 항목 작성</h1>
          <div style={{ marginTop: 24 }}>
            <HistoryForm action={createHistoryAction} />
          </div>
        </div>
      </div>
    </>
  )
}
