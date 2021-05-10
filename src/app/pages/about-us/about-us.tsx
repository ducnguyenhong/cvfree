import ImageCv from 'assets/images/img-about-us-1.png'
import ImageJob from 'assets/images/img-about-us-2.png'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

export const AboutUs: React.FC = () => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `CVFREE | ${intl.formatMessage({ id: 'ABOUT_US.ABOUT_US' })}`
  }, [])

  return (
    <div className="bg-white px-80 pt-28 pb-10" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <span className="block text-center font-semibold text-2xl uppercase mt-10">
        {intl.formatMessage({ id: 'ABOUT_US.ABOUT_US' })}
      </span>
      <div className="mt-10 px-16">
        <div className="flex items-center">
          <span className="block font-medium mr-10 text-justify">
            - <span className="text-green-600 font-semibold">CVFREE</span>{' '}
            {intl.formatMessage({ id: 'ABOUT_US.CONTENT_1' })}
          </span>
          <img src={ImageCv} alt="about-us" className="w-96" />
        </div>
        <div className="flex items-center mt-10">
          <img src={ImageJob} alt="about-us" className="w-96" />
          <span className="block font-medium ml-10 text-justify">
            {intl.formatMessage({ id: 'ABOUT_US.CONTENT_2' })}
          </span>
        </div>
      </div>
    </div>
  )
}
