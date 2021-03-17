// import ImageError from 'assets/images/error-boundary.png'
import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = (props) => {
  const { error } = props
  return (
    <div className="flex items-center justify-center mt-28 px-8 right-0 w-auto duration-500">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full">
        <div className="bg-white py-64">
          <div className="flex px-32">
            <div className="items-center w-1/4 flex-col flex">
              {/* <img src={ImageError} alt="logo" className="w-80" /> */}
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-3/4 flex-col flex justify-center">
              <div>
                <span className="text-4xl font-bold text-gray-900" id="modal-headline">
                  Something went wrong !
                </span>
              </div>
              <div className="mt-8">
                <p className="text-red-500 text-lg">{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
