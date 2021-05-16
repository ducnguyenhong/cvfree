import { Filter, Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import React, { memo } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Columns, getLoader } from './tab-cv.data'
import { getDataFilter } from './tab-cv.filter'

export const prefix = 'userDetailCvList'

export const TabCv: React.FC = () => {
  const match = useRouteMatch()
  const userId = get(match.params, 'id')
  const loader = getLoader(`${SERVER_URL}/dashboard/users/${userId}/cvs`)
  const dataFilter = getDataFilter(prefix)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable title="Danh sách CV">
        <Filter ListFilterComponent={dataFilter} />
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div>
      <Table columns={Columns} loader={loader} prefix={prefix} Wrapper={memo(Wrapper)} />
    </div>
  )
}
