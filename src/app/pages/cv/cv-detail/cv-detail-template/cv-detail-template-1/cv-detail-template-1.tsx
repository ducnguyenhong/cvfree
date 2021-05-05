import { BirthdayIcon, EmailIcon, FacebookIcon, GenderIcon, MapIcon, PhoneIcon } from 'assets/icons'
import { CvInfo } from 'models/cv-info'
import { useEffect, useRef, useState } from 'react'
import { CVDetailStyle } from '../../cv-detail.styles'
import AvatarTest from 'assets/images/avatar.jpg'
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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getGenderMultiLanguage } from 'utils/helper'
import { useRecoilValue } from 'recoil'
import { languageState } from 'app/states/language-state'

interface CvDetailProps {
  data: CvInfo
}

export const CvDetailTemplate1: React.FC<CvDetailProps> = (props) => {
  const { data } = props
  const [cvHeight, setCvHeight] = useState<number>(0)
  const cvRef = useRef<HTMLDivElement>(null)
  const language = useRecoilValue(languageState)

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

  const onDownloadPDF = () => {
    window.scrollTo(0, 0)
    const input: HTMLElement | null = document.getElementById('cv-detail')
    input &&
      html2canvas(input, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
        const image = { type: 'png', quality: 0.98 }
        const margin = [0, 0]

        const imgWidth = 8.5
        let pageHeight = 11

        const innerPageWidth = imgWidth - margin[0] * 2
        const innerPageHeight = pageHeight - margin[1] * 2 - 0.2

        // Calculate the number of pages.
        const pxFullHeight = canvas.height
        const pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth))
        const nPages = Math.ceil(pxFullHeight / pxPageHeight)

        // Define pageHeight separately so it can be trimmed on the final page.
        pageHeight = innerPageHeight

        // Create a one-page canvas to split up the full image.
        const pageCanvas = document.createElement('canvas')
        const pageCtx: CanvasRenderingContext2D | null = pageCanvas.getContext('2d')
        pageCanvas.width = canvas.width
        pageCanvas.height = pxPageHeight

        // Initialize the PDF.
        const pdf = new jsPDF('p', 'in', [8.5, 11])

        for (let page = 0; page < nPages; page++) {
          // Trim the final page to reduce file size.
          if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
            pageCanvas.height = pxFullHeight % pxPageHeight
            pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width
          }

          // Display the page.
          const w = pageCanvas.width
          const h = pageCanvas.height
          if (pageCtx) {
            pageCtx.fillStyle = 'white'
            pageCtx.fillRect(0, 0, w, h)
            pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h)
          }

          // Add the page to the PDF.
          if (page > 0) pdf.addPage()
          debugger
          const imgData = pageCanvas.toDataURL('image/' + image.type, image.quality)
          pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight)
        }

        pdf.save(`CVFREE - ${fullname.toUpperCase()}.pdf`)
      })
  }

  const onPrintCV = () => {
    window.print()
  }

  useEffect(() => {
    if (cvRef && cvRef.current) {
      setCvHeight(cvRef.current.clientHeight)
    }
  }, [cvRef])

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-5">
      <CVDetailStyle>
        {/* Control */}
        <div className="fixed bottom-8 right-8">
          <a
            href="/"
            className="mb-3 bg-gray-500 cursor-pointer rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-600 duration-300"
          >
            <i className="fas fa-home block text-white" />
          </a>
          <div
            onClick={onPrintCV}
            className="mb-3 bg-gray-500 cursor-pointer rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-600 duration-300"
          >
            <i className="fas fa-print block text-white" />
          </div>
          <div
            onClick={onDownloadPDF}
            className="bg-gray-500 cursor-pointer rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-600 duration-300"
          >
            <i className="fas fa-download block text-white" />
          </div>
        </div>

        {/* CV Main */}
        <div
          style={{ width: '210mm', minHeight: '297mm', fontFamily: fontFamily, fontSize: fontSize }}
          className="mx-auto relative shadow-2xl mt-10"
          ref={cvRef}
          id="cv-detail"
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
          <div className="grid grid-cols-3" style={{ minHeight: '297mm' }}>
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
                  <span className="block py-1 ml-4 font-medium text-gray-600">
                    {moment(birthday).format('DD/MM/YYYY')}
                  </span>
                </div>
                <div className="flex items-center">
                  <GenderIcon />
                  <span className="block py-1 ml-4 font-medium text-gray-600">
                    {getGenderMultiLanguage(gender, language)}
                  </span>
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
                  <span className="block py-1 ml-4 font-medium text-gray-600">{address?.label}</span>
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
            <div className="col-span-2 relative p-4 overflow-hidden bg-white">
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
