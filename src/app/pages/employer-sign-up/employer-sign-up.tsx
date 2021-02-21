import PrInput from 'app/partials/pr-input'

const EmployerSignUp: React.FC = () => {
  return (
    <div className="pt-32 max-w-8xl mx-auto sm:px-6 lg:px-64 bg-cvfree">
      <div className="text-center">
        <span className="uppercase text-2xl font-semibold">Đăng ký tài khoản nhà tuyển dụng</span>
      </div>
      <div className="grid grid-cols-2 gap-20 px-32 mt-10">
        <div className="col-span-1">
          <PrInput label="Tài khoản" />
        </div>
        <div className="col-span-1">
          <PrInput label="Tài khoản" />
        </div>
        <div className="col-span-1">
          <PrInput label="Tài khoản" />
        </div>
        <div className="col-span-1">
          <PrInput label="Tài khoản" />
        </div>
        <div className="col-span-1">
          <PrInput label="Tài khoản" />
        </div>
        <div className="col-span-1">
          <PrInput label="Tài khoản" />
        </div>
      </div>
    </div>
  )
}

export default EmployerSignUp
