export const JobDetail: React.FC = () => {
  return (
    <div className="bg-green-100">
      <div className="w-2/3 mx-auto py-40 bg-white px-10">
        <span className="uppercase font-semibold text-2xl block text-center">Chi tiết việc làm</span>
        <div className="grid grid-cols-5 mt-10 gap-x-10">
          <div className="col-span-1 px-4">
            <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg" alt="logo" />
          </div>
          <div className="col-span-4">
            <span className="font-semibold uppercase text-lg block">Nhân viên thiết kế</span>
            <span className="block">Công ty TNHH ABC</span>
            <span className="block">1130 Đê La Thành, Ngọc Khánh, Ba Đình, Hà Nội</span>
          </div>
        </div>
        <div className="mt-20">
          <span className="font-semibold block text-xl uppercase">1. Thông tin tuyển dụng</span>
          <div>
            <span className="block">Ngành nghề: Thiết kế đồ họa</span>
            <span className="block">Thời hạn nộp hồ sơ: 30/03/2021</span>
            <span className="block">Mức lương: 10 -15 triệu</span>
            <span className="block">Hình thức làm việc: Toàn thời gian</span>
            <span className="block">Số lượng cần tuyển: 03 người</span>
            <span className="block">Vị trí cần tuyển dụng: Thực tập sinh</span>
            <span className="block">Yêu cầu giới tính: Không</span>
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">2. Mô tả công việc</span>
          <div>
            <span>
              Nhận và thực hiện các chỉ tiêu bán hàng hàng tháng - Tìm kiếm, khai thác khách hàng tiềm năng từ nghành xe
              ô tô - Tìm hiểu và đánh giá nhu cầu của khách hàng - Giới thiệu và tư vấn bán xe ô tô về sản phẩm, giá cả,
              hỗ trợ tài chính, phương thức thanh toán… - Đàm phán ký kết hợp đồng với khách hàng; - Hướng dẫn khách
              hàng sử dụng xe và bàn giao xe cho khách hàng tại đại lý hoặc giao xe tận nơi cho khách hàng
            </span>
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">3. Yêu cầu ứng viên</span>
          <div>
            <span>
              - Trình độ: Tốt nghiệp Trung cấp trở lên chuyên ngành Quản trị kinh doanh, Cơ Khí Ô Tô,Kinh tế thương mại,
              Marketting… - Có kinh nghiệm kinh doanh ít nhất 1 năm trở lên. - Tuổi từ 20-28 - Tác phong nhanh nhẹn,
              lịch sự, giao tiếp tốt, đam mê kinh doanh và ô tô là một lợi thế. - Biết SEO web, Adwords, có bằng B2 là
              một lợi thế trong công việc
            </span>
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">4. Quyền lợi</span>
          <div>
            <span>
              - Thu nhập : từ 7 triệu – 20 triệu / tháng (Lương cơ bản + Hoa hồng) chưa bao gồm Thưởng nóng 1- 5triệu -
              Lương cứng 3.5tr/tháng bán xe tính lương theo đầu xe từ 3-5tr/ xe cam kết thu nhập từ 07 triệu trở lên -
              Lương tháng 13, được nghỉ 12 ngày nghỉ phép năm, sinh nhật, thưởng các ngày Lễ, Tết theo quy định. . -
              Được hưởng đầy đủ các chế độ: BHXH, BHYT, BHTN theo quy định của Nhà nước - Nghỉ lễ, phép theo quy định
              của Nhà nước được hưởng full lương
            </span>
          </div>
        </div>
        <div className="mt-16 text-center">
          <span className="inline-block bg-green-600 text-white px-5 py-3 rounded-md uppercase font-semibold">
            Ứng tuyển ngay
          </span>
          <span className="block mt-3">(Hạn nộp hồ sơ: 30/03/2021)</span>
        </div>
      </div>
    </div>
  )
}
