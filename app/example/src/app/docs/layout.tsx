import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { MenuGroups } from './menus'

import Link from 'next/link'
import { Header } from '../Header'
import { CloudUpload } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-svh'>
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
      <SidebarProvider className='min-h-[100%]'>
        <Sidebar collapsible='icon'>
          <SidebarHeader className='h-20'>文档</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu className='gap-2'>
                {MenuGroups.map((group) => (
                  <SidebarMenuItem key={group.label}>
                    <SidebarMenuButton asChild>
                      <Link href={group.items?.[0]?.url}>
                        {group.icon}
                        {group.label}
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                      {group.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <main className='relative flex min-h-[100%] flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow p-5'>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
