import type { PresignedAdapter, S3Cofnig } from '../interface'

import { createPresignedPost as awz } from './awz'
import { createPresignedPost as cos } from './cos'
import { createPresignedPost as oss } from './oss'
import { createPresignedPost as uss } from './uss'
import { createPresignedPost as obs } from './obs'
import { createPresignedPost as kodo } from './kodo'

/**
 * PresignedAdapterProviders is a map of all the presigned adapters available for each provider.
 */
export const PresignedAdapterProviders: Record<
  S3Cofnig['provider'],
  PresignedAdapter
> = {
  kodo,
  awz,
  oss,
  uss,
  obs,
  cos,
}
