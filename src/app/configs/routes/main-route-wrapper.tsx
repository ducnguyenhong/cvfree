import Navbar from 'app/pages/navbar'
import { useEffect, useState } from 'react'

export const MainRouteWrapper: React.FC = (props) => {
  const [needNavbar, setNeedNavbar] = useState<boolean>(true)

  useEffect(() => {
    if (window.location.pathname.includes('/cv-public/')) {
      setNeedNavbar(false)
    }
  }, [])

  return (
    <div>
      {needNavbar && <Navbar />}
      {props.children}
    </div>
  )
}
