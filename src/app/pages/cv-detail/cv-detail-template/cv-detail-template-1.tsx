import PrInputCV from 'app/partials/pr-input-cv'
import { EmailIcon, FacebookIcon, GenderIcon, BirthdayIcon, MapIcon, PhoneIcon } from 'assets/icons'
import { useEffect, useRef, useState } from 'react'
import { CVDetailStyle } from '../cv-detail.styles'
import { CvInfo } from 'models/cv-info'

interface CvDetailProps {
  data: CvInfo
}

export const CvDetailTemplate1: React.FC<CvDetailProps> = (props) => {
  const { data } = props
  const [cvHeight, setCvHeight] = useState<number>(0)
  const cvRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cvRef && cvRef.current) {
      setCvHeight(cvRef.current.clientHeight)
    }
  }, [cvRef])

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-40">
      <CVDetailStyle>
        {/* CV Main */}
        <div
          // style={{ width: '210mm', height: 'auto', fontFamily: fontFamily, fontSize: fontSize }}
          style={{ width: '210mm', height: 'auto' }}
          className="bg-white mx-auto relative shadow-2xl mt-10"
          ref={cvRef}
        >
          {cvHeight > 1150 && (
            <div className="cv-page-2 absolute bg-green-500 shadow px-3 py-2 rounded-sm">
              <span className="text-white font-semibold">Trang 2</span>
            </div>
          )}
          {cvHeight > 2265 && (
            <div className="cv-page-3 absolute bg-green-500 shadow px-3 py-2 rounded-sm">
              <span className="text-white font-semibold">Trang 3</span>
            </div>
          )}
          <div className="grid grid-cols-3 h-full">
            {/* CV Left */}
            <div className="col-span-1 bg-gray-100 relative overflow-hidden">
              {/* <div className="div-top-left p-4 pb-10 overflow-hidden relative" style={{ backgroundColor: color }}> */}
              <div className="div-top-left p-4 pb-10 overflow-hidden relative">
                <div className="mb-3">
                  {/* <PrInputCV
                    placeholder="Họ và tên"
                    divClassName="h-8"
                    className="bg-transparent placeholder-white uppercase font-bold text-lg w-full text-center text-white py-2"
                  /> */}
                  <span className="uppercase font-bold text-lg w-full text-center text-white py-2">Họ và tên</span>
                </div>
                <div className="px-5">
                  {/* <PrUpload getImage={getImage} /> */}
                  <img src={''} alt="avatar" />
                </div>
                <div className="mt-3">
                  {/* <PrInputCV
                    placeholder="Vị trí ứng tuyển"
                    divClassName="h-8"
                    className="bg-transparent placeholder-white uppercase font-medium w-full text-center text-gray-200 py-2"
                  /> */}
                  <span className="uppercase font-bold text-lg w-full text-center text-white py-2">
                    Vị trí ứng tuyển
                  </span>
                </div>
                <div className="mb-6 mt-3">
                  {/* <PrInputCV
                    divClassName="h-16"
                    placeholder="Giới thiệu chung"
                    type="textarea"
                    className="bg-transparent resize-none border-gray-500 border border-dashed rounded-md placeholder-gray-200 w-full text-center text-white py-2"
                  /> */}
                  <span className="border-gray-500 border border-dashed rounded-md w-full text-center text-white py-2">
                    Giới thiệu chung
                  </span>
                </div>
                <div className="absolute -bottom-10 -left-10 w-60 h-16 transform rotate-12 bg-gray-100"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-16 transform -rotate-12 bg-gray-100"></div>
              </div>

              <div className="div-middle-left mx-4">
                <div className="flex items-center">
                  <BirthdayIcon />
                  <PrInputCV placeholder="Ngày sinh" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center">
                  <GenderIcon />
                  <PrInputCV placeholder="Giới tính" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center">
                  <PhoneIcon />
                  <PrInputCV
                    placeholder="Điện thoại"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center">
                  <EmailIcon />
                  <PrInputCV placeholder="Email" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center">
                  <MapIcon />
                  <PrInputCV placeholder="Địa chỉ" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center mb-3">
                  <FacebookIcon />
                  <PrInputCV placeholder="Facebook" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <hr />
              </div>

              <div className="div-bottom-left bg-gray-100 mx-2">
                <div className="mb-16">
                  {/* {categoryLeft &&
                    categoryLeft.length > 0 &&
                    categoryLeft.map((item) => {
                      const { name, enable, component, categoryRef, inputRef } = item
                      if (!enable) {
                        return null
                      }
                      return (
                        <div key={name}>
                          {component({
                            onDownCategoryLeft,
                            onUpCategoryLeft,
                            onRemoveCategoryLeft,
                            categoryRef,
                            inputRef
                          })}
                        </div>
                      )
                    })} */}
                </div>

                <div
                  className="div-triangle-bottom-left absolute -bottom-20 -left-7 w-48 h-28"
                  // style={{ backgroundColor: color }}
                ></div>
              </div>
            </div>

            {/* CV Right */}
            <div className="col-span-2 relative p-4 overflow-hidden">
              <div
                className="div-triangle-top-right absolute -top-12 z-20 -right-12 w-48 h-20"
                // style={{ backgroundColor: color }}
              ></div>

              {/* {category &&
                category.length > 0 &&
                category.map((item) => {
                  const { name, enable, component, categoryRef } = item
                  if (!enable) {
                    return null
                  }
                  return (
                    <div key={name}>
                      {component({
                        onDownCategory,
                        onUpCategory,
                        onRemoveCategory,
                        categoryRef
                      })}
                    </div>
                  )
                })} */}
            </div>
          </div>
        </div>
      </CVDetailStyle>
    </div>
  )
}
