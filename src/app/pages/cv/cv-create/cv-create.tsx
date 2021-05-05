import { selectedCVTemplateState } from 'app/states/selected-cv-template-state'
import { useRecoilValue } from 'recoil'
import { CvFormLayout1, CvFormLayout2 } from 'app/pages/cv/cv-template-create'

export const CvCreate: React.FC = () => {
  const selectedCvTemplate = useRecoilValue(selectedCVTemplateState)

  if (selectedCvTemplate === '1') {
    return <CvFormLayout1 />
  }

  if (selectedCvTemplate === '2') {
    return <CvFormLayout2 />
  }

  return <CvFormLayout1 />
}
