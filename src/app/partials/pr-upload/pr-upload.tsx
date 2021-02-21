import { useState, useCallback, useRef, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import axios from 'axios'
import CirclePlusIcon from 'assets/icons/circle-plus'
import Logo from 'assets/images/logo.png'

interface Props {
  ratio?: {
    x: number
    y: number
  }
  getImage?: (img: any) => void
}

const generateDownload = (canvas: any, crop: any) => {
  if (!crop || !canvas) {
    return
  }

  canvas.toBlob(
    (blob: any) => {
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1
  )
}

const CVFUploadImage: React.FC<Props> = (props) => {
  const { ratio, getImage } = props
  const [upImg, setUpImg] = useState<any>()
  const [finalImg, setFinalImg] = useState<any>()
  const imgRef = useRef(null)
  const previewCanvasRef = useRef<any>(null)
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: ratio ? ratio.x / ratio.y : 1 / 1 })
  const [completedCrop, setCompletedCrop] = useState<any>(null)
  const modalRef = useRef<PrModalRefProps>(null)

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader: any = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
    console.log('modalRef', modalRef)

    if (modalRef && modalRef.current && modalRef.current.show) {
      modalRef.current.show()
    }
  }

  const onHideModal = () => {
    if (modalRef && modalRef.current && modalRef.current.hide) {
      modalRef.current.hide()
    }
  }

  const onChangeModal = () => {
    if (modalRef && modalRef.current && modalRef.current.hide) {
      modalRef.current.hide()
    }
    const canvas: any = previewCanvasRef.current
    // const img = canvas.toBlob(function (blob: any) {
    //   saveAs(blob, 'pretty-image.png')
    // })
    const img = new Image()
    // img.src = canvas.toDataURL()
    setFinalImg(canvas.toDataURL())
    // const url = canvas.toDataURL()
    // fetch(url)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     const file = new File([blob], 'avatar', { type: 'image/png' })
    //     uploadServer(file)
    //   })

    // getImage && getImage(img)
  }

  const uploadServer = async (img: any) => {
    const formData = new FormData()
    formData.append('avatar', img)
    axios.post('http://localhost:1234/courses/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // const client = new ftp.Client()
    // client.ftp.verbose = true
    // try {
    //   await client.access({
    //     host: 'ftpupload.net',
    //     user: 'epiz_27759647',
    //     password: 'TklEYhN5zz5i4pe',
    //     secure: true
    //   })
    //   console.log(await client.list())
    //   await client.uploadFrom('data.png', img)
    //   // await client.downloadTo("README_COPY.md", "README_FTP.md")
    // } catch (err) {
    //   console.log(err)
    // }
    // client.close()
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image: any = imgRef.current
    const canvas: any = previewCanvasRef.current
    const crop: any = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

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
  }, [completedCrop])

  console.log('completedCrop', completedCrop)

  return (
    <>
      <div className="relative w-full bg-white rounded-full overflow-hidden" style={{ paddingTop: '100%' }}>
        <div className="absolute inset-0 flex justify-center items-center">
          <label className="inline-block cursor-pointer">
            {!completedCrop && <CirclePlusIcon width={60} height={60} className="text-green-600" />}
            {/* {!completedCrop && <img src={Logo} alt="default avatar" className="w-full" />} */}
            {completedCrop && <canvas className="w-full" ref={previewCanvasRef} />}
            <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
          </label>
        </div>
      </div>
      <PrModal ref={modalRef} title="This is modal title" size="nm" onHide={onHideModal} onChange={onChangeModal}>
        <div>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => {
              setCompletedCrop(c)
            }}
          />
          <div>
            {/* <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0)
              }}
            /> */}
          </div>
          <button
            type="button"
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
          >
            Download cropped image
          </button>
        </div>
      </PrModal>
    </>
  )
}

export default CVFUploadImage
