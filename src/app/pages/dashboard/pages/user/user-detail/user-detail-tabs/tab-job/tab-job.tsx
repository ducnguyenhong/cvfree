import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { userInfoState } from 'app/states/user-info-state'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import { memo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ModalApplyCandidate } from './apply-candidate/modal-apply-candidate'
import { Columns, getLoader } from './tab-job.data'
// import { PopupDeactive } from './popup-deactive-job'

export const prefix = 'userDetailJobList'

export const TabJob: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const match = useRouteMatch()
  const userId = get(match.params, 'id')
  const loader = getLoader(`${SERVER_URL}/dashboard/users/${userId}/jobs`)

  const Toolbar: React.FC = () => {
    return (
      <Link
        to="/employer/jobs/create"
        className="flex items-center rotate-parent bg-green-600 rounded-md px-4 py-3 sm:py-2 hover:bg-green-700 duration-300"
      >
        <i className="fas fa-plus sm:mr-3 mr-2 duration-500 text-white"></i>
        <span className="text-white font-semibold hidden sm:inline">Tạo tin tuyển dụng</span>
        <span className="text-white font-semibold sm:hidden">Tạo</span>
      </Link>
    )
  }

  const MemoToolbar = memo(Toolbar)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable
        title="Danh sách tin tuyển dụng"
        toolbar={userInfo?.numberOfPosting && userInfo?.numberOfPosting > 0 ? <MemoToolbar /> : undefined}
      >
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div>
      <Table columns={Columns} loader={loader} prefix={prefix} Wrapper={memo(Wrapper)} />
      <ModalApplyCandidate />
      {/* <PopupDeactive /> */}
    </div>
  )
}
