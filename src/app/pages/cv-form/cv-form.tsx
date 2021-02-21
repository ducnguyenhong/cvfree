import PrUpload from 'app/partials/pr-upload'
import PrInputCV from 'app/partials/pr-input-cv'
interface CvFormProps {}
import { CVFormStyle } from './cv-form.styles'
import { useEffect, useState, useCallback } from 'react'
import BirthdayIcon from 'assets/icons/birthday'
import GenderIcon from 'assets/icons/gender'
import PhoneIcon from 'assets/icons/phone'
import MapIcon from 'assets/icons/map'
import FacebookIcon from 'assets/icons/facebook'
import Rate from 'rc-rate'
import { useRef } from 'react'
import 'rc-rate/assets/index.css'
import IdeaIcon from 'assets/icons/idea.svg'
import PrInputColor from 'app/partials/pr-input-color'
import SchoolHatIcon from 'assets/icons/school-hat.svg'
import SchoolHatBlackIcon from 'assets/icons/school-hat-black.svg'
import ExperienceIcon from 'assets/icons/experience.svg'
import SkillIcon from 'assets/icons/skill.svg'
import ActivityIcon from 'assets/icons/activity.svg'
import AwardIcon from 'assets/icons/award.svg'
import PrDropwdown from 'app/partials/pr-dropdown'
import { DataFontFamily } from 'constants/list-font'
import Switch from 'react-switch'
import PrDropdownCV from 'app/partials/pr-dropdown-cv'

import MetaDataPersonalSkills, { MetaDataRefProps } from 'app/partials/metadata-personal-skills'
import MetaDataSchools from 'app/partials/metadata-schools'
import MetaDataCompanies from 'app/partials/metadata-companies'
import MetaDataAdvancedSkills from 'app/partials/metadata-advanced-skills'
import MetaDataActivities from 'app/partials/metadata-activities'
import MetaDataCertificates from 'app/partials/metadata-certificates'

