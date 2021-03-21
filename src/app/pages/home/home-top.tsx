import ImgHomeIntro from 'assets/images/img-home-intro.png'
import HomeIntro from './home-intro'

const TopHome: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 p-40 grid grid-cols-2 gap-8">
      <div className="col-span-1 flex items-center">
        <HomeIntro />
      </div>
      <div className="col-span-1">
        <img src={ImgHomeIntro} alt="intro" />
      </div>
    </div>
  )
}

export default TopHome
