// 인증현황 문서 수정
import { notFound } from 'next/navigation'
import AdminTopBar from '../../../../components/AdminTopBar'
import DocumentForm from '../../DocumentForm'
import { getDocument } from '../../../../lib/documents'
import { updateDocumentAction } from '../../actions'

export default async function EditDocumentPage(props: PageProps<'/admin/documents/[id]/edit'>) {
  const { id } = await props.params
  const doc = await getDocument(id)
  if (!doc) notFound()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">문서 수정</h1>
          <div style={{ marginTop: 24 }}>
            <DocumentForm action={updateDocumentAction.bind(null, id)} doc={doc} />
          </div>
        </div>
      </div>
    </>
  )
}
