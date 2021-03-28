import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { PresenterItem1 } from './presenter-1.items'
import { PresenterMetaDataType, PresenterValue } from 'app/partials/metadata/metadata.type'

export const Presenter1 = forwardRef((props: Record<string, unknown>, ref) => {
  const [metaDataList, setMetaDataList] = useState<PresenterMetaDataType[]>([
    { ref: null, company: '', name: '', position: '', phone: '' }
  ])

  const onCreateFine = () => {
    const oldMetaData: PresenterMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, company: '', name: '', position: '', phone: '' }]
    setMetaDataList(newMetaData)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: PresenterValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { company, name, position, phone, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ company, name, position, phone })
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
    setValue(value: PresenterValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: PresenterMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({
            company: value[i].company,
            name: value[i].name,
            position: value[i].position,
            phone: value[i].phone,
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
        <PresenterItem1 ref={(ref) => (item.ref = ref)} key={`work_exp_${index}`} />
      ))}
    </div>
  )
})
