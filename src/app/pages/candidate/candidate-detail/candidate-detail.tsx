import { get } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import DefaultAvatarCandidate from 'assets/images/default-avatar-candidate.png'
import { ResponseCandidateDetail, ResponseDefault, ResponseEmployerDetail } from 'models/response-api'
import { CandidateInfo } from 'models/candidate-info'
import { showNotify } from 'app/partials/pr-notify'
import { List } from 'react-content-loader'
import moment from 'moment'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { slugURL } from 'utils/helper'
import { EmployerInfo } from 'models/employer-info'

export const CandidateDetail: React.FC = () => {
  const match = useRouteMatch()
  const candidateId = get(match.params, 'id')
  const userInfo = useRecoilValue(userInfoState)
  const modalUnlockCandidate = useRef<PrModalRefProps>(null)
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null)
  const [employerInfo, setEmployerInfo] = useState<EmployerInfo | null>(null)

  const callApiCandidateDetail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/candidate/${candidateId}`
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
      .then((response: AxiosResponse<ResponseCandidateDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCandidateInfo(data.candidateDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiUnlock = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/employer/unlock-candidate`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data: { id: candidateId },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, error, message } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        showNotify.success(message)
        modalUnlockCandidate.current?.hide()
        callApiCandidateDetail()
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiEmployerDetail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/employer/${userInfo?.id}`
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
      .then((response: AxiosResponse<ResponseEmployerDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setEmployerInfo(data.employerDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (candidateId) {
      callApiCandidateDetail()
    }
  }, [candidateId])

  if (!candidateInfo) {
    return (
      <div className="py-40 w-2/3 mx-auto shadow-md rounded-md bg-gray-100 px-10">
        <List />
      </div>
    )
  }

  const {
    avatar,
    fullname,
    birthday,
    gender,
    applyPosition,
    workExperience,
    education,
    advancedSkill,
    activity,
    certificate,
    award,
    careerGoals,
    career,
    cvId
  } = candidateInfo

  const onUnlockCandidate = () => {
    callApiUnlock()
  }

  const onHideUnlockCandidate = () => {
    modalUnlockCandidate.current?.hide()
  }

  const onShowUnlockCandidate = () => {
    callApiEmployerDetail()
  }

  return (
    <div className="w-2/3 mx-auto py-40">
      <div className="bg-gray-100 py-10 px-16 rounded-md shadow-md">
        <div className="grid grid-cols-4 gap-x-8">
          <div className="col-span-1 px-4">
            <img src={avatar || DefaultAvatarCandidate} alt="avatar" className="rounded-full block" />
          </div>
          <div className="col-span-3 relative">
            {cvId ? (
              <div className="absolute right-0 top-0">
                <div className="flex items-center bg-green-600 rounded px-4 py-2 duration-300 hover:bg-green-700">
                  <i className="fas fa-unlock-alt mr-3 text-white"></i>
                  <span className="text-white font-medium">Đã mở khóa</span>
                </div>
                <a
                  href={`/cv-public/${slugURL(fullname)}.${cvId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-600 underline mt-3 font-semibold"
                >
                  CV ứng viên chi tiết
                </a>
              </div>
            ) : (
              <div
                onClick={() => modalUnlockCandidate.current?.show()}
                className="absolute right-0 top-0 flex items-center bg-red-600 rounded px-4 py-2 cursor-pointer duration-300 hover:bg-red-700"
              >
                <i className="fas fa-lock mr-3 text-white"></i>
                <span className="text-white font-medium">Mở khóa ứng viên</span>
              </div>
            )}
            <span className="block text-2xl font-semibold mt-4">
              {fullname}
              <span className="ml-4">
                {gender === 'MALE' ? (
                  <i className="fas fa-mars text-blue-500"></i>
                ) : (
                  <i className="fas fa-venus text-pink-500"></i>
                )}
              </span>
            </span>
            <div className="mt-4 flex items-center">
              <i className="fas fa-birthday-cake text-gray-500 mr-3"></i>
              <span className="block font-medium">{moment().diff(birthday, 'years')} tuổi</span>
            </div>

            <div className="flex items-center mt-4">
              <i className="fas fa-user text-gray-500 mr-3"></i>
              <span>Vị trí ứng tuyển: </span>
              <span className="block font-medium ml-4">{applyPosition}</span>
            </div>
            <div className="flex items-center mt-4">
              <i className="fas fa-briefcase text-gray-500 mr-3"></i>
              <span>Ngành nghề: </span>
              <span className="block font-medium ml-4">{career}Kế toán</span>
            </div>
          </div>
        </div>

        <div className="mt-16 px-10 mb-20">
          {education && education.length > 0 && (
            <div className="border border-dashed border-gray-400 p-5 rounded">
              <span className="block uppercase text-xl font-semibold">Học vấn</span>
              {education.map((item) => {
                return (
                  <div key={item.name} className="mt-3 mb-5 ml-12">
                    <div className="flex items-center">
                      <i className="fas fa-graduation-cap mr-3 text-gray-500"></i>
                      <span className="block font-medium">{item.name.toUpperCase()}</span>
                    </div>
                    <span className="block ml-8 mt-1">- Chuyên ngành: {item.major}</span>
                  </div>
                )
              })}
            </div>
          )}

          {workExperience && workExperience.length > 0 && (
            <div className="border border-dashed border-gray-400 p-5 rounded mt-12">
              <span className="block uppercase text-xl font-semibold">Kinh nghiệm làm việc</span>
              {workExperience.map((item) => {
                return (
                  <div key={item.companyName} className="mt-3 mb-5 ml-12">
                    <div className="flex items-center">
                      <i className="fas fa-building mr-3 text-gray-500"></i>
                      <span className="block font-medium">{item.companyName.toUpperCase()}</span>
                    </div>
                    <span className="block ml-8 mt-1">- Vị trí: {item.position}</span>
                    <span className="block ml-8 mt-1">- Thời gian: {item.time}</span>
                    <span className="block ml-8 mt-1">- Mô tả: {item.description}</span>
                  </div>
                )
              })}
            </div>
          )}

          {advancedSkill && advancedSkill.length > 0 && (
            <div className="border border-dashed border-gray-400 p-5 rounded mt-12">
              <span className="block uppercase text-xl font-semibold">Kỹ năng chuyên môn</span>
              {advancedSkill.map((item) => {
                return (
                  <div key={item.name} className="mt-3 mb-5 ml-12">
                    <div className="flex items-center">
                      <i className="fas fa-chart-pie mr-3 text-gray-500"></i>
                      <span className="block font-medium">{item.name.toUpperCase()}</span>
                    </div>
                    <span className="block ml-8 mt-1">- Mô tả: {item.description}</span>
                  </div>
                )
              })}
            </div>
          )}

          {careerGoals && (
            <div className="border border-dashed border-gray-400 p-5 rounded mt-12">
              <span className="block uppercase text-xl font-semibold">Mục tiêu nghề nghiệp</span>
              <span className="block ml-12 mt-3 mb-5">{careerGoals}</span>
            </div>
          )}

          {activity && activity.length > 0 && (
            <div className="border border-dashed border-gray-400 p-5 rounded mt-12">
              <span className="block uppercase text-xl font-semibold">Hoạt động</span>
              {activity.map((item) => {
                return (
                  <div key={item.name} className="mt-3 mb-5 ml-12">
                    <div className="flex items-center">
                      <i className="fas fa-directions mr-3 text-gray-500"></i>
                      <span className="block font-medium">{item.name.toUpperCase()}</span>
                    </div>
                    <span className="block mt-1 ml-8">- Thời gian: {item.time}</span>
                  </div>
                )
              })}
            </div>
          )}

          {certificate && certificate.length > 0 && (
            <div className="border border-dashed border-gray-400 p-5 rounded mt-12">
              <span className="block uppercase text-xl font-semibold">Chứng chỉ</span>
              {certificate.map((item) => {
                return (
                  <div key={item.name} className="mt-5">
                    <span className="block ml-12">- {item.name}</span>
                  </div>
                )
              })}
            </div>
          )}

          {award && award.length > 0 && (
            <div className="border border-dashed border-gray-400 p-5 rounded mt-12">
              <span className="block uppercase text-xl font-semibold">Giải thưởng</span>
              {award.map((item) => {
                return (
                  <div key={item.name} className="mt-5">
                    <span className="block ml-12">- {item.name}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <PrModal
        ref={modalUnlockCandidate}
        title="Mở khóa ứng viên"
        onChange={onUnlockCandidate}
        onHide={onHideUnlockCandidate}
        okTitle="Mở khóa"
        onShow={onShowUnlockCandidate}
        cancelTitle="Hủy bỏ"
      >
        <div className="py-10 px-20">
          <span className="block text-center text-2xl font-semibold text-green-700">
            Xác nhận mở khóa ứng viên này ?
          </span>
          <span className="block mt-10 font-medium text-lg">Sau khi mở khóa, bạn có thể:</span>
          <div className="flex items-center ml-6 mt-2">
            <i className="fas fa-check-circle mr-3 text-green-600" />
            <span>Xem chi tiết CV của ứng viên này</span>
          </div>
          <div className="flex items-center ml-6 mt-2">
            <i className="fas fa-check-circle mr-3 text-green-600" />
            <span>Xem thông tin liên lạc của ứng viên này</span>
          </div>
          <div className="flex items-center ml-6 mt-2">
            <i className="fas fa-check-circle mr-3 text-green-600" />
            <span>Lưu lại ứng viên này trong danh sách</span>
          </div>
          <span className="block mt-10 text-xl font-medium text-center">
            Bạn còn <span className="font-semibold text-red-500">{employerInfo?.numberOfCandidateOpening} lượt</span> mở
            khóa ứng viên
          </span>
        </div>
      </PrModal>
    </div>
  )
}
