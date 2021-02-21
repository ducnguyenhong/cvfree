import { Transition } from '@headlessui/react'
import { useEffect } from 'react'
import CloseIcon from './close.svg'
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
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center xs:block xs:p-0">
          <Transition
            show={visible}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div ref={ref} className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
            )}
          </Transition>

          {/* <span className="hidden xs:inline-block xs:align-middle xs:h-screen" aria-hidden="true">&#8203;</span> */}

          <Transition
            show={visible}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
            enterTo="opacity-100 translate-y-0 xs:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 xs:scale-100"
            leaveTo="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
          >
            {(ref) => (
              <div
                ref={ref}
                className={`z-50 absolute top-24 left-0 right-0 mx-auto inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all 2xl:${modalSize['2xl']} xl:${modalSize.xl} lg:${modalSize.lg} md:${modalSize.md} sm:${modalSize.sm} xs:${modalSize.xs}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                {!disableHeader && (
                  <>
                    <div className="px-5 py-4 flex justify-between">
                      {title && <span className="font-medium text-lg">{title}</span>}
                      <img
                        src={CloseIcon}
                        alt="Close"
                        className="w-3 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={onHide}
                      />
                    </div>
                    <hr />
                  </>
                )}
                <div className="bg-white p-5">{children}</div>
                {!disableFooter && (
                  <>
                    <hr />
                    <div className="px-5 py-4 xs:px-6 xs:flex xs:flex-row-reverse">
                      <button
                        onClick={onChange}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-800 xs:ml-3 xs:w-auto xs:text-sm"
                      >
                        {okTitle || 'OK'}
                      </button>
                      <button
                        onClick={onHide}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-50 xs:mt-0 xs:ml-3 xs:w-auto xs:text-sm"
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
