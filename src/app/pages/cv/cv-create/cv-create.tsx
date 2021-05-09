import { CvFormLayout1, CvFormLayout2 } from 'app/pages/cv/cv-template-create'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { userInfoState } from 'app/states/user-info-state'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export const CvCreate: React.FC = () => {
  const selectedCvTemplate = localStorage.getItem('cv-template-create')
  const modalOutOfTurnRef = useRef<PrModalRefProps>(null)
  const userInfo = useRecoilValue(userInfoState)

  const renderCvForm = () => {
    if (selectedCvTemplate === '1') {
      return <CvFormLayout1 />
    }

    if (selectedCvTemplate === '2') {
      return <CvFormLayout2 />
    }

    return <CvFormLayout1 />
  }

  useEffect(() => {
    if (userInfo && Number(userInfo?.numberOfCreateCv) < 1) {
      modalOutOfTurnRef.current?.show()
    }
  }, [userInfo])

  return (
    <div>
      {renderCvForm()}

      <PrModal
        title="Thông báo"
        disableX
        ref={modalOutOfTurnRef}
        disableFooter
        onHide={() => modalOutOfTurnRef.current?.hide()}
      >
        <div className="py-20 px-10">
          <span className="block text-center font-semibold text-lg">Bạn đã sử dụng hết số lượt tạo CV</span>
          <div className="mt-16 text-center flex items-center justify-center">
            <Link
              to="/manage-cv"
              className="px-6 py-2.5 rounded-md text-white bg-green-600 text-md font-semibold duration-300 hover:bg-green-700"
            >
              Xem danh sách hồ sơ đã tạo
            </Link>
          </div>
        </div>
      </PrModal>
    </div>
  )
}
