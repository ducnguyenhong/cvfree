import { default as MetaDataPersonalSkills } from 'app/partials/metadata/metadata-schools'
import { MetaDataRefProps } from 'models/metadata-type'
import PrDropdownCV from 'app/partials/pr-dropdown-cv'
import PrInputColor from 'app/partials/pr-input-color'
import PrInputCV from 'app/partials/pr-input-cv'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import PrUpload from 'app/partials/pr-upload'
import BirthdayIcon from 'assets/icons/birthday'
import FacebookIcon from 'assets/icons/facebook'
import GenderIcon from 'assets/icons/gender'
import IdeaIcon from 'assets/icons/idea.svg'
import MapIcon from 'assets/icons/map'
import PhoneIcon from 'assets/icons/phone'
import { DataCategoryCV, DataCategoryInfo } from 'constants/category-cv'
import { DataFontFamily } from 'constants/font-family-cv'
import { DataFontSize } from 'constants/font-size-cv'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Activities,
  AdvancedSkills,
  AnotherInfos,
  Awards,
  Certificates,
  Companies,
  Presenters,
  Schools
} from './category'
import { CVFormStyle } from './cv-form.styles'
import { CategoryProps, CvFormProps } from './cv-form.types'

const defaultFontFamily = { label: 'Quicksand', value: `"Quicksand", sans-serif` }
const defaultFontSize = { label: '14px', value: '14px' }

