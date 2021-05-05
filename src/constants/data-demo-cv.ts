import Image1 from 'assets/images/img-demo-temp-cv-1.png'
import Image2 from 'assets/images/img-demo-temp-cv-2.png'

interface DataDemoCVType {
  image: string
  value: string
  label: string
}

export const DataDemoCV: DataDemoCVType[] = [
  {
    image: Image1,
    value: '1',
    label: 'DEFAULT'
  },
  {
    image: Image2,
    value: '2',
    label: 'DYNAMIC'
  },
  {
    image: 'https://fedudesign.vn/wp-content/uploads/2020/07/01_Resume_Page_1-scaled.jpg',
    value: '3',
    label: 'CREATION'
  }
]
