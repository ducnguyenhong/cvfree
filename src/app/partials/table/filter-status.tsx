import { useFilter } from '@ekidpro/table'
import Dropdown, { OptionProps } from 'app/partials/pr-dropdown'
import React, { useCallback } from 'react'
import { getDefaultFilter, getValueDropdown } from 'utils/helper'
import { FilterProps } from 'models/filter-type'

export const FilterDefault: React.FC<FilterProps> = (props) => {
  const { options, isMulti, label, prefix, param } = props
  const setFilter = useFilter(prefix)
  const defaultFilter = getDefaultFilter(options, `${prefix}_${param}`, isMulti)

  const onChange = useCallback(
    (data: OptionProps[]) => {
      const dataFilter: Record<string, string> = {}
      const arrayValue = getValueDropdown(data)
      let value = ''
      for (let i = 0; i < arrayValue.length; i++) {
        value += arrayValue[i] + ','
      }
      value = value.substring(0, value.length - 1)
      dataFilter[`${param}`] = value
      setFilter(dataFilter)
    },
    [setFilter]
  )

  return (
    <div className="col-span-4 sm:col-span-2 lg:col-span-1 mt-2 sm:mt-0">
      <Dropdown
        options={options}
        label={label}
        onChange={onChange}
        isClearable
        isMulti={isMulti}
        defaultValue={defaultFilter}
      />
    </div>
  )
}
