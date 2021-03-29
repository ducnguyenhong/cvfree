import { selectedCVTemplateState } from 'app/states/selected-cv-template-state'
import { useRecoilValue } from 'recoil'
import { CvFormLayout1 } from 'app/pages/cv/cv-template-create'

export const CvCreate: React.FC = () => {
  const selectedCvTemplate = useRecoilValue(selectedCVTemplateState)

  if (selectedCvTemplate === '1') {
    return <CvFormLayout1 />
  }

  return <CvFormLayout1 />
}
