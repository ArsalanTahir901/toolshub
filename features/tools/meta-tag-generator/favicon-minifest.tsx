'use client'

interface FaviconManifestProps {
    siteName: string
    themeColor: string
    url: string
    onCopy?: (text: string) => void
}

const FaviconManifest = ({ siteName, themeColor, url, onCopy }: FaviconManifestProps) => {
    const name = siteName || 'My App'
    const color = themeColor || '#000000'
    const baseUrl = url || 'https://yoursite.com'

    const faviconTags = `<!-- Favicon Tags -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="msapplication-TileColor" content="${color}">
<meta name="theme-color" content="${color}">`

    const manifestJson = JSON.stringify(
        {
            name: name,
            short_name: name.split(' ')[0],
            description: `${name} web app`,
            start_url: '/',
            display: 'standalone',
            background_color: color,
            theme_color: color,
            orientation: 'portrait',
            scope: '/',
            lang: 'en-US',
            icons: [
                { src: '/android-icon-36x36.png', sizes: '36x36', type: 'image/png', density: '0.75' },
                { src: '/android-icon-48x48.png', sizes: '48x48', type: 'image/png', density: '1.0' },
                { src: '/android-icon-72x72.png', sizes: '72x72', type: 'image/png', density: '1.5' },
                { src: '/android-icon-96x96.png', sizes: '96x96', type: 'image/png', density: '2.0' },
                { src: '/android-icon-144x144.png', sizes: '144x144', type: 'image/png', density: '3.0' },
                { src: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png', density: '4.0' },
                { src: '/android-icon-512x512.png', sizes: '512x512', type: 'image/png' },
            ],
        },
        null,
        2
    )

    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/ms-icon-70x70.png"/>
      <square150x150logo src="/ms-icon-150x150.png"/>
      <square310x310logo src="/ms-icon-310x310.png"/>
      <TileColor>${color}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`

    const sections = [
        { label: 'Favicon HTML Tags', content: faviconTags, lang: 'html' },
        { label: 'manifest.json', content: manifestJson, lang: 'json' },
        { label: 'browserconfig.xml', content: browserConfig, lang: 'xml' },
    ]

    return (
        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                Favicon & Manifest
            </p>

            <div className='rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-400'>
                <span className='font-semibold'>Tip:</span> Use{' '}
                <a
                    href='https://realfavicongenerator.net'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:text-amber-300'
                >
                    realfavicongenerator.net
                </a>{' '}
                to generate all icon sizes from a single source image.
            </div>

            {sections.map(section => (
                <div key={section.label} className='space-y-1.5'>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs font-medium text-zinc-400'>{section.label}</p>
                        <button
                            onClick={() => onCopy?.(section.content)}
                            className='rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors'
                        >
                            Copy
                        </button>
                    </div>
                    <div className='result-box overflow-x-auto rounded-lg'>
                        <pre className='whitespace-pre-wrap break-all text-xs text-zinc-300'>
                            {section.content}
                        </pre>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FaviconManifest