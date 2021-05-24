interface DropdownProps {
  value: string
  label: string
}

export const DataGender: DropdownProps[] = [
  {
    value: 'MALE',
    label: 'Nam'
  },
  {
    value: 'FEMALE',
    label: 'Nữ'
  },
  {
    value: 'ANOTHER',
    label: 'Khác'
  }
]

export const DataVerify: DropdownProps[] = [
  {
    value: 'true',
    label: 'Verified'
  },
  {
    value: 'false',
    label: 'Not verify'
  }
]
