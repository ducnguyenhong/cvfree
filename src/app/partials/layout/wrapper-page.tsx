import { Link } from 'react-router-dom'

interface WrapperPageProps {
  title?: string | React.ReactElement | React.FC
}

export const WrapperPage: React.FC<WrapperPageProps> = (props) => {
  const { title, children } = props
  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <div className="bg-white shadow rounded px-5 py-3">
        {title && (
          <div className="flex items-center">
            <Link to="/" className="block mr-3">
              <i className="fas fa-home text-gray-600" />
            </Link>
            <i className="fas fa-angle-right block mr-3 text-gray-600" />
            <span className="font-semibold text-green-600">{title}</span>
          </div>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
