const lgSize = {
  '2xl': 'w-2/3',
  xl: 'w-3/4',
  lg: 'w-3/4',
  md: 'w-5/6',
  sm: 'w-11/12',
  xs: 'w-11/12'
}

const nmSize = {
  '2xl': 'w-5/12',
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

export const getModalSize = (size?: string) => {
  if (size === 'lg') {
    return lgSize
  }
  if (size === 'sm') {
    return smSize
  }
  return nmSize
}
