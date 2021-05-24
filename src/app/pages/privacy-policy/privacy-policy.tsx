import { WrapperPage } from 'app/partials/layout/wrapper-page'
import { useEffect } from 'react'

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = `CVFREE | Chính sách bảo mật`
  }, [])

  return (
    <WrapperPage title="Chính sách bảo mật">
      <div className="py-10 px-16">
        <div>
          <span className="block font-bold uppercase text-md">Chính sách bảo mật</span>
          <span className="block mt-5 text-justify px-5 font-medium">
            - Chúng tôi thu thập thông tin của người dùng và lưu trữ trong kho dữ liệu. Chúng tôi cam kết bảo mật thông
            tin người dùng. Thông tin chỉ được công khai trong trường hợp truy vấn hợp lệ.
            <br />- Thông tin chỉ được chỉnh sửa, thay thế khi việc truy cập và yêu cầu là hợp lệ đến từ người dùng
            <br />- Mọi thông tin không hợp lệ, vi phạm pháp luật sẽ bị xóa vĩnh viễn.
            <br />- Hãy tự đảm bảo thông tin tài khoản CVFREE của bạn để tránh những hậu quả không tốt có thể xảy ra.
            Mọi thắc mắc, góp ý, khiếu nại vui lòng liên hệ với chúng tôi qua địa chỉ email{' '}
            <span className="text-blue-600">cvfreecontact@gmail.com</span>
          </span>
        </div>
      </div>
    </WrapperPage>
  )
}
