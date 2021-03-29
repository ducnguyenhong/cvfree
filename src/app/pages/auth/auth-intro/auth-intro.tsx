// import Logo from 'assets/images/logo.png'
import BgLogoDefault from 'assets/images/bg-login.png'
import { Link } from 'react-router-dom'

interface AuthIntroProps {
  title?: string | React.ReactElement
  bgLogo?: string
}

const AuthIntro: React.FC<AuthIntroProps> = (props) => {
  const { title, bgLogo } = props
  return (
    <div className="h-screen fixed left-24 top-48">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <span className="text-3xl uppercase block font-extrabold text-green-700">
            {title || `Hồ sơ trực tuyến miễn phí`}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center mt-16">
        <img src={bgLogo || BgLogoDefault} className="h-full" alt="bg-login" />
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
  )
}

export default AuthIntro
