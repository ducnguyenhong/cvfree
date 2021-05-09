import { Link } from 'react-router-dom'
import ImageBackground from 'assets/images/bg-bottom-home.png'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { memo } from 'react'
import { useIntl } from 'react-intl'

const EnterpriseHome: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const intl = useIntl()

  const ExpRecruitment: React.FC = () => {
    return (
      <>
        <div className="absolute top-0 left-0 col-span-1 one-exp-now-rotate duration-300 bg-gray-500 w-full h-full flex justify-center items-center transform rotate-45"></div>
        <div className="transform w-full h-full absolute left-0 right-0 mx-auto flex items-center justify-center">
          <div className="cursor-pointer">
            <i className="fas fa-briefcase block text-center text-gray-50 text-2xl" />
            <span className="block text-center text-gray-50 text-lg font-semibold mt-2">
              {intl.formatMessage({ id: 'HOME.RECRUITMENT' })}
            </span>
          </div>
        </div>
      </>
    )
  }

  const ExpCreateCV: React.FC = () => {
    return (
      <>
        <div className="absolute top-0 left-0 col-span-1 one-exp-now-rotate duration-300 bg-gray-500 w-full h-full flex justify-center items-center transform rotate-45"></div>
        <div className="transform w-full h-full absolute left-0 right-0 mx-auto flex items-center justify-center">
          <div className="cursor-pointer">
            <i className="fas fa-address-card block text-center text-gray-50 text-2xl" />
            <span className="block text-center text-gray-50 text-lg font-semibold mt-2">
              {intl.formatMessage({ id: 'HOME.CREATE_CV' })}
            </span>
          </div>
        </div>
      </>
    )
  }

  const MemoExpRecruitment = memo(ExpRecruitment)
  const MemoExpCreateCV = memo(ExpCreateCV)

  return (
    <div
      className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-16 pt-32 pb-32 home-enterprise"
      style={{ backgroundImage: `url(${ImageBackground})` }}
    >
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <span className="block text-center font-bold text-5xl text-gray-800">10+</span>
          <span className="block text-center mt-3 font-semibold text-2xl text-gray-600">
            {intl.formatMessage({ id: 'HOME.CANDIDATE_PROFILE' })}
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-center font-bold text-5xl text-gray-800">20+</span>
          <span className="block text-center mt-3 font-semibold text-2xl text-gray-600">
            {intl.formatMessage({ id: 'HOME.HOT_JOBS' })}
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-center font-bold text-5xl text-gray-800">10+</span>
          <span className="block text-center mt-3 font-semibold text-2xl text-gray-600">
            {intl.formatMessage({ id: 'HOME.RECRUITMENT_BUSINESSES' })}
          </span>
        </div>
      </div>

      <div className="w-1/2 mt-28 mx-auto">
        <hr />
      </div>

      <div className="grid grid-cols-3 mt-28 pb-32 px-20">
        <div className="col-span-3 text-center mb-32">
          <span className="font-bold text-3xl uppercase">{intl.formatMessage({ id: 'HOME.EXPERIENCE_NOW' })}</span>
        </div>

        {userInfo?.type === 'EMPLOYER' ? (
          <div className="w-40 h-40 mx-auto relative one-exp-now duration-300">
            <MemoExpCreateCV />
          </div>
        ) : (
          <Link to="/template-cv" className="block w-40 h-40 mx-auto relative one-exp-now duration-300">
            <MemoExpCreateCV />
          </Link>
        )}

        <Link to="/jobs" className="block w-40 h-40 mx-auto relative one-exp-now duration-300">
          <div className="absolute top-0 left-0 col-span-1 one-exp-now-rotate duration-300 bg-gray-500 w-full h-full flex justify-center items-center transform rotate-45"></div>
          <div className="transform w-full h-full absolute left-0 right-0 mx-auto flex items-center justify-center">
            <div className="cursor-pointer">
              <i className="fas fa-search block text-center text-gray-50 text-2xl" />
              <span className="block text-center text-gray-50 text-lg font-semibold mt-2">
                {intl.formatMessage({ id: 'HOME.FIND_A_JOB' })}
              </span>
            </div>
          </div>
        </Link>

        {userInfo?.type === 'USER' && (
          <div className="w-40 h-40 mx-auto relative one-exp-now duration-300">
            <MemoExpRecruitment />
          </div>
        )}

        {userInfo?.type === 'EMPLOYER' && (
          <Link to="/employer" className="w-40 h-40 mx-auto relative one-exp-now duration-300">
            <MemoExpRecruitment />
          </Link>
        )}

        {!userInfo && (
          <Link to="/employer-intro" className="w-40 h-40 mx-auto relative one-exp-now duration-300">
            <MemoExpRecruitment />
          </Link>
        )}
      </div>
    </div>
  )
}

export default EnterpriseHome
