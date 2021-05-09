import { Link } from 'react-router-dom'
import ImageFeature1 from 'assets/images/img-feature-1.png'
import ImageFeature2 from 'assets/images/img-feature-2.png'
import ImageFeature3 from 'assets/images/img-feature-3.png'
import ImageFeature4 from 'assets/images/img-feature-4.png'
import BgFeature from 'assets/images/bg-feature-home.png'
import { useIntl } from 'react-intl'

const FeatureHome: React.FC = () => {
  const intl = useIntl()

  return (
    <div
      className="home-feature max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-20 py-32"
      style={{ backgroundImage: `url(${BgFeature})` }}
    >
      <div className="text-center mb-16">
        <span className="uppercase font-bold text-4xl text-gray-200">
          {intl.formatMessage({ id: 'HOME.WHAT_IS_CVFREE' })}
        </span>
      </div>
      <div className="px-20">
        <div className="flex items-center">
          <img src={ImageFeature1} alt="feature" className="block w-40 h-40 rounded-full" />
          <div className="ml-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-gray-200">
              {intl.formatMessage({ id: 'HOME.FEATURE_1_NAME' })}
            </span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              {intl.formatMessage({ id: 'HOME.FEATURE_1_CONTENT' })}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end mt-10">
          <div className="mr-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-right text-gray-200">
              {intl.formatMessage({ id: 'HOME.FEATURE_2_NAME' })}
            </span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              {intl.formatMessage({ id: 'HOME.FEATURE_2_CONTENT' })}
            </span>
          </div>
          <img src={ImageFeature2} alt="feature" className="block w-40 h-40 rounded-full" />
        </div>
        <div className="flex items-center mt-10">
          <img src={ImageFeature3} alt="feature" className="block w-40 h-40 rounded-full" />
          <div className="ml-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-gray-200">
              {intl.formatMessage({ id: 'HOME.FEATURE_3_NAME' })}
            </span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              {intl.formatMessage({ id: 'HOME.FEATURE_3_CONTENT' })}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end mt-10">
          <div className="mr-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-right text-gray-200">
              {intl.formatMessage({ id: 'HOME.FEATURE_4_NAME' })}
            </span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              {intl.formatMessage({ id: 'HOME.FEATURE_4_CONTENT' })}
            </span>
          </div>
          <img src={ImageFeature4} alt="feature" className="block w-40 h-40 rounded-full" />
        </div>
      </div>
      <div className="text-center mt-20">
        <Link
          to="/template-cv"
          className="rounded-md bg-green-600 text-gray-200 px-5 py-3 uppercase font-medium text-lg duration-300 hover:bg-green-700"
        >
          {intl.formatMessage({ id: 'HOME.CREATE_CV_NOW' })}
        </Link>
      </div>
    </div>
  )
}

export default FeatureHome
