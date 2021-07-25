import RouteURL from 'app/configs/routes/index'
import PrNotify from 'app/partials/pr-notify'
import { userInfoState, userTokenState } from 'app/states/user-info-state'
import axios from 'axios'
import { CLIENT_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import Swal from 'sweetalert2'

const AppLayout = () => {
  const setUserInfoRecoil = useSetRecoilState(userInfoState)
  const setUserTokenRecoil = useSetRecoilState(userTokenState)
  // axios.interceptors.request.use((config) => {
  //   if (!config.url?.startsWith('https://')) {
  //     config.url = `${SOCOLA_URL}${config.url}`;
  //     config.params = {
  //       ...config.params,
  //     };
  //   }

  //   return config;
  // });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        get(error, 'response.status') === 401 &&
        get(error, 'response.data.error.message') === 'ACCOUNT_LOGGED_IN_SOMEWHERE_ELSE'
      ) {
        Swal.fire({
          title: 'Cảnh báo!',
          text: 'Tài khoản của bạn vừa đăng nhập tại một nơi khác',
          icon: 'warning',
          confirmButtonText: 'Xác nhận'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('user-info')
            Cookies.remove('token')
            Cookies.remove('expired-at')
            window.location.href = `${CLIENT_URL}`
          }
        })
      }
    }
  )

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
