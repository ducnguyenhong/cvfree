import { dataOptionActive, dataOptionUserVerify } from 'constants/data-filter'
import { FilterSearch, FilterDefault } from 'app/partials/table'
import { DataFilter } from 'models/filter-type'

export const getDataFilter: (prefix: string) => DataFilter[] = (prefix) => [
  {
    FilterComponent: <FilterSearch label="Tìm kiếm" prefix={prefix} />
  },
  {
    FilterComponent: <FilterDefault param="status" label="Trạng thái" options={dataOptionActive} prefix={prefix} />
  }
]