const CvFormLayout: React.FC<CvFormProps> = (props) => {
  const [avatar, setAvatar] = useState<string>()
  const [color, setColor] = useState<string>('#37474F')
  const [fontFamily, setFontFamily] = useState<string>(defaultFontFamily.value)
  const [fontSize, setFontSize] = useState<string>(defaultFontSize.value)
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

  const modalListCategoryRef = useRef<PrModalRefProps>(null)
  const metaDataSchoolsRef = useRef<MetaDataRefProps>(null)
  const metaDataAwardsRef = useRef<MetaDataRefProps>(null)
  const metaDataPresentersRef = useRef<MetaDataRefProps>(null)
  const metaDataCompaniesRef = useRef<MetaDataRefProps>(null)
  const metaDataAnotherInfoRef = useRef<MetaDataRefProps>(null)
  const metaDataPersonalSkillsRef = useRef<MetaDataRefProps>(null)
  const metaDataAdvancedSkillsRef = useRef<MetaDataRefProps>(null)
  const metaDataActivitiesRef = useRef<MetaDataRefProps>(null)
  const metaDataCertificatesRef = useRef<MetaDataRefProps>(null)

  const defaultCategory: CategoryProps[] = [
    {
      name: 'school',
      component: (props) => <Schools {...props} />,
      categoryRef: metaDataSchoolsRef
    },
    {
      name: 'company',
      component: (props) => <Companies {...props} />,
      categoryRef: metaDataCompaniesRef
    },
    {
      name: 'advancedSkill',
      component: (props) => <AdvancedSkills {...props} />,
      categoryRef: metaDataAdvancedSkillsRef
    },
    {
      name: 'activity',
      component: (props) => <Activities {...props} />,
      categoryRef: metaDataActivitiesRef
    },
    {
      name: 'certificate',
      component: (props) => <Certificates {...props} />,
      categoryRef: metaDataCertificatesRef
    },
    {
      name: 'award',
      component: (props) => <Awards {...props} />,
      categoryRef: metaDataAwardsRef
    },
    {
      name: 'presenter',
      component: (props) => <Presenters {...props} />,
      categoryRef: metaDataPresentersRef
    },
    {
      name: 'anotherInfo',
      component: (props) => <AnotherInfos {...props} />,
      categoryRef: metaDataAnotherInfoRef
    }
  ]

  const [category, setCategory] = useState<CategoryProps[]>(defaultCategory)

  const onChangColorCV = (colorInput: string) => {
    setColor(colorInput)
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

  const onSelectListCategory = () => {
    modalListCategoryRef.current?.show()
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

  const onDownCategory = (name: string) => {
    let index = 0
    for (let i = 0; i < category.length; i++) {
      if (category[i].name === name) {
        index = i
      }
    }
    if (index === category.length - 1) {
      console.log('ducnh')

      return
    }
    const newCategory = [...category]
    const pr = newCategory[index]
    newCategory[index] = newCategory[index + 1]
    newCategory[index + 1] = pr
    setCategory(newCategory)
  }

  const onRemoveCategory = (name: string) => {
    let index = 0
    for (let i = 0; i < category.length; i++) {
      if (category[i].name === name) {
        index = i
      }
    }
    console.log('index', index)

    const newCategory = [...category]
    newCategory.splice(index, 1)
    setCategory(newCategory)
  }

  useEffect(() => {
    document.title = 'CVFREE | Tạo hồ sơ'
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-400 bg-yellow-400 py-32 pt-40">
      <CVFormStyle>
        {/* Control */}
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
          <div className="mx-4 text-center bg-green-600 px-4 py-2 rounded cursor-pointer duration-300 hover:bg-green-700">
            <span className="block text-sm text-white font-semibold whitespace-nowrap">Lưu CV</span>
            <i className="fas fa-save text-white cursor-pointer text-2xl"></i>
          </div>
        </div>

        {/* CV Main */}
        <div
          style={{ width: '210mm', height: 'auto', fontFamily: fontFamily, fontSize: fontSize }}
          className={`bg-white mx-auto shadow-2xl ${fixedControl ? 'mt-28' : 'mt-10'}`}
        >
          <div className="grid grid-cols-3 h-full">
            {/* CV Left */}
            <div className="col-span-1 bg-gray-100 relative">
              <div className="div-top-left p-4 pb-10 overflow-hidden relative" style={{ backgroundColor: color }}>
                <div className="mb-3">
                  <PrInputCV
                    placeholder="Họ và tên"
                    divClassName="h-8"
                    className="bg-transparent placeholder-white uppercase font-bold text-lg w-full text-center text-white py-2"
                  />
                </div>
                <div className="px-5">
                  <PrUpload getImage={getImage} />
                </div>
                <div className="mb-6 mt-6">
                  <PrInputCV
                    divClassName="h-20"
                    placeholder="Giới thiệu chung"
                    type="textarea"
                    className="bg-transparent resize-none border-gray-400 border rounded-md placeholder-white w-full text-center text-white py-2"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-60 h-16 transform rotate-12 bg-gray-100"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-16 transform -rotate-12 bg-gray-100"></div>
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

            {/* CV Right */}
            <div className="col-span-2 relative p-4">
              <div
                className="div-triangle-top-right absolute top-0 right-0 w-36 h-40"
                style={{ backgroundColor: color }}
              ></div>

              {category &&
                category.length > 0 &&
                category.map((item) => {
                  return (
                    <div key={item.name}>
                      {item.component({
                        onDownCategory,
                        onUpCategory,
                        onRemoveCategory,
                        categoryRef: item.categoryRef
                      })}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <PrModal ref={modalListCategoryRef} title={'Chọn mục hiển thị'} cancelTitle="Đóng" okTitle="Xác nhận">
          <div className="grid-cols-2 grid gap-8 py-8">
            <div className="col-span-1 border border-gray-300 border-dashed border-t-0 border-b-0 border-l-0 pl-8 pr-6">
              <div className="mb-10">
                <span className="uppercase text-lg font-semibold text-center block">Thông tin cá nhân</span>
              </div>
              {DataCategoryInfo &&
                DataCategoryInfo.map((item) => {
                  return (
                    <div className="grid grid-cols-4 mt-5" key={`c_info_${item.value}`}>
                      <div className="col-span-3">
                        <span className="mr-4">{item.label}</span>
                      </div>
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked
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

              {DataCategoryCV &&
                DataCategoryCV.map((item) => {
                  return (
                    <div className="grid grid-cols-4 mt-5" key={`c_cv_${item.value}`}>
                      <div className="col-span-3">
                        <span className="mr-4">{item.label}</span>
                      </div>
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked
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

export default CvFormLayout
