const lgSize = {
  '2xl': 'w-2/3',
  xl: 'w-3/4',
  lg: 'w-3/4',
  md: 'w-5/6',
  sm: 'w-11/12',
  xs: 'w-11/12'
}

const nmSize = {
  '2xl': 'w-1/4',
  xl: 'w-1/2',
  lg: 'w-1/2',
  md: 'w-7/12',
  sm: 'w-2/3',
  xs: 'w-11/12'
}

const smSize = {
  '2xl': 'w-1/3',
  xl: 'w-2/5',
  lg: 'w-2/5',
  md: 'w-7/12',
  sm: 'w-2/3',
  xs: 'w-11/12'
}

const colorDanger = {
  iconColor: '#EC7993',
  buttonClassName: 'btn-popup-danger'
}

const colorNormal = {
  iconColor: '',
  buttonClassName: 'btn-popup-normal'
}

const colorSuccess = {
  iconColor: '#28a819',
  buttonClassName: 'btn-pop-success'
}

export const getPopupSize = (size?: string): Record<string, string> => {
  if (size === 'lg') {
    return lgSize
  }
  if (size === 'sm') {
    return smSize
  }
  return nmSize
}

export const getPopupColor = (type?: string): { iconColor: string; buttonClassName: string } => {
  if (type === 'danger') {
    return colorDanger
  }
  if (type === 'success') {
    return colorSuccess
  }
  return colorNormal
}
