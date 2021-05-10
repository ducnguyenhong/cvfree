import Image1 from 'assets/images/img-demo-temp-cv-1.png'
import Image2 from 'assets/images/img-demo-temp-cv-2.png'

export interface DataRecommendCvType {
  field: string
  recommend: string
  example: string
}

interface DataDemoCVType {
  image: string
  value: string
  label: string
}

export const DataDemoCV: DataDemoCVType[] = [
  {
    image: Image1,
    value: '1',
    label: 'DEFAULT'
  },
  {
    image: Image2,
    value: '2',
    label: 'DYNAMIC'
  }
]

export const DataRecommendCv: DataRecommendCvType[] = [
  {
    field: 'schoolName',
    recommend: 'Hãy liệt kê các trường học (trung tâm) mà bạn đã và đang học. Sau đó nhớ ghi rõ chuyên ngành nhé',
    example: `- ĐẠI HỌC GIAO THÔNG VẬN TẢI
  + Công nghệ thông tin`
  },
  {
    field: 'workExperience',
    recommend:
      'Hãy liệt kê các công ty (doanh nghiệp) mà bạn từng thực tập, làm việc tại đó. Bạn nên liệt kê tất cả nhé',
    example: `- CÔNG TY ABC...
  + Nhân viên chính thức
  + 01/2021 - 06/2021
  + Mô tả ngắn gọn công việc của bạn nhé`
  },
  {
    field: 'advancedSkill',
    recommend: 'Hãy liệt kê các kỹ năng chuyên môn của bạn ở đây, có thể gom chung hoặc tách riêng',
    example: `- TÊN KỸ NĂNG
  + Mô tả càng chi tiết thì sẽ càng gây ấn tượng cho nhà tuyển dụng nhé`
  },
  {
    field: 'activity',
    recommend: 'Hãy liệt kê các hoạt động mà bạn đã tham gia ở trường, ở các câu lạc bộ, các tổ chức xã hội...',
    example: `- Thành viên CLB Tin học ĐH Giao Thông Vận Tải
  + 01/2021 - 06/2021`
  },
  {
    field: 'certificate',
    recommend: 'Hãy liệt kê các chứng chỉ mà bạn đã đạt được',
    example: `- Chứng chỉ Tiếng Anh TOEIC`
  },
  {
    field: 'award',
    recommend: 'Hãy liệt kê các giải thưởng mà bạn đã đạt được',
    example: `- Giải nhất cuộc thi ABC...`
  },
  {
    field: 'presenter',
    recommend: 'Hãy thêm ghi chú về người đã giới thiệu bạn nhé',
    example: `- NGUYỄN VĂN A
  + Công ty ABC...
  + Nhân viên tuyển dụng
  + 0987654321`
  },
  {
    field: 'anotherInfo',
    recommend: 'Ngoài ra còn thông tin mà bạn muốn chú thích thêm, hãy liệt kê tại mục này nhé',
    example: `Website cá nhân: website_của_bạn`
  },
  {
    field: 'hobby',
    recommend: 'Nêu một vài sở thích cá nhân của bạn nhé',
    example: `Đọc sách...`
  },
  {
    field: 'careerGoals',
    recommend: 'Hãy nêu mục tiêu nghề nghiệp của bạn, có thể là mục tiêu ngắn hạn, dài hạn...',
    example: `Học hỏi kiến thức kinh nghiệp, nỗ lực đóng góp cho sự phát triển của công ty`
  },
  {
    field: 'basicSkill',
    recommend: 'Tại đây bạn có thể liệt kê một vài kỹ năng cơ bản nhé',
    example: `Tin học văn học, Tiếng Anh giao tiếp...`
  },
  {
    field: 'fullname',
    recommend: 'Họ và tên đầy đủ của bạn',
    example: `NGUYỄN VĂN A`
  },
  {
    field: 'applyPosition',
    recommend: 'Vị trí mà bạn muốn ứng tuyển',
    example: `Thực tập sinh/Nhân viên...`
  },
  {
    field: 'birthday',
    recommend: 'Ngày sinh của bạn, có thể nhập ngày sinh hoặc chọn nhé',
    example: `11/12/1999`
  },
  {
    field: 'gender',
    recommend: 'Hãy nhập giới tính của bạn',
    example: `Nam/Nữ...`
  },
  {
    field: 'phone',
    recommend:
      'Hãy nhập chính xác số điện thoại nhé, vì đây là thông tin quan trọng giúp nhà tuyển dụng liên hệ với bạn',
    example: `0987654321`
  },
  {
    field: 'email',
    recommend: 'Hãy nhập chính xác email nhé, vì đây là thông tin quan trọng giúp nhà tuyển dụng liên hệ với bạn',
    example: `example@gmail.com`
  },
  {
    field: 'facebook',
    recommend:
      'Nhập link Facebook cá nhân của bạn, điều này có thể giúp việc liên lạc giữa bạn và nhà tuyển dụng nhanh chóng hơn',
    example: `fb.com/ducnh99`
  }
]

export const DataFontFamilyCv = [
  { label: 'Quicksand', value: `"Quicksand", sans-serif` },
  { label: 'Roboto', value: `"Roboto", sans-serif` },
  { label: 'Nunito', value: `"Nunito", sans-serif` },
  { label: 'Lora', value: `"Lora", sans-serif` },
  { label: 'Dancing Script', value: `"Dancing Script", sans-serif` },
  { label: 'Saira', value: `"Saira", sans-serif` }
]

export const DataFontSizeCv = [
  { label: '13px', value: '13px' },
  { label: '14px', value: '14px' },
  { label: '15px', value: '15px' },
  { label: '16px', value: '16px' }
]