const CvFormLayout: React.FC<CvFormProps> = (props) => {
  const [avatar, setAvatar] = useState<string>()
  const [color, setColor] = useState<string>('#10B981')
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
  const metaDataSchoolsRef = useRef<MetaDataRefProps>(null)
  const metaDataCompaniesRef = useRef<MetaDataRefProps>(null)
  const metaDataAdvancedSkillsRef = useRef<MetaDataRefProps>(null)
  const metaDataActivitiesRef = useRef<MetaDataRefProps>(null)
  const metaDataCertificatesRef = useRef<MetaDataRefProps>(null)

  const onChangColorCV = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
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

  useEffect(() => {
    document.title = 'CVFREE | Tạo hồ sơ'
  }, [])
  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-40">
      <CVFormStyle>
        <div
          style={{ width: '210mm' }}
          className={`bg-white duration-300 z-40 mx-auto shadow-md w-full flex items-center justify-between py-2 ${
            fixedControl ? 'fixed top-24 left-0 right-0 mx-auto' : 'relative'
          }`}
        >
          <div className="mx-4 text-center">
            <span className="block">Lưu CV</span>
            <i className="fas fa-save text-green-700 cursor-pointer text-3xl"></i>
          </div>
          <PrInputColor onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangColorCV(e)} />
          <div className="mx-4 text-center">
            <span className="block">Icon màu</span>
            <Switch onChange={onChangeIconColor} checked={iconColor} />
          </div>
          <div className="w-44 mx-4 text-center">
            <span className="block">Font chữ</span>
            <PrDropdownCV dropdownClassName="w-full" className="w-full" />
          </div>
          <div className="w-44 mx-4 text-center">
            <span className="block">Ảnh nền</span>
            <PrDropdownCV dropdownClassName="w-full" className="w-full" type="image" />
          </div>
        </div>

        <div
          style={{ width: '210mm', height: 'auto' }}
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
                    className="bg-transparent border-gray-100 border rounded-md placeholder-white w-full text-sm text-center text-white py-2"
                  />
                </div>
              </div>

              <div className="div-bottom-left bg-gray-100 mx-4">
                <div className="mt-3 flex items-center">
                  <BirthdayIcon />
                  <PrInputCV
                    placeholder="Ngày sinh"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <GenderIcon />
                  <PrInputCV
                    placeholder="Giới tính"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <PhoneIcon />
                  <PrInputCV
                    placeholder="Điện thoại"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <MapIcon />
                  <PrInputCV
                    placeholder="Địa chỉ"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 text-sm"
                  />
                </div>
                <div className="flex items-center mb-3">
                  <FacebookIcon />
                  <PrInputCV
                    placeholder="Facebook"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 text-sm"
                  />
                </div>
                <hr />
                <div className="mt-4 flex items-center">
                  <img src={IdeaIcon} alt="skill" className="w-7 h-7" />
                  <div>
                    <PrInputCV
                      placeholder="Kỹ năng cá nhân"
                      divClassName="h-10 w-full"
                      className="bg-transparent w-full py-2 text-sm"
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
                      className="bg-transparent w-full py-2 text-sm"
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
                    className="w-full text-sm bg-transparent rounded text-center py-2 border"
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
              <div className="div-one-category border-dashed border border-gray-300 p-4 rounded">
                <div className="flex items-center">
                  <img src={iconColor ? SchoolHatIcon : SchoolHatBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Học vấn</span>
                </div>
                <div>
                  <PrInputCV
                    placeholder="- Trường học/Trung tâm"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 mt-2 text-sm"
                  />
                  <PrInputCV
                    placeholder=" + Chuyên ngành"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 pl-8 mt-2 text-sm"
                  />
                </div>
                <MetaDataSchools ref={metaDataSchoolsRef} />
              </div>
              {/* HỌC VẤN */}

              {/* KINH NGHIỆM */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={ExperienceIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Kinh nghệm</span>
                </div>
                <div>
                  <PrInputCV
                    placeholder="- Công ty"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 mt-2 text-sm"
                  />
                  <PrInputCV
                    placeholder=" + Vị trí"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 pl-8 mt-2 text-sm"
                  />
                  <PrInputCV
                    placeholder=" + Thời gian"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 pl-8 mt-2 text-sm"
                  />
                </div>
                <MetaDataCompanies ref={metaDataCompaniesRef} />
              </div>
              {/* KINH NGHIỆM */}

              {/* KỸ NĂNG */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={SkillIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Kỹ năng chuyên môn</span>
                </div>
                <div>
                  <PrInputCV
                    placeholder="- Kỹ năng"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 mt-2 text-sm"
                  />
                  <PrInputCV
                    placeholder=" + Mô tả chi tiết"
                    divClassName="h-16 w-full"
                    type="textarea"
                    className="bg-transparent w-full py-2 pl-8 mt-2 text-sm"
                  />
                </div>
                <MetaDataAdvancedSkills ref={metaDataAdvancedSkillsRef} />
              </div>
              {/* KỸ NĂNG */}

              {/* HOẠT ĐỘNG */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={ActivityIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Hoạt động</span>
                </div>
                <div>
                  <PrInputCV
                    placeholder="- Hoạt động"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 mt-2 text-sm"
                  />
                </div>
                <MetaDataActivities ref={metaDataActivitiesRef} />
              </div>
              {/* HOẠT ĐỘNG */}

              {/* CHỨNG CHỈ & GIẢI THƯỞNG */}
              <div className="div-one-category border-dashed border border-gray-300 p-4 mt-6 rounded">
                <div className="flex items-center">
                  <img src={AwardIcon} alt="skill" className="w-10 h-10 mr-3" />
                  <span className="uppercase font-bold">Chứng chỉ & Giải thưởng</span>
                </div>
                <div>
                  <PrInputCV
                    placeholder="- Giải thưởng (chứng chỉ)"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2 mt-2 text-sm"
                  />
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
