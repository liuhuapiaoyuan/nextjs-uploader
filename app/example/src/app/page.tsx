import { CloudUpload } from 'lucide-react'
import { Feature } from './Feature'
import { Header } from './Header'
import { Hero } from './Hero'

export default function Page() {
  return (
    <div>
      <Header
        brand={{
          href: '/',
          text: 'NextjsUploader',
          icon: <CloudUpload />,
        }}
        menuItems={[
          {
            href: '/',
            text: 'Home',
          },
          {
            href: '/docs',
            text: 'Documentation',
          },
        ]}
        githubLink='https://github.com/liuhuapiaoyuan/nextjs-uploader'
      />
      <Hero />
      <Feature />
    </div>
  )
}
