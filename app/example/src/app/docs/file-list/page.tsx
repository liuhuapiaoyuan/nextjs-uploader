import { Upload } from '@/components/upload/upload'
import { getSignedUrl } from '../../action'

export default function FileListPage() {
  return <Upload getSignedParams={getSignedUrl} />
}
