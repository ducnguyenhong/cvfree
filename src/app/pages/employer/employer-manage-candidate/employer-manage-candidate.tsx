import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { memo, useEffect, useRef } from 'react'
import { Columns, TableLoader } from './employer-manage-candidate.data'
import { PopupDoneCandidate } from './popup-done-candidate'
import { PopupDeactiveCandidate } from './popup-deactive-candidate'

export const prefix = 'employerManageCandidate'

export const EmployerManageCandidate: React.FC = () => {
  const loader = useRef<typeof TableLoader>(TableLoader)

  useEffect(() => {
    document.title = `CVFREE | Quản lý ứng viên`
  }, [])

  const Wrapper: React.FC = (props) => {
    return <WrapperTable title="Quản lý ứng viên">{props.children}</WrapperTable>
  }

  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Table columns={Columns} loader={loader.current} prefix={prefix} Wrapper={memo(Wrapper)} />
      <PopupDoneCandidate />
      <PopupDeactiveCandidate />
    </div>
  )
}
