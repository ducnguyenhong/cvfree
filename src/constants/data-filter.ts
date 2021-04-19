import { OptionProps } from 'app/partials/pr-dropdown'

export const dataOptionActive: OptionProps[] = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' }
]

export const dataOptionUserVerify: OptionProps[] = [
  { value: 'true', label: 'Verified' },
  { value: 'false', label: 'Not verify' }
]

export const dataOptionUserType: OptionProps[] = [
  { value: 'USER', label: 'Candidate' },
  { value: 'EMPLOYER', label: 'Employer' },
  { value: 'ADMIN', label: 'Admin' }
]
