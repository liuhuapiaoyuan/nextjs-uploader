import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Header } from './Header'
import { CloudUpload } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How To Upload File in Nextjs',
  description: 'This is a tutorial on how to upload file in Nextjs',
  keywords: 'nextjs, upload, file, nextjs-uploader',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='min-h-svh '>
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
        {children}
        <Toaster />
      </body>
    </html>
  )
}
