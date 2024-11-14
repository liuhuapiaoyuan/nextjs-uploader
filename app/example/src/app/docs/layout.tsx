import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSide } from './AppSide'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-full'>
      <SidebarProvider className='min-h-[100%]'>
        <AppSide />
        <main className='relative flex min-h-[100%] flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow '>
          <div className=' sticky  top-14 p-2  backdrop-blur'>
            <SidebarTrigger />
          </div>
          <div className='p-5'>{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}
