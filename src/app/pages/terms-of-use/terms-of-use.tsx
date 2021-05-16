import { WrapperPage } from 'app/partials/layout/wrapper-page'
import { useEffect } from 'react'

export const TermsOfUse: React.FC = () => {
  useEffect(() => {
    document.title = `CVFREE | Điều khoản sử dụng`
  }, [])

  return (
    <WrapperPage title="Điều khoản sử dụng">
      <div className="py-10 px-16">
        <div>
          <span className="block font-bold uppercase text-md">1. Quyền và nghĩa vụ của CVFREE</span>
          <span className="block mt-5 text-justify px-5 font-medium">
            - Chúng tôi cung cấp các dịch vụ trực tuyến cho người dùng sử dụng và cam kết tất cả các nội dung, video,
            hình ảnh là hoàn toàn hợp lệ, tuân thủ các quy định của pháp luật. Mọi tính năng hiện có đều là hoàn toàn
            miễn phí, vì vậy hãy sử dụng website của chúng tôi một cách văn minh.
            <br />- Chúng tôi có quyền thay đổi, chỉnh sửa, xóa bất kỳ nội dung nào không hợp lệ, vi phạm pháp luật đến
            từ phía người dùng. Mọi hành vi mang tính chất phá hoại, spam... sẽ bị khóa tài khoản vĩnh viễn.
          </span>
        </div>
        <div className="my-10">
          <span className="block font-bold uppercase text-md">2. Quyền và nghĩa vụ của người sử dụng</span>
          <span className="block mt-5 text-justify px-5 font-medium">
            - Người dùng có quyền sử dụng những dịch vụ trực tuyến mà CVFREE cũng cấp. Người dùng có quyền chiết suất
            thông tin từ CVFREE như tải xuống, chia sẻ, đính kèm...
            <br />- Hãy tự đảm bảo thông tin tài khoản CVFREE của bạn để tránh những hậu quả không tốt có thể xảy ra.
            Mọi thắc mắc, góp ý, khiếu nại vui lòng liên hệ với chúng tôi qua địa chỉ email{' '}
            <span className="text-blue-600">cvfreecontact@gmail.com</span>
          </span>
        </div>
      </div>
    </WrapperPage>
  )
}
