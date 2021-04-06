import LogoBreadCrumb from 'assets/images/logo-bread-crumb.png'
import { Link } from 'react-router-dom'

interface BreadCrumbProps {
  title: string | React.ReactElement | React.FC
}

export const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  const { title } = props

  return (
    <div className="flex items-center justify-start">
      <Link to="/" className="block">
        <img src={LogoBreadCrumb} alt="logo" className="mr-3 block w-5 h-5" />
      </Link>
      <span className="block uppercase font-semibold text-lg text-green-700">{title}</span>
    </div>
  )
}
