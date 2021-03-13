export interface CvInfo {
  id: number
  userId: number
  color: string
  template: number
  fontSize: string
  fontFamily: string
  categoryInfo: {
    name: string
  }[]
  categoryCV: {
    name: string
  }[]
  detail: {
    fullname: string
    avatar?: string
    applyPosition?: string
    generalIntro?: string
    birthday?: string
    gender?: string
    phone?: string
    address?: string
    email?: string
    facebook?: string
    basicSkill?: {
      name: string
      star: number
    }[]
    hobby?: string
    goals?: string

    education?: {
      name: string
      major: string
    }[]
    workExperience?: {
      companyName: string
      position: string
      time: string
      description?: string
    }[]
    advancedSkill?: {
      name: string
      description: string
    }[]
    activity?: {
      name: string
      time: string
    }[]
    cetificate?: {
      name: string
    }[]
    award?: {
      name: string
    }[]
    presenter?: {
      name: string
      company: string
      position: string
      phone: string
    }[]
    anotherInfo?: {
      info: string
    }[]
  }
  createdAt?: number
  updatedAt?: number
}
