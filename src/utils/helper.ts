export const checkEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/g.test(email)
}

export const checkUsername = (username: string) => {
  return /^[a-z0-9]+$/.test(username)
}
