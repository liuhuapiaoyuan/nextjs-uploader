import type { PresignedAdapter } from '@/interface'
import { createPresignedPost as AWZCreatePresignedPost } from '@aws-sdk/s3-presigned-post'

export const createPresignedPost: PresignedAdapter = async (...params) => {
  const result = await AWZCreatePresignedPost(...params)
  const fields: Record<string, string> = {}
  for (const key in result.fields) {
    fields[key.replace('Amz', 'cos')] = result.fields[key]
  }
  return { ...result, fields }
}
