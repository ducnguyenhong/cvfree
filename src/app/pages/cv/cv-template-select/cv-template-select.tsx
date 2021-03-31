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
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 py-40">
        <div className="text-center mb-20">
          <span className="uppercase text-3xl font-bold text-green-700">Danh sách các mẫu CV</span>
        </div>
        <div className="grid grid-cols-3 gap-28 px-40">
          {DataDemoCV.map((item) => {
            const { value, image } = item
            return (
              <div className="relative col-span-1 group shadow-md hover:shadow-xl duration-300" key={`demo_${value}`}>
                <img src={image} alt="sample cv" className="top-0 left-0 w-full" style={{ zIndex: 5 }} />
                <div className="w-full h-full bg-gray-700 absolute top-0 left-0 opacity-0 duration-300 group-hover:opacity-50"></div>
                <div
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 duration-300 mx-auto group-hover:opacity-100"
                  style={{ zIndex: 6 }}
                >
                  <div
                    className="text-green-600 bg-gray-50 px-6 py-3 cursor-pointer rounded-md uppercase font-bold flex items-center"
                    onClick={() => onOpenCreateCVPage(value)}
                  >
                    <i className="fas fa-check-circle mr-3" />
                    <span>Sử dụng</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
