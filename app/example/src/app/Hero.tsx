'use client'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { useToast } from '@/hooks/use-toast'
import { CloudUpload, Copy } from 'lucide-react'
import { BackgroundLines } from '@/components/ui/background-lines'
import Link from 'next/link'

const words = [
  {
    text: '快速集成',
  },
  {
    text: '腾讯云',
    className: 'text-green-500 ',
  },
  {
    text: '阿里云',
    className: 'text-[#ff6a00] ',
  },
  {
    text: '华为云',
    className: 'text-[#e60012] ',
  },
  {
    text: '七牛云',
    className: 'text-[#07beff] ',
  },
  {
    text: '云存储',
  },
]
export function Hero() {
  const { toast } = useToast()

  return (
    <BackgroundLines className='flex items-center justify-center w-full flex-col px-4'>
      <p className=' text-base   flex'>
        <CloudUpload />
        让你的`Nextjs`快速集成上传能力,兼容所有`S3`协议云存储
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4'>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText('npm install @nextjs-uploader/s3')
              .then(() => {
                toast({
                  title: '复制成功',
                })
              })
          }}
          className='bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block'
        >
          <span className='absolute inset-0 overflow-hidden rounded-full'>
            <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
          </span>
          <div className='relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 hover:bg-zinc-500 py-0.5 px-4 ring-1 ring-white/10 '>
            <span>npm install @nextjs-uploader/s3</span>
            <Copy size={12} />
          </div>
          <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
        </button>
        <Link href='/docs/install'>
          <button className='bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6   inline-block'>
            <span className='absolute inset-0 overflow-hidden rounded-full'>
              <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
            </span>
            <div className='relative flex space-x-2 items-center z-10 hover:bg-slate-50 rounded-full bg-white py-0.5 px-4 ring-1 ring-white/10 '>
              <span>查看文档</span>
              <svg
                fill='none'
                height='16'
                viewBox='0 0 24 24'
                width='16'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.75 8.75L14.25 12L10.75 15.25'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
              </svg>
            </div>
            <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
          </button>
        </Link>
      </div>
    </BackgroundLines>
  )
}
