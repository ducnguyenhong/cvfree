import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { Pagination, PaginationType } from 'app/partials/layout/pagination'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrSearch from 'app/partials/pr-component/pr-search'
import PrDropdown from 'app/partials/pr-dropdown'
import { showNotify } from 'app/partials/pr-notify'
import { languageState } from 'app/states/language-state'
import DefaultAvatarCandidate from 'assets/images/default-avatar-candidate.png'
import ImgNoData from 'assets/images/no-data.png'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataGender } from 'constants/data-common'
import { DataAnother, DataCareer, DataExperience, DataFormOfWork, DataYearOfBirth } from 'constants/data-employer'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CandidateInfo } from 'models/candidate-info'
import { ResponseListCandidate } from 'models/response-api'
import moment from 'moment'
import 'moment/locale/vi'
import { useEffect, useState } from 'react'
import { List } from 'react-content-loader'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { getDefaultDataDropdown, getMultiValueDropdown, getParamURL, pushParamURL } from 'utils/helper'

export const EmployerLookingForCandidates: React.FC = () => {
  const [candidateList, setCandidateList] = useState<CandidateInfo[] | null>(null)
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const language = useRecoilValue(languageState)
  const paramsURL = getParamURL()
  const { applyPosition, gender, yearOfBirth, formOfWork, career, workExperience, other, city } = paramsURL
  const location = useLocation()
  const filterCityStorage = localStorage.getItem('filter-city')
  const filterCity = filterCityStorage ? JSON.parse(filterCityStorage) : undefined
  const defaultCity: OptionProps | undefined = city === filterCity.value ? filterCity : undefined

  const history = useHistory()

  const callApiGetListCandidate = () => {
    const { page } = paramsURL

    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/candidate`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      params: {
        page: page || 1,
        size: 10,
        ...paramsURL
      },
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseListCandidate>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        const { items, pagination } = data
        setCandidateList(items)
        setPagination(pagination)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    callApiGetListCandidate()
  }, [location])

  if (!candidateList) {
    return (
      <div className="mt-28 mb-40 py-8 w-2/3 mx-auto shadow-md rounded-md bg-gray-100 px-10">
        <List />
      </div>
    )
  }

  return (
    <WrapperPage title="Tìm kiếm ứng viên">
      <div className="filter grid-cols-4 grid gap-8 mt-10 px-10">
        <div className="col-span-1">
          <PrSearch
            defaultValue={applyPosition ? `${applyPosition}` : ''}
            labelSearch="Vị trí ứng tuyển"
            placeholder="Ví dụ nhân viên kế toán..."
            onChange={(e) => pushParamURL(history, { applyPosition: e })}
          />
        </div>
        <div className="col-span-1">
          <PrDropdown
            label="Giới tính"
            options={DataGender}
            defaultValue={getDefaultDataDropdown(DataGender, gender ? [`${gender}`] : [])}
            onChange={(e: any) => pushParamURL(history, { gender: e ? e.value : '' })}
          />
        </div>
        <div className="col-span-1">
          <PrDropdown
            label="Năm sinh"
            options={DataYearOfBirth()}
            defaultValue={getDefaultDataDropdown(DataYearOfBirth(), yearOfBirth ? [`${yearOfBirth}`] : [])}
            onChange={(e: any) => pushParamURL(history, { yearOfBirth: e ? e.value : '' })}
          />
        </div>
        <div className="col-span-1">
          <PrDropdown
            label="Hình thức làm việc"
            defaultValue={getDefaultDataDropdown(DataFormOfWork, formOfWork ? [`${formOfWork}`] : [])}
            options={DataFormOfWork}
            onChange={(e: any) => pushParamURL(history, { formOfWork: e ? e.value : '' })}
          />
        </div>
        <div className="col-span-1">
          <PrDropdown
            label="Ngành nghề"
            defaultValue={getDefaultDataDropdown(DataCareer, career ? [`${career}`] : [])}
            options={DataCareer}
            onChange={(e: any) => pushParamURL(history, { career: e ? e.value : '' })}
          />
        </div>
        <div className="col-span-1">
          <PrDropdown
            label="Kinh nghiệm làm việc"
            defaultValue={getDefaultDataDropdown(DataExperience, workExperience ? [`${workExperience}`] : [])}
            options={DataExperience}
            onChange={(e: any) => pushParamURL(history, { workExperience: e ? e.value : '' })}
          />
        </div>
        <div className="col-span-1">
          <DropdownAsync
            label="Tỉnh/Thành phố"
            defaultValue={defaultCity}
            urlApi="/locations/cities"
            isClearable
            onChange={(e) => {
              pushParamURL(history, { city: e && e.length > 0 ? e[0].value : '' })
              localStorage.setItem(
                'filter-city',
                JSON.stringify(e && e.length > 0 ? { value: e[0].value, label: e[0].label } : '')
              )
            }}
          />
        </div>
        <div className="col-span-1">
          <PrDropdown
            label="Bộ lọc khác"
            isMulti
            defaultValue={getDefaultDataDropdown(DataAnother, other ? `${other}`.split(',') : [])}
            options={DataAnother}
            onChange={(e: any) => pushParamURL(history, { other: getMultiValueDropdown(e) })}
          />
        </div>
      </div>

      <div className="mt-10">
        <hr />
        <span className="block mt-16 uppercase text-3xl font-semibold text-center text-green-700">
          Kết quả tìm kiếm ứng viên
        </span>
        <div className="mt-24">
          {candidateList.length === 0 && (
            <div>
              <span className="block font-semibold text-2xl text-center">Không có dữ liệu</span>
              <img src={ImgNoData} alt="no data" className="w-60 block mx-auto" />
            </div>
          )}
          {candidateList.length > 0 &&
            candidateList.map((item) => {
              const {
                avatar,
                address,
                candidateId,
                workExperience,
                gender,
                birthday,
                fullname,
                applyPosition,
                career,
                updatedAt,
                cvId
              } = item
              return (
                <div key={candidateId} className="mt-10 block">
                  <div className="grid grid-cols-4 gap-x-8 pb-10">
                    <div className="col-span-1">
                      <Link to={`/candidate/${candidateId}`} className="block">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-white mx-auto">
                          <img src={avatar || DefaultAvatarCandidate} alt="avatar" className="block w-full h-full" />
                        </div>
                      </Link>
                    </div>
                    <div className="col-span-3 relative">
                      <div className="absolute right-0 top-0">
                        <span>Cập nhật CV cách đây {moment(updatedAt).locale(language).fromNow()}</span>
                      </div>
                      {cvId && (
                        <div className="absolute bottom-0 right-0">
                          <span className="block text-red-500 border border-red-500 px-2 py-1 rounded-sm font-medium">
                            Đã mở khóa
                          </span>
                        </div>
                      )}
                      <Link to={`/candidate/${candidateId}`} className="block">
                        <span className="block text-xl font-bold">
                          {fullname}
                          <span className="ml-3">
                            {gender === 'MALE' ? (
                              <i className="fas fa-mars text-blue-500"></i>
                            ) : (
                              <i className="fas fa-venus text-pink-500"></i>
                            )}
                          </span>
                        </span>
                      </Link>

                      <div className="flex items-center my-1">
                        <i className="fas fa-birthday-cake text-gray-500 mr-3"></i>
                        <span className="block font-medium">{moment().diff(birthday, 'years')} tuổi</span>
                      </div>

                      <div className="flex items-center my-1">
                        <i className="fas fa-user text-gray-500 mr-3"></i>
                        <span className="block font-medium">{applyPosition}</span>
                      </div>

                      <div className="flex items-center my-1">
                        <i className="fas fa-briefcase text-gray-500 mr-3"></i>
                        <span className="block font-medium">{career}</span>
                      </div>

                      <div className="flex items-center my-1">
                        <i className="fas fa-map-marker-alt text-gray-500 mr-3"></i>
                        <span className="block font-medium">{address}</span>
                      </div>

                      <div className="flex items-center my-1">
                        <i className="fas fa-award text-gray-500 mr-3"></i>
                        <span className="block font-medium">
                          {workExperience && workExperience.length > 0 ? 'Đã' : 'Chưa'} có kinh nghiệm làm việc
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              )
            })}
        </div>
      </div>

      {pagination && <Pagination pagination={pagination} />}
    </WrapperPage>
  )
}
