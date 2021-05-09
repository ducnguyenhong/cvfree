import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AdvancedSkillItem2 } from './advanced-skill-2.items'
import { AdvancedSkillMetaDataType, AdvancedSkillValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface AdvancedSkillItemProps extends FocusBlurType {}

export const AdvancedSkill2 = forwardRef((props: AdvancedSkillItemProps, ref) => {
  const { onFocus, onBlur } = props
  const [metaDataList, setMetaDataList] = useState<AdvancedSkillMetaDataType[]>([
    { ref: null, name: '', description: '' }
  ])

  const onCreateFine = () => {
    const oldMetaData: AdvancedSkillMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, name: '', description: '' }]
    setMetaDataList(newMetaData)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: AdvancedSkillValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, description, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name, description })
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
    setValue(value: AdvancedSkillValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: AdvancedSkillMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({
            name: value[i].name,
            description: value[i].description,
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
        <AdvancedSkillItem2
          ref={(ref) => (item.ref = ref)}
          key={`ad_skill_${index}`}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ))}
    </div>
  )
})
