import Logo from 'assets/images/logo.png'
import BgLogo from 'assets/images/bg-login.png'

const AuthIntro: React.FC = () => {
  return (
    <div>
      <div className="h-1/2 flex justify-center items-center">
        <div className="text-center">
          <img src={Logo} alt="logo" className="block mx-auto w-36" />
          <span className="text-3xl uppercase mt-7 block font-extrabold text-green-700">Hồ sơ trực tuyến miễn phí</span>
        </div>
      </div>
      <div className="h-1/2 flex justify-center items-center">
        <img src={BgLogo} className="h-full" alt="bg-login" />
      </div>
    </div>
  )
}

export default AuthIntro
