import { CategoryProps } from 'app/pages/cv-form/cv-form.types'
export const checkEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/g.test(email)
}

export const checkUsername = (username: string) => {
  return /^[a-z0-9]+$/.test(username)
}

export const getCategoryWhenUp = (category: CategoryProps[], name: string) => {
  let index = 0
  const categoryActive: CategoryProps[] = []
  const categoryInactive: CategoryProps[] = []
  for (let x = 0; x < category.length; x++) {
    if (category[x].enable) {
      categoryActive.push(category[x])
    } else {
      categoryInactive.push(category[x])
    }
  }
  for (let i = 0; i < categoryActive.length; i++) {
    if (categoryActive[i].name === name) {
      index = i
    }
  }
  if (index === 0) {
    return null
  }
  const newCategory = [...categoryActive]
  const pr = newCategory[index]
  newCategory[index] = newCategory[index - 1]
  newCategory[index - 1] = pr

  return [...newCategory, ...categoryInactive]
}

export const getCategoryWhenDown = (category: CategoryProps[], name: string) => {
  let index = 0
  const categoryActive: CategoryProps[] = []
  const categoryInactive: CategoryProps[] = []
  for (let x = 0; x < category.length; x++) {
    if (category[x].enable) {
      categoryActive.push(category[x])
    } else {
      categoryInactive.push(category[x])
    }
  }
  for (let i = 0; i < categoryActive.length; i++) {
    if (categoryActive[i].name === name) {
      index = i
    }
  }
  if (index === categoryActive.length - 1) {
    return null
  }
  const newCategory = [...categoryActive]
  const pr = newCategory[index]
  newCategory[index] = newCategory[index + 1]
  newCategory[index + 1] = pr

  return [...newCategory, ...categoryInactive]
}

export const getCategoryWhenRemove = (category: CategoryProps[], name: string) => {
  const newCategory = [...category]
  for (let i = 0; i < newCategory.length; i++) {
    if (newCategory[i].name === name) {
      newCategory[i].enable = false
    }
  }
  return newCategory
}

export const slugURL = (str: string) => {
  if (!str) return 'cvfree'
  str = str.toLowerCase()
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
  str = str.replace(/(đ)/g, 'd')
  str = str.replace(/([^0-9a-z-\s])/g, '')
  str = str.replace(/(\s+)/g, '-')
  str = str.replace(/^-+/g, '')
  str = str.replace(/-+$/g, '')
  return str
}
