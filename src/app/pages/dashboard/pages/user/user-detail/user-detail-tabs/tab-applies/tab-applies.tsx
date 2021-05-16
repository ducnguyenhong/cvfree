import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import { memo } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Columns, getLoader } from './tab-applies.data'

export const prefix = 'userDetailApplyList'

interface DataStatusType {
  title: string
  content: string
  textColor: string
  bgColor: string
  status: string
}

export const DataStatusApply: DataStatusType[] = [
  {
    title: 'Waiting',
    content: 'Đang chờ duyệt',
    textColor: '',
    bgColor: 'bg-yellow-400',
    status: 'WAITING'
  },
  {
    title: 'Approved',
    content: 'Đã được duyệt (đang liên hệ)',
    textColor: 'text-white',
    bgColor: 'bg-green-600',
    status: 'APPROVED'
  },
  {
    title: 'Done',
    content: 'Hoàn tất',
    textColor: 'text-white',
    bgColor: 'bg-purple-600',
    status: 'DONE'
  },
  {
    title: 'Dinied',
    content: 'Đã từ chối',
    textColor: 'text-white',
    bgColor: 'bg-red-600',
    status: 'DINIED'
  }
]

export const TabApply: React.FC = () => {
  const match = useRouteMatch()
  const userId = get(match.params, 'id')
  const loader = getLoader(`${SERVER_URL}/dashboard/users/${userId}/applies`)

  const Wrapper: React.FC = (props) => {
    return <WrapperTable title="Danh sách việc làm đã ứng tuyển">{props.children}</WrapperTable>
  }

  return (
    <div>
      <Table columns={Columns} loader={loader} prefix={prefix} Wrapper={memo(Wrapper)} />
    </div>
  )
}
