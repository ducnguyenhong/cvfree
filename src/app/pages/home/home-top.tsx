import ImgHomeIntro from 'assets/images/img-home-intro.jpeg'
import HomeIntro from './home-intro'

const TopHome: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-32 xl:px-40 2xl:px-64 pt-52 pb-52 grid grid-cols-2 gap-8 min-h-screen">
      <div className="col-span-1 flex items-center">
        <HomeIntro />
      </div>
      <div className="col-span-1 lg:mt-24 xl:mt-16 2xl:mt-10">
        <img src={ImgHomeIntro} alt="intro" />
      </div>
    </div>
  )
}

export default TopHome
