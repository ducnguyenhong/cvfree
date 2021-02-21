import ImgSampleCv1 from 'assets/images/img-sample-cv-1.png'

const SampleCV: React.FC = () => {
  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 pt-20 bg-gray-100">
        <div className="text-center mb-20">
          <span className="uppercase text-3xl font-semibold">Danh sách các mẫu CV</span>
        </div>
        <div className="grid grid-cols-3 gap-20 px-40">
          {[1, 2, 3, 4, 5, 6].map((item: number, index: number) => {
            return (
              <div
                className="relative col-span-1 shadow-md cursor-pointer hover:shadow-xl duration-300"
                key={JSON.stringify(index)}
              >
                <img src={ImgSampleCv1} alt="sample cv" className="top-0 left-0 w-full" style={{ zIndex: 5 }} />
                <div className="absolute top-0 left-0 " style={{ zIndex: 6 }}>
                  <span>Sử dụng</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SampleCV
