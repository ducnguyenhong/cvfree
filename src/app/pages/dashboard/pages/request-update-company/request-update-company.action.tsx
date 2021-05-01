import { showBanRequestUpdateCompanyState } from 'app/states/show-modal/ban-request-update-company-state'
import { showSendEmailRequestUpdateCompanyState } from 'app/states/show-modal/send-email-request-update-company-state'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { showDeactiveRequestUpdateCompanyState } from 'app/states/show-popup/deactive-request-update-company-state'

interface ActionProps {
  id?: string
  emailTo?: string
  emailRequest?: string
  helloName?: string
  isLoginNow?: boolean
  status?: string
  employerRequestedId?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, status, emailTo, emailRequest, helloName, isLoginNow, employerRequestedId } = props
  const setShowSendEmail = useSetRecoilState(showSendEmailRequestUpdateCompanyState)
  const setShowBanRequest = useSetRecoilState(showBanRequestUpdateCompanyState)
  const setDeactiveRequest = useSetRecoilState(showDeactiveRequestUpdateCompanyState)

  const onShowSendEmail = () => {
    const content = `Một nhà tuyển dụng khác cùng công ty với bạn (có địa chỉ email là ${emailRequest}) vừa gửi một yêu cầu cập nhật thông tin công ty của bạn.`
    setShowSendEmail({ showModal: true, emailTo: emailTo || '', helloName, isLoginNow, content, id })
  }

  const onBanRequest = () => {
    setShowBanRequest({ showModal: true, id, employerRequestedId })
  }

  const onDeactiveRequest = () => {
    setDeactiveRequest({ showPopup: true, id })
  }

  return (
    <>
      <div className="flex items-center">
        <div
          onClick={status === 'ACTIVE' ? onShowSendEmail : undefined}
          className="cursor-pointer flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
          style={{ width: 32, height: 32 }}
        >
          <span>
            <i className="fas fa-envelope text-gray-500 px-3 py-4 hover:text-white"></i>
          </span>
        </div>

        <div
          onClick={status === 'ACTIVE' ? onBanRequest : undefined}
          className={`${
            status === 'INACTIVE' ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-red-400'
          } flex rounded-md items-center justify-center duration-300 bg-gray-100 mr-4`}
          style={{ width: 32, height: 32 }}
        >
          <span>
            <i className="fas fa-ban text-gray-500 px-3 py-4 hover:text-white"></i>
          </span>
        </div>

        <div
          className={`${
            status === 'INACTIVE' ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-red-400'
          } flex rounded-md items-center justify-center duration-300 bg-gray-100`}
          style={{ width: 32, height: 32 }}
          onClick={status === 'ACTIVE' ? onDeactiveRequest : undefined}
        >
          <span>
            <i
              className={`${
                status === 'INACTIVE' ? 'text-gray-300' : 'hover:text-white text-gray-500'
              } fas fa-trash px-3 py-4`}
            ></i>
          </span>
        </div>
      </div>
    </>
  )
}
