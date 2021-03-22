import { DataDemoCV } from 'constants/data-demo-cv'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { selectedCVTemplateState } from 'app/states/selected-cv-template-state'
import { useSetRecoilState } from 'recoil'

export const TemplateSelectCV: React.FC = () => {
  const history = useHistory()
  const setCvTemplate = useSetRecoilState(selectedCVTemplateState)

  const onOpenCreateCVPage = useCallback((value: string) => {
    setCvTemplate(value)
    history.push('/create-cv')
  }, [])

  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 py-40 bg-gray-100">
        <div className="text-center mb-20">
          <span className="uppercase text-3xl font-semibold">Danh sách các mẫu CV</span>
        </div>
        <div className="grid grid-cols-3 gap-20 px-40">
          {DataDemoCV.map((item) => {
            const { value, image } = item
            return (
              <div
                className="relative col-span-1 shadow-md cursor-pointer hover:shadow-xl duration-300"
                key={`demo_${value}`}
                onClick={() => onOpenCreateCVPage(value)}
              >
                <img src={image} alt="sample cv" className="top-0 left-0 w-full" style={{ zIndex: 5 }} />
                <div className="absolute top-0 left-0 " style={{ zIndex: 6 }}>
                  <span>Sử dụng</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
