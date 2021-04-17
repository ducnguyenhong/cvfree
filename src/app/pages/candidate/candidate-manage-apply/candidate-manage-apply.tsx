import { BreadCrumb } from 'app/pages/bread-crumb'
import { Columns, TableLoader } from './candidate-manage-apply.data'
import { Table } from '@ekidpro/table'
import { useRef } from 'react'

export const prefix = 'candidateManageApply'

export const CandidateManageApply: React.FC = () => {
  const loader = useRef<typeof TableLoader>(TableLoader)

  return (
    <div className="w-2/3 mx-auto py-32">
      <BreadCrumb title="Quản lý ứng tuyển" />
      <div className="mt-10">
        <Table columns={Columns} loader={loader.current} prefix={prefix} />
      </div>
    </div>
  )
}
