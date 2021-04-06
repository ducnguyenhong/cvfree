import PrDropdown from 'app/partials/pr-dropdown'
import { DataFormOfWork, DataRecruitmentPosition, DataExperience, DataAnother } from 'constants/data-employer'
import { DataGender } from 'constants/data-common'
import PrSearch from 'app/partials/pr-component/pr-search'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListCandidate } from 'models/response-api'
import { CandidateInfo } from 'models/candidate-info'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import { List } from 'react-content-loader'
import moment from 'moment'
import 'moment/locale/vi'
import { useRecoilValue } from 'recoil'
import { languageState } from 'app/states/language-state'
import { Pagination, PaginationType } from 'app/partials/layout/pagination'
import { getParamURL } from 'utils/helper'
import ImgNoData from 'assets/images/no-data.png'
import DefaultAvatarCandidate from 'assets/images/default-avatar-candidate.png'

export const EmployerLookingForCandidates: React.FC = () => {
  const [candidateList, setCandidateList] = useState<CandidateInfo[] | null>(null)
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const language = useRecoilValue(languageState)
  const paramsURL = getParamURL()
  const location = useLocation()

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
      params: { page: page || 1, size: 10 },
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
        const { items, page, size, totalPages, totalItems } = data
        setCandidateList(items)
        setPagination({ page, size, totalItems, totalPages })
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
    <div>
      <div className="mt-28 mb-40 py-8 w-2/3 mx-auto shadow-md rounded-md bg-gray-100 px-10">
        <div className="filter grid-cols-4 grid gap-8">
          <div className="col-span-1">
            <PrSearch labelSearch="Tìm kiếm" placeholder="Vị trí ứng tuyển" />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Giới tính" options={DataGender} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Năm sinh" options={DataGender} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Hình thức làm việc" isMulti options={DataFormOfWork} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Ngành nghề" isMulti options={DataRecruitmentPosition} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Kinh nghiệm làm việc" isMulti options={DataExperience} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Địa điểm" isMulti options={DataExperience} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Bộ lọc khác" isMulti options={DataAnother} />
          </div>
        </div>

        <div className="mt-10">
          <hr />
          <span className="block mt-10 uppercase text-3xl font-semibold text-center text-green-700">
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
      </div>
    </div>
  )
}
