import { Transition } from '@headlessui/react'
import { useEffect, RefObject } from 'react'
import { getModalSize } from './size'
import { ModalLibProps } from './type'

const ModalLib: React.FC<ModalLibProps> = (props) => {
  const {
    visible,
    okTitle,
    cancelTitle,
    onChange,
    size,
    title,
    onShow,
    onHide,
    children,
    disableFooter,
    disableHeader
  } = props

  const modalSize = getModalSize(size)

  useEffect(() => {
    if (visible) {
      if (onShow) {
        onShow()
      }
    } else {
      if (onHide) {
        onHide()
      }
    }
  }, [visible, onShow, onHide])

  return (
    <div>
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
                className={`z-50 fixed top-24 left-0 right-0 mx-auto inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all 2xl:${modalSize['2xl']} xl:${modalSize.xl} lg:${modalSize.lg} md:${modalSize.md} sm:${modalSize.sm} ${modalSize.xs}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                {!disableHeader && (
                  <>
                    <div className="px-5 py-4 flex justify-between">
                      {title && <span className="font-bold text-lg">{title}</span>}
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
                    <hr />
                  </>
                )}
                <div className="bg-white p-5">{children}</div>
                {!disableFooter && (
                  <>
                    <hr />
                    <div className="sm:px-5 py-4 px-6 flex flex-row-reverse">
                      <button
                        onClick={onChange}
                        type="button"
                        className="sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-800 ml-3 w-auto duration-300"
                      >
                        {okTitle || 'OK'}
                      </button>
                      <button
                        onClick={onHide}
                        type="button"
                        className="sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-50 mt-0 ml-3 w-auto duration-300"
                      >
                        {cancelTitle || 'Cancel'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default ModalLib
