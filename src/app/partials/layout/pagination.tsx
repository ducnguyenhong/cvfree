import { useCallback } from 'react'
import { pushParamURL } from 'utils/helper'
import { useHistory } from 'react-router-dom'

export interface PaginationType {
  page: number
  size: number
  totalItems: number
  totalPages: number
}

interface PaginationProps {
  pagination?: PaginationType | null
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  if (!props.pagination) {
    return null
  }
  const { page, size, totalItems, totalPages } = props.pagination
  const history = useHistory()

  const onNextLastPage = useCallback(() => {
    if (page === totalPages) {
      return
    }
    pushParamURL(history, { page: totalPages })
  }, [page, totalPages])

  const onPrevFirstPage = useCallback(() => {
    if (page === 1) {
      return
    }
    pushParamURL(history, { page: 1 })
  }, [page])

  const onNextPage = useCallback(() => {
    if (page >= totalPages) {
      return
    }
    pushParamURL(history, { page: page + 1 })
  }, [page, totalPages])

  const onPrevPage = useCallback(() => {
    if (page <= 1) {
      return
    }
    pushParamURL(history, { page: page - 1 })
  }, [page])

  const listPage: number[] = []

  for (let i = page - 2; i < page + 3; i++) {
    if (i > 0 && i <= totalPages && page <= totalPages) {
      if (page < 3) {
        listPage.push(i)
      } else if (page >= 3 && page <= totalPages - 3) {
        listPage.push(i)
      } else if (page > totalPages - 3) {
        listPage.push(i)
      }
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="flex items-center justify-center">
        <span
          onClick={onPrevFirstPage}
          className={`${
            page === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 hover:text-white'
          } text-gray-600 duration-300 rounded rounded-r-none border-r-0 font-bold text-lg border border-gray-300 w-10 h-10 flex justify-center items-center`}
        >
          <i className="fas fa-angle-double-left"></i>
        </span>

        <span
          onClick={onPrevPage}
          className={`${
            page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 hover:text-white'
          } text-gray-600 duration-300 border-r-0 font-bold text-lg border w-10 h-10 border-gray-300 flex justify-center items-center`}
        >
          <i className="fas fa-angle-left"></i>
        </span>

        {page > 3 && page <= totalPages && <span className="block">. . .</span>}

        {listPage &&
          listPage.length > 0 &&
          listPage.map((item) => {
            return (
              <span
                key={`number_${item}`}
                onClick={() => pushParamURL(history, { page: item })}
                className={`${
                  item === page ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-600 hover:text-white'
                } border-r-0 duration-300 w-10 h-10 font-bold text-lg border-gray-300 cursor-pointer border flex justify-center items-center`}
              >
                {item}
              </span>
            )
          })}

        {page > 0 && page < totalPages - 2 && <span className="block">. . .</span>}

        <span
          onClick={onNextPage}
          className={`${
            page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 hover:text-white'
          } text-gray-600 duration-300 border-r-0 font-bold border-gray-300 text-lg border w-10 h-10 flex justify-center items-center`}
        >
          <i className="fas fa-angle-right"></i>
        </span>

        <span
          onClick={onNextLastPage}
          className={`${
            page === totalPages ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 hover:text-white'
          } text-gray-600 duration-300 rounded rounded-l-none font-bold text-lg border-gray-300 border w-10 h-10 flex justify-center items-center`}
        >
          <i className="fas fa-angle-double-right"></i>
        </span>
      </div>
    </div>
  )
}
