import PrDropdownCV from 'app/partials/pr-dropdown-cv'
import PrInputColor from 'app/partials/pr-input-color'
import PrInputCV from 'app/partials/pr-input-cv'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import PrUpload from 'app/partials/pr-upload'
import { EmailIcon, FacebookIcon, GenderIcon, BirthdayIcon, MapIcon, PhoneIcon } from 'assets/icons'
import { DataFontFamilyCv, DataFontSizeCv, DataDemoCV, DataRecommendCv, DataRecommendCvType } from 'constants/data-cv'
import LoadingIcon from 'assets/icons/loading.svg'
import { useCallback, useEffect, useRef, useState } from 'react'
import vi from 'date-fns/locale/vi'
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
import {
  getCategoryWhenUp,
  getCategoryWhenDown,
  getCategoryWhenRemove,
  uploadServer,
  getGenderFromInput,
  getValueDropdown,
  getDefaultDataDropdown,
  getGenderMultiLanguage,
  slugURL
} from 'utils/helper'
import { CvInfo } from 'models/cv-info'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { ResponseCVDetail } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import {
  BasicSkillRef,
  EducationRef,
  ActivityRef,
  WorkExperienceRef,
  AdvancedSkillRef,
  AwardRef,
  CertificateRef,
  AnotherInfoRef,
  PresenterRef
} from 'app/partials/metadata/metadata.type'
import { useRouteMatch, useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import moment from 'moment'
import PrDropdown from 'app/partials/pr-dropdown/pr-dropdown'
import { DataCareer, DataFormOfWork } from 'constants/data-employer'
import { v4 as uuid } from 'uuid'
import { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import { useRecoilState } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { useIntl } from 'react-intl'
import { DataPublicCv } from '../../../../../constants/data-cv'

const defaultFontFamily = { label: 'Quicksand', value: `"Quicksand", sans-serif` }
const defaultFontSize = { label: '14px', value: '14px' }

export const CvFormLayout1: React.FC<CvFormProps> = (props) => {
  const match = useRouteMatch()
  const cvId = get(match.params, 'id')
  const { cvInfo, refreshCvInfo } = props
  const intl = useIntl()
  const history = useHistory()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [defaultAvatar, setDefaultAvatar] = useState<string>('')
  const [color, setColor] = useState<string>('#176F9B')
  const [fontFamily, setFontFamily] = useState<string>(defaultFontFamily.value)
  const [fontSize, setFontSize] = useState<string>(defaultFontSize.value)
  const [fixedControl, setFixedControl] = useState<boolean>(false)
  const [cvHeight, setCvHeight] = useState<number>(0)
  const [loadingAction, setLoadingAction] = useState<boolean>(false)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [focusBirthday, setFocusBirthday] = useState<boolean>(false)
  const [showRecommend, setShowRecommend] = useState<boolean>(false)
  const [showSubInfo, setShowSubInfo] = useState<boolean>(true)
  const [recommend, setRecommend] = useState<DataRecommendCvType | undefined>(undefined)

  const cvNameRef = useRef<PrInputRefProps>(null)
  const careerRef = useRef<PrDropdownRefProps>(null)
  const formOfWorkRef = useRef<PrDropdownRefProps>(null)
  const isPublicRef = useRef<PrDropdownRefProps>(null)

  const fullnameRef = useRef<PrInputCVRefProps>(null)
  const applyPositionRef = useRef<PrInputCVRefProps>(null)
  const phoneRef = useRef<PrInputCVRefProps>(null)
  const genderRef = useRef<PrInputCVRefProps>(null)
  const emailRef = useRef<PrInputCVRefProps>(null)
  const addressRef = useRef<PrInputCVRefProps>(null)
  const facebookRef = useRef<PrInputCVRefProps>(null)
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [city, setCity] = useState<OptionProps | null>(null)
  const [district, setDistrict] = useState<OptionProps | null>(null)
  const [address, setAddress] = useState<{ value: { district: string; city: string }; label: string } | null>(null)

  const modalListCategoryRef = useRef<PrModalRefProps>(null)
  const modalAddressRef = useRef<PrModalRefProps>(null)
  const modalChangeTemplateRef = useRef<PrModalRefProps>(null)
  const educationRef = useRef<EducationRef>(null)
  const awardRef = useRef<AwardRef>(null)
  const presenterRef = useRef<PresenterRef>(null)
  const workExperienceRef = useRef<WorkExperienceRef>(null)
  const anotherInfoRef = useRef<AnotherInfoRef>(null)
  const advancedSkillRef = useRef<AdvancedSkillRef>(null)
  const activityRef = useRef<ActivityRef>(null)
  const certificateRef = useRef<CertificateRef>(null)
  const basicSkillRef = useRef<BasicSkillRef>(null)
  const hobbiesRef = useRef<PrInputCVRefProps>(null)
  const careerGoalRef = useRef<PrInputCVRefProps>(null)
  const cvRef = useRef<HTMLDivElement>(null)

  const onChangeRecommend = (field: string | null) => {
    if (!field) {
      setRecommend(undefined)
    }
    const data = DataRecommendCv.find((item) => item.field === field)
    setRecommend(data)
  }

  const defaultCategory: CategoryProps[] = [
    {
      title: 'Học vấn',
      enable: true,
      name: 'education',
      component: (props) => (
        <Educations {...props} onFocus={() => onChangeRecommend('schoolName')} onBlur={() => onChangeRecommend(null)} />
      ),
      categoryRef: educationRef
    },
    {
      title: 'Kinh nghiệm làm việc',
      enable: true,
      name: 'workExperience',
      component: (props) => (
        <WorkExperiences
          {...props}
          onFocus={() => onChangeRecommend('workExperience')}
          onBlur={() => onChangeRecommend(null)}
        />
      ),
      categoryRef: workExperienceRef
    },
    {
      title: 'Kỹ năng chuyên môn',
      enable: true,
      name: 'advancedSkill',
      component: (props) => (
        <AdvancedSkills
          {...props}
          onFocus={() => onChangeRecommend('advancedSkill')}
          onBlur={() => onChangeRecommend(null)}
        />
      ),
      categoryRef: advancedSkillRef
    },
    {
      title: 'Hoạt động',
      enable: true,
      name: 'activity',
      component: (props) => (
        <Activities {...props} onFocus={() => onChangeRecommend('activity')} onBlur={() => onChangeRecommend(null)} />
      ),
      categoryRef: activityRef
    },
    {
      title: 'Chứng chỉ',
      enable: true,
      name: 'certificate',
      component: (props) => (
        <Certificates
          {...props}
          onFocus={() => onChangeRecommend('certificate')}
          onBlur={() => onChangeRecommend(null)}
        />
      ),
      categoryRef: certificateRef
    },
    {
      title: 'Giải thưởng',
      enable: true,
      name: 'award',
      component: (props) => (
        <Awards {...props} onFocus={() => onChangeRecommend('award')} onBlur={() => onChangeRecommend(null)} />
      ),
      categoryRef: awardRef
    },
    {
      title: 'Người giới thiệu',
      enable: false,
      name: 'presenter',
      component: (props) => (
        <Presenters {...props} onFocus={() => onChangeRecommend('presenter')} onBlur={() => onChangeRecommend(null)} />
      ),
      categoryRef: presenterRef
    },
    {
      title: 'Thông tin khác',
      enable: false,
      name: 'anotherInfo',
      component: (props) => (
        <AnotherInfos
          {...props}
          onFocus={() => onChangeRecommend('anotherInfo')}
          onBlur={() => onChangeRecommend(null)}
        />
      ),
      categoryRef: anotherInfoRef
    }
  ]

  const defaultCategoryLeft: CategoryProps[] = [
    {
      title: 'Kỹ năng cá nhân',
      enable: true,
      name: 'basicSkill',
      component: (props) => (
        <BasicSkills
          {...props}
          onFocus={() => onChangeRecommend('basicSkill')}
          onBlur={() => onChangeRecommend(null)}
        />
      ),
      categoryRef: basicSkillRef
    },
    {
      title: 'Sở thích',
      enable: false,
      name: 'hobby',
      component: (props) => (
        <Hobbies {...props} onFocus={() => onChangeRecommend('hobby')} onBlur={() => onChangeRecommend(null)} />
      ),
      inputRef: hobbiesRef
    },
    {
      title: 'Mục tiêu nghề nghiệp',
      enable: true,
      name: 'careerGoals',
      component: (props) => (
        <CareerGoals
          {...props}
          onFocus={() => onChangeRecommend('careerGoals')}
          onBlur={() => onChangeRecommend(null)}
        />
      ),
      inputRef: careerGoalRef
    }
  ]

  const [category, setCategory] = useState<CategoryProps[]>(defaultCategory)
  const [categoryLeft, setCategoryLeft] = useState<CategoryProps[]>(defaultCategoryLeft)
  const [categoryChecked, setCategoryChecked] = useState<CategoryProps[]>(defaultCategory)
  const [categoryCheckedLeft, setCategoryCheckedLeft] = useState<CategoryProps[]>(defaultCategoryLeft)

  const onChangColorCV = (colorInput: string) => {
    setColor(colorInput)
  }

  const onChangeTemplate = (template: { value: string; label: string }) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/cvs/${cvId}/update-template`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers,
      url,
      data: { template },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseCVDetail>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        showNotify.success(intl.formatMessage({ id: `API.${message}` }))
        modalChangeTemplateRef.current?.hide()
        refreshCvInfo && refreshCvInfo()
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const getImage = (img: File) => {
    setAvatarFile(img)
  }

  const validate = () => {
    if (!cvNameRef.current?.checkRequired()) {
      setShowRecommend(false)
      showNotify.error('Hãy nhập tên CV')
      return false
    }
    if (!careerRef.current?.checkRequired()) {
      setShowRecommend(false)
      showNotify.error('Hãy chọn ngành nghề của bạn')
      return false
    }
    if (!formOfWorkRef.current?.checkRequired()) {
      setShowRecommend(false)
      showNotify.error('Hãy chọn hình thức làm việc')
      return false
    }
    if (!fullnameRef.current?.checkRequired()) {
      showNotify.error('Hãy nhập họ và tên')
      return false
    }
    if (!applyPositionRef.current?.checkRequired()) {
      showNotify.error('Hãy nhập vị trí ứng tuyển')
      return false
    }
    if (!birthday) {
      showNotify.error('Hãy nhập ngày sinh')
      setFocusBirthday(true)
      return false
    }
    if (!genderRef.current?.checkRequired()) {
      showNotify.error('Hãy nhập giới tính')
      return false
    }
    if (!phoneRef.current?.checkRequired()) {
      showNotify.error('Hãy nhập số điện thoại')
      return false
    }
    if (!emailRef.current?.checkRequired()) {
      showNotify.error('Hãy nhập email')
      return false
    }
    return true
  }

  const onSaveCV = async () => {
    setLoadingAction(true)
    if (!validate()) {
      setLoadingAction(false)
      return
    }
    const avatarId = cvInfo?.detail.avatarId || uuid()
    let avatarURL = cvInfo?.detail.avatar ?? ''
    if (avatarFile) {
      avatarURL = await uploadServer(avatarFile, avatarId)
    }

    const name = cvNameRef.current?.getValue() ?? ''
    const formOfWork = getValueDropdown(formOfWorkRef.current?.getValue())
    const isPublic = getValueDropdown(isPublicRef.current?.getValue())[0]
    const career = careerRef.current?.getValue()[0]

    const fullname = fullnameRef.current?.getValue() ?? ''
    const applyPosition = applyPositionRef.current?.getValue()
    const birthdayValue = moment(birthday).valueOf()
    const gender = getGenderFromInput(genderRef.current?.getValue() ?? '')
    const phone = phoneRef.current?.getValue() ?? ''
    const email = emailRef.current?.getValue() ?? ''
    const facebook = facebookRef.current?.getValue() ?? ''

    const basicSkill = basicSkillRef.current?.getValue()
    const hobby = hobbiesRef.current?.getValue()
    const careerGoals = careerGoalRef.current?.getValue()
    const education = educationRef.current?.getValue()
    const workExperience = workExperienceRef.current?.getValue()
    const advancedSkill = advancedSkillRef.current?.getValue()
    const activity = activityRef.current?.getValue()
    const certificate = certificateRef.current?.getValue()
    const award = awardRef.current?.getValue()
    const presenter = presenterRef.current?.getValue()
    const anotherInfo = anotherInfoRef.current?.getValue()

    const categoryInfo: { name: string }[] = []
    const categoryCV: { name: string }[] = []

    for (let i = 0; i < category.length; i++) {
      category[i].enable && categoryCV.push({ name: category[i].name })
    }

    for (let i = 0; i < categoryLeft.length; i++) {
      categoryLeft[i].enable && categoryInfo.push({ name: categoryLeft[i].name })
    }

    const dataCV: CvInfo = {
      color,
      isPublic,
      status: 'ACTIVE',
      template: {
        value: '1',
        label: 'DEFAULT'
      },
      fontSize,
      fontFamily,
      name,
      language: 'vi',
      formOfWork,
      career,
      categoryInfo,
      categoryCV,
      detail: {
        fullname,
        avatar: avatarURL,
        avatarId,
        applyPosition,
        birthday: birthdayValue,
        gender,
        phone,
        address: cvInfo?.detail.address?.label
          ? cvInfo?.detail.address
          : {
              value: {
                city: city?.value ?? '',
                district: district?.value ?? ''
              },
              label: address?.label ?? ''
            },
        email,
        facebook,
        basicSkill,
        hobby,
        careerGoals,
        education,
        workExperience,
        advancedSkill,
        activity,
        certificate,
        award,
        presenter,
        anotherInfo
      },
      unlockedEmployers: []
    }

    callApiSave(dataCV)
  }

  const callApiSave = (data: CvInfo) => {
    const accessToken = Cookies.get('token')
    const url = cvId ? `${SERVER_URL}/cvs/${cvId}` : `${SERVER_URL}/cvs`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: cvId ? 'PUT' : 'POST',
      headers,
      url,
      data,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseCVDetail>) => {
        const { success, message, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        const { detail, _id } = data.cvDetail
        if (!cvId) {
          history.push(`/update-cv/${slugURL(detail.fullname)}.${_id}`)
        }
        setLoadingAction(false)
        if (userInfo && userInfo.numberOfCreateCv && !cvId) {
          setUserInfo({ ...userInfo, numberOfCreateCv: userInfo.numberOfCreateCv - 1 })
        }
        showNotify.success(intl.formatMessage({ id: `CV.${message}` }))
      })
      .catch((e) => {
        setLoadingAction(false)
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

  const onHideAddress = () => {
    setAddress(address)
  }

  const onChangeAddress = () => {
    setAddress({
      label: `${district?.label}, ${city?.label}`,
      value: {
        city: city?.value ?? '',
        district: district?.value ?? ''
      }
    })
    addressRef.current?.setValue(`${district?.label}, ${city?.label}`)
    modalAddressRef.current?.hide()
  }

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 50) {
      setFixedControl(true)
    } else if (window.pageYOffset <= 50) {
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
    document.title = `CVFREE | ${cvId ? 'Chỉnh sửa' : 'Tạo'} hồ sơ`
  }, [])

  useEffect(() => {
    if (cvInfo) {
      const {
        color,
        fontFamily,
        fontSize,
        categoryCV,
        categoryInfo,
        detail,
        name,
        career,
        formOfWork,
        isPublic
      } = cvInfo
      const {
        fullname,
        avatar,
        applyPosition,
        birthday,
        gender,
        phone,
        address,
        email,
        facebook,
        basicSkill,
        hobby,
        careerGoals,
        education,
        workExperience,
        advancedSkill,
        activity,
        certificate,
        award,
        presenter,
        anotherInfo
      } = detail

      if (showSubInfo) {
        cvNameRef.current?.setValue(name || '')
        careerRef.current?.setValue(career || null)
        formOfWorkRef.current?.setValue(getDefaultDataDropdown(DataFormOfWork, formOfWork || []))
        isPublicRef.current?.setValue(getDefaultDataDropdown(DataPublicCv, isPublic ? [isPublic] : []))
      }
      setColor(color)
      setFontFamily(fontFamily)
      setFontSize(fontSize)
      fullnameRef.current?.setValue(fullname)
      setDefaultAvatar(avatar || '')
      applyPositionRef.current?.setValue(applyPosition || '')
      setBirthday(moment(birthday).toDate())
      genderRef.current?.setValue(getGenderMultiLanguage(gender, 'vi'))
      phoneRef.current?.setValue(phone)
      addressRef.current?.setValue(address?.label || '')
      emailRef.current?.setValue(email)
      facebookRef.current?.setValue(facebook || '')
      basicSkillRef.current?.setValue(basicSkill || null)
      hobbiesRef.current?.setValue(hobby || '')
      careerGoalRef.current?.setValue(careerGoals || '')
      educationRef.current?.setValue(education || null)
      workExperienceRef.current?.setValue(workExperience || null)
      advancedSkillRef.current?.setValue(advancedSkill || null)
      activityRef.current?.setValue(activity || null)
      certificateRef.current?.setValue(certificate || null)
      awardRef.current?.setValue(award || null)
      presenterRef.current?.setValue(presenter || null)
      anotherInfoRef.current?.setValue(anotherInfo || null)

      const dataCategory: CategoryProps[] = []
      for (let i = 0; i < categoryCV.length; i++) {
        for (let j = 0; j < defaultCategory.length; j++) {
          if (categoryCV[i].name === defaultCategory[j].name) {
            dataCategory.push(defaultCategory[j])
          }
        }
      }

      const dataCategoryLeft: CategoryProps[] = []
      for (let i = 0; i < categoryInfo.length; i++) {
        for (let j = 0; j < defaultCategoryLeft.length; j++) {
          if (categoryInfo[i].name === defaultCategoryLeft[j].name) {
            dataCategoryLeft.push(defaultCategoryLeft[j])
          }
        }
      }
      setCategory(dataCategory)
      setCategoryLeft(dataCategoryLeft)
    }
  }, [cvInfo, showSubInfo])

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-32">
      <CVFormStyle>
        {/* Recommend */}
        <div
          className={`${
            showRecommend ? 'opacity-100 bg-white' : 'opacity-80 bg-gray-700 hover:opacity-100'
          } right-0 px-4 py-2 shadow rounded-md rounded-r-none duration-300 fixed top-48`}
          style={{ width: showRecommend ? 500 : 150 }}
        >
          <div className="relative">
            <span
              className={`${
                showRecommend ? 'text-gray-800' : 'text-white'
              } block text-lg font-semibold text-center leading-10 duration-300 overflow-hidden overflow-ellipsis whitespace-nowrap`}
            >
              <i className="fas fa-exclamation mr-2 text-base"></i>
              {showRecommend ? 'Gợi ý viết CV' : 'Gợi ý'}
            </span>
            {showRecommend && (
              <i
                onClick={() => setShowRecommend(!showRecommend)}
                className="absolute cursor-pointer left-0 top-0 text-3xl fas fa-chevron-circle-right text-red-400 duration-300 hover:text-red-600"
              ></i>
            )}
          </div>
          <hr />
          <div className="flex items-center justify-start pl-0 pt-6 pb-4 pr-0" style={{ height: '60vh' }}>
            <div
              onClick={() => {
                showSubInfo && setShowSubInfo(false)
                setShowRecommend(true)
              }}
              className="h-full cursor-pointer flex items-center"
            >
              {showRecommend ? null : (
                <div style={{ width: 120 }} className="mr-10">
                  <div className="flex items-start -mt-28">
                    <i
                      className={`${showRecommend ? 'text-gray-800' : 'text-white'} fas fa-check-circle text-sm mr-1`}
                    />
                    <span className={`${showRecommend ? 'text-gray-800' : 'text-white'} text-sm`}>Chuẩn</span>
                  </div>
                  <div className="flex items-start mt-5">
                    <i
                      className={`${showRecommend ? 'text-gray-800' : 'text-white'} fas fa-check-circle text-sm mr-1`}
                    />
                    <span className={`${showRecommend ? 'text-gray-800' : 'text-white'} text-sm`}>Chính xác</span>
                  </div>
                  <div className="flex items-start mt-5">
                    <i
                      className={`${showRecommend ? 'text-gray-800' : 'text-white'} fas fa-check-circle text-sm mr-1`}
                    />
                    <span className={`${showRecommend ? 'text-gray-800' : 'text-white'} text-sm`}>Chuyên nghiệp</span>
                  </div>
                  <div className="mt-20 text-center">
                    <span className="block text-white uppercase text-lg font-semibold whitespace-nowrap">Xem ngay</span>
                    <i className="fas fa-angle-double-left text-white text-xl block arrow-recommend cursor-pointer mt-1"></i>
                  </div>
                </div>
              )}
            </div>
            <div className="h-full w-full overflow-hidden">
              <span className="block text-xl font-medium text-center">
                Chào mừng đến với <span className="text-green-600 font-semibold">CVFREE</span>
              </span>
              <div className="mt-5 px-2">
                <span className="block text-center italic">
                  Chọn vào ô cần nhập thông tin và bạn sẽ thấy gợi ý của chúng tôi tại đây
                </span>
              </div>
              <div className="px-2 mt-10">
                <span className="block font-semibold text-green-600 mb-2">Gợi ý</span>
                <div className={`${recommend ? '' : 'h-20'} border border-dashed border-gray-300 px-4 py-2 rounded`}>
                  <span className="break-words whitespace-pre-wrap">{recommend?.recommend}</span>
                </div>
              </div>

              <div className="px-2 mt-5">
                <span className="block font-semibold text-green-600 mb-2">Ví dụ</span>
                <div className={`${recommend ? '' : 'h-20'} border border-dashed border-gray-300 px-4 py-2 rounded`}>
                  <span className="break-words whitespace-pre-wrap">{recommend?.example}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub info */}
        <div
          className={`${
            showSubInfo ? 'opacity-100 bg-white' : 'opacity-80 bg-gray-700 hover:opacity-100'
          } rounded-l-none duration-300 fixed top-48 left-0 bg-white p-4 shadow-md overflow-hidden rounded-md`}
          style={{ width: showSubInfo ? 400 : 150, height: '65vh' }}
        >
          <div className="relative">
            <span className={`block font-semibold text-lg text-center mb-3 ${showSubInfo ? '' : 'text-white'}`}>
              Thông tin phụ
            </span>
            {showSubInfo && (
              <i
                onClick={() => setShowSubInfo(!showSubInfo)}
                className="absolute cursor-pointer right-0 top-0 text-3xl fas fa-chevron-circle-left text-red-400 duration-300 hover:text-red-600"
              ></i>
            )}
          </div>

          <hr />

          <div
            className="px-5"
            style={{
              width: showSubInfo ? '100%' : 0,
              opacity: showSubInfo ? '100%' : '0',
              position: showSubInfo ? 'relative' : 'absolute',
              visibility: showSubInfo ? 'visible' : 'hidden'
            }}
          >
            <div className="mt-5">
              <PrInput
                label="Tên CV"
                divClassName="h-9"
                required
                ref={cvNameRef}
                placeholder="Ví dụ: CV 1, CV chính..."
              />
            </div>
            <div className="mt-5">
              <PrDropdown
                label="Ngành nghề muốn ứng tuyển"
                options={DataCareer}
                isClearable={false}
                required
                ref={careerRef}
              />
            </div>
            <div className="mt-5">
              <PrDropdown
                label="Hình thức làm việc muốn ứng tuyển"
                options={DataFormOfWork}
                required
                isMulti
                ref={formOfWorkRef}
              />
              <span className="text-sm">(Có thể chọn nhiều)</span>
            </div>
            <div className="mt-5">
              <PrDropdown
                label="Trạng thái CV"
                options={DataPublicCv}
                value={DataPublicCv[0]}
                required
                isClearable={false}
                ref={isPublicRef}
              />
              <span className="text-sm">(Nhà tuyển dụng sẽ chỉ nhìn thấy CV công khai)</span>
            </div>
            <div className="mt-5">
              <span className="block italic font-medium text-justify">
                <span className="text-red-500 font-semibold">Lưu ý:</span> Những thông tin tại đây sẽ không hiển thị
                trong CV. Nhưng sẽ giúp CV của bạn tiếp cận đến nhiều nhà tuyển dụng hơn.
              </span>
            </div>
          </div>

          {!showSubInfo && (
            <div
              className="cursor-pointer flex items-center justify-center"
              style={{ height: '75%' }}
              onClick={() => {
                showRecommend && setShowRecommend(false)
                setShowSubInfo(true)
              }}
            >
              <div className="mt-20 text-center">
                <span className="block text-white uppercase text-lg font-semibold whitespace-nowrap">
                  Nhập
                  <br />
                  thông tin
                </span>
                <i className="fas fa-angle-double-right text-white text-xl block arrow-sub-info cursor-pointer mt-1"></i>
              </div>
            </div>
          )}
        </div>

        {/* CV */}
        <div style={{ width: '210mm', right: showRecommend ? '10%' : '0' }} className="duration-300 relative mx-auto">
          {/* Control */}
          <div
            style={{
              width: '210mm',
              top: fixedControl ? 76 : undefined,
              right: fixedControl && showRecommend ? '20%' : undefined
            }}
            className={`bg-white duration-300 z-40 mx-auto shadow-md w-full flex items-center justify-between py-2 px-5 ${
              fixedControl ? 'fixed left-0 right-0 mx-auto' : 'relative'
            }`}
          >
            {/* Màu CV */}
            <PrInputColor onChange={onChangColorCV} defaultColor={color || '#176F9B'} />
            {/* Đổi mẫu */}
            {cvId && (
              <div className="mx-4 text-center" onClick={() => modalChangeTemplateRef.current?.show()}>
                <span className="block text-sm font-medium">Đổi mẫu CV</span>
                <i className="fas fa-copy text-gray-600 cursor-pointer text-2xl"></i>
              </div>
            )}
            {/* Cỡ chữ */}
            <div className="w-24 mx-4 text-center">
              <span className="block text-sm font-medium mb-1">Cỡ chữ</span>
              <PrDropdownCV
                dropdownClassName="w-full"
                className="w-full"
                options={DataFontSizeCv}
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
                options={DataFontFamilyCv}
                onChange={(value) => {
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
              onClick={onSaveCV}
            >
              <span className="block text-sm text-white font-semibold whitespace-nowrap">
                {cvId ? 'Lưu CV' : 'Tạo CV'}
              </span>
              {loadingAction ? (
                <img src={LoadingIcon} alt="loading" className="w-7 h-7 block mx-auto mt-1" />
              ) : (
                <i className="fas fa-save text-white text-2xl"></i>
              )}
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
                      onFocus={() => onChangeRecommend('fullname')}
                      onBlur={() => onChangeRecommend(null)}
                      divClassName="h-8"
                      className="bg-transparent placeholder-white uppercase font-bold text-lg w-full text-center text-white py-2"
                    />
                  </div>
                  <div className="px-6">
                    <PrUpload getImage={getImage} defaultURL={defaultAvatar} />
                  </div>
                  <div className="mt-3 mb-5">
                    <PrInputCV
                      ref={applyPositionRef}
                      noScrollOnFocus
                      onFocus={() => onChangeRecommend('applyPosition')}
                      onBlur={() => onChangeRecommend(null)}
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
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Ngày sinh"
                      onFocus={() => onChangeRecommend('birthday')}
                      onBlur={() => onChangeRecommend(null)}
                      showYearDropdown
                      showMonthDropdown
                      selected={birthday}
                      autoFocus={focusBirthday}
                      locale={vi}
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: '-20px, 0px'
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: 'viewport'
                        }
                      }}
                      onChange={(e: Date | null) => setBirthday(e)}
                      className="h-8 w-full py-2 ml-4 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <GenderIcon />
                    <PrInputCV
                      ref={genderRef}
                      placeholder="Giới tính"
                      onFocus={() => onChangeRecommend('gender')}
                      onBlur={() => onChangeRecommend(null)}
                      divClassName="h-8 w-full"
                      className="bg-transparent w-full py-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon />
                    <PrInputCV
                      ref={phoneRef}
                      onFocus={() => onChangeRecommend('phone')}
                      onBlur={() => onChangeRecommend(null)}
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
                      onFocus={() => onChangeRecommend('email')}
                      onBlur={() => onChangeRecommend(null)}
                      divClassName="h-8 w-full"
                      className="bg-transparent w-full py-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <MapIcon />
                    <PrInputCV
                      ref={addressRef}
                      onFocus={() => modalAddressRef.current?.show()}
                      placeholder="Địa chỉ"
                      divClassName="h-8 w-full"
                      className="bg-transparent w-full py-2"
                    />
                  </div>
                  <div className="flex items-center mb-3">
                    <FacebookIcon />
                    <PrInputCV
                      ref={facebookRef}
                      placeholder="Facebook"
                      onFocus={() => onChangeRecommend('facebook')}
                      onBlur={() => onChangeRecommend(null)}
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
        </div>

        {/* Chọn mục hiển thị */}
        <PrModal
          ref={modalListCategoryRef}
          title={'Chọn mục hiển thị'}
          cancelTitle="Đóng"
          okTitle="Xác nhận"
          position="fixed"
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

        {/* Chọn địa chỉ */}
        <PrModal
          ref={modalAddressRef}
          title={'Chọn địa chỉ của bạn'}
          cancelTitle="Đóng"
          okTitle="Xác nhận"
          onChange={onChangeAddress}
          onHide={onHideAddress}
          position="fixed"
        >
          <div className="grid-cols-2 grid gap-x-12 p-8">
            <DropdownAsync
              label="Tỉnh/Thành phố"
              urlApi="/locations/cities"
              onChange={(e) => {
                setCity(e[0])
                setDisableDistrict(false)
              }}
            />
            <DropdownAsync
              label="Quận/Huyện"
              isDisabled={disableDistrict}
              urlApi={`/locations/cities/${city?.value}`}
              onChange={(e) => {
                setDistrict(e[0])
              }}
            />
          </div>
        </PrModal>

        {/* Đổi mẫu CV */}
        <PrModal
          ref={modalChangeTemplateRef}
          title={'Đổi mẫu CV'}
          cancelTitle="Đóng"
          okTitle="Xác nhận"
          size="lg"
          position="fixed"
          disableFooter
          onHide={() => modalChangeTemplateRef.current?.hide()}
        >
          <div className="grid-cols-3 grid gap-x-32 p-16">
            {DataDemoCV.map((item) => {
              const { value, image, label } = item
              return (
                <div key={`demo_${value}`}>
                  <div
                    className="relative col-span-1 group shadow-md hover:shadow-xl duration-300 overflow-hidden"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img src={image} alt="sample cv" className="top-0 left-0 w-full" style={{ zIndex: 5 }} />
                    <div className="w-full h-full bg-gray-700 absolute top-0 left-0 opacity-0 duration-300 group-hover:opacity-50"></div>
                    <div
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 duration-300 mx-auto group-hover:opacity-100"
                      style={{ zIndex: 6 }}
                    >
                      <div
                        className="text-green-600 bg-gray-50 px-6 py-3 cursor-pointer rounded-md uppercase font-bold flex items-center"
                        onClick={() => onChangeTemplate({ value, label })}
                      >
                        <i className="fas fa-check-circle mr-3" />
                        <span>Sử dụng</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <span className="block text-center font-semibold text-lg">{label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </PrModal>
      </CVFormStyle>
    </div>
  )
}
