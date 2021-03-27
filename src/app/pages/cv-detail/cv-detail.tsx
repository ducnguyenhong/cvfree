import { useState, useEffect } from 'react'
import { CvDetailTemplate1 } from './cv-detail-template'
import { CvInfo } from 'models/cv-info'
import { useRouteMatch } from 'react-router-dom'
import { get } from 'lodash'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResponseCVDetail } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'

// const data: CvInfo = {
//   id: 1,
//   userId: 1,
//   color: '#176F9B',
//   template: '<i class="fas fa-wifi-1    "></i>',
//   fontSize: '14px',
//   fontFamily: `"Quicksand", sans-serif`,
//   categoryInfo: [
//     {
//       name: 'basicSkill'
//     },
//     {
//       name: 'hobby'
//     },
//     {
//       name: 'careerGoals'
//     }
//   ],
//   categoryCV: [
//     {
//       name: 'education'
//     },
//     {
//       name: 'workExperience'
//     },
//     {
//       name: 'advancedSkill'
//     },
//     {
//       name: 'activity'
//     },
//     {
//       name: 'certificate'
//     },
//     {
//       name: 'award'
//     },
//     {
//       name: 'presenter'
//     },
//     {
//       name: 'anotherInfo'
//     }
//   ],
//   detail: {
//     fullname: 'Nguyễn Hồng Đức',
//     avatar: 'https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg',
//     applyPosition: 'Frontend Developer',
//     birthday: '11/12/1999',
//     gender: 'Nam',
//     phone: '0389755202',
//     address: 'Ba Đình, Hà Nội',
//     email: 'autoclickvn@gmail.com',
//     facebook: 'fb.com/ducnh99',
//     basicSkill: [
//       {
//         name: 'Tiếng Anh',
//         star: 3
//       },
//       {
//         name: 'Teamwork',
//         star: 4
//       },
//       {
//         name: 'Tiếng Trung',
//         star: 3
//       }
//     ],
//     hobby: 'abc',
//     careerGoals: `- Mục tiêu ngắn hạn: trở thành TTS Front-end của công ty, được tích luỹ học hỏi thêm nhiều kinh nhiệm, kiến thức chuyên môn
//     - Mục tiêu dài hạn: trở thành nhân viên chính thức của công ty, củng cố, hoàn thiện hơn kiến thức của bản thân, nỗ lực đóng góp cho sự phát triển của công ty.`,

//     education: [
//       {
//         name: 'Đại học Giao Thông Vận Tải',
//         major: 'Công nghệ thông tin'
//       }
//     ],
//     workExperience: [
//       {
//         companyName: 'SOFTVIET',
//         position: 'Trainee',
//         time: '06/2019 - 07/2019',
//         description: 'Học hỏi kiến thức, kinh nghiệm về front-end.'
//       },
//       {
//         companyName: 'OMNISCHOOL (Ekidpro)',
//         position: 'Frontend Developer',
//         time: '08/2020 - Hiện tại',
//         description: ''
//       }
//     ],
//     advancedSkill: [
//       {
//         name: 'Ngôn ngữ lập trình cơ bản',
//         description: 'C, C++, Python, Javascript'
//       },
//       {
//         name: 'Frontend',
//         description: 'HTML5, CSS3, JS(ES6)'
//       },
//       {
//         name: 'Framework/Library',
//         description: 'React, Jquery, Material UI, Andt Design, Bootstrap, Tailwind'
//       }
//     ],
//     activity: [
//       {
//         name: 'Thành viên CLB Tin học ĐH Giao Thông Vận Tải',
//         time: '09/2017 - 09/2020'
//       }
//     ],
//     certificate: [
//       {
//         name: 'Chứng chỉ Tiếng Anh B1'
//       }
//     ],
//     award: [
//       {
//         name: 'Giải 3 cuộc thi sáng tạo cấp tỉnh (Tin học)'
//       }
//     ],
//     presenter: [
//       {
//         name: 'Nguyễn Hồng Đức',
//         position: 'HR',
//         phone: '0123456789',
//         company: 'HR.vn'
//       }
//     ],
//     anotherInfo: [
//       {
//         info: 'Website cá nhân http://nhduc.site'
//       }
//     ]
//   },
//   createdAt: 1615655698,
//   updatedAt: 1615655698
// }

const CvDetail: React.FC = () => {
  const [cvInfo, setCvInfo] = useState<CvInfo | null>(null)
  const match = useRouteMatch()
  const cvId = get(match.params, 'id')

  const callApiCvDetail = () => {
    const url = `${SERVER_URL}/cvs/${cvId}`
    const accessToken = Cookies.get('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseCVDetail>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCvInfo(data.cvDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (cvId) {
      callApiCvDetail()
    }
  }, [cvId])

  if (!cvInfo) {
    return <div>Loading</div>
  }

  const { template } = cvInfo

  if (template === '1') {
    return <CvDetailTemplate1 data={cvInfo} />
  }

  return <div>a</div>
}

export default CvDetail
