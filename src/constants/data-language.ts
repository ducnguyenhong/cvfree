import IconFlagVN from 'assets/icons/vn-flag.svg'
import IconFlagUK from 'assets/icons/uk-flag.svg'

interface LanguageProps {
  icon: string
  title: string
  value: string
  titleSelect: string
}

export const languageList: LanguageProps[] = [
  {
    icon: IconFlagVN,
    title: 'VN',
    value: 'vi',
    titleSelect: 'Tiếng Việt'
  },
  {
    icon: IconFlagUK,
    title: 'EN',
    value: 'en',
    titleSelect: 'English'
  }
]
