import MetaDataActivities from 'app/partials/metadata-activities'
import MetaDataAdvancedSkills from 'app/partials/metadata-advanced-skills'
import MetaDataCertificates from 'app/partials/metadata-certificates'
import MetaDataCompanies from 'app/partials/metadata-companies'
import {
  default as MetaDataPersonalSkills,
  default as MetaDataSchools,
  MetaDataRefProps
} from 'app/partials/metadata-schools'
import PrDropdownCV from 'app/partials/pr-dropdown-cv'
import PrInputColor from 'app/partials/pr-input-color'
import PrInputCV from 'app/partials/pr-input-cv'
import PrUpload from 'app/partials/pr-upload'
import ActivityBlackIcon from 'assets/icons/activity-black.svg'
import ActivityIcon from 'assets/icons/activity.svg'
import AwardBlackIcon from 'assets/icons/award-black.svg'
import AwardIcon from 'assets/icons/award.svg'
import BirthdayIcon from 'assets/icons/birthday'
import ExperienceBlackIcon from 'assets/icons/experience-black.svg'
import ExperienceIcon from 'assets/icons/experience.svg'
import FacebookIcon from 'assets/icons/facebook'
import GenderIcon from 'assets/icons/gender'
import IdeaIcon from 'assets/icons/idea.svg'
import MapIcon from 'assets/icons/map'
import PhoneIcon from 'assets/icons/phone'
import SchoolHatBlackIcon from 'assets/icons/school-hat-black.svg'
import SchoolHatIcon from 'assets/icons/school-hat.svg'
import SkillBlackIcon from 'assets/icons/skill-black.svg'
import SkillIcon from 'assets/icons/skill.svg'
import { DataFontFamily } from 'constants/font-family-cv'
import { DataFontSize } from 'constants/font-size-cv'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CVFormStyle } from './cv-form.styles'
interface CvFormProps {}

const defaultFontFamily = { label: 'Quicksand', value: `"Quicksand", sans-serif` }
const defaultFontSize = { label: '14px', value: '14px' }

interface CategoryProps {
  name: string
  component: React.ReactElement
}

