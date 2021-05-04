export interface CityType {
  route: string
  value: string
  label: string
}

export const DataCity: CityType[] = [
  {
    label: 'Hà Nội',
    value: '2',
    route: 'ha-noi'
  },
  {
    label: 'Thành phố Hồ Chí Minh',
    value: '1',
    route: 'tphcm'
  },
  {
    label: 'Đà Nẵng',
    value: '3',
    route: 'da-nang'
  },
  {
    label: 'Hải Phòng',
    value: '7',
    route: 'hai-phong'
  },
  {
    label: 'Cần Thơ',
    value: '12',
    route: 'can-tho'
  }
]

export const DataCareer: CityType[] = [
  {
    label: 'Kinh doanh',
    value: '24',
    route: 'kinh-doanh'
  },
  {
    label: 'Công nghệ thông tin',
    value: '6',
    route: 'cong-nghe-thong-tin'
  },
  {
    label: 'Báo chí',
    value: '2',
    route: 'bao-chi'
  },
  {
    label: 'Marketing',
    value: '16',
    route: 'marketing'
  },
  {
    label: 'Bất động sản',
    value: '4',
    route: 'bat-dong-san'
  }
]
