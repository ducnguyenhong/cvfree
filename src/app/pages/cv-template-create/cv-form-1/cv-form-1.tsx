import PrDropdownCV from 'app/partials/pr-dropdown-cv'
import PrInputColor from 'app/partials/pr-input-color'
import PrInputCV from 'app/partials/pr-input-cv'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import PrUpload from 'app/partials/pr-upload'
import { EmailIcon, FacebookIcon, GenderIcon, BirthdayIcon, MapIcon, PhoneIcon } from 'assets/icons'
import { DataFontFamily } from 'constants/font-family-cv'
import { DataFontSize } from 'constants/font-size-cv'
import { MetaDataRefProps } from 'models/metadata-type'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Activities,
  AdvancedSkills,
  AnotherInfos,
  Awards,
  BasicSkills,
  Certificates,
  WorkExperiences,
  CareerGoals,
  Hobbies,
  Presenters,
  Educations
} from './category'
import { CVFormStyle } from './cv-form.styles'
import { CategoryProps, CvFormProps, PrInputCVRefProps } from './cv-form.types'
import { getCategoryWhenUp, getCategoryWhenDown, getCategoryWhenRemove, uploadServer } from 'utils/helper'
import { CvInfo } from 'models/cv-info'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { ResponseCVDetail } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'

const defaultFontFamily = { label: 'Quicksand', value: `"Quicksand", sans-serif` }
const defaultFontSize = { label: '14px', value: '14px' }

