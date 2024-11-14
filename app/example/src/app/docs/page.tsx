import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/docs/install')
  return null
}
