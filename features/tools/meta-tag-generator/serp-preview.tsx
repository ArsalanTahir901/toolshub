interface SerpPreviewProps {
    title: string
    description: string
    url: string
}

const SerpPreview = ({ title, description, url }: SerpPreviewProps) => {
    const displayTitle = title || 'Page Title'
    const displayDescription = description || 'Your meta description will appear here. Make it compelling to improve click-through rates from search results.'
    const displayUrl = url || 'https://yoursite.com/page'

    // Format URL for breadcrumb display
    const formatBreadcrumb = (rawUrl: string) => {
        try {
            const parsed = new URL(rawUrl)
            const parts = [parsed.hostname, ...parsed.pathname.split('/').filter(Boolean)]
            return parts.join(' › ')
        } catch {
            return rawUrl
        }
    }

    // Truncate text like Google does
    const truncate = (text: string, max: number) =>
        text.length > max ? text.slice(0, max - 1) + '…' : text

    return (
        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4'>
            <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                SERP Preview
            </p>

            {/* Google-style result */}
            <div className='space-y-1 font-[Arial,sans-serif]'>
                {/* Favicon + URL breadcrumb */}
                <div className='flex items-center gap-2'>
                    <span className='text-xs text-zinc-400'>{formatBreadcrumb(displayUrl)}</span>
                </div>

                {/* Title */}
                <p
                    className='cursor-pointer text-lg leading-tight text-[#1a0dab] hover:underline dark:text-[#8ab4f8]'
                    style={{ fontFamily: 'Arial, sans-serif' }}
                >
                    {truncate(displayTitle, 60)}
                </p>

                {/* Description */}
                <p
                    className='text-sm leading-snug text-zinc-400'
                    style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}
                >
                    {truncate(displayDescription, 160)}
                </p>
            </div>

            {/* Mobile preview */}
            <div className='mt-4 border-t border-zinc-800 pt-4'>
                <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                    Mobile SERP
                </p>
                <div
                    className='mx-auto max-w-[320px] space-y-1 rounded-lg bg-white px-3 py-2 dark:bg-zinc-900'
                    style={{ fontFamily: 'Arial, sans-serif' }}
                >
                    <div className='flex items-center gap-1.5'>
                        <div className='h-3 w-3 rounded-full bg-zinc-400' />
                        <span className='text-[10px] text-zinc-500'>{formatBreadcrumb(displayUrl)}</span>
                    </div>
                    <p className='text-sm font-medium leading-tight text-[#1a0dab] dark:text-[#8ab4f8]'>
                        {truncate(displayTitle, 55)}
                    </p>
                    <p className='text-xs leading-snug text-zinc-500'>
                        {truncate(displayDescription, 120)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SerpPreview