// 사업실적 수정
import { notFound } from 'next/navigation'
import AdminTopBar from '../../../../components/AdminTopBar'
import ProjectForm from '../../ProjectForm'
import { getProject } from '../../../../lib/projects'
import { updateProjectAction } from '../../actions'

export default async function EditProjectPage(props: PageProps<'/admin/projects/[id]/edit'>) {
  const { id } = await props.params
  const record = await getProject(id)
  if (!record) notFound()

  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">사업실적 수정</h1>
          <div style={{ marginTop: 24 }}>
            <ProjectForm action={updateProjectAction.bind(null, id)} record={record} />
          </div>
        </div>
      </div>
    </>
  )
}
