import PrInput from 'app/partials/pr-input'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import { DataFormOfWork, DataRecruitmentPosition, DataGender, DataRecruitmentProfession } from 'constants/data-employer'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export const EmployerCreateJobPostings: React.FC = () => {
  const [timeToApply, setTimeToApply] = useState<any>(new Date())

  return (
    <div className="bg-green-100 w-2/3 py-40 px-10 mx-auto">
      <span className="uppercase text-2xl font-semibold block text-center">Đăng tin tuyển dụng mới</span>
      <div className="mt-10">
        <span className="block text-lg font-semibold uppercase">1. Thông tin cơ bản</span>
        <div className="mt-5">
          <PrInput label="Tên công việc" icon="fas fa-address-card" required />
        </div>
        <div className="mt-5">
          <PrInput label="Địa chỉ làm việc" icon="fas fa-map-marker-alt" required />
        </div>
        <div className="mt-5">
          <PrDropdown
            required
            // ref={genderRef}
            options={DataRecruitmentProfession}
            label="Ngành nghề"
            isMulti
            labelClassName="text-green-700 font-semibold"
          />
        </div>
        <div className="mt-5 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <span className="block">Hạn nộp hồ sơ</span>
            <div className="w-full">
              <DatePicker className="w-96 h-9 px-4" selected={timeToApply} onChange={(e) => setTimeToApply(e)} />
            </div>
          </div>
          <div className="col-span-1">
            <PrInput label="Mức lương" icon="fas fa-coins" required />
          </div>
        </div>
        <div className="mt-5 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              required
              // ref={genderRef}
              options={DataFormOfWork}
              label="Hình thức làm việc"
              isMulti
              labelClassName="text-green-700 font-semibold"
            />
          </div>
          <div className="col-span-1">
            <PrInput label="Số lượng cần tuyển (người)" icon="fas fa-coins" required />
          </div>
        </div>
        <div className="mt-5 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              required
              // ref={genderRef}
              options={DataRecruitmentPosition}
              label="Vị trí cần tuyển dụng"
              labelClassName="text-green-700 font-semibold"
            />
          </div>
          <div className="col-span-1">
            <PrDropdown
              required
              // ref={genderRef}
              options={DataGender}
              label="Yêu cầu giới tính"
              labelClassName="text-green-700 font-semibold"
            />
          </div>
        </div>

        <span className="block text-lg font-semibold uppercase mt-10">2. Mô tả công việc</span>
        <div className="mt-5">
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
        <span className="block text-lg font-semibold uppercase mt-10">3. Yêu cầu ứng viên</span>
        <div className="mt-5">
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
        <span className="block text-lg font-semibold uppercase mt-10">4. Quyền lợi được hưởng</span>
        <div className="mt-5">
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
