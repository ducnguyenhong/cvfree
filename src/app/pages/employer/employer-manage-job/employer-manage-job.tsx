import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { userInfoState } from 'app/states/user-info-state'
import { SERVER_URL } from 'constants/index'
import { memo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ModalApplyCandidate } from './apply-candidate/modal-apply-candidate'
import { Columns, getLoader } from './employer-manage-job.data'
import { PopupDeactive } from './popup-deactive-job'

export const prefix = 'employerManageJob'

export const EmployerManageJob: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const loader = getLoader(`${SERVER_URL}/jobs/employer/${userInfo?._id}`)

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
        title="Danh sách tin tuyển dụng đã tạo"
        toolbar={userInfo?.numberOfPosting && userInfo?.numberOfPosting > 0 ? <MemoToolbar /> : undefined}
      >
        <div className="mb-10">
          <span className="font-semibold">
            Số lượt đăng tin tuyển dụng còn lại:{' '}
            <span className="text-red-500 ml-3 mr-2">{userInfo?.numberOfPosting}</span> lượt
          </span>
        </div>
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Table columns={Columns} loader={loader} prefix={prefix} Wrapper={memo(Wrapper)} />
      <ModalApplyCandidate />
      <PopupDeactive />
    </div>
  )
}
