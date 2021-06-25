import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react'
import { DropdownSync } from 'app/partials/dropdown-sync'
import axios from 'axios'
import Cookies from 'js-cookie'
import { SERVER_URL } from 'constants/index'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'

export interface LocationType {
  value: {
    district: OptionProps
    city: OptionProps
  }
  label: string
}

interface SelectLocationProps {
  onChange?: (location: LocationType) => void
}

export interface SelectLocationRef {
  getAddress: () => LocationType | null
}

export const SelectLocation = forwardRef((props: SelectLocationProps, ref: Ref<SelectLocationRef>) => {
  const { onChange } = props
  const [city, setCity] = useState<OptionProps | null>(null)
  const [address, setAddress] = useState<LocationType | null>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [districts, setDistricts] = useState<OptionProps[]>([])

  useEffect(() => {
    if (city) {
      const accessToken = Cookies.get('token')
      const url = `${SERVER_URL}/locations/cities/${city?.value}`
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
      axios
        .get(url, { headers })
        .then((response) => {
          const { success, error, data } = response.data
          if (!success) {
            throw Error(error?.message)
          }
          const dataLoad: OptionProps[] = []
          for (let i = 0; i < data.items.length; i++) {
            if (data.items[i]) {
              dataLoad.push({
                value: data.items[i].value,
                label: data.items[i].label
              })
            }
          }
          setDistricts(dataLoad)
        })
        .catch((e) => {
          showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
        })
    }
  }, [city])

  useImperativeHandle(ref, () => ({
    getAddress() {
      return address
    }
  }))

  return (
    <div className="grid-cols-2 grid gap-x-12 p-8">
      <div className="col-span-1">
        <DropdownAsync
          label="Tỉnh/Thành phố"
          urlApi="/locations/cities"
          onChange={(e) => {
            setCity(e[0])
            setDisableDistrict(false)
          }}
        />
      </div>
      <div className="col-span-1">
        <DropdownSync
          label="Quận/Huyện"
          isDisabled={disableDistrict}
          options={districts}
          isClearable={false}
          onChange={(e) => {
            if (city) {
              const newAddress = {
                label: `${e[0]?.label}, ${city?.label}`,
                value: {
                  city,
                  district: e[0]
                }
              }
              onChange && onChange(newAddress)
              setAddress(newAddress)
            }
          }}
        />
      </div>
    </div>
  )
})
