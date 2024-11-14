'use client'
import {
  InputHTMLAttributes,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react'

function loadDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
  })
}
export type UploadButtonType = {
  name?: string
  defaultValue?: string
  uploadFile: (file: File) => Promise<string>
}

export function UploadButton(props: UploadButtonType) {
  const { uploadFile } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState<string | undefined>(props.defaultValue)
  const [pending, startTransition] = useTransition()
  const [state, addState] = useOptimistic<string | undefined, string>(
    url,
    (_, newUrl) => newUrl,
  )

  const onUpload: InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
    startTransition(async () => {
      const file = e.target.files?.[0]
      if (!file) return
      if (uploadRef.current) {
        uploadRef.current.value = ''
      }
      const url = await loadDataUrl(file)
      addState(url)
      const newUrl = await uploadFile(file) // 服务端完成文件保存
      setUrl(newUrl)
      if (inputRef.current) {
        inputRef.current.value = newUrl
      }
    })
  }
  return (
    <>
      <input
        defaultValue={props.defaultValue}
        ref={inputRef}
        type='hidden'
        name={props.name}
      />
      <label className='flex '>
        <input
          ref={uploadRef}
          type='file'
          accept='image/*'
          className='hidden peer'
          disabled={pending}
          onChange={onUpload}
        />
        <div className='bg-slate-500 text-white p-2 hover:bg-slate-400 peer-disabled:bg-gray-300'>
          {pending ? '上传中...' : '上传图片'}
        </div>
      </label>
      {state && (
        <div className='group w-20 h-20  relative ' data-loading={pending}>
          <div className='absolute inset-0 z-999 bg-black/50   group-data-[loading=true]:flex items-center justify-center hidden'>
            <span>上传中...</span>
          </div>
          <div
            className='w-20 h-20 bg-contain bg-no-repeat bg-center'
            style={{
              backgroundImage: `url(${state})`,
            }}
          ></div>
        </div>
      )}
    </>
  )
}
