'use client'

import { Button } from '@/components/buttons'
import { icons } from '@/components/icons'
import { Tab } from '@/components/tab'
import { useState, useMemo } from 'react'

interface JsonLdGeneratorProps {
    title: string
    description: string
    url: string
    image: string
    author: string
    siteName: string
    onCopy?: (text: string) => void
}

type SchemaType = 'WebPage' | 'Article' | 'Organization' | 'BreadcrumbList' | 'FAQPage'

const JsonLdGenerator = ({
    title,
    description,
    url,
    image,
    author,
    siteName,
    onCopy,
}: JsonLdGeneratorProps) => {
    const [schemaType, setSchemaType] = useState<SchemaType>('WebPage')
    const [faqItems, setFaqItems] = useState([{ question: '', answer: '' }])
    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: 'Home', url: '' },
        { name: '', url: '' },
    ])

    const schemaTypes: { value: SchemaType; label: string; title: string }[] = [
        { value: 'WebPage', label: 'WebPage', title: 'Generic page schema' },
        { value: 'Article', label: 'Article', title: 'Blog post / news article' },
        { value: 'Organization', label: 'Organization', title: 'Company / brand entity' },
        { value: 'BreadcrumbList', label: 'Breadcrumb', title: 'Navigation breadcrumbs' },
        { value: 'FAQPage', label: 'FAQ', title: 'FAQ structured data' },
    ]

    const baseUrl = url || 'https://yoursite.com'

    const schema = useMemo(() => {
        const t = title || 'Page Title'
        const d = description || 'Page description'
        const img = image || 'https://yoursite.com/og-image.jpg'
        const a = author || 'Author Name'
        const s = siteName || 'Site Name'
        const now = new Date().toISOString().split('T')[0]

        switch (schemaType) {
            case 'WebPage':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: t,
                    description: d,
                    url: baseUrl,
                    image: img,
                    publisher: { '@type': 'Organization', name: s },
                    dateModified: now,
                }
            case 'Article':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: t,
                    description: d,
                    image: img,
                    url: baseUrl,
                    datePublished: now,
                    dateModified: now,
                    author: { '@type': 'Person', name: a },
                    publisher: {
                        '@type': 'Organization',
                        name: s,
                        logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
                    },
                    mainEntityOfPage: { '@type': 'WebPage', '@id': baseUrl },
                }
            case 'Organization':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: s,
                    url: baseUrl,
                    logo: img,
                    description: d,
                    sameAs: [],
                }
            case 'BreadcrumbList':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: breadcrumbs
                        .filter(b => b.name)
                        .map((b, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: b.name,
                            item: b.url || baseUrl,
                        })),
                }
            case 'FAQPage':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqItems
                        .filter(f => f.question)
                        .map(f => ({
                            '@type': 'Question',
                            name: f.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: f.answer,
                            },
                        })),
                }
        }
    }, [schemaType, title, description, image, author, siteName, faqItems, breadcrumbs, baseUrl])

    const jsonString = JSON.stringify(schema, null, 2)
    const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`

    return (
        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-4'>
            <div className='flex items-center justify-between'>
                <p className='text-xs font-semibold m-0! uppercase tracking-wider text-zinc-500'>
                    JSON-LD Schema
                </p>
                <Button
                    onClick={() => onCopy?.(scriptTag)}
                    className='px-2! py-1! text-xs'
                >
                    Copy Script Tag
                </Button>
            </div>

            {/* Schema type selector */}
            <Tab
                data={schemaTypes}
                activeVal={schemaType}
                onClick={(val) => setSchemaType(val as SchemaType)}
            />
            {/* Extra inputs for FAQ */}
            {schemaType === 'FAQPage' && (
                <div className='space-y-2'>
                    <p className='text-xs text-zinc-500'>FAQ Items</p>
                    {faqItems.map((item, i) => (
                        <div key={i} className='space-y-1.5 rounded-lg border border-zinc-800 p-3'>
                            <input
                                type='text'
                                value={item.question}
                                onChange={e => {
                                    const updated = [...faqItems]
                                    updated[i].question = e.target.value
                                    setFaqItems(updated)
                                }}
                                placeholder={`Question ${i + 1}`}
                            />
                            <textarea
                                value={item.answer}
                                onChange={e => {
                                    const updated = [...faqItems]
                                    updated[i].answer = e.target.value
                                    setFaqItems(updated)
                                }}
                                placeholder={`Answer ${i + 1}`}
                                rows={2}
                            />
                            {i !== 0 &&
                                <div className='text-end'>
                                    <Button
                                        className='text-xs'
                                        onClick={() => {
                                            setFaqItems(pre => pre.filter((_, idx) => idx !== i))
                                        }}
                                    >
                                        {icons.bin}
                                    </Button>
                                </div>}
                        </div>
                    ))}
                    <Button
                        onClick={() => setFaqItems([...faqItems, { question: '', answer: '' }])}
                        className='text-xs'
                        variant='link'
                    >
                        + Add FAQ Item
                    </Button>
                </div>
            )}

            {/* Extra inputs for BreadcrumbList */}
            {schemaType === 'BreadcrumbList' && (
                <div className='space-y-2'>
                    <p className='text-xs text-zinc-500'>Breadcrumb Items</p>
                    {breadcrumbs.map((crumb, i) => (
                        <div key={i} className='flex gap-2'>
                            <input
                                type='text'
                                value={crumb.name}
                                onChange={e => {
                                    const updated = [...breadcrumbs]
                                    updated[i].name = e.target.value
                                    setBreadcrumbs(updated)
                                }}
                                placeholder={`Label ${i + 1}`}
                            />
                            <input
                                type='text'
                                value={crumb.url}
                                onChange={e => {
                                    const updated = [...breadcrumbs]
                                    updated[i].url = e.target.value
                                    setBreadcrumbs(updated)
                                }}
                                placeholder={`URL ${i + 1}`}
                            />
                            {i !== 0 &&
                                <Button
                                    className='text-xs'
                                    onClick={() => {
                                        setBreadcrumbs(pre => pre.filter((_, idx) => idx !== i))
                                    }}
                                >
                                    {icons.bin}
                                </Button>}
                        </div>
                    ))}
                    <Button
                        onClick={() => setBreadcrumbs([...breadcrumbs, { name: '', url: '' }])}
                        className='text-xs'
                        variant='link'
                    >
                        + Add Breadcrumb
                    </Button>
                </div>
            )}

            {/* Output */}
            <div className='result-box overflow-x-auto rounded-lg'>
                <pre className='whitespace-pre-wrap break-all text-xs text-zinc-300'>
                    {scriptTag}
                </pre>
            </div>
        </div>
    )
}

export default JsonLdGenerator