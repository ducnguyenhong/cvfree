import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useIntl } from 'react-intl'

interface CVFUploadProps {
  ratio?: { x: number; y: number }
  getImage?: (img: File) => void
  defaultURL?: string
}

const CVFUploadImage: React.FC<CVFUploadProps> = (props) => {
  const intl = useIntl()
  const { ratio, getImage, defaultURL } = props
  const [upImg, setUpImg] = useState<string | ArrayBuffer | null>('')
  const [croppingImg, setCroppingImg] = useState<ReactCrop.Crop | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = useState<ReactCrop.Crop>({ unit: '%', width: 30, aspect: ratio ? ratio.x / ratio.y : 1 / 1 })
  const [completedCrop, setCompletedCrop] = useState<ReactCrop.Crop | null>(null)
  const modalRef = useRef<PrModalRefProps>(null)

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader: FileReader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
      modalRef && modalRef.current && modalRef.current.show()
    }
  }, [])

  const onHideModal = useCallback(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.hide()
    }
  }, [])

  const onChangeModal = useCallback(() => {
    setCompletedCrop(croppingImg)
    if (modalRef && modalRef.current) {
      modalRef.current.hide()
    }
  }, [croppingImg])

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image: HTMLImageElement | null = imgRef.current
    defaultURL && (image.src = defaultURL)
    const canvas: HTMLCanvasElement = previewCanvasRef.current
    const crop: ReactCrop.Crop = completedCrop
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    if (typeof crop.width !== 'undefined' && typeof crop.height !== 'undefined') {
      canvas.width = crop.width * pixelRatio
      canvas.height = crop.height * pixelRatio
    }

    if (ctx !== null) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.imageSmoothingQuality = 'high'
      if (
        typeof crop.x !== 'undefined' &&
        typeof crop.y !== 'undefined' &&
        typeof crop.width !== 'undefined' &&
        typeof crop.height !== 'undefined'
      ) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        )
      }
    }

    const img = new Image()
    img.src = canvas.toDataURL()
    const url = canvas.toDataURL()
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'avatar', { type: 'image/png' })
        getImage && getImage(file)
      })
  }, [completedCrop])

  return (
    <div>
      <div className="relative w-full bg-white rounded-full overflow-hidden" style={{ paddingTop: '100%' }}>
        <div className="absolute inset-0 flex justify-center items-center">
          <label className="inline-block cursor-pointer" title="Chọn ảnh từ thiết bị">
            {!completedCrop && <i className="fas fa-camera text-7xl text-gray-500 duration-300 hover:text-gray-600" />}
            {completedCrop && <canvas className="w-full" ref={previewCanvasRef} />}
            <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
          </label>
        </div>
      </div>
      <PrModal
        ref={modalRef}
        title={
          <div className="flex items-center">
            <i className="fas fa-crop-alt mr-3" />
            <span className="uppercase">{intl.formatMessage({ id: 'PR_UPLOAD_CROP.CROP_IMAGE' })}</span>
          </div>
        }
        size="nm"
        onHide={onHideModal}
        onChange={onChangeModal}
        okTitle={intl.formatMessage({ id: 'PR_UPLOAD_CROP.OK' })}
        cancelTitle={intl.formatMessage({ id: 'PR_UPLOAD_CROP.CANCEL' })}
      >
        <div className="pb-5">
          <span className="text-lg block text-center italic text-blue-700 font-medium mb-10 mt-5">
            {intl.formatMessage({ id: 'PR_UPLOAD_CROP.NOTE' })}
          </span>
          <div className="w-80 mx-auto">
            <ReactCrop
              src={`${upImg}`}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCroppingImg(c)}
            />
          </div>
        </div>
      </PrModal>
    </div>
  )
}

export default CVFUploadImage
