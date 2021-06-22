import Navbar from 'app/pages/navbar'
import { useEffect, useState } from 'react'
import { Footer } from 'app/pages/footer'
import { NavbarMobile } from 'app/pages/navbar-mobile'

export const MainRouteWrapper: React.FC = (props) => {
  const [needNavbar, setNeedNavbar] = useState<boolean>(true)

  useEffect(() => {
    if (window.location.pathname.includes('/cv-public/')) {
      setNeedNavbar(false)
    }
  }, [])

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
      {needNavbar && <Footer />}
    </div>
  )
}
