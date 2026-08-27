// 공지사항 조회수 증가 — 공개 액션(인증 불필요)
'use server'

import { incrementNoticeViews } from '../lib/notices'

export async function incrementViewsAction(id: string): Promise<void> {
  await incrementNoticeViews(id)
}
