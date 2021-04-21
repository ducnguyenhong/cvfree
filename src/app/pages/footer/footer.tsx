import Logo from 'assets/images/logo.png'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <div className="bg-gray-700 pt-12 pb-7 px-40">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <img src={Logo} alt="logo" className="w-16 h-16 block mx-auto" />
          <span className="block text-center mt-4 text-gray-300 font-semibold">CVFREE</span>
          <span className="block text-center mt-1 text-gray-300 font-medium">Hồ sơ trực tuyến miễn phí</span>
        </div>
        <div className="col-span-1">
          <span className="block text-center text-white uppercase font-semibold">Liên kết nhanh</span>
          <div className="mt-5">
            <div className="text-center">
              <Link to="/template-cv" className="font-medium text-gray-400 duration-300 hover:text-white">
                Tạo CV
              </Link>
            </div>
            <div className="text-center mt-0.5">
              <Link to="/jobs/ha-noi" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Việc làm tại Hà Nội
              </Link>
            </div>
            <div className="text-center mt-0.5">
              <Link to="/jobs/da-nang" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Việc làm tại Đà Nẵng
              </Link>
            </div>
            <div className="text-center mt-0.5">
              <Link to="/jobs/ho-chi-minh" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Việc làm tại TP.HCM
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <span className="block text-center text-white uppercase font-semibold">Thông tin</span>
          <div className="mt-5">
            <div className="text-center">
              <Link to="/about-us" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Giới thiệu
              </Link>
            </div>
            <div className="text-center mt-0.5">
              <Link to="/feedback" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Ý kiến đóng góp
              </Link>
            </div>
            <div className="text-center mt-0.5">
              <Link to="/terms-of-use" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Điều khoản sử dụng
              </Link>
            </div>
            <div className="text-center mt-0.5">
              <Link to="/privacy-policy" className="font-medium text-gray-400 duration-300 hover:text-white ">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <span className="block text-right text-white uppercase font-semibold">Kết nốt với chúng tôi</span>
          <div className="mt-5">
            <div className="flex items-center justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-400 duration-300 hover:text-white mt-0.5"
              >
                CVFREE
              </a>
              <i className="fab fa-facebook-square text-gray-300 ml-3" />
            </div>
            <div className="flex items-center justify-end">
              <a href={`tel:0376876191`} className="font-medium text-gray-400 duration-300 hover:text-white mt-0.5">
                0376876191
              </a>
              <i className="fas fa-phone text-gray-300 ml-3" />
            </div>
            <div className="flex items-center justify-end">
              <a
                href={`mailto:cvfreecontact@gmail.com`}
                className="font-medium text-gray-400 duration-300 hover:text-white mt-0.5"
              >
                cvfreecontact@gmail.com
              </a>
              <i className="fas fa-envelope text-gray-300 ml-3" />
            </div>
            <div className="flex items-center justify-end">
              <a
                href="https://www.google.com/maps/place/1130+%C4%90%C6%B0%E1%BB%9Dng+La+Th%C3%A0nh,+Ng%E1%BB%8Dc+Kh%C3%A1nh,+Ba+%C4%90%C3%ACnh,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.02813,105.8054423,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab69903b8e01:0x64affd859b1d6209!8m2!3d21.028125!4d105.807631"
                className="font-medium text-gray-400 duration-300 hover:text-white mt-0.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ngọc Khánh, Ba Đình, Hà Nội
              </a>
              <i className="fas fa-map-marker-alt text-gray-300 ml-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-1/3 bg-gray-500 mx-auto h-px"></div>
      <div className="mt-5">
        <span className="text-gray-200 block text-center font-medium">
          © Copyright 2021 - Bản quyền thuộc về CVFREE
        </span>
      </div>
    </div>
  )
}
