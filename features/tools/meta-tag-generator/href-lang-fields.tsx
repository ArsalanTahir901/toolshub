'use client'

import { Button } from '@/components/buttons'
import { icons } from '@/components/icons'
import { Label } from '@/components/label'
import type { HreflangEntry } from '@/hooks/useMetaTagGenerator'

interface HreflangFieldsProps {
    entries: HreflangEntry[]
    setEntries: (entries: HreflangEntry[]) => void
}

const COMMON_LANGS = [
    'x-default', 'en', 'en-US', 'en-GB', 'fr', 'fr-FR',
    'de', 'de-DE', 'es', 'es-ES', 'es-MX', 'it', 'it-IT',
    'pt', 'pt-BR', 'ja', 'ko', 'zh-Hans', 'zh-Hant',
    'ar', 'ru', 'nl', 'pl', 'tr', 'sv', 'da', 'fi', 'nb',
]

const HreflangFields = ({ entries, setEntries }: HreflangFieldsProps) => {
    const updateEntry = (index: number, field: keyof HreflangEntry, value: string) => {
        setEntries(entries.map((e, i) => i === index ? { ...e, [field]: value } : e))
    }

    const addEntry = () => setEntries([...entries, { lang: 'en', url: '' }])

    const removeEntry = (index: number) => setEntries(entries.filter((_, i) => i !== index))

    return (
        <div className='space-y-4 rounded-xl border border-zinc-800 p-4'>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-zinc-300'>Hreflang Tags</span>
                <span className='rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500'>
                    Multi-language
                </span>
            </div>

            <p className='text-xs text-zinc-500'>
                Tells Google which language version to show users in different regions. Always include an{' '}
                <code className='font-mono text-zinc-400'>x-default</code> entry pointing to your fallback URL.
            </p>

            <div className='space-y-2'>
                {entries.map((entry, i) => (
                    <div key={i} className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                        <div className='flex-1'>
                            <Label htmlFor={`lang-${i + 1}`}>Language</Label>
                            <select
                                id={`lang-${i + 1}`}
                                value={entry.lang}
                                onChange={(e) => updateEntry(i, 'lang', e.target.value)}
                            >
                                {COMMON_LANGS.map(l => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex-1'>
                            <Label htmlFor={`url-${i + 1}`}>URL</Label>
                            <input
                                id={`url-${i + 1}`}
                                type='url'
                                value={entry.url}
                                onChange={(e) => updateEntry(i, 'url', e.target.value)}
                                placeholder='https://yoursite.com/en/'
                            />
                        </div>

                        <Button
                            onClick={() => removeEntry(i)}
                            disabled={i === 0}
                            className='h-7 w-7 p-0! flex items-center justify-center text-xs self-end'
                        >
                            {icons.bin}
                        </Button>
                    </div>
                ))}
            </div>

            <Button onClick={addEntry} variant='link' className='text-xs'>
                + Add Language
            </Button>
        </div>
    )
}

export default HreflangFields