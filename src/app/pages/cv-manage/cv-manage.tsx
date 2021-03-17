import { useState, useEffect } from 'react'
import { CvInfo } from 'models/cv-info'
import moment from 'moment'
import { slugURL } from 'utils/helper'
import { Link } from 'react-router-dom'
import { RadioButton } from 'app/partials/layout/radio-button'

const data: CvInfo[] = [
  {
    id: 1,
    userId: 1,
    color: '#176F9B',
    template: 1,
    fontSize: '14px',
    name: 'Đức',
    fontFamily: `"Quicksand", sans-serif`,
    categoryInfo: [
      {
        name: 'basicSkill'
      },
      {
        name: 'hobby'
      },
      {
        name: 'careerGoals'
      }
    ],
    categoryCV: [
      {
        name: 'education'
      },
      {
        name: 'workExperience'
      },
      {
        name: 'advancedSkill'
      },
      {
        name: 'activity'
      },
      {
        name: 'certificate'
      },
      {
        name: 'award'
      },
      {
        name: 'presenter'
      },
      {
        name: 'anotherInfo'
      }
    ],
    detail: {
      fullname: 'Nguyễn Hồng Đức',
      avatar: 'https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg',
      applyPosition: 'Frontend Developer',
      birthday: '11/12/1999',
      gender: 'Nam',
      phone: '0389755202',
      address: 'Ba Đình, Hà Nội',
      email: 'autoclickvn@gmail.com',
      facebook: 'fb.com/ducnh99',
      basicSkill: [
        {
          name: 'Tiếng Anh',
          star: 3
        },
        {
          name: 'Teamwork',
          star: 4
        },
        {
          name: 'Tiếng Trung',
          star: 3
        }
      ],
      hobby: 'abc',
      careerGoals: `- Mục tiêu ngắn hạn: trở thành TTS Front-end của công ty, được tích luỹ học hỏi thêm nhiều kinh nhiệm, kiến thức chuyên môn
      - Mục tiêu dài hạn: trở thành nhân viên chính thức của công ty, củng cố, hoàn thiện hơn kiến thức của bản thân, nỗ lực đóng góp cho sự phát triển của công ty.`,

      education: [
        {
          name: 'Đại học Giao Thông Vận Tải',
          major: 'Công nghệ thông tin'
        }
      ],
      workExperience: [
        {
          companyName: 'SOFTVIET',
          position: 'Trainee',
          time: '06/2019 - 07/2019',
          description: 'Học hỏi kiến thức, kinh nghiệm về front-end.'
        },
        {
          companyName: 'OMNISCHOOL (Ekidpro)',
          position: 'Frontend Developer',
          time: '08/2020 - Hiện tại',
          description: ''
        }
      ],
      advancedSkill: [
        {
          name: 'Ngôn ngữ lập trình cơ bản',
          description: 'C, C++, Python, Javascript'
        },
        {
          name: 'Frontend',
          description: 'HTML5, CSS3, JS(ES6)'
        },
        {
          name: 'Framework/Library',
          description: 'React, Jquery, Material UI, Andt Design, Bootstrap, Tailwind'
        }
      ],
      activity: [
        {
          name: 'Thành viên CLB Tin học ĐH Giao Thông Vận Tải',
          time: '09/2017 - 09/2020'
        }
      ],
      certificate: [
        {
          name: 'Chứng chỉ Tiếng Anh B1'
        }
      ],
      award: [
        {
          name: 'Giải 3 cuộc thi sáng tạo cấp tỉnh (Tin học)'
        }
      ],
      presenter: [
        {
          name: 'Nguyễn Hồng Đức',
          position: 'HR',
          phone: '0123456789',
          company: 'HR.vn'
        }
      ],
      anotherInfo: [
        {
          info: 'Website cá nhân http://nhduc.site'
        }
      ]
    },
    createdAt: 1615655698,
    updatedAt: 1615655698
  },
  {
    id: 1,
    userId: 1,
    color: '#176F9B',
    template: 1,
    fontSize: '14px',
    fontFamily: `"Quicksand", sans-serif`,
    categoryInfo: [
      {
        name: 'basicSkill'
      },
      {
        name: 'hobby'
      },
      {
        name: 'careerGoals'
      }
    ],
    categoryCV: [
      {
        name: 'education'
      },
      {
        name: 'workExperience'
      },
      {
        name: 'advancedSkill'
      },
      {
        name: 'activity'
      },
      {
        name: 'certificate'
      },
      {
        name: 'award'
      },
      {
        name: 'presenter'
      },
      {
        name: 'anotherInfo'
      }
    ],
    detail: {
      fullname: 'Nguyễn Hồng Đức',
      avatar: 'https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg',
      applyPosition: 'Frontend Developer',
      birthday: '11/12/1999',
      gender: 'Nam',
      phone: '0389755202',
      address: 'Ba Đình, Hà Nội',
      email: 'autoclickvn@gmail.com',
      facebook: 'fb.com/ducnh99',
      basicSkill: [
        {
          name: 'Tiếng Anh',
          star: 3
        },
        {
          name: 'Teamwork',
          star: 4
        },
        {
          name: 'Tiếng Trung',
          star: 3
        }
      ],
      hobby: 'abc',
      careerGoals: `- Mục tiêu ngắn hạn: trở thành TTS Front-end của công ty, được tích luỹ học hỏi thêm nhiều kinh nhiệm, kiến thức chuyên môn
      - Mục tiêu dài hạn: trở thành nhân viên chính thức của công ty, củng cố, hoàn thiện hơn kiến thức của bản thân, nỗ lực đóng góp cho sự phát triển của công ty.`,

      education: [
        {
          name: 'Đại học Giao Thông Vận Tải',
          major: 'Công nghệ thông tin'
        }
      ],
      workExperience: [
        {
          companyName: 'SOFTVIET',
          position: 'Trainee',
          time: '06/2019 - 07/2019',
          description: 'Học hỏi kiến thức, kinh nghiệm về front-end.'
        },
        {
          companyName: 'OMNISCHOOL (Ekidpro)',
          position: 'Frontend Developer',
          time: '08/2020 - Hiện tại',
          description: ''
        }
      ],
      advancedSkill: [
        {
          name: 'Ngôn ngữ lập trình cơ bản',
          description: 'C, C++, Python, Javascript'
        },
        {
          name: 'Frontend',
          description: 'HTML5, CSS3, JS(ES6)'
        },
        {
          name: 'Framework/Library',
          description: 'React, Jquery, Material UI, Andt Design, Bootstrap, Tailwind'
        }
      ],
      activity: [
        {
          name: 'Thành viên CLB Tin học ĐH Giao Thông Vận Tải',
          time: '09/2017 - 09/2020'
        }
      ],
      certificate: [
        {
          name: 'Chứng chỉ Tiếng Anh B1'
        }
      ],
      award: [
        {
          name: 'Giải 3 cuộc thi sáng tạo cấp tỉnh (Tin học)'
        }
      ],
      presenter: [
        {
          name: 'Nguyễn Hồng Đức',
          position: 'HR',
          phone: '0123456789',
          company: 'HR.vn'
        }
      ],
      anotherInfo: [
        {
          info: 'Website cá nhân http://nhduc.site'
        }
      ]
    },
    createdAt: 1615655698,
    updatedAt: 1615655698
  }
]

