import { Transition } from '@headlessui/react'
import React, { RefObject, useEffect, useRef } from 'react'
import { getPopupSize, getPopupColor } from './popup-confirm.data'
import { PopupLibProps } from './popup-confirm.type'
import { PopupStyle } from './popup-confirm.styles'

const PopupLib: React.FC<PopupLibProps> = (props) => {
  const { visible, okTitle, cancelTitle, onChange, size, title, onHide, children, type, onClickOutside } = props
  const popupSize = getPopupSize(size)
  const contentPopupRef = useRef<HTMLDivElement>(null)
  const popupColor = getPopupColor(type)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (contentPopupRef.current && !contentPopupRef.current.contains(event.target) && onClickOutside) {
        // onClickOutside();
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contentPopupRef, onClickOutside])

  return (
    <PopupStyle>
      <div className="overflow-y-auto h-0">
        <div className="sm:flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0">
          <Transition
            show={visible}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref: RefObject<HTMLDivElement> | null | undefined) => (
              <div ref={ref} className="fixed inset-0 transition-opacity z-50" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
            )}
          </Transition>

          {/* <span className="hidden xs:inline-block xs:align-middle xs:h-screen" aria-hidden="true">&#8203;</span> */}

          <Transition
            show={visible}
            enter="ease-out duration-200"
            enterFrom="opacity-0 sm:translate-y-4 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 sm:translate-y-4 translate-y-0 scale-95"
          >
            {(ref: RefObject<HTMLDivElement> | null | undefined) => (
              <div
                ref={ref}
                className={`z-50 fixed top-24 left-0 right-0 mx-auto inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all 2xl:${popupSize['2xl']} xl:${popupSize.xl} lg:${popupSize.lg} md:${popupSize.md} sm:${popupSize.sm} ${popupSize.xs}`}
                role="dialog"
                aria-labelledby="Popup-headline"
              >
                <div ref={contentPopupRef} className="z-50">
                  <div className="px-5 py-4 flex justify-between">
                    {title && (
                      <span className="font-semibold text-lg">
                        <i
                          className="fas fa-exclamation-circle text-xl mr-2"
                          style={{ color: popupColor.iconColor }}
                        ></i>
                        {title}
                      </span>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={onHide}
                      className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 duration-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="bg-white p-3">{children}</div>
                  <div className="sm:px-16 py-5 px-6 grid grid-cols-2 gap-8">
                    <button
                      onClick={onChange}
                      type="button"
                      className={`col-span-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2.5  font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-800 w-auto duration-300 ${popupColor.buttonClassName}`}
                    >
                      {okTitle || 'OK'}
                    </button>
                    <button
                      onClick={onHide}
                      type="button"
                      className={`col-span-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2.5 bg-white font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-50 mt-0 w-auto duration-300`}
                    >
                      {cancelTitle || 'CANCEL'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </div>
    </PopupStyle>
  )
}

export default PopupLib
