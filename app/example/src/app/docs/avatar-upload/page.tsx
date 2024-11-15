import { getSignedUrl } from '@/app/action'
import { AvatarChoose } from '@/components/AvatarChoose'
import { UploadAvatar } from '@/components/upload/upload'

export default function AvatarUploadPage() {
  return (
    <div>
      <div className='mt-2'>
        <h2>单图片上传</h2>
        <div className='p-5'>
          <UploadAvatar getSignedParams={getSignedUrl} />
        </div>
      </div>

      <div className='mt-2'>
        <h2>头像上传</h2>
        <div className='p-5'>
          <AvatarChoose />
        </div>
      </div>
    </div>
  )
}
