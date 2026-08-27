// 새 사업실적 작성
import AdminTopBar from '../../../components/AdminTopBar'
import ProjectForm from '../ProjectForm'
import { createProjectAction } from '../actions'

export default function NewProjectPage() {
  return (
    <>
      <AdminTopBar />
      <div className="outer">
        <div className="sec">
          <h1 className="stitle">새 사업실적 작성</h1>
          <div style={{ marginTop: 24 }}>
            <ProjectForm action={createProjectAction} />
          </div>
        </div>
      </div>
    </>
  )
}
