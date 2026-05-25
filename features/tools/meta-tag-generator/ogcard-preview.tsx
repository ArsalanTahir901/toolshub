'use client'

import { Tab } from '@/components/tab'
import { useState } from 'react'

interface OgCardPreviewProps {
    title: string
    description: string
    url: string
    image: string
    siteName: string
}

type Platform = 'twitter' | 'facebook' | 'linkedin'


const ImagePreview = ({ src }: { src: string }) => {
    return (
        <img
            src={src}
            alt='OG preview'
            className='aspect-1200/630 w-full object-cover'
            onError={(e) => {
                e.currentTarget.style.display = 'none'
            }}
        />
    )
}

const OgCardPreview = ({ title, description, url, image, siteName }: OgCardPreviewProps) => {
    const [platform, setPlatform] = useState<Platform>('twitter')

    const displayTitle = title || 'Page Title'
    const displayDescription = description || 'Your page description will appear here when shared on social media.'
    const displayImage = image || null
    const displaySite = siteName || (url ? new URL(url.startsWith('http') ? url : 'https://' + url).hostname : 'yoursite.com')

    const platforms: { value: Platform; label: string }[] = [
        { value: 'twitter', label: 'Twitter / X' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'linkedin', label: 'LinkedIn' },
    ]

    return (
        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4'>
            <div className='mb-3 flex items-center justify-between'>
                <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500'>
                    OG Card Preview
                </p>

                <Tab data={platforms} activeVal={platform} onClick={(val) => setPlatform(val as Platform)} />
            </div>

            {/* Twitter Card */}
            {platform === 'twitter' && (
                <div className='overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900' style={{ maxWidth: '504px' }}>
                    {displayImage ? (
                        <ImagePreview src={displayImage} />
                    ) : (
                        <div className='flex aspect-1200/630 w-full items-center justify-center bg-zinc-800 text-zinc-600 text-sm'>
                            No image set
                        </div>
                    )}
                    <div className='p-3'>
                        <p className='text-xs text-zinc-500'>{displaySite}</p>
                        <p className='mt-0.5 truncate font-semibold text-zinc-100'>{displayTitle}</p>
                        <p className='mt-0.5 line-clamp-2 text-sm text-zinc-400'>{displayDescription}</p>
                    </div>
                </div>
            )}

            {/* Facebook Card */}
            {platform === 'facebook' && (
                <div className='overflow-hidden border border-zinc-700 bg-zinc-900' style={{ maxWidth: '527px' }}>
                    {displayImage ? (
                        <ImagePreview src={displayImage} />
                    ) : (
                        <div className='flex aspect-1200/630 w-full items-center justify-center bg-zinc-800 text-zinc-600 text-sm'>
                            No image set
                        </div>
                    )}
                    <div className='border-t border-zinc-700 bg-zinc-800/50 px-3 py-2'>
                        <p className='text-xs uppercase tracking-wide text-zinc-500'>{displaySite}</p>
                        <p className='mt-0.5 truncate font-bold text-zinc-100'>{displayTitle}</p>
                        <p className='mt-0.5 line-clamp-1 text-sm text-zinc-400'>{displayDescription}</p>
                    </div>
                </div>
            )}

            {/* LinkedIn Card */}
            {platform === 'linkedin' && (
                <div className='overflow-hidden rounded-sm border border-zinc-700 bg-zinc-900' style={{ maxWidth: '552px' }}>
                    {displayImage ? (
                        <ImagePreview src={displayImage} />
                    ) : (
                        <div className='flex aspect-1200/627 w-full items-center justify-center bg-zinc-800 text-zinc-600 text-sm'>
                            No image set
                        </div>
                    )}
                    <div className='px-3 py-2'>
                        <p className='truncate font-semibold text-zinc-100'>{displayTitle}</p>
                        <p className='text-xs text-zinc-500'>{displaySite}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OgCardPreview