import { Transition } from '@headlessui/react'
import { useState } from 'react'

interface Props {
  className?: string
  dropdownClassName?: string
  type?: string
}

const PrDropdownCV: React.FC<Props> = (props) => {
  const { className, dropdownClassName, type } = props
  const [visible, setVisible] = useState<boolean>(false)

  const renderOptions = () => {
    if (type === 'image') {
      return (
        <>
          <img
            src="a"
            alt="bg"
            className="cursor-pointer w-5 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          />
        </>
      )
    }
    return (
      <>
        <span
          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Option1
        </span>
        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          Support
        </span>
      </>
    )
  }

  return (
    <div className={`${className} relative inline-block text-left z-40`}>
      <div>
        <button
          onClick={() => setVisible(!visible)}
          type="button"
          className="inline-flex justify-center w-full rounded border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-green-600"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Options
          <i className="fas fa-sort-down ml-3"></i>
        </button>
      </div>

      <Transition
        show={visible}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className={`${dropdownClassName} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {renderOptions()}
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}

export default PrDropdownCV
