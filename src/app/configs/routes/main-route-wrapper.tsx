import Navbar from 'app/pages/navbar'
import { useEffect, useState } from 'react'
import { Footer } from 'app/pages/footer'
import { NavbarMobile } from 'app/pages/navbar-mobile'
import { useLocation } from 'react-router-dom'

export const MainRouteWrapper: React.FC = (props) => {
  const [needNavbar, setNeedNavbar] = useState<boolean>(true)
  const [needFooter, setNeedFooter] = useState<boolean>(true)
  const location = useLocation()

  useEffect(() => {
    if (window.location.pathname.includes('/cv-public/')) {
      setNeedNavbar(false)
    }
  }, [])

  useEffect(() => {
    if (location.pathname.includes('/dashboard')) {
      setNeedFooter(false)
    } else {
      setNeedFooter(true)
    }
  }, [location])

  return (
    <div>
      {needNavbar && (
        <>
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className="block lg:hidden">
            <NavbarMobile />
          </div>
        </>
      )}
      {props.children}
      {needFooter && <Footer />}
    </div>
  )
}
