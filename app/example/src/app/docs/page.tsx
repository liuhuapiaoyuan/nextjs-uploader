'use client'
import { Upload } from '@/components/upload/upload'
import { getSignedUrl } from '../action'
export default function Page() {
  return (
    <div className='p-2'>
      <div className='mt-2'>
        <h2>上传组件</h2>
        <div className='p-5'>
          <Upload getSignedParams={getSignedUrl} />
        </div>
      </div>
    </div>
  )
}
