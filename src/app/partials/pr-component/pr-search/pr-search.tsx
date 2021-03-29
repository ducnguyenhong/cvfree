import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import { PrSearchProps, PrSearchRefProps } from './pr-search.type'

export const PrSearch = forwardRef((props: PrSearchProps, ref: Ref<PrSearchRefProps>) => {
  const { placeholder, onChange, defaultValue, labelSearch, className } = props
  const [keyword, setKeyword] = useState<string>(defaultValue || '')

  const handleEnterSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()
    onChange && onChange(keyword.trim())
  }

  const handleClickSearch = () => {
    onChange && onChange(keyword.trim())
  }

  const handleClearSearch = () => {
    setKeyword('')
    onChange && onChange('')
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return keyword
    },
    setValue(data: string) {
      setKeyword(data)
    }
  }))

  return (
    <div>
      {labelSearch && <span className="block mb-1 text-base font-medium">{labelSearch}</span>}
      <div className="flex justify-between text-gray-600 relative" style={{ height: 38 }}>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterSearch(e)}
          className="w-full overflow-hidden rounded-md"
        >
          <input
            className={`${className} w-full h-full border border-gray-300 bg-white pl-4 py-2 pr-14 rounded-md text-base focus:outline-none focus:border-blue-600`}
            placeholder={placeholder || 'Search'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            value={keyword}
          />
          {keyword && (
            <span
              className="absolute right-9 top-2 cursor-pointer opacity-70 hover:opacity-90"
              onClick={handleClearSearch}
            >
              <i className="w-4 fas fa-times"></i>
            </span>
          )}
          <span
            className="absolute right-2.5 top-2 cursor-pointer opacity-70 hover:opacity-90"
            onClick={handleClickSearch}
          >
            <i className="fas fa-search w-5" />
          </span>
        </form>
      </div>
    </div>
  )
})
