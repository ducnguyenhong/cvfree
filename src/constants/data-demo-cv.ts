import Image1 from 'assets/images/img-demo-temp-cv-1.png'

interface DataDemoCVType {
  image: string
  value: string
  label: string
}

export const DataDemoCV: DataDemoCVType[] = [
  {
    image: Image1,
    value: '1',
    label: 'Mẫu CV mặc định'
  },
  {
    image: 'https://static.careerbuilder.vn/themes/cv_tool/images/template/cvtemplate08_1605606667.jpg',
    value: '2',
    label: 'Mẫu CV năng động'
  },
  {
    image: 'https://fedudesign.vn/wp-content/uploads/2020/07/01_Resume_Page_1-scaled.jpg',
    value: '3',
    label: 'Mẫu CV sức sống'
  }
]
