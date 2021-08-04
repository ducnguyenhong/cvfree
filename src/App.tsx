import RouteURL from 'app/configs/routes/index'
import PrNotify from 'app/partials/pr-notify'
import axios from 'axios'
import { CLIENT_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { RecoilRoot } from 'recoil'
import Swal from 'sweetalert2'

const AppLayout = () => {
  // axios.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (
  //       get(error, 'response.status') === 401 &&
  //       get(error, 'response.data.error.message') === 'ACCOUNT_LOGGED_IN_SOMEWHERE_ELSE'
  //     ) {
  //       Swal.fire({
  //         title: 'Cảnh báo!',
  //         text: 'Tài khoản của bạn vừa đăng nhập tại một nơi khác',
  //         icon: 'warning',
  //         confirmButtonText: 'Xác nhận'
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           localStorage.removeItem('user-info')
  //           Cookies.remove('token')
  //           Cookies.remove('expired-at')
  //           window.location.href = `${CLIENT_URL}`
  //         }
  //       })
  //     }
  //     return error
  //   }
  // )

  return (
    <div style={{ fontFamily: `'Quicksand', sans-serif`, backgroundColor: '#EEF0F8' }}>
      <RecoilRoot>
        <RouteURL />
        <PrNotify />
      </RecoilRoot>
    </div>
  )
}

export default AppLayout