export const CvFormLayout1: React.FC<CvFormProps> = (props) => {
  const userInfo = useRecoilValue(userInfoState)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [color, setColor] = useState<string>('#176F9B')
  const [fontFamily, setFontFamily] = useState<string>(defaultFontFamily.value)
  const [fontSize, setFontSize] = useState<string>(defaultFontSize.value)
  const [fixedControl, setFixedControl] = useState<boolean>(false)
  const [cvHeight, setCvHeight] = useState<number>(0)

  const fullnameRef = useRef<PrInputCVRefProps>(null)
  const applyPositionRef = useRef<PrInputCVRefProps>(null)
  const birthdayRef = useRef<PrInputCVRefProps>(null)
  const phoneRef = useRef<PrInputCVRefProps>(null)
  const genderRef = useRef<PrInputCVRefProps>(null)
  const emailRef = useRef<PrInputCVRefProps>(null)
  const addressRef = useRef<PrInputCVRefProps>(null)
  const facbookRef = useRef<PrInputCVRefProps>(null)

  const modalListCategoryRef = useRef<PrModalRefProps>(null)
  const educationsRef = useRef<MetaDataRefProps>(null)
  const awardsRef = useRef<MetaDataRefProps>(null)
  const presentersRef = useRef<MetaDataRefProps>(null)
  const workExperiencesRef = useRef<MetaDataRefProps>(null)
  const anotherInfoRef = useRef<MetaDataRefProps>(null)
  const advancedSkillsRef = useRef<MetaDataRefProps>(null)
  const activitiesRef = useRef<MetaDataRefProps>(null)
  const certificatesRef = useRef<MetaDataRefProps>(null)
  const basicSkillsRef = useRef<MetaDataRefProps>(null)
  const hobbiesRef = useRef<PrInputCVRefProps>(null)
  const careerGoalsRef = useRef<PrInputCVRefProps>(null)
  const cvRef = useRef<HTMLDivElement>(null)

  const defaultCategory: CategoryProps[] = [
    {
      title: 'Học vấn',
      enable: true,
      name: 'education',
      component: (props) => <Educations {...props} />,
      categoryRef: educationsRef
    },
    {
      title: 'Kinh nghiệm làm việc',
      enable: true,
      name: 'workExperience',
      component: (props) => <WorkExperiences {...props} />,
      categoryRef: workExperiencesRef
    },
    {
      title: 'Kỹ năng chuyên môn',
      enable: true,
      name: 'advancedSkill',
      component: (props) => <AdvancedSkills {...props} />,
      categoryRef: advancedSkillsRef
    },
    {
      title: 'Hoạt động',
      enable: true,
      name: 'activity',
      component: (props) => <Activities {...props} />,
      categoryRef: activitiesRef
    },
    {
      title: 'Chứng chỉ',
      enable: true,
      name: 'certificate',
      component: (props) => <Certificates {...props} />,
      categoryRef: certificatesRef
    },
    {
      title: 'Giải thưởng',
      enable: true,
      name: 'award',
      component: (props) => <Awards {...props} />,
      categoryRef: awardsRef
    },
    {
      title: 'Người giới thiệu',
      enable: false,
      name: 'presenter',
      component: (props) => <Presenters {...props} />,
      categoryRef: presentersRef
    },
    {
      title: 'Thông tin khác',
      enable: false,
      name: 'anotherInfo',
      component: (props) => <AnotherInfos {...props} />,
      categoryRef: anotherInfoRef
    }
  ]

  const defaultCategoryLeft: CategoryProps[] = [
    {
      title: 'Kỹ năng cá nhân',
      enable: true,
      name: 'basicSkill',
      component: (props) => <BasicSkills {...props} />,
      categoryRef: basicSkillsRef
    },
    {
      title: 'Sở thích',
      enable: false,
      name: 'hobby',
      component: (props) => <Hobbies {...props} />,
      inputRef: hobbiesRef
    },
    {
      title: 'Mục tiêu nghề nghiệp',
      enable: true,
      name: 'careerGoals',
      component: (props) => <CareerGoals {...props} />,
      inputRef: careerGoalsRef
    }
  ]

  const [category, setCategory] = useState<CategoryProps[]>(defaultCategory)
  const [categoryLeft, setCategoryLeft] = useState<CategoryProps[]>(defaultCategoryLeft)
  const [categoryChecked, setCategoryChecked] = useState<CategoryProps[]>(defaultCategory)
  const [categoryCheckedLeft, setCategoryCheckedLeft] = useState<CategoryProps[]>(defaultCategoryLeft)

  const onChangColorCV = (colorInput: string) => {
    setColor(colorInput)
  }

  const getImage = (img: any) => {
    setAvatar(img)
  }

  const validate = () => {
    return true
  }

  const onCreateCV = async () => {
    if (!validate()) {
      return
    }
    let avatarURL = ''
    if (avatar) {
      avatarURL = await uploadServer(avatar)
    }

    // const fullname = fullnameRef.current?.getValue() || ''
    // const applyPosition = applyPositionRef.current?.getValue()
    // const birthday = birthdayRef.current?.getValue() || ''
    // const gender = genderRef.current?.getValue() || ''
    // const phone = phoneRef.current?.getValue() || ''
    // const email = emailRef.current?.getValue() || ''
    // const address = addressRef.current?.getValue()
    // const facebook = facbookRef.current?.getValue()

    // const basicSkill = basicSkillsRef.current?.getValue()
    // const hobby = hobbiesRef.current?.getValue()
    // const careerGoals = careerGoalsRef.current?.getValue()
    // const education = educationsRef.current?.getValue()
    // const workExperience = workExperiencesRef.current?.getValue()
    // const advancedSkill = advancedSkillsRef.current?.getValue()
    // const activity = activitiesRef.current?.getValue()
    // const certificate = certificatesRef.current?.getValue()
    // const award = awardsRef.current?.getValue()
    // const presenter = presentersRef.current?.getValue()
    // const anotherInfo = anotherInfoRef.current?.getValue()

    // const dataCV: CvInfo = {
    //   userId: userInfo?.id || 0,
    //   color,
    //   template: '1',
    //   fontSize,
    //   fontFamily,
    //   name: '',
    //   categoryInfo: [
    //     {
    //       name: 'string'
    //     }
    //   ],
    //   categoryCV: [
    //     {
    //       name: 'string'
    //     }
    //   ],
    //   detail: {
    //     fullname,
    //     avatar: 'string',
    //     applyPosition,
    //     birthday,
    //     gender,
    //     phone,
    //     address,
    //     email,
    //     facebook,
    //     basicSkill: [
    //       {
    //         name: 'string',
    //         star: 0
    //       }
    //     ],
    //     hobby: 'string',
    //     careerGoals: 'string',

    //     education: [
    //       {
    //         name: 'string',
    //         major: 'string'
    //       }
    //     ],
    //     workExperience: [
    //       {
    //         companyName: 'string',
    //         position: 'string',
    //         time: 'string',
    //         description: 'string'
    //       }
    //     ],
    //     advancedSkill: [
    //       {
    //         name: 'string',
    //         description: 'string'
    //       }
    //     ],
    //     activity: [
    //       {
    //         name: 'string',
    //         time: 'string'
    //       }
    //     ],
    //     certificate: [
    //       {
    //         name: 'string'
    //       }
    //     ],
    //     award: [
    //       {
    //         name: 'string'
    //       }
    //     ],
    //     presenter: [
    //       {
    //         name: 'string',
    //         company: 'string',
    //         position: 'string',
    //         phone: 'string'
    //       }
    //     ],
    //     anotherInfo: [
    //       {
    //         info: 'string'
    //       }
    //     ]
    //   }
    // }

    // callApiCreate(dataCV)
  }

  const callApiCreate = (data: CvInfo) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/cv`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseCVDetail>) => {
        const { success, data, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }

        showNotify.success(message)
      })
      .catch((e) => {
        // setLoading(false)
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onSelectListCategory = () => {
    modalListCategoryRef.current?.show()
  }

  const onUpCategory = (name: string) => {
    const newCategory = getCategoryWhenUp(category, name)
    newCategory && setCategory(newCategory)
  }

  const onDownCategory = (name: string) => {
    const newCategory = getCategoryWhenDown(category, name)
    newCategory && setCategory(newCategory)
  }

  const onRemoveCategory = (name: string) => {
    setCategory(getCategoryWhenRemove(category, name))
  }

  const onUpCategoryLeft = (name: string) => {
    const newCategory = getCategoryWhenUp(categoryLeft, name)
    newCategory && setCategoryLeft(newCategory)
  }

  const onDownCategoryLeft = (name: string) => {
    const newCategory = getCategoryWhenDown(categoryLeft, name)
    newCategory && setCategoryLeft(newCategory)
  }

  const onRemoveCategoryLeft = (name: string) => {
    setCategoryLeft(getCategoryWhenRemove(categoryLeft, name))
  }

  const onChangeCheckbox = (checked: boolean, name: string) => {
    const newCategoryChecked = JSON.parse(JSON.stringify(categoryChecked))
    for (let i = 0; i < newCategoryChecked.length; i++) {
      if (newCategoryChecked[i].name === name) {
        newCategoryChecked[i].enable = checked
      }
    }
    setCategoryChecked(newCategoryChecked)
  }

  const onChangeCheckboxLeft = (checked: boolean, name: string) => {
    const newCategoryChecked = JSON.parse(JSON.stringify(categoryCheckedLeft))
    for (let i = 0; i < newCategoryChecked.length; i++) {
      if (newCategoryChecked[i].name === name) {
        newCategoryChecked[i].enable = checked
      }
    }
    setCategoryCheckedLeft(newCategoryChecked)
  }

  const onChangeCategoryList = () => {
    modalListCategoryRef.current?.hide()
    for (let i = 0; i < categoryChecked.length; i++) {
      for (let j = 0; j < category.length; j++) {
        if (categoryChecked[i].name === category[j].name) {
          category[j].enable = categoryChecked[i].enable
        }
      }
    }
    for (let i = 0; i < categoryCheckedLeft.length; i++) {
      for (let j = 0; j < categoryLeft.length; j++) {
        if (categoryCheckedLeft[i].name === categoryLeft[j].name) {
          categoryLeft[j].enable = categoryCheckedLeft[i].enable
        }
      }
    }
    setCategory(category)
    setCategoryLeft(categoryLeft)
  }

  const onHideCategoryList = () => {
    setCategoryChecked(category)
    setCategoryCheckedLeft(categoryLeft)
  }

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 51) {
      setFixedControl(true)
    } else if (window.pageYOffset <= 51) {
      setFixedControl(false)
    }
    if (cvRef && cvRef.current) {
      setCvHeight(cvRef.current.clientHeight)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.title = 'CVFREE | Tạo hồ sơ'
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-32">
      <CVFormStyle>
        {/* Control */}

        <div
          style={{ width: '210mm', top: fixedControl ? 76 : undefined }}
          className={`bg-white duration-300 z-40 mx-auto shadow-md w-full flex items-center justify-between py-2 px-5 ${
            fixedControl ? 'fixed left-0 right-0 mx-auto' : 'relative'
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
            <span className="block text-sm font-medium mb-1">Cỡ chữ</span>
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
            <span className="block text-sm font-medium mb-1">Font chữ</span>
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
          <div className="mx-4 text-center cursor-pointer" onClick={onSelectListCategory}>
            <span className="block text-sm font-medium mb-1">Chuyên mục</span>
            <i className="fas fa-list-ul text-gray-600 cursor-pointer text-xl"></i>
          </div>
          {/* LƯU CV */}
          <div
            className="mx-4 text-center bg-green-600 px-4 py-2 rounded cursor-pointer duration-300 hover:bg-green-700"
            onClick={onCreateCV}
          >
            <span className="block text-sm text-white font-semibold whitespace-nowrap">Lưu CV</span>
            <i className="fas fa-save text-white cursor-pointer text-2xl"></i>
          </div>
        </div>

        {/* CV Main */}
        <div
          style={{ width: '210mm', height: 'auto', fontFamily: fontFamily, fontSize: fontSize }}
          className={`bg-white mx-auto relative shadow-2xl ${fixedControl ? 'mt-28' : 'mt-10'}`}
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
                  <PrInputCV
                    ref={fullnameRef}
                    placeholder="Họ và tên"
                    divClassName="h-8"
                    className="bg-transparent placeholder-white uppercase font-bold text-lg w-full text-center text-white py-2"
                  />
                </div>
                <div className="px-6">
                  <PrUpload getImage={getImage} />
                </div>
                <div className="mt-3 mb-5">
                  <PrInputCV
                    ref={applyPositionRef}
                    placeholder="Vị trí ứng tuyển"
                    divClassName="h-8"
                    className="bg-transparent placeholder-white uppercase font-medium w-full text-center text-gray-200 py-2"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-60 h-16 transform rotate-12 bg-gray-100"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-16 transform -rotate-12 bg-gray-100"></div>
              </div>

              <div className="div-middle-left mx-4">
                <div className="flex items-center">
                  <BirthdayIcon />
                  <PrInputCV
                    ref={birthdayRef}
                    placeholder="Ngày sinh"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center">
                  <GenderIcon />
                  <PrInputCV
                    ref={genderRef}
                    placeholder="Giới tính"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center">
                  <PhoneIcon />
                  <PrInputCV
                    ref={phoneRef}
                    placeholder="Điện thoại"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center">
                  <EmailIcon />
                  <PrInputCV
                    ref={emailRef}
                    placeholder="Email"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center">
                  <MapIcon />
                  <PrInputCV
                    ref={addressRef}
                    placeholder="Địa chỉ"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <div className="flex items-center mb-3">
                  <FacebookIcon />
                  <PrInputCV
                    ref={facbookRef}
                    placeholder="Facebook link"
                    divClassName="h-8 w-full"
                    className="bg-transparent w-full py-2"
                  />
                </div>
                <hr />
              </div>

              <div className="div-bottom-left bg-gray-100 mx-2">
                <div className="mb-16">
                  {categoryLeft &&
                    categoryLeft.length > 0 &&
                    categoryLeft.map((item) => {
                      const { name, enable, component, categoryRef, inputRef } = item
                      if (!enable) {
                        return null
                      }
                      return (
                        <div key={name}>
                          {component({
                            onDownCategoryLeft,
                            onUpCategoryLeft,
                            onRemoveCategoryLeft,
                            categoryRef,
                            inputRef
                          })}
                        </div>
                      )
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

              {category &&
                category.length > 0 &&
                category.map((item) => {
                  const { name, enable, component, categoryRef } = item
                  if (!enable) {
                    return null
                  }
                  return (
                    <div key={name}>
                      {component({
                        onDownCategory,
                        onUpCategory,
                        onRemoveCategory,
                        categoryRef
                      })}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <PrModal
          ref={modalListCategoryRef}
          title={'Chọn mục hiển thị'}
          cancelTitle="Đóng"
          okTitle="Xác nhận"
          onChange={onChangeCategoryList}
          onHide={onHideCategoryList}
        >
          <div className="grid-cols-2 grid gap-8 py-8">
            <div className="col-span-1 border border-gray-300 border-dashed border-t-0 border-b-0 border-l-0 pl-8 pr-6">
              <div className="mb-10">
                <span className="uppercase text-lg font-semibold text-center block">Thông tin cá nhân</span>
              </div>
              {categoryCheckedLeft &&
                categoryCheckedLeft.length > 0 &&
                categoryCheckedLeft.map((item) => {
                  const { title, enable, name } = item
                  return (
                    <div className="grid grid-cols-4 mt-5" key={`c_info_${title}`}>
                      <div className="col-span-3">
                        <span className="mr-4">{title}</span>
                      </div>
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={enable}
                          onChange={(e) => onChangeCheckboxLeft(e.target.checked, name)}
                          className="form-checkbox h-5 w-5 text-green-600 cursor-pointer mt-0.5"
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="col-span-1 px-8">
              <div className="mb-10">
                <span className="uppercase text-lg font-semibold text-center block">Thông tin hồ sơ</span>
              </div>

              {categoryChecked &&
                categoryChecked.length > 0 &&
                categoryChecked.map((item) => {
                  const { title, enable, name } = item
                  return (
                    <div className="grid grid-cols-4 mt-5" key={`c_cv_${title}`}>
                      <div className="col-span-3">
                        <span className="mr-4">{title}</span>
                      </div>
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={enable}
                          onChange={(e) => onChangeCheckbox(e.target.checked, name)}
                          className="form-checkbox h-5 w-5 text-green-600 cursor-pointer mt-0.5"
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </PrModal>
      </CVFormStyle>
    </div>
  )
}
