import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { userInfoState } from 'app/states/user-info-state'
import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Columns, getTableLoader } from './employer-manage-staff.data'
import { PopupBanStaff } from './popup-ban-staff'

export const prefix = 'employerManageStaffList'

export const ManageStaffList: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const loader = getTableLoader(userInfo?.companyId)

  useEffect(() => {
    document.title = `CVFREE | Danh sách nhà tuyển dụng của công ty`
  }, [])

  const Toolbar: React.FC = () => {
    return (
      <Link
        to="/employer/company-info"
        className="flex items-center rotate-parent bg-green-600 rounded-md px-4 py-3 sm:py-2 hover:bg-green-700 duration-300"
      >
        <i className="fas fa-reply sm:mr-3 mr-2 duration-500 text-white"></i>
        <span className="text-white font-semibold hidden sm:inline">Trở về</span>
        <span className="text-white font-semibold sm:hidden">Trở về</span>
      </Link>
    )
  }

  const MemoToolbar = memo(Toolbar)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable title="Danh sách nhà tuyển dụng" toolbar={<MemoToolbar />}>
        {/* <Filter ListFilterComponent={dataFilter} /> */}
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Table columns={Columns} loader={loader} prefix={prefix} Wrapper={memo(Wrapper)} />
      <PopupBanStaff />
    </div>
  )
}
