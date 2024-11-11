import { UploadCloud, Inbox, Settings, ComponentIcon, Cpu } from 'lucide-react'
import { ReactNode } from 'react'

export type MenuGroupType = {
  label: string
  icon?: ReactNode
  items: Array<{
    title: string
    url: string
    icon?: ReactNode
  }>
}
export const MenuGroups: MenuGroupType[] = [
  {
    label: 'Getting Started',
    icon: <Settings />,
    items: [
      {
        title: 'Installation',
        url: '#',
        icon: <Cpu />,
      },
    ],
  },
  {
    label: 'Components',
    icon: <ComponentIcon />,
    items: [
      {
        title: '标准上传',
        url: '/docs',
        icon: <UploadCloud />,
      },
      {
        title: '图片列表',
        url: '/docs/image-list',
        icon: <Settings />,
      },
      {
        title: '头像上传',
        url: '/docs/avatar-upload',
        icon: <Inbox />,
      },
      {
        title: '配合Shadcn/ui',
        url: '/docs/with-shadcn',
        icon: <Inbox />,
      },
    ],
  },
]
