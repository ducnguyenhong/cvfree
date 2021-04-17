import { useRef } from 'react'
import { Columns, TableLoader } from './employer-manage-candidate.data'
import { Table } from '@ekidpro/table'
import { BreadCrumb } from 'app/pages/bread-crumb'

export const prefix = 'employerManageCandidate'

export const EmployerManageCandidate: React.FC = () => {
  const loader = useRef<typeof TableLoader>(TableLoader)

  return (
    <div className="w-2/3 mx-auto py-40">
      <BreadCrumb title="Quản lý ứng viên" />
      <div>
        <Table columns={Columns} loader={loader.current} prefix={prefix} />
      </div>
    </div>
  )
}
