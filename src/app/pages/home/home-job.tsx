import { Link } from 'react-router-dom'
import { ImageJob } from 'app/partials/image-ratio/home-job-image'

const JobHome: React.FC = () => {
  return (
    <div className="bg-green-600 w-full py-5 mt-24 pb-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-20">
        <div className="text-center">
          <span className="uppercase text-white font-bold text-3xl">Việc làm mới nhất</span>
        </div>
        <div className="grid grid-cols-2 mt-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number, index: number) => {
            return (
              <div className="col-span-1 one-job flex mb-10" key={index}>
                <Link to="/" className="w-24">
                  <ImageJob src="" />
                </Link>
                <div className="ml-5">
                  <div className="flex items-center">
                    <i className="fas fa-briefcase"></i>
                    <Link to="/">Frontend Developer</Link>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-building"></i>
                    <span>FPT Software</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Hà Nội</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-coins"></i>
                    <span>10.000.000 VND - 15.000.000 VND</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default JobHome
