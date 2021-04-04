import PrDropdown from 'app/partials/pr-dropdown'
import { DataFormOfWork, DataRecruitmentPosition, DataExperience, DataAnother } from 'constants/data-employer'
import { DataGender } from 'constants/data-common'
import PrSearch from 'app/partials/pr-component/pr-search'
import { Link } from 'react-router-dom'
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

export const EmployerLookingForCandidates: React.FC = () => {
  const [candidateList, setCandidateList] = useState<CandidateInfo[] | null>(null)

  const callApiGetListCandidate = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/candidate`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
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
        setCandidateList(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    callApiGetListCandidate()
  }, [])

  if (!candidateList || candidateList.length === 0) {
    return (
      <div>
        <div className="mt-28 mb-40 py-8 w-2/3 mx-auto shadow-md rounded-md bg-gray-100 px-10">
          <List />
        </div>
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
                  career
                } = item
                return (
                  <div key={candidateId} className="mt-10 block">
                    <div className="grid grid-cols-4 gap-x-8 pb-10">
                      <div className="col-span-1">
                        <Link to={`/candidate/${candidateId}`} className="block">
                          <div className="w-28 h-28 rounded-full overflow-hidden bg-white mx-auto">
                            <img src={avatar} alt="avatar" className="block w-full h-full" />
                          </div>
                        </Link>
                      </div>
                      <div className="col-span-3">
                        <Link to="/" className="block">
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
                            {workExperience ? 'Đã' : 'Chưa'} có kinh nghiệm làm việc
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

        <div className="pb-60 flex justify-center mt-12">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              3
            </a>
            <a
              href="#"
              className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              4
            </a>
            <a
              href="#"
              className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              5
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
