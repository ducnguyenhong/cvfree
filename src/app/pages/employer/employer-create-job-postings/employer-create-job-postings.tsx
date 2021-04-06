import PrInput from 'app/partials/pr-input'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import { DataFormOfWork, DataRecruitmentPosition, DataGender, DataRecruitmentProfession } from 'constants/data-employer'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { BreadCrumb } from 'app/pages/bread-crumb'
import vi from 'date-fns/locale/vi'
import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'

export const EmployerCreateJobPostings: React.FC = () => {
  const [timeToApply, setTimeToApply] = useState<any>(new Date())
  const [city, setCity] = useState<OptionProps | null>(null)
  const [district, setDistrict] = useState<OptionProps | null>(null)
  const [address, setAddress] = useState<{ value: string[]; label: string } | null>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)

  return (
    <div className="w-2/3 py-32 mx-auto">
      <BreadCrumb title="Đăng tin tuyển dụng mới" />
      <div className="mt-10 bg-blue-50 px-16 py-10 shadow rounded">
        <span className="block text-lg font-semibold uppercase">1. Thông tin cơ bản</span>
        <div className="mt-8">
          <PrInput label="Tên công việc" icon="fas fa-address-card" required />
        </div>
        <div className="mt-8">
          <span className="block text-green-700 font-semibold">
            Địa chỉ làm việc<span className="text-red-500 ml-1">*</span>
          </span>
          <div className="grid-cols-2 grid gap-x-12 pl-10 mt-2">
            <DropdownAsync
              label="Tỉnh/Thành phố"
              urlApi="/locations/cities"
              onChange={(e) => {
                setCity(e[0])
                setDisableDistrict(false)
              }}
            />
            <DropdownAsync
              label="Quận/Huyện"
              isDisabled={disableDistrict}
              urlApi={`/locations/cities/${city?.value}`}
              onChange={(e) => {
                setDistrict(e[0])
              }}
            />
          </div>
        </div>
        <div className="mt-8">
          <PrDropdown
            required
            // ref={genderRef}
            options={DataRecruitmentProfession}
            label="Ngành nghề"
            isMulti
            labelClassName="text-green-700 font-semibold"
          />
        </div>
        <div className="mt-8 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              required
              // ref={genderRef}
              options={DataRecruitmentPosition}
              label="Vị trí cần tuyển dụng"
              isMulti
              labelClassName="text-green-700 font-semibold"
            />
          </div>
          <div className="col-span-1">
            <span className="block text-green-700 font-semibold mb-1">Hạn nộp hồ sơ</span>
            <div className="border border-gray-300 rounded overflow-hidden">
              <DatePicker
                wrapperClassName="w-full"
                className="w-full h-9 px-4"
                selected={timeToApply}
                onChange={(e) => setTimeToApply(e)}
                popperPlacement="auto"
                locale={vi}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              required
              // ref={genderRef}
              options={DataFormOfWork}
              label="Hình thức làm việc"
              isClearable={false}
              isMulti
              labelClassName="text-green-700 font-semibold"
            />
          </div>
          <div className="col-span-1">
            <PrInput label="Số lượng cần tuyển (người)" icon="fas fa-users" required />
          </div>
        </div>
        <div className="mt-8 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              // ref={genderRef}
              options={DataGender}
              label="Yêu cầu giới tính"
              labelClassName="text-green-700 font-semibold"
            />
          </div>
        </div>
        <div className="mt-8">
          <span className="block text-green-700 font-semibold">
            Mức lương<span className="text-red-500 ml-1">*</span>
          </span>
          <div className="grid grid-cols-3 gap-x-10 mt-2 pl-10">
            <div className="col-span-1">
              <PrInput label="Từ" icon="fas fa-coins" />
            </div>
            <div className="col-span-1">
              <PrInput label="Đến" icon="fas fa-coins" />
            </div>
            <div className="col-span-1">
              <span>hoặc</span>
              <input type="radio" />
              thỏa thuận
            </div>
          </div>
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">2. Mô tả công việc</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            initialValue="<p>Mô tả công việc</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
            //  onEditorChange={this.handleEditorChange}
          />
        </div>
        <span className="block text-lg font-semibold uppercase mt-28">3. Yêu cầu ứng viên</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            initialValue="<p>Mô tả công việc</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
            //  onEditorChange={this.handleEditorChange}
          />
        </div>
        <span className="block text-lg font-semibold uppercase mt-28">4. Quyền lợi được hưởng</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            initialValue="<p>Mô tả công việc</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
            //  onEditorChange={this.handleEditorChange}
          />
        </div>

        <div className="mt-20 text-center">
          <span className="bg-blue-500 text-white rounded px-6 py-3 uppercase text-lg font-semibold cursor-pointer">
            Đăng tin ngay
          </span>
        </div>
      </div>
    </div>
  )
}
