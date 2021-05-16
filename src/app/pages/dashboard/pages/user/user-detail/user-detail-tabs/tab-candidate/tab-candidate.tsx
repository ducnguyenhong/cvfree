import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
// import { PopupDoneCandidate } from './popup-done-candidate'
// import { PopupDeactiveCandidate } from './popup-deactive-candidate'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import { memo } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Columns, getLoader } from './tab-candidate.data'

export const prefix = 'userDetailCandidateList'

export const TabCandidate: React.FC = () => {
  const match = useRouteMatch()
  const userId = get(match.params, 'id')
  const loader = getLoader(`${SERVER_URL}/dashboard/users/${userId}/candidate-manages`)

  const Wrapper: React.FC = (props) => {
    return <WrapperTable title="Danh sách ứng viên">{props.children}</WrapperTable>
  }

  return (
    <div>
      <Table columns={Columns} loader={loader} prefix={prefix} Wrapper={memo(Wrapper)} />
      {/* <PopupDoneCandidate />
      <PopupDeactiveCandidate /> */}
    </div>
  )
}
