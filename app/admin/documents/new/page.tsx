// 새 인증현황 문서 등록
import AdminTopBar from '../../../components/AdminTopBar'
import DocumentForm from '../DocumentForm'
import { createDocumentAction } from '../actions'

export default function NewDocumentPage() {
  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">새 문서 등록</h1>
          <div style={{ marginTop: 24 }}>
            <DocumentForm action={createDocumentAction} />
          </div>
        </div>
      </div>
    </>
  )
}
