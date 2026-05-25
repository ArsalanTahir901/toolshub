'use client'

import { Label } from '@/components/label'

interface ArticleFieldsProps {
    articlePublishedTime: string
    articleModifiedTime: string
    articleAuthor: string
    articleSection: string
    articleTags: string
    setArticlePublishedTime: (v: string) => void
    setArticleModifiedTime: (v: string) => void
    setArticleAuthor: (v: string) => void
    setArticleSection: (v: string) => void
    setArticleTags: (v: string) => void
}

const ArticleFields = ({
    articlePublishedTime, articleModifiedTime, articleAuthor, articleSection, articleTags,
    setArticlePublishedTime, setArticleModifiedTime, setArticleAuthor, setArticleSection, setArticleTags,
}: ArticleFieldsProps) => {
    return (
        <div className='space-y-4 rounded-xl border border-zinc-800 p-4'>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-zinc-300'>Article Tags</span>
                <span className='rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500'>
                    og:type = article
                </span>
            </div>

            <p className='text-xs text-zinc-500'>
                Open Graph article properties help Google display rich results with author and publish date information.
            </p>

            <div className='space-y-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div>
                        <Label htmlFor='articlePublished'>Published Time</Label>
                        <input
                            type='datetime-local'
                            id='articlePublished'
                            value={articlePublishedTime}
                            onChange={(e) => setArticlePublishedTime(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor='articleModified'>Modified Time</Label>
                        <input
                            type='datetime-local'
                            id='articleModified'
                            value={articleModifiedTime}
                            onChange={(e) => setArticleModifiedTime(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor='articleAuthor'>Author Profile URL</Label>
                    <input
                        type='url'
                        id='articleAuthor'
                        value={articleAuthor}
                        onChange={(e) => setArticleAuthor(e.target.value)}
                        placeholder='https://yoursite.com/author/john-doe'
                    />
                    <p className='mt-1 text-xs text-zinc-600'>Should be a profile page URL, not just a name</p>
                </div>

                <div>
                    <Label htmlFor='articleSection'>Section / Category</Label>
                    <input
                        type='text'
                        id='articleSection'
                        value={articleSection}
                        onChange={(e) => setArticleSection(e.target.value)}
                        placeholder='Technology'
                    />
                </div>

                <div>
                    <Label htmlFor='articleTags'>Tags</Label>
                    <input
                        type='text'
                        id='articleTags'
                        value={articleTags}
                        onChange={(e) => setArticleTags(e.target.value)}
                        placeholder='next.js, seo, react'
                    />
                    <p className='mt-1 text-xs text-zinc-600'>Comma-separated — each becomes a separate article:tag</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleFields