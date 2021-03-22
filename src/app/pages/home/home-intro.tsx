import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import packageJson from '../../../../package.json'

const HomeIntro: React.FC = () => {
  const intl = useIntl()
  return (
    <div>
      <div>
        <span className="bg-green-500 text-white font-semibold px-4 py-2 rounded-xl mr-3">
          {intl.formatMessage({ id: 'HOME.NEW' })}
        </span>
        <span className="font-medium">
          {intl.formatMessage({ id: 'HOME.TEST_VERSION' })} {`${packageJson.version}`}
        </span>
      </div>
      <div className="mt-12">
        <span className="uppercase text-4xl text-green-700 font-bold">{intl.formatMessage({ id: 'HOME.CVFREE' })}</span>
      </div>
      <div className="mt-10 pl-8">
        <div>
          <i className="fas fa-check-circle text-green-600 mr-4"></i>
          <span className="font-semibold text-lg">{intl.formatMessage({ id: 'HOME.CREATE_CV_QUICKLY' })}</span>
        </div>
        <div className="mt-3">
          <i className="fas fa-check-circle text-green-600 mr-4"></i>
          <span className="font-semibold text-lg">{intl.formatMessage({ id: 'HOME.FIND_JOB_QUICKLY' })}</span>
        </div>
      </div>
      <div className="mt-20">
        <Link to="/template-cv" className="px-4 py-3 bg-green-600 mr-8 text-white rounded-md font-semibold">
          {intl.formatMessage({ id: 'HOME.CREATE_CV_NOW' })}
        </Link>
        <Link to="/abc" className="px-4 py-3 bg-purple-700 text-white rounded-md font-semibold">
          {intl.formatMessage({ id: 'HOME.FIND_JOB' })}
        </Link>
      </div>
    </div>
  )
}

export default HomeIntro
