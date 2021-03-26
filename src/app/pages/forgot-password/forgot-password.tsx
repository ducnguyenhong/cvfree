import Button from 'app/partials/pr-button'
import PrInput from 'app/partials/pr-input'
import BgLogo from 'assets/images/bg-login.png'
import Logo from 'assets/images/logo.png'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SignInStyle } from './styles'

interface SignInProps {}

const SignInLayout: React.FC<SignInProps> = () => {
  useEffect(() => {
    document.title = 'CVFREE | Quên mật khẩu'
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      <SignInStyle>
        <div className="grid grid-cols-5 gap-4 h-full w-full">
          <div className="col-span-2 bg-blue-50 h-full">
            <div className="h-1/2 flex justify-center items-center">
              <div className="text-center">
                <img src={Logo} alt="logo" className="block mx-auto w-36" />
                <span className="text-3xl uppercase mt-7 block font-extrabold text-green-700">
                  Hồ sơ trực tuyến miễn phí
                </span>
              </div>
            </div>
            <div className="h-1/2 flex justify-center items-center">
              <img src={BgLogo} className="h-full" alt="bg-login" />
            </div>
          </div>

          <div className="col-span-3 h-full">
            <div className="h-full">
              <div className="h-5/6 flex items-center justify-center">
                <div className="w-2/5">
                  <span className="block text-2xl font-bold text-center">
                    Chào mừng đến với <span className="text-green-600">CVFREE</span>
                  </span>
                  <div className="mt-7">
                    <PrInput label="Nhập email của bạn" icon="fas fa-envelope" />
                  </div>
                  <div className="flex justify-center mt-12">
                    <Button type="success" className="flex items-center">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg> */}
                      <span className="font-semibold">Quên mật khẩu</span>
                      <i className="ml-2 text-sm fas fa-unlock-alt"></i>
                      {/* <LoginIcon className="ml-2" /> */}
                      {/* <img src={LoginIcon} className="w-5 mr-2"/>Đăng nhập  */}
                      {/* <img src={LoadingIcon} className="w-5 mr-2"/>Đăng nhập */}
                    </Button>
                  </div>
                  <div className="mt-10">
                    <span className="block text-center">
                      Bạn đã có tài khoản?{' '}
                      <Link to="/sign-in" className="text-green-600 font-semibold">
                        Đăng nhập
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-1/6 flex justify-center items-center">
                <span className="text-green-700 font-semibold">2021© CVFREE</span>
                <Link to="/terms-of-use" className="mx-10 text-green-700 font-semibold">
                  Điều khoản sử dụng
                </Link>
                <Link to="/contact" className="text-green-700 font-semibold">
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyle>
    </div>
  )
}

export default SignInLayout
