import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  serverExternalPackages: ['pino-pretty'],
  sassOptions: {
    includePaths: [path.join(dirname, 'node_modules')],
  },
}

export default withPayload(nextConfig)
