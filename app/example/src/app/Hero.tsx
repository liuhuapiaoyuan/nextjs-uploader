'use client'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { useToast } from '@/hooks/use-toast'
import { CloudUpload, Copy } from 'lucide-react'
import { BackgroundLines } from '@/components/ui/background-lines'

const words = [
  {
    text: '快速',
  },
  {
    text: '集成',
  },
  {
    text: 'S3',
    className: 'text-green-500 dark:text-green-500',
  },
  {
    text: '上传',
  },
  {
    text: '组件',
  },
  {
    text: 'Nextjs15',
    className: 'text-blue-500 dark:text-blue-500',
  },
]
export function Hero() {
  const { toast } = useToast()

  return (
    <BackgroundLines className='flex items-center justify-center w-full flex-col px-4'>
      <p className='text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  flex'>
        <CloudUpload />
        支持所有兼容S3协议的云存储
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4'>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText('npm install nextjs-uploader')
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
          <div className='relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 '>
            <span>npm install nextjs-uploader</span>
            <Copy size={12} />
          </div>
          <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
        </button>
      </div>
    </BackgroundLines>
  )
}