const CvFormLayout: React.FC<CvFormProps> = (props) => {
  const [avatar, setAvatar] = useState<string>()
  const [color, setColor] = useState<string>('#37474F')
  const [fontFamily, setFontFamily] = useState<string>(defaultFontFamily.value)
  const [fontSize, setFontSize] = useState<string>(defaultFontSize.value)
  const [iconColor, setIconColor] = useState<boolean>(true)
  const [fixedControl, setFixedControl] = useState<boolean>(false)

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 62) {
      setFixedControl(true)
    } else if (window.pageYOffset <= 62) {
      setFixedControl(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const metaDataPersonalSkillsRef = useRef<MetaDataRefProps>(null)

  const metaDataAdvancedSkillsRef = useRef<MetaDataRefProps>(null)
  const metaDataActivitiesRef = useRef<MetaDataRefProps>(null)
  const metaDataCertificatesRef = useRef<MetaDataRefProps>(null)

  const onChangColorCV = (colorInput: string) => {
    setColor(colorInput)
  }

  const onChangeIconColor = (checked: boolean) => {
    setIconColor(checked)
  }
  const getImage = (img: any) => {
    console.log('img', img)

    setAvatar(img)
  }

  const onCreateCV = () => {
    const metaData =
      metaDataPersonalSkillsRef && metaDataPersonalSkillsRef.current
        ? metaDataPersonalSkillsRef.current?.getValue()
        : ''
  }

  const onDownCategory = (name: string) => {
    let index = 0
    for (let i = 0; i < category.length; i++) {
      if (category[i].name === name) {
        index = i
      }
    }
    if (index === category.length - 1) {
      return
    }
    const newCategory = [...category]
    const pr = newCategory[index]
    newCategory[index] = newCategory[index + 1]
    newCategory[index + 1] = pr
    setCategory(newCategory)
  }

  const onUpCategory = (name: string) => {
    let index = 0
    for (let i = 0; i < category.length; i++) {
      if (category[i].name === name) {
        index = i
      }
    }
    if (index === 0) {
      return
    }
    const newCategory = [...category]
    const pr = newCategory[index]
    newCategory[index] = newCategory[index - 1]
    newCategory[index - 1] = pr
    setCategory(newCategory)
  }

  // component

  const Schools: React.FC = () => {
    const metaDataSchoolsRef = useRef<MetaDataRefProps>(null)
    return (
      <div className="div-one-category border-dashed border relative border-gray-300 p-4 rounded group">
        <div className="flex items-center">
          <img src={SchoolHatBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
          <span className="uppercase font-bold">Học vấn</span>
        </div>
        <div className="category-control border border-gray-400 rounded-sm overflow-hidden h-6 absolute -top-3 right-0 flex items-center opacity-0 group-hover:opacity-100  duration-300">
          <div
            onClick={() => onUpCategory('school')}
            className="px-3 h-full cursor-pointer bg-gray-500 border border-gray-400 border-t-0 border-l-0 border-b-0 flex justify-center items-center hover:bg-gray-600 duration-300"
          >
            <i className="fas fa-caret-up text-white text-lg"></i>
          </div>
          <div
            className="px-3 h-full bg-gray-500 border border-gray-400 border-t-0 border-l-0 border-b-0 cursor-pointer flex justify-center items-center hover:bg-gray-600 duration-300"
            onClick={() => onDownCategory('school')}
          >
            <i className="fas fa-caret-down text-white text-lg"></i>
          </div>
          <div
            onClick={() => metaDataSchoolsRef.current?.onCreate()}
            className="flex justify-center items-center px-3 h-full cursor-pointer bg-gray-500 border border-gray-400 border-t-0 border-l-0 border-b-0 hover:bg-green-500 duration-300"
          >
            <i className="text-white fas fa-plus"></i>
          </div>
          <div
            onClick={() => onRemoveCategory('school')}
            className="flex justify-center items-center px-3 h-full cursor-pointer bg-gray-500 hover:bg-red-600 duration-300"
          >
            <i className="text-white fas fa-times"></i>
          </div>
        </div>
        <MetaDataSchools ref={metaDataSchoolsRef} />
      </div>
    )
  }

  const Experiences: React.FC = () => {
    const metaDataCompaniesRef = useRef<MetaDataRefProps>(null)
    return (
      <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
        <div className="flex items-center">
          <img src={ExperienceBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
          <span className="uppercase font-bold">Kinh nghệm</span>
        </div>
        <MetaDataCompanies ref={metaDataCompaniesRef} />
      </div>
    )
  }

  //
  const defaultCategory: CategoryProps[] = [
    {
      name: 'school',
      component: <Schools />
    },
    {
      name: 'experience',
      component: <Experiences />
    }
  ]

  const [category, setCategory] = useState<CategoryProps[]>(defaultCategory)

  const onRemoveCategory = (name: string) => {
    let index = 0
    for (let i = 0; i < category.length; i++) {
      if (category[i].name === name) {
        index = i
      }
    }
    const newCategory = category.splice(index - 1, 1)
    setCategory(newCategory)
  }

  useEffect(() => {
    document.title = 'CVFREE | Tạo hồ sơ'
  }, [])
  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-40">
      <CVFormStyle>
        <div
          style={{ width: '210mm' }}
          className={`bg-white duration-300 z-40 mx-auto shadow-md w-full flex items-center justify-between py-2 px-5 ${
            fixedControl ? 'fixed top-24 left-0 right-0 mx-auto' : 'relative'
          }`}
        >
          {/* Màu CV */}
          <PrInputColor onChange={onChangColorCV} defaultColor="#37474F" />
          {/* Đổi mẫu */}
          <div className="mx-4 text-center">
            <span className="block text-sm font-medium">Đổi mẫu CV</span>
            <i className="fas fa-copy text-gray-600 cursor-pointer text-2xl"></i>
          </div>
          {/* Cỡ chữ */}
          <div className="w-24 mx-4 text-center">
            <span className="block text-sm font-medium">Cỡ chữ</span>
            <PrDropdownCV
              dropdownClassName="w-full"
              className="w-full"
              options={DataFontSize}
              onChange={(value) => setFontSize(value)}
              defaultValue={defaultFontSize}
            />
          </div>

          {/* Font chữ */}
          <div className="w-40 mx-4 text-center">
            <span className="block text-sm font-medium">Font chữ</span>
            <PrDropdownCV
              dropdownClassName="w-full"
              className="w-full"
              options={DataFontFamily}
              onChange={(value) => {
                console.log('value', value)

                setFontFamily(value)
              }}
              defaultValue={defaultFontFamily}
            />
          </div>

          {/* Danh sách mục */}
          <div className="mx-4 text-center">
            <span className="block text-sm font-medium">Chuyên mục</span>
            <i className="fas fa-list-ul text-gray-600 cursor-pointer text-xl"></i>
          </div>
          {/* LƯU CV */}
          <div className="mx-4 text-center bg-green-600 px-4 py-2 rounded cursor-pointer duration-300 hover:bg-green-700">
            <span className="block text-sm text-white font-semibold whitespace-nowrap">Lưu CV</span>
            <i className="fas fa-save text-white cursor-pointer text-2xl"></i>
          </div>
        </div>

        <div
          style={{ width: '210mm', height: 'auto', fontFamily: fontFamily, fontSize: fontSize }}
          className={`bg-white mx-auto shadow-2xl ${fixedControl ? 'mt-28' : 'mt-10'}`}
        >
          <div className="grid grid-cols-3 h-full">
            <div className="col-span-1 bg-gray-100 relative">
              <div className="div-top-left p-4" style={{ backgroundColor: color }}>
                <div className="mb-3">
                  <PrInputCV
                    placeholder="Họ và tên"
                    divClassName="h-8"
                    className="bg-transparent placeholder-white uppercase font-bold text-lg w-full text-center text-white py-2"
                  />
                </div>
                <div className="px-4">
                  <PrUpload getImage={getImage} />
                </div>
                <div className="mt-4 mb-8">
                  <PrInputCV
                    divClassName="h-20"
                    placeholder="Giới thiệu chung"
                    type="textarea"
                    className="bg-transparent resize-none border-gray-100 border rounded-md placeholder-white w-full text-center text-white py-2"
                  />
                </div>
              </div>

              <div className="div-bottom-left bg-gray-100 mx-4">
                <div className="mt-3 flex items-center">
                  <BirthdayIcon />
                  <PrInputCV placeholder="Ngày sinh" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center">
                  <GenderIcon />
                  <PrInputCV placeholder="Giới tính" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center">
                  <PhoneIcon />
                  <PrInputCV
                    placeholder="Điện thoại"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center">
                  <MapIcon />
                  <PrInputCV placeholder="Địa chỉ" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <div className="flex items-center mb-3">
                  <FacebookIcon />
                  <PrInputCV placeholder="Facebook" divClassName="h-8 w-full" className="bg-transparent w-full py-2" />
                </div>
                <hr />
                <div className="mt-4 flex items-center">
                  <img src={IdeaIcon} alt="skill" className="w-7 h-7" />
                  <div>
                    <PrInputCV
                      placeholder="Kỹ năng cá nhân"
                      divClassName="h-10 w-full"
                      className="bg-transparent w-full py-2"
                    />
                    <div className="-m-3 ml-3">
                      <Rate count={5} style={{ fontSize: 27 }} allowHalf allowClear={false} defaultValue={3} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center">
                  <img src={IdeaIcon} alt="skill" className="w-7 h-7" />
                  <div>
                    <PrInputCV
                      placeholder="Kỹ năng cá nhân"
                      divClassName="h-10 w-full"
                      className="bg-transparent w-full py-2"
                    />
                    <div className="-m-3 ml-3">
                      <Rate count={5} style={{ fontSize: 27 }} allowHalf allowClear={false} defaultValue={3} />
                    </div>
                  </div>
                </div>

                <MetaDataPersonalSkills ref={metaDataPersonalSkillsRef} />
                {/* <MetaData ref={metaDataRef} metadata={userInfo?.metadata} /> */}

                <div className="mt-8 mb-3">
                  <PrInputCV
                    divClassName="h-48"
                    placeholder="Mục tiêu nghề nghiệp"
                    type="textarea"
                    className="w-full bg-transparent rounded text-center py-2 border resize-none"
                  />
                </div>

                <div
                  className="div-triangle-bottom-left absolute bottom-0 left-0 w-40 h-40"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            </div>

            <div className="col-span-2 relative p-4">
              <div
                className="div-triangle-top-right absolute top-0 right-0 w-36 h-40"
                style={{ backgroundColor: color }}
              ></div>

              {/* HỌC VẤN */}
              {/* <div className="div-one-category border-dashed border border-gray-300 p-4 rounded">
                <div className="flex items-center">
                  <img src={iconColor ? SchoolHatIcon : SchoolHatBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Học vấn</span>
                </div>
                <MetaDataSchools ref={metaDataSchoolsRef} />
              </div> */}
              {/* {category[0].component} */}
              {/* HỌC VẤN */}

              {category &&
                category.length > 0 &&
                category.map((item) => {
                  return <div key={item.name}>{item.component}</div>
                })}

              {/* KINH NGHIỆM */}
              {/* <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={iconColor ? ExperienceIcon : ExperienceBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Kinh nghệm</span>
                </div>
                <MetaDataCompanies ref={metaDataCompaniesRef} />
              </div> */}
              {/* {category[1].component} */}
              {/* KINH NGHIỆM */}

              {/* KỸ NĂNG */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={SkillBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Kỹ năng chuyên môn</span>
                </div>
                <div className="flex">
                  <div className="w-11/12">
                    <PrInputCV
                      placeholder="- Kỹ năng"
                      divClassName="h-8 w-full"
                      className="bg-transparent w-full py-2 mt-2 text-sm"
                    />
                    <PrInputCV
                      placeholder=" + Mô tả chi tiết"
                      divClassName="h-16 w-full"
                      type="textarea"
                      className="bg-transparent w-full py-2 pl-8 mt-2 text-sm resize-none"
                    />
                  </div>
                  <div className="w-1/12 flex justify-end pt-3">
                    <i
                      onClick={() => {
                        metaDataAdvancedSkillsRef.current?.onCreate()
                      }}
                      title="Thêm kỹ năng"
                      className="fas fa-plus-circle text-green-600 cursor-pointer text-xl hover:text-green-700 duration-300"
                    ></i>
                  </div>
                </div>
                <MetaDataAdvancedSkills ref={metaDataAdvancedSkillsRef} />
              </div>
              {/* KỸ NĂNG */}

              {/* HOẠT ĐỘNG */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={ActivityBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Hoạt động</span>
                </div>
                <div className="flex">
                  <div className="w-11/12">
                    <PrInputCV
                      placeholder="- Hoạt động"
                      divClassName="h-8 w-full"
                      className="bg-transparent w-full py-2 mt-2 text-sm"
                    />
                  </div>
                  <div className="w-1/12 flex justify-end pt-3">
                    <i
                      onClick={() => {
                        metaDataActivitiesRef.current?.onCreate()
                      }}
                      title="Thêm kỹ năng"
                      className="fas fa-plus-circle text-green-600 cursor-pointer text-xl hover:text-green-700 duration-300"
                    ></i>
                  </div>
                </div>

                <MetaDataActivities ref={metaDataActivitiesRef} />
              </div>
              {/* HOẠT ĐỘNG */}

              {/* CHỨNG CHỈ & GIẢI THƯỞNG */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={AwardBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Chứng chỉ & Giải thưởng</span>
                </div>
                <div className="flex">
                  <div className="w-11/12">
                    <PrInputCV
                      placeholder="- Giải thưởng (chứng chỉ)"
                      divClassName="h-8 w-full"
                      className="bg-transparent w-full py-2 mt-2 text-sm"
                    />
                  </div>
                  <div className="w-1/12 flex justify-end pt-3">
                    <i
                      onClick={() => {
                        metaDataCertificatesRef.current?.onCreate()
                      }}
                      title="Thêm kỹ năng"
                      className="fas fa-plus-circle text-green-600 cursor-pointer text-xl hover:text-green-700 duration-300"
                    ></i>
                  </div>
                </div>
                <MetaDataCertificates ref={metaDataCertificatesRef} />
              </div>
              {/* CHỨNG CHỈ & GIẢI THƯỞNG */}
            </div>
          </div>
        </div>
      </CVFormStyle>
    </div>
  )
}

export default CvFormLayout
