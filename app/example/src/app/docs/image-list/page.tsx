'use client'
import { UploadImages } from '@/components/upload/upload'
import { buildFileUploadService } from '../lib'
import { getSignedUrl } from '@/app/action'

export default function ImageListPage() {
  return (
    <div className='mt-2'>
      <h2>图片列表</h2>
      <div className='p-5'>
        <UploadImages
          fileUploadService={buildFileUploadService(getSignedUrl)}
        />
      </div>
    </div>
  )
}
