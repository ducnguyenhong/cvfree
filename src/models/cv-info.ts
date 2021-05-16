export interface CvInfo {
  _id?: string
  id?: number
  status: string
  creatorId?: string
  language?: string
  creator?: {
    fullname?: string
    avatar?: string
    username: string
  }
  color: string
  template: {
    value: string
    label: string
  }
  fontSize: string
  fontFamily: string
  name: string
  career?: {
    value: string
    label: string
  }
  formOfWork?: string[]
  isPrimary?: boolean
  categoryInfo: {
    name: string
  }[]
  categoryCV: {
    name: string
  }[]
  detail: {
    fullname: string
    avatar?: string
    avatarId?: string
    applyPosition?: string
    birthday: number
    gender: string
    phone: string
    address?: {
      label: string
      value: {
        city: string
        district: string
      }
    }
    email: string
    facebook?: string
    basicSkill?: {
      name: string
      star: number
    }[]
    hobby?: string
    careerGoals?: string

    education?: {
      name: string
      major?: string
    }[]
    workExperience?: {
      companyName: string
      position?: string
      time?: string
      description?: string
    }[]
    advancedSkill?: {
      name: string
      description?: string
    }[]
    activity?: {
      name: string
      time?: string
    }[]
    certificate?: {
      name: string
    }[]
    award?: {
      name: string
    }[]
    presenter?: {
      name: string
      company?: string
      position?: string
      phone?: string
    }[]
    anotherInfo?: {
      info: string
    }[]
  }
  unlockedEmployers: number[]
  createdAt?: number
  updatedAt?: number
}
