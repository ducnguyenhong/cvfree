import { WrapperPage } from 'app/partials/layout/wrapper-page'
import ImageCv from 'assets/images/img-about-us-1.png'
import ImageJob from 'assets/images/img-about-us-2.png'

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-white px-80 pt-28 pb-10" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <span className="block text-center font-semibold text-2xl uppercase mt-10">Về chúng tôi</span>
      <div className="mt-10 px-16">
        <div className="flex items-center">
          <span className="block font-medium mr-10 text-justify">
            - <span className="text-green-600 font-semibold">CVFREE</span> là trang web giúp bạn có thể tạo CV
            (Curriculum Vitae) một cách nhanh chóng và hoàn toàn miễn phí. Có nhiều mẫu CV phù hợp cho bạn lựa chọn và
            những CV này được lưu trữ online, giúp bạn có thể truy cập mọi lúc mọi nơi.
          </span>
          <img src={ImageCv} alt="about-us" className="w-96" />
        </div>
        <div className="flex items-center mt-10">
          <img src={ImageJob} alt="about-us" className="w-96" />
          <span className="block font-medium ml-10 text-justify">
            - Bên cạnh đó là hệ thống tìm việc làm siêu tốc. Nhà tuyển dụng và ứng viên có thể tương tác với nhau dễ
            dàng. Và ở đây, mọi thứ đều là miễn phí.
          </span>
        </div>
      </div>
    </div>
  )
}
