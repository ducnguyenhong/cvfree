import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { userInfoState } from 'app/states/user-info-state'
import React, { memo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ModalAcceptRequest } from './modal-accept-request-update-company'
import { ModalRejectRequest } from './modal-reject-request-update-company.tsx'
import { Columns, TableLoader } from './request-update-company.data'
import { getDataFilter } from './request-update-company.filter'

export const prefix = 'requestUpdateCompanyListEmployer'

export const RequestUpdateCompanyList: React.FC = () => {
  const loader = useRef<typeof TableLoader>(TableLoader)
  const userInfo = useRecoilValue(userInfoState)
  const dataFilter = getDataFilter(prefix)

  useEffect(() => {
    document.title = `CVFREE | Yêu cầu chỉnh sửa công ty`
  }, [])

  const Toolbar: React.FC = () => {
    return (
      <Link
        to="/users/create"
        className="flex items-center rotate-parent bg-green-600 rounded-md px-4 py-3 sm:py-2 hover:bg-green-700 duration-300"
      >
        <i className="fas fa-plus sm:mr-3 mr-2 duration-500 text-white"></i>
        <span className="text-white font-semibold hidden sm:inline">Tạo yêu cầu</span>
        <span className="text-white font-semibold sm:hidden">Tạo</span>
      </Link>
    )
  }

  const MemoToolbar = memo(Toolbar)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable title="Danh sách yêu cầu" toolbar={userInfo?.type === 'ADMIN' ? <MemoToolbar /> : undefined}>
        {/* <Filter ListFilterComponent={dataFilter} /> */}
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Table columns={Columns} loader={loader.current} prefix={prefix} Wrapper={memo(Wrapper)} />
      <ModalAcceptRequest />
      <ModalRejectRequest />
    </div>
  )
}
