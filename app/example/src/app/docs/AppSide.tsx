'use client'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
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
import { usePathname } from 'next/navigation'

export function AppSide() {
  const pathname = usePathname()
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='h-20'>文档</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {MenuGroups.map((group) => (
              <SidebarMenuItem key={group.label}>
                <SidebarMenuButton asChild>
                  <Link scroll={false} href={group.items?.[0]?.url}>
                    {group.icon}
                    {group.label}
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
                  {group.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link scroll={false} href={item.url}>
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
  )
}
