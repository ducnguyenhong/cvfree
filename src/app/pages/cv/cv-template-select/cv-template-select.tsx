import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { userInfoState } from 'app/states/user-info-state'
import { DataDemoCV } from 'constants/data-demo-cv'
import { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export const TemplateSelectCV: React.FC = () => {
  const history = useHistory()
  const userInfo = useRecoilValue(userInfoState)
  const modalNotifyRef = useRef<PrModalRefProps>(null)
  const modalOutOfTurnRef = useRef<PrModalRefProps>(null)

  const onOpenCreateCVPage = useCallback((value: string) => {
    localStorage.setItem('cv-template-create', value)

    if (!userInfo) {
      modalNotifyRef.current?.show()
    } else if (userInfo && userInfo.numberOfCreateCv === 0) {
      modalOutOfTurnRef.current?.show()
    } else {
      history.push('/create-cv')
    }
  }, [])

  return (
    <div className="bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 py-40">
        <div className="text-center mb-20">
          <span className="uppercase text-3xl font-bold text-green-600">Danh sách các mẫu CV</span>
        </div>
        <div className="grid grid-cols-3 gap-28 px-40">
          {DataDemoCV.map((item) => {
            const { value, image, label } = item
            return (
              <div key={`demo_${value}`}>
                <div
                  className="relative col-span-1 group shadow-md hover:shadow-xl duration-300 overflow-hidden"
                  style={{ aspectRatio: '3/4' }}
                >
                  <img src={image} alt="sample cv" className="top-0 left-0 w-full" style={{ zIndex: 5 }} />
                  {(!userInfo || userInfo?.type === 'USER') && (
                    <div className="w-full h-full bg-gray-700 absolute top-0 left-0 opacity-0 duration-300 group-hover:opacity-50"></div>
                  )}
                  <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 duration-300 mx-auto group-hover:opacity-100"
                    style={{ zIndex: 6 }}
                  >
                    {(!userInfo || userInfo?.type === 'USER') && (
                      <div
                        className="text-green-600 bg-gray-50 px-6 py-3 cursor-pointer rounded-md uppercase font-bold flex items-center"
                        onClick={() => onOpenCreateCVPage(value)}
                      >
                        <i className="fas fa-check-circle mr-3" />
                        <span>Sử dụng</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <span className="block text-center font-semibold text-lg">{label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <PrModal title="Thông báo" ref={modalNotifyRef} disableFooter onHide={() => modalNotifyRef.current?.hide()}>
        <div className="py-20 px-10">
          <span className="block text-center font-semibold text-lg">
            Để có thể tạo CV của bạn, hãy tạo một tài khoản để lưu trữ nó !
          </span>
          <div className="mt-16 text-center flex items-center justify-center">
            <Link
              to="/sign-up"
              className="px-6 py-2.5 rounded-md text-white bg-green-600 text-md font-semibold duration-300 hover:bg-green-700"
            >
              Tạo tài khoản ngay
            </Link>
            <span className="block mx-8 font-medium">hoặc</span>
            <Link
              to="/sign-in"
              className="px-6 py-2.5 rounded-md text-white bg-blue-600 text-md font-semibold duration-300 hover:bg-blue-700"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </PrModal>

      <PrModal title="Thông báo" ref={modalOutOfTurnRef} disableFooter onHide={() => modalOutOfTurnRef.current?.hide()}>
        <div className="py-20 px-10">
          <span className="block text-center font-semibold text-lg">Bạn đã sử dụng hết số lượt tạo CV</span>
          <div className="mt-16 text-center flex items-center justify-center">
            <Link
              to="/manage-cv"
              className="px-6 py-2.5 rounded-md text-white bg-green-600 text-md font-semibold duration-300 hover:bg-green-700"
            >
              Xem danh sách hồ sơ đã tạo
            </Link>
          </div>
        </div>
      </PrModal>
    </div>
  )
}
