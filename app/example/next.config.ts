import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
}
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
export default withMDX(nextConfig)
