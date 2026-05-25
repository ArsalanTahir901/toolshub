'use client'

import { Button } from '@/components/buttons'
import { icons } from '@/components/icons'
import { Label } from '@/components/label'
import type { PreconnectEntry } from '@/hooks/useMetaTagGenerator'

interface PreconnectFieldsProps {
    entries: PreconnectEntry[]
    setEntries: (entries: PreconnectEntry[]) => void
}

const COMMON_ORIGINS = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
    'https://cdnjs.cloudflare.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
]

const PreconnectFields = ({ entries, setEntries }: PreconnectFieldsProps) => {
    const updateEntry = (index: number, field: keyof PreconnectEntry, value: string | boolean) => {
        setEntries(entries.map((e, i) => i === index ? { ...e, [field]: value } : e))
    }

    const addEntry = () => setEntries([...entries, { url: '', crossorigin: false }])

    const removeEntry = (index: number) => setEntries(entries.filter((_, i) => i !== index))

    return (
        <div className='space-y-4 rounded-xl border border-zinc-800 p-4'>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-zinc-300'>Resource Hints</span>
                <span className='rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500'>
                    Performance
                </span>
            </div>

            <p className='text-xs text-zinc-500'>
                Tells the browser to open connections to third-party origins early. Each entry generates both a <code className='font-mono text-zinc-400'>preconnect</code> and a <code className='font-mono text-zinc-400'>dns-prefetch</code> tag.
            </p>

            {/* Quick-add common origins */}
            <div className='space-y-1.5'>
                <p className='text-xs text-zinc-600'>Quick add</p>
                <div className='flex flex-wrap gap-1.5'>
                    {COMMON_ORIGINS.map(origin => {
                        const already = entries.some(e => e.url === origin)
                        return (
                            <Button
                                key={origin}
                                disabled={already}
                                onClick={() => setEntries([...entries, { url: origin, crossorigin: origin.includes('fonts') }])}
                                className='px-2! py-0.5! text-xs'
                            >
                                {origin.replace('https://', '')}
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div className='space-y-2'>
                {entries.map((entry, i) => (
                    <div key={i} className='flex flex-col sm:flex-row sm:items-center gap-3'>
                        <div className='flex-1'>
                            <Label htmlFor={`origin-url-${i + 1}`}>Origin URL</Label>
                            <input
                                id={`origin-url-${i + 1}`}
                                type='url'
                                value={entry.url}
                                onChange={(e) => updateEntry(i, 'url', e.target.value)}
                                placeholder='https://fonts.googleapis.com'
                            />
                        </div>
                        <div className='flex w-full sm:w-auto items-center justify-between self-start sm:self-center gap-2'>
                            <div className='flex items-center gap-2'>
                                <Label htmlFor={`crossOrigin-${i + 1}`}>crossorigin</Label>
                                <Label htmlFor={`crossOrigin-${i + 1}`} className='flex cursor-pointer items-center gap-1.5'>
                                    <input
                                        id={`crossOrigin-${i + 1}`}
                                        type='checkbox'
                                        checked={entry.crossorigin}
                                        onChange={(e) => updateEntry(i, 'crossorigin', e.target.checked)}
                                    />
                                    yes
                                </Label>
                            </div>
                            <Button
                                onClick={() => removeEntry(i)}
                                disabled={i === 0}
                                className='h-7 w-7 p-0! flex items-center justify-center text-xs'
                            >
                                {icons.bin}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Button onClick={addEntry} variant='link' className='text-xs'>
                + Add Origin
            </Button>
        </div>
    )
}

export default PreconnectFields