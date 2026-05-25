'use client'

import { Button } from "@/components/buttons"

interface NextJsMetadataExportProps {
    title: string
    description: string
    url: string
    image: string
    keywords: string
    author: string
    siteName: string
    twitterHandle: string
    themeColor: string
    robots: string
    locale: string
    type: string
    onCopy?: (text: string) => void
}

const NextJsMetadataExport = ({
    title,
    description,
    url,
    image,
    keywords,
    author,
    siteName,
    twitterHandle,
    themeColor,
    robots,
    locale,
    type,
    onCopy,
}: NextJsMetadataExportProps) => {
    const t = title || 'Page Title'
    const d = description || 'Page description'
    const u = url || 'https://yoursite.com'
    const img = image || 'https://yoursite.com/og-image.jpg'
    const k = keywords ? keywords.split(',').map(s => s.trim()).filter(Boolean) : []
    const a = author || 'Author'
    const s = siteName || 'Site Name'
    const tw = twitterHandle || '@yourhandle'
    const tc = themeColor || '#000000'
    const r = robots || 'index, follow'
    const [ri, rf] = r.split(',').map(s => s.trim())

    const keywordsStr = k.length > 0 ? `\n    keywords: ${JSON.stringify(k)},` : ''
    const authorStr = a ? `\n    authors: [{ name: '${a}' }],` : ''

    const code = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${t}',
  description: '${d}',${keywordsStr}${authorStr}
  metadataBase: new URL('${u}'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: ${ri === 'index'},
    follow: ${rf === 'follow'},
    googleBot: {
      index: ${ri === 'index'},
      follow: ${rf === 'follow'},
    },
  },
  openGraph: {
    type: '${type || 'website'}',
    url: '${u}',
    title: '${t}',
    description: '${d}',
    siteName: '${s}',
    locale: '${locale || 'en_US'}',
    images: [
      {
        url: '${img}',
        width: 1200,
        height: 630,
        alt: '${t}',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${t}',
    description: '${d}',
    creator: '${tw}',
    site: '${tw}',
    images: ['${img}'],
  },
  manifest: '/manifest.json',
  themeColor: '${tc}',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '${t}',
  },
  formatDetection: {
    telephone: false,
  },
}`

    const generateMetadataCode = `import type { Metadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  // Fetch data for dynamic metadata
  // const data = await fetch(\`https://api.example.com/\${params.id}\`)

  return {
    title: '${t}',
    description: '${d}',
    openGraph: {
      title: '${t}',
      description: '${d}',
      images: ['${img}'],
    },
  }
}`

    const layoutCode = `// app/layout.tsx — Root layout with shared metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | ${s}',
    default: '${t}',
  },
  description: '${d}',
  metadataBase: new URL('${u}'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="${(locale || 'en_US').split('_')[0]}">
      <body>{children}</body>
    </html>
  )
}`

    const tabs = [
        { label: 'Static Page', content: code },
        { label: 'Dynamic Page', content: generateMetadataCode },
        { label: 'Root Layout', content: layoutCode },
    ]

    return (
        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-4'>
            <div className='flex items-center justify-between'>
                <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                    Next.js Metadata API
                </p>
                <span className='rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500'>
                    App Router
                </span>
            </div>

            <div className='rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-2 text-xs text-sky-400'>
                These exports replace <code className='font-mono'>{'<Head>'}</code> and work with Next.js 13+ App Router. Place in <code className='font-mono'>page.tsx</code> or <code className='font-mono'>layout.tsx</code>.
            </div>

            {tabs.map(tab => (
                <div key={tab.label} className='space-y-1.5'>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs font-medium text-zinc-400 m-0!'>{tab.label}</p>
                        <Button
                            onClick={() => onCopy?.(tab.content)}
                            className='px-2! py-1! text-xs'
                        >
                            Copy
                        </Button>
                    </div>
                    <div className='result-box overflow-x-auto rounded-lg'>
                        <pre className='whitespace-pre-wrap break-all text-xs text-zinc-300'>
                            {tab.content}
                        </pre>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NextJsMetadataExport