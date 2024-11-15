import { User, Settings, ImageIcon, ComponentIcon, Upload } from 'lucide-react'
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
        url: '/docs/install',
      },
    ],
  },
  {
    label: 'Components',
    icon: <ComponentIcon />,
    items: [
      {
        title: '文件列表',
        url: '/docs/file-list',
        icon: <ImageIcon />,
      },
      {
        title: '图片列表',
        url: '/docs/image-list',
        icon: <ImageIcon />,
      },
      {
        title: '头像上传',
        url: '/docs/avatar-upload',
        icon: <User />,
      },
      {
        title: '第三方上传组件',
        url: '/docs/third-component',
        icon: <Upload />,
      },
    ],
  },
]
