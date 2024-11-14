import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

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
        {children}
        <Toaster />
      </body>
    </html>
  )
}
