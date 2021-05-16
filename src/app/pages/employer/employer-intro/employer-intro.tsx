import ImgIntro from 'assets/images/img-employer-intro.png'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useEffect } from 'react'

export const EmployerIntro: React.FC = () => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `CVFREE | ${intl.formatMessage({ id: 'NAVBAR.EMPLOYER' })}`
  }, [])

  return (
    <div className="pt-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 grid grid-cols-2 gap-20 bg-white h-screen">
      <div className="col-span-1 flex items-center">
        <img src={ImgIntro} alt="intro" className="block mx-auto" />
      </div>
      <div className="col-span-1 flex items-center">
        <div>
          <div>
            <span className="text-xl font-semibold">Bạn là Nhà tuyển dụng ?</span>
          </div>
          <div className="mt-16">
            <span className="text-xl font-semibold">Hãy Đăng tin tuyển dụng hoặc Tìm ứng viên phù hợp</span>
          </div>
          <div className="mt-16">
            <span className="text-xl font-semibold">
              Trước tiên, hãy
              <Link to="/employer/sign-up" className="bg-green-600 text-white px-4 py-2 rounded-md ml-3">
                Tạo tài khoản mới
              </Link>
            </span>
            <span className="text-xl font-semibold block mt-16">
              hoặc
              <Link to="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded-md ml-3">
                Đăng nhập
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
