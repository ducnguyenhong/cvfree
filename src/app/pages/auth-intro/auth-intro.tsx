// import Logo from 'assets/images/logo.png'
import BgLogoDefault from 'assets/images/bg-login.png'

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
    </div>
  )
}

export default AuthIntro
