// 연혁 항목 수정
import { notFound } from 'next/navigation'
import AdminTopBar from '../../../../components/AdminTopBar'
import HistoryForm from '../../HistoryForm'
import { getHistoryEntry } from '../../../../lib/history'
import { updateHistoryAction } from '../../actions'

export default async function EditHistoryPage(props: PageProps<'/admin/history/[id]/edit'>) {
  const { id } = await props.params
  const entry = await getHistoryEntry(id)
  if (!entry) notFound()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">연혁 항목 수정</h1>
          <div style={{ marginTop: 24 }}>
            <HistoryForm action={updateHistoryAction.bind(null, id)} entry={entry} />
          </div>
        </div>
      </div>
    </>
  )
}
