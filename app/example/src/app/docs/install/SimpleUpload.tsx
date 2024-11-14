'use client'
import { Input } from '@/components/ui/input'
import { getSignedUrl } from '../../action'
import { useState } from 'react'

const uploadFile = async (file: File) => {
  const { url, formData, link } = await getSignedUrl(file.name)
  formData.append('file', file)
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  if (response.ok) {
    console.log('upload success', link)
    return link
  } else {
    console.error('upload failed', response.statusText)
    throw new Error(response.statusText)
  }
}

export function SimpleUpload() {
  // 定义状态：0：未上传，1：上传中，2：上传成功，3：上传失败
  const [state, setState] = useState(0)
  const [link, setLink] = useState('')

  const handleUpload = async (file: File) => {
    setState(1)
    try {
      const link = await uploadFile(file)
      setState(2)
      setLink(link)
    } catch (error) {
      setState(3)
      console.error(error)
    }
  }
  return (
    <div>
      <Input
        type='file'
        accept='.jpg,.jpeg,.png,.gif'
        onChange={(e) => {
          if (e.target?.files?.[0]) {
            e.preventDefault()
            handleUpload(e.target.files[0])
          }
        }}
      />
      <div>
        {state === 0 && '未上传'}
        {state === 1 && '上传中...'}
        {state === 2 && (
          <div>
            上传成功：
            <a target='_blank' href={link}>
              {link}
            </a>
          </div>
        )}
        {state === 3 && '上传失败'}
      </div>
    </div>
  )
}
