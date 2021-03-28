import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { CertificateItem1 } from './certificate-1.items'
import { CertificateMetaDataType, CertificateValue } from 'app/partials/metadata/metadata.type'

export const Certificate1 = forwardRef((props: Record<string, unknown>, ref) => {
  const [metaDataList, setMetaDataList] = useState<CertificateMetaDataType[]>([{ ref: null, name: '' }])

  const onCreateFine = () => {
    const oldMetaData: CertificateMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, name: '' }]
    setMetaDataList(newMetaData)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: CertificateValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name })
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
    setValue(value: CertificateValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: CertificateMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({ name: value[i].name, ref: null })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <CertificateItem1 ref={(ref) => (item.ref = ref)} key={`certificate_${index}`} />
      ))}
    </div>
  )
})
