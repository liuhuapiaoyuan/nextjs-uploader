import React from 'react'
import { useId } from 'react'

export function Feature() {
  return (
    <div className='py-20 lg:py-40'>
      <div className='grid p-10 md:p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto'>
        {grid.map((feature) => (
          <div
            key={feature.title}
            className='relative border hover:shadow cursor-pointer bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden'
          >
            <Grid size={20} />
            <p className='text-base font-bold text-neutral-800 dark:text-white relative z-20'>
              {feature.title}
            </p>
            <p className='text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const grid = [
  {
    title: 'S3协议兼容支持',
    description:
      'Amazon Simple Storage Service（Amazon S3）是一项对象存储服务，在可扩展性、数据可用性、安全性和能效方面业界领先',
  },
  {
    title: '腾讯云COS',
    description:
      '腾讯云 COS 的存储桶空间无容量上限,无需分区管理,适用于 CDN 数据分发、数据万象处理或大数据计算与分析的数据湖等多种场景,更多详情进官网了解',
  },
  {
    title: '阿里云OSS',
    description:
      '阿里云对象存储 OSS（Object Storage Service）是一款海量、安全、低成本、高可靠的云存储服务，提供最高可达 99.995 % 的服务可用性。多种存储类型供选择，全面优化存储成本。',
  },
  {
    title: '七牛云存储',
    description:
      '七牛云海量存储系统（Kodo）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。 平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。',
  },
  {
    title: '华为云OBS',
    description:
      '对象存储服务（Object Storage Service，OBS）提供海量、安全、高可靠、低成本的数据存储能力，可供用户存储任意类型和大小的数据。适合企业备份/归档、视频点播、视频监控等多种数据存储场景。',
  },
  {
    title: '又拍云存储',
    description:
      '又拍云存储（ UPYUN Storage Service，简称 USS），是面向非结构化数据的对象存储服务，具有使用简单、高稳定、高安全等特点，满足大数据、人工智能、物联网背景下的数据传输、处理、存储、分发与容灾需求。',
  },
]

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: Array<[number, number]>
  size?: number
}) => {
  const p: Array<[number, number]> = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ]
  return (
    <div className='pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]'>
      <div className='absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100'>
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x='-12'
          y='4'
          squares={p}
          className='absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10'
        />
      </div>
    </div>
  )
}

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,

  ...props
}: {
  className: string
  width: number
  height: number
  x: string
  y: string
  squares?: Array<[number, number]>
}) {
  const patternId = useId()

  return (
    <svg aria-hidden='true' {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill='none' />
        </pattern>
      </defs>
      <rect
        width='100%'
        height='100%'
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth='0'
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
