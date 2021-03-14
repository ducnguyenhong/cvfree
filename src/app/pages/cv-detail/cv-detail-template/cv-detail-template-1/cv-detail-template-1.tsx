import { BirthdayIcon, EmailIcon, FacebookIcon, GenderIcon, MapIcon, PhoneIcon } from 'assets/icons'
import { CvInfo } from 'models/cv-info'
import { useEffect, useRef, useState } from 'react'
import { CVDetailStyle } from '../../cv-detail.styles'
import {
  BasicSkillInfo,
  CareerGoalsInfo,
  HobbyInfo,
  EducationInfo,
  WorkExperienceInfo,
  AdvancedSkillInfo,
  ActivityInfo,
  CertificateInfo,
  AwardInfo,
  PresenterInfo,
  AnotherInfo
} from './cv-detail-category-1'

interface CvDetailProps {
  data: CvInfo
}

export const CvDetailTemplate1: React.FC<CvDetailProps> = (props) => {
  const { data } = props
  const [cvHeight, setCvHeight] = useState<number>(0)
  const cvRef = useRef<HTMLDivElement>(null)

  const { color, fontSize, fontFamily, categoryInfo, categoryCV, detail } = data
  const {
    fullname,
    birthday,
    avatar,
    applyPosition,
    gender,
    phone,
    email,
    address,
    facebook,
    basicSkill,
    careerGoals,
    hobby,
    education,
    workExperience,
    advancedSkill,
    activity,
    certificate,
    award,
    presenter,
    anotherInfo
  } = detail

  const renderCategoryInfo = (name: string) => {
    switch (name) {
      case 'basicSkill':
        return <BasicSkillInfo basicSkill={basicSkill} />
      case 'careerGoals':
        return <CareerGoalsInfo careerGoals={careerGoals} />
      case 'hobby':
        return <HobbyInfo hobby={hobby} />
      default:
        return null
    }
  }

  const renderCategoryCV = (name: string) => {
    switch (name) {
      case 'education':
        return <EducationInfo education={education} />
      case 'workExperience':
        return <WorkExperienceInfo workExperience={workExperience} />
      case 'advancedSkill':
        return <AdvancedSkillInfo advancedSkill={advancedSkill} />
      case 'activity':
        return <ActivityInfo activity={activity} />
      case 'certificate':
        return <CertificateInfo certificate={certificate} />
      case 'award':
        return <AwardInfo award={award} />
      case 'presenter':
        return <PresenterInfo presenter={presenter} />
      case 'anotherInfo':
        return <AnotherInfo anotherInfo={anotherInfo} />
      default:
        return null
    }
  }

  useEffect(() => {
    if (cvRef && cvRef.current) {
      setCvHeight(cvRef.current.clientHeight)
    }
  }, [cvRef])

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-24">
      <CVDetailStyle>
        {/* CV Main */}
        <div
          style={{ width: '210mm', height: 'auto', fontFamily: fontFamily, fontSize: fontSize }}
          className="bg-white mx-auto relative shadow-2xl mt-10"
          ref={cvRef}
        >
          {cvHeight > 1150 && (
            <div className="cv-page-2 absolute bg-green-500 shadow px-3 py-2 rounded-sm">
              <span className="text-white font-semibold">Trang 2</span>
            </div>
          )}
          {cvHeight > 2265 && (
            <div className="cv-page-3 absolute bg-green-500 shadow px-3 py-2 rounded-sm">
              <span className="text-white font-semibold">Trang 3</span>
            </div>
          )}
          <div className="grid grid-cols-3 h-full">
            {/* CV Left */}
            <div className="col-span-1 bg-gray-100 relative overflow-hidden">
              <div className="div-top-left p-4 pb-10 overflow-hidden relative" style={{ backgroundColor: color }}>
                <div className="mb-3">
                  <span className="block uppercase font-bold text-lg w-full text-center text-white py-2">
                    {fullname}
                  </span>
                </div>
                <div className="mx-6 rounded-full overflow-hidden">
                  <img src={avatar} alt="avatar" className="w-full" style={{ aspectRatio: '1/1' }} />
                </div>
                <div className="mt-3 mb-5">
                  <span className="block uppercase font-medium w-full text-center text-gray-100 py-2">
                    {applyPosition}
                  </span>
                </div>
                <div className="absolute -bottom-10 -left-10 w-60 h-16 transform rotate-12 bg-gray-100"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-16 transform -rotate-12 bg-gray-100"></div>
              </div>

              <div className="div-middle-left mx-4">
                <div className="flex items-center">
                  <BirthdayIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">{birthday}</span>
                </div>
                <div className="flex items-center">
                  <GenderIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">{gender}</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">{phone}</span>
                </div>
                <div className="flex items-center">
                  <EmailIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">{email}</span>
                </div>
                <div className="flex items-center">
                  <MapIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">{address}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FacebookIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">{facebook}</span>
                </div>
                <hr />
              </div>

              <div className="div-bottom-left bg-gray-100 mx-2">
                <div className="mb-16">
                  {categoryInfo &&
                    categoryInfo.length > 0 &&
                    categoryInfo.map((item) => {
                      return <div key={`ct_left_${item.name}`}>{renderCategoryInfo(item.name)}</div>
                    })}
                </div>

                <div
                  className="div-triangle-bottom-left absolute -bottom-20 -left-7 w-48 h-28"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            </div>

            {/* CV Right */}
            <div className="col-span-2 relative p-4 overflow-hidden">
              <div
                className="div-triangle-top-right absolute -top-12 z-20 -right-12 w-48 h-20"
                style={{ backgroundColor: color }}
              ></div>

              {categoryCV &&
                categoryCV.length > 0 &&
                categoryCV.map((item) => {
                  return <div key={`ct_right_${item.name}`}>{renderCategoryCV(item.name)}</div>
                })}
            </div>
          </div>
        </div>
      </CVDetailStyle>
    </div>
  )
}
