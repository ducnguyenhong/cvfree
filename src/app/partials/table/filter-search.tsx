import { useFilter } from '@ekidpro/table'
import Search from 'app/partials/search'
import React, { useCallback } from 'react'
import { getDefaultSearch } from 'utils/helper'
import { FilterSearchProps } from 'models/filter-type'

const param = 'keyword'

export const FilterSearch: React.FC<FilterSearchProps> = (props) => {
  const { label, prefix, isDetail } = props
  const setFilter = useFilter(prefix)
  const defaultValue = getDefaultSearch(`${prefix}_${param}`)

  const onChange = useCallback(
    (data: string) => {
      const dataFilter: Record<string, string> = {}
      dataFilter[`${param}`] = data
      setFilter(dataFilter)
    },
    [setFilter]
  )

  return (
    <div
      className={`mt-2 sm:mt-0 ${
        isDetail ? 'col-span-3 sm:col-span-2 lg:col-span-1' : 'col-span-4 sm:col-span-2 lg:col-span-1'
      }`}
    >
      <Search labelSearch={label} onChange={onChange} defaultValue={defaultValue} />
    </div>
  )
}
