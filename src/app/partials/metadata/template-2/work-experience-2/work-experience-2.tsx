import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { WorkExperienceItem2 } from './work-experience-2.items'
import { WorkExperienceMetaDataType, WorkExperienceValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface WorkExperienceProps extends FocusBlurType {}

export const WorkExperience2 = forwardRef((props: WorkExperienceProps, ref) => {
  const { onFocus, onBlur } = props
  const [metaDataList, setMetaDataList] = useState<WorkExperienceMetaDataType[]>([
    { ref: null, companyName: '', position: '', time: '', description: '' }
  ])

  const onCreateFine = () => {
    const oldMetaData: WorkExperienceMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, companyName: '', position: '', time: '', description: '' }]
    setMetaDataList(newMetaData)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: WorkExperienceValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { companyName, time, position, description, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ companyName, time, position, description })
      }
    }
  }, [metaDataList])

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    onCreate() {
      onCreateFine()
    },
    setValue(value: WorkExperienceValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: WorkExperienceMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({
            companyName: value[i].companyName,
            time: value[i].time,
            description: value[i].description,
            position: value[i].position,
            ref: null
          })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <WorkExperienceItem2
          ref={(ref) => (item.ref = ref)}
          key={`work_exp_${index}`}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ))}
    </div>
  )
})
