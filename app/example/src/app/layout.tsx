import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Header } from './Header'
import { CloudUpload } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How To Update in Nextjs',
  description: 'Learn how to update your Nextjs app in this step-by-step guide',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='h-svh '>
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
