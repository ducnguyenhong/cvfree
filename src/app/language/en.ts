export default {
  common: {
    txtSignin: 'Sign in',
    txtSignup: 'Sign up',
    labelUserName: 'Username',
    placeholderUserName: 'your_username',
    labelName: 'Name',
    placeholderName: 'Kevin Hart',
    alertEmptyName: 'Please enter your name.',
    labelEmail: 'Email',
    placeholderEmail: 'email@example.com',
    alertEmptyEmail: 'Please enter your email address.',
    alertInvalidEmail: 'Please enter a valid email address.',
    labelPassword: 'Password',
    placeholderPassword: 'Enter your password',
    alertEmptyPassword: 'Please enter your password.',
    alertInvalidPassword:
      'Password must contain 8 to 32 characters; must have at least one lowercase and one uppercase.',
    create: 'Create',
    update: 'Update'
  },

  signin: {
    signin: 'Sign in to Ekidhub CMS',
    linkForgotPassword: 'Forgot your password?',
    textSignup: 'Do not have an account yet?',
    alertIncorrect: 'The username or password is incorrect.',
    alertEmptyUsername: 'Please enter an username.',
    alertEmptyPassword: 'Please enter password.',
    notificationSuccess: 'Login successful, redirecting ...'
  },

  signup: {
    signup: 'Sign up to Ekidhub CMS',
    alertEmailExists: 'This email already exists. If you are the owner of this account, please',
    linkSigninToContinue: 'sign in to continue',
    btnSignup: 'Create account',
    textSignin: 'Already have an account?',
    titleSuccessSignup: 'Registration Completed Successfully'
  },

  forgotPassword: {
    forgotPassword: 'Forgot Password',
    btnForgotPassword: 'Get recovery link',
    textForgotPassword: 'Remember your password?',
    linkBackToLogin: 'Back to Sign in',
    notificationSuccess: 'Further instructions has been sent to your email.',
    notificationEmailExists: 'Email is not exist',
    notificationValidEmailNotExists: 'An email has been sent to provided email address with further instructions'
  },

  newPassword: {
    newPassWord: 'Set New Password',
    labelNewPassword: 'New Password',
    placeholderNewPassword: 'Enter your new password',
    alertEmptyNewPassword: 'Please enter your new password.',
    labelComfirmNewPassword: 'Confirm New Password',
    placeholderComfirmNewPassword: 'Retype your new password',
    alertComfirmNewPassword: 'Please confirm your new password.',
    alertPasswordNotMatch: 'Password does not match.',
    btnNewPassword: 'Set New Password',
    notificationSuccess: 'You have reset your password successfully!'
  },

  users: {
    avatar: 'Avatar',
    fullname: 'Full Name',
    phone: 'Phone',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm password',
    metaData: 'Meta data',
    createAdmin: 'Create Admin',
    updateAdmin: 'Update Admin',
    createDeveloper: 'Create Developer',
    updateDeveloper: 'Update Developer',
    createUser: 'Create User',
    updateUser: 'Update User',
    value: 'Value',
    key: 'Name',
    add: 'Add',
    alertEmptyFullname: 'Fullname is required',
    alertEmptyEmail: 'Email is required',
    alertEmptyUsername: 'Username is required',
    alertEmptyPassword: 'Password is required',
    alertEmptyConfirmPassword: 'Confirm password is required',
    alertInvalidPhone: 'Invalid phone number',
    alertInvalidEmail: 'Invalid email',
    alertInvalidUsername: 'Invalid username',
    alertInvalidPassword: 'Password must be between 4 and 32 characters'
  },

  applications: {
    name: 'Name',
    version: 'Version',
    bundle_id: 'Bundle Id',
    icon: 'Icon',
    icon_featured: 'Icon Featured',
    fileBuild: 'Built File',
    url_onqr: 'URL On QR',
    url_app: 'URL App',
    url_desktop: 'URL Desktop',
    namespace: 'Namespace',
    createApplication: 'Create Application',
    updateApplication: 'Update Application',
    alertEmptyName: 'Name is required',
    alertEmptyVersion: 'Version is required',
    alertEmptyBundleId: 'Bundle Id is required',
    alertEmptyUrlOnQr: 'URL On QR is required',
    alertEmptyUrlApp: 'URL App is required',
    alertEmptyUrlDesktop: 'URL Desktop is required',
    alertInvalidUrl: 'Invalid URL',
    alertUpdateVersion: 'Must update the version'
  },

  workplaces: {
    name: 'Name',
    code: 'Code',
    authen_api_url: 'Authen API URL',
    icon: 'Icon',
    manual_authen_url: 'Manual Authen URL',
    cover: 'Cover',
    is_public: 'Is Public',
    alertEmptyName: '* Name is required',
    alertInvalidUrl: 'Invalid URL',
    alertInvalidCode: 'Code must be 4 to 20 characters long'
  }
}