export const CvManage: React.FC = () => {
  const [cvList, setCvList] = useState<CvInfo[] | null>(null)

  useEffect(() => {
    setCvList(data)
  }, [])

  if (!cvList) {
    return <div>Loading</div>
  }

  return (
    <div className="bg-gray-200 py-32 w-full">
      <div className="grid grid-cols-3 w-2/3 mx-auto gap-x-6 rounded">
        <div className="col-span-2 bg-white shadow-md border-gray-300 px-8 py-10">
          <span className="block uppercase text-xl font-bold text-gray-700 text-center">Danh sách hồ sơ cá nhân</span>
          <div className="mange-list-cv mt-10">
            {cvList &&
              cvList.length > 0 &&
              cvList.map((item, index) => {
                const { name, id, detail, createdAt, updatedAt } = item
                const { fullname } = detail
                return (
                  <div
                    className="grid grid-cols-5 py-5 items-center gap-x-4 border border-dashed border-gray-300 rounded mb-12"
                    key={`cv_${index}`}
                  >
                    <div className="px-4 w-30 h-40 flex items-center">
                      <img
                        src={'https://cdn1.vieclam24h.vn/images/assets/img/cv4-d55c59.png'}
                        alt="cv"
                        className="w-full block col-span-1"
                      />
                    </div>
                    <div className="col-span-4 pr-5">
                      <div>
                        <span className="block text-center font-bold text-xl text-green-600">
                          {name || `CV${index + 1}`}
                        </span>
                      </div>
                      <div className="grid grid-cols-5 mt-2">
                        <div className="col-span-1"></div>
                        <div className="col-span-4 flex items-center justify-between">
                          <span className="whitespace-nowrap overflow-ellipsis overflow-hidden italic text-blue-800 pr-2">
                            http://localhost:1112/cv-public/{slugURL(fullname)}.{`${id}`}
                          </span>
                          <i
                            title="Sao chép"
                            className="fas fa-copy ml-3 text-md cursor-pointer text-gray-400 hover:text-gray-500 duration-300"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `http://localhost:1112/cv-public/${slugURL(fullname)}.${`${id}`}`
                              )
                            }}
                          ></i>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 mt-2">
                        <div className="col-span-1"></div>
                        <div className="col-span-4 flex justify-between">
                          <div>
                            <i className="far fa-clock mr-2"></i>
                            <span>Ngày tạo</span>
                          </div>
                          <span className="block">{moment(createdAt * 1000).format('DD/MM/YYYY HH:mm')}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 mt-2">
                        <div className="col-span-1"></div>
                        <div className="col-span-4 flex justify-between">
                          <div>
                            <i className="fas fa-history mr-2"></i>
                            <span>Ngày sửa</span>
                          </div>
                          <span className="block">{moment(updatedAt * 1000).format('DD/MM/YYYY HH:mm')}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-x-16 mt-5">
                        <Link
                          to={`/cv-public/${slugURL(fullname)}.${id}`}
                          className="col-span-1 bg-green-600 py-1 rounded flex justify-center items-center hover:bg-green-700 duration-300"
                        >
                          <i className="fas fa-eye mr-2 text-white"></i>
                          <span className="text-white">Xem</span>
                        </Link>
                        <Link
                          to="/edit-cv/"
                          className="col-span-1 py-1 bg-purple-700 rounded flex justify-center items-center hover:bg-purple-800 duration-300"
                        >
                          <i className="fas fa-edit mr-2 text-white"></i>
                          <span className="text-white">Sửa</span>
                        </Link>
                        <div className="col-span-1 bg-red-600 py-1 rounded flex justify-center items-center cursor-pointer hover:bg-red-700 duration-300">
                          <i className="fas fa-trash mr-2 text-white"></i>
                          <span className="text-white">Xóa</span>
                        </div>
                        <div className="col-span-1 bg-white py-0.5 rounded flex justify-center items-center cursor-pointer">
                          <i className="fas fa-trash mr-2"></i>
                          <span>Coming</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="col-span-1 bg-white shadow-md py-10 px-8">
          <span className="block uppercase text-xl font-semibold text-gray-700">Thông tin cá nhân</span>
          <div className="mt-8">
            <div className="grid grid-cols-3 gap-x-4 mt-5">
              <div className="col-span-1 px-3">
                <img
                  src={
                    'https://www.flaticon.com/svg/vstatic/svg/3135/3135715.svg?token=exp=1615960744~hmac=3a9c91b05199eb898e5df5656a2218d0'
                  }
                  // https://www.flaticon.com/svg/vstatic/svg/3135/3135789.svg?token=exp=1615960752~hmac=84a9bb6fb70fe5bdab317b81b776b7de
                  alt="avatar"
                  className=""
                />
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-lg">Nguyễn Đức</span>
                <div className="mt-2 mb-3">
                  <span>Tài khoản thường</span>
                  <i className="fas fa-circle-check" />
                </div>
                <span className="bg-green-600 px-3 py-1 text-sm font-medium cursor-pointer rounded text-white">
                  Nâng cấp
                </span>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <span className="block uppercase text-xl font-semibold text-gray-700">Tùy chọn cho phép</span>
            <div className="mt-5 px-4">
              <div className="flex items-center">
                <RadioButton />
                <span className="block ml-3 font-medium">NTD xem CV của bạn</span>
              </div>
              <div className="flex items-center mt-4">
                <RadioButton />
                <span className="block ml-3 font-medium">Trạng thái tìm việc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
