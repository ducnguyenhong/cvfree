import { Table, Filter } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import React, { useRef, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Columns, TableLoader } from './all-user.data'
import { userInfoState } from 'app/states/user-info-state'
import { getDataFilter } from './all-user.filter'

export const prefix = 'allUserList'

export const AllUserList: React.FC = () => {
  const loader = useRef<typeof TableLoader>(TableLoader)
  const userInfo = useRecoilValue(userInfoState)
  const dataFilter = getDataFilter(prefix)

  useEffect(() => {
    document.title = `CVFREE | Danh sách người dùng`
  }, [])

  const Toolbar: React.FC = () => {
    return (
      <Link
        to="/dashboard/users/create"
        className="flex items-center rotate-parent bg-green-600 rounded-md px-4 py-3 sm:py-2 hover:bg-green-700 duration-300"
      >
        <i className="fas fa-plus sm:mr-3 mr-2 duration-500 text-white"></i>
        <span className="text-white font-semibold hidden sm:inline">Tạo người dùng</span>
        <span className="text-white font-semibold sm:hidden">Tạo</span>
      </Link>
    )
  }

  const MemoToolbar = memo(Toolbar)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable title="Tất cả người dùng" toolbar={userInfo?.type === 'ADMIN' ? <MemoToolbar /> : undefined}>
        <Filter ListFilterComponent={dataFilter} />
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div>
      <Table columns={Columns} loader={loader.current} prefix={prefix} Wrapper={memo(Wrapper)} />
    </div>
  )
}
