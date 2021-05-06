import moment from 'moment'
export interface DropdownProps {
  label: string
  value: string
}

export const DataFormOfWork: DropdownProps[] = [
  {
    value: 'FULLTIME',
    label: 'Toàn thời gian (Full time)'
  },
  {
    value: 'PARTTIME',
    label: 'Bán thời gian (Part time)'
  }
]

export const DataRecruitmentPosition: DropdownProps[] = [
  {
    value: 'INTERNS',
    label: 'Thực tập sinh'
  },
  {
    value: 'STAFF',
    label: 'Nhân viên'
  },
  {
    value: 'LEADER',
    label: 'Trưởng nhóm (Leader)'
  },
  {
    value: 'DEPUTY',
    label: 'Phó phòng'
  },
  {
    value: 'MANAGER',
    label: 'Trưởng phòng'
  },
  {
    value: 'VICE_PRESIDENT',
    label: 'Phó giám đốc'
  },
  {
    value: 'GENERAL_MANAGER',
    label: 'Tổng giám đốc'
  }
]

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
    value: 'NO',
    label: 'Không yêu cầu'
  }
]

export const DataCareer: DropdownProps[] = [
  {
    value: '1',
    label: 'Bán hàng'
  },
  {
    value: '2',
    label: 'Báo chí'
  },
  {
    value: '3',
    label: 'Bảo hiểm'
  },
  {
    value: '4',
    label: 'Bất động sản'
  },
  {
    value: '5',
    label: 'Cơ khí'
  },
  {
    value: '6',
    label: 'Công nghệ thông tin'
  },
  {
    value: '7',
    label: 'Du lịch'
  },
  {
    value: '8',
    label: 'Dệt may'
  },
  {
    value: '9',
    label: 'Điện tử'
  },
  {
    value: '10',
    label: 'Giáo dục'
  },
  {
    value: '11',
    label: 'Hàng hải'
  },
  {
    value: '12',
    label: 'Hàng không'
  },
  {
    value: '13',
    label: 'Hành chính'
  },
  {
    value: '14',
    label: 'Kế toán'
  },
  {
    value: '15',
    label: 'Kiến trúc'
  },
  {
    value: '16',
    label: 'Marketing'
  },
  {
    value: '17',
    label: 'Mỹ phẩm - Thời trang'
  },
  {
    value: '18',
    label: 'Ngân hàng'
  },
  {
    value: '19',
    label: 'Nhà hàng'
  },
  {
    value: '20',
    label: 'Pháp luật'
  },
  {
    value: '21',
    label: 'Thiết kế đồ họa'
  },
  {
    value: '22',
    label: 'Thực phẩm'
  },
  {
    value: '23',
    label: 'Y tế'
  },
  {
    value: '24',
    label: 'Kinh doanh'
  },
  {
    value: '25',
    label: 'Ngành nghề khác'
  }
]

export const DataExperience: DropdownProps[] = [
  {
    value: '1',
    label: 'Đã có'
  },
  {
    value: '0',
    label: 'Chưa có'
  }
]

export const DataAnother: DropdownProps[] = [
  {
    value: 'BASIC_SKILL',
    label: 'Có kỹ năng cá nhân'
  },
  {
    value: 'ADVANCED_SKILL',
    label: 'Có kỹ năng chuyên môn'
  },
  {
    value: 'ACTIVITY',
    label: 'Từng tham gia các hoạt động'
  },
  {
    value: 'AWARD',
    label: 'Từng đạt giải thưởng'
  },
  {
    value: 'CERTIFICATE',
    label: 'Có chứng chỉ'
  }
]

export const DataCurrency: DropdownProps[] = [
  {
    value: 'VND',
    label: 'VND'
  },
  {
    value: 'USD',
    label: 'USD'
  }
]

export const DataSalaryType: DropdownProps[] = [
  {
    value: 'FROM_TO',
    label: 'Chi tiết'
  },
  {
    value: 'AGREE',
    label: 'Thỏa thuận'
  }
]

export const DataPersonnelSize: DropdownProps[] = [
  {
    value: '1 - 50',
    label: '1 - 50'
  },
  {
    value: '50 - 100',
    label: '50 - 100'
  },
  {
    value: '100 - 200',
    label: '100 - 200'
  },
  {
    value: '200 - 500',
    label: '200 - 500'
  },
  {
    value: '500 - 1000',
    label: '500 - 1000'
  },
  {
    value: '> 1000',
    label: '> 1000'
  }
]

export const DataYearOfBirth = (): DropdownProps[] => {
  const data: DropdownProps[] = []
  for (let i = 1970; i <= Number(moment().format('YYYY')) - 10; i++) {
    data.push({
      value: `${i}`,
      label: `${i}`
    })
  }
  return data
}
