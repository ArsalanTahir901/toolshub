import { Label } from "@/components/label"
import { config } from "@/config"
import CharacterCount from "./character-count"
import type { HreflangEntry, PreconnectEntry } from "@/hooks/useMetaTagGenerator"
import ArticleFields from "./article-fields"
import GeoFields from "./geo-fields"
import HreflangFields from "./href-lang-fields"
import PreconnectFields from "./pre-connect-fields"

interface Props {
    // Core fields
    title: string
    onTitleChange: (val: string) => void
    description: string
    onDescriptionChange: (val: string) => void
    url: string
    onUrlChange: (val: string) => void
    image: string
    onImageChange: (val: string) => void
    keywords: string
    onKeywordsChange: (val: string) => void
    author: string
    onAuthorChange: (val: string) => void
    siteName: string
    onSiteNameChange: (val: string) => void
    twitterHandle: string
    onTwitterHandlerChange: (val: string) => void
    themeColor: string
    onThemeColorChange: (val: string) => void
    robots: string
    onRobotsChange: (val: string) => void
    locale: string
    onLocaleChange: (val: string) => void
    type: string
    onTypeChange: (val: string) => void

    // Geo
    geoRegion: string
    onGeoRegionChange: (val: string) => void
    geoPlacename: string
    onGeoPlacenameChange: (val: string) => void
    geoLat: string
    onGeoLatChange: (val: string) => void
    geoLng: string
    onGeoLngChange: (val: string) => void

    // Article (shown only when type === 'article')
    articlePublishedTime: string
    onArticlePublishedTimeChange: (val: string) => void
    articleModifiedTime: string
    onArticleModifiedTimeChange: (val: string) => void
    articleAuthor: string
    onArticleAuthorChange: (val: string) => void
    articleSection: string
    onArticleSectionChange: (val: string) => void
    articleTags: string
    onArticleTagsChange: (val: string) => void

    // Hreflang
    hreflangEntries: HreflangEntry[]
    onHreflangEntriesChange: (entries: HreflangEntry[]) => void

    // Preconnect
    preconnectEntries: PreconnectEntry[]
    onPreconnectEntriesChange: (entries: PreconnectEntry[]) => void
}

export const Fields = ({
    title, onTitleChange,
    description, onDescriptionChange,
    url, onUrlChange,
    image, onImageChange,
    keywords, onKeywordsChange,
    author, onAuthorChange,
    siteName, onSiteNameChange,
    twitterHandle, onTwitterHandlerChange,
    themeColor, onThemeColorChange,
    robots, onRobotsChange,
    locale, onLocaleChange,
    type, onTypeChange,
    geoRegion, onGeoRegionChange,
    geoPlacename, onGeoPlacenameChange,
    geoLat, onGeoLatChange,
    geoLng, onGeoLngChange,
    articlePublishedTime, onArticlePublishedTimeChange,
    articleModifiedTime, onArticleModifiedTimeChange,
    articleAuthor, onArticleAuthorChange,
    articleSection, onArticleSectionChange,
    articleTags, onArticleTagsChange,
    hreflangEntries, onHreflangEntriesChange,
    preconnectEntries, onPreconnectEntriesChange,
}: Props) => {
    return (
        <div className='space-y-4'>

            {/* Title */}
            <div>
                <Label htmlFor='title'>Page Title</Label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder='Page Title (50-60 chars)'
                    maxLength={60}
                />
                <CharacterCount current={title.length} min={30} max={60} />
            </div>

            {/* Description */}
            <div>
                <Label htmlFor='description'>Description</Label>
                <textarea
                    id='description'
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder='Meta Description (150-160 chars)'
                    maxLength={160}
                    rows={4}
                />
                <CharacterCount current={description.length} min={120} max={160} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* URL */}
                <div>
                    <Label htmlFor='url'>Canonical URL</Label>
                    <input
                        type='url'
                        id='url'
                        value={url}
                        onChange={(e) => onUrlChange(e.target.value)}
                        placeholder='https://yoursite.com/page'
                    />
                </div>

                {/* OG Image */}
                <div>
                    <Label htmlFor='image'>OpenGraph Image URL</Label>
                    <input
                        type='url'
                        id='image'
                        value={image}
                        onChange={(e) => onImageChange(e.target.value)}
                        placeholder='https://yoursite.com/og-image.jpg'
                    />
                </div>
            </div>

            {/* Keywords */}
            <div>
                <Label htmlFor='keywords'>Keywords</Label>
                <input
                    type='text'
                    id='keywords'
                    value={keywords}
                    onChange={(e) => onKeywordsChange(e.target.value)}
                    placeholder='seo, meta tags, og tags'
                />
                <CharacterCount current={keywords.length} max={160} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Author */}
                <div>
                    <Label htmlFor='author'>Author</Label>
                    <input
                        type='text'
                        id='author'
                        value={author}
                        onChange={(e) => onAuthorChange(e.target.value)}
                        placeholder='John Doe'
                    />
                </div>

                {/* Site Name */}
                <div>
                    <Label htmlFor='siteName'>Site Name</Label>
                    <input
                        type='text'
                        id='siteName'
                        value={siteName}
                        onChange={(e) => onSiteNameChange(e.target.value)}
                        placeholder={config.siteName}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Twitter Handle */}
                <div>
                    <Label htmlFor='twitter'>Twitter Handle</Label>
                    <input
                        type='text'
                        id='twitter'
                        value={twitterHandle}
                        onChange={(e) => onTwitterHandlerChange(e.target.value)}
                        placeholder='@yourhandle'
                    />
                </div>

                {/* Theme Color */}
                <div>
                    <Label htmlFor='themeColor'>Theme Color</Label>
                    <div className='flex items-center gap-3'>
                        <input
                            type='color'
                            id='themeColor'
                            value={themeColor}
                            onChange={(e) => onThemeColorChange(e.target.value)}
                            className='h-9 w-14 cursor-pointer rounded border border-zinc-700 bg-transparent p-0.5'
                        />
                        <input
                            type='text'
                            id='themeColor'
                            value={themeColor}
                            onChange={(e) => onThemeColorChange(e.target.value)}
                            placeholder='#000000'
                            className='flex-1'
                        />
                    </div>
                </div>
            </div>

            {/* Robots */}
            <div>
                <Label htmlFor='robots'>Robots</Label>
                <select id='robots' value={robots} onChange={(e) => onRobotsChange(e.target.value)}>
                    <option value='index, follow'>index, follow</option>
                    <option value='noindex, follow'>noindex, follow</option>
                    <option value='index, nofollow'>index, nofollow</option>
                    <option value='noindex, nofollow'>noindex, nofollow</option>
                </select>
            </div>

            {/* Locale */}
            <div>
                <Label htmlFor='locale'>Locale</Label>
                <select id='locale' value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
                    <option value='en_US'>English (US)</option>
                    <option value='en_GB'>English (GB)</option>
                    <option value='fr_FR'>French</option>
                    <option value='de_DE'>German</option>
                    <option value='es_ES'>Spanish</option>
                    <option value='it_IT'>Italian</option>
                    <option value='pt_BR'>Portuguese (Brazil)</option>
                    <option value='ja_JP'>Japanese</option>
                    <option value='zh_CN'>Chinese (Simplified)</option>
                    <option value='ar_AR'>Arabic</option>
                </select>
            </div>

            {/* OG Type */}
            <div>
                <Label htmlFor='type'>OG Type</Label>
                <select id='type' value={type} onChange={(e) => onTypeChange(e.target.value)}>
                    <option value='website'>website</option>
                    <option value='article'>article</option>
                    <option value='book'>book</option>
                    <option value='profile'>profile</option>
                    <option value='music.song'>music.song</option>
                    <option value='video.movie'>video.movie</option>
                </select>
            </div>

            {/* Article fields — only when og:type is article */}
            {type === 'article' && (
                <ArticleFields
                    articlePublishedTime={articlePublishedTime}
                    articleModifiedTime={articleModifiedTime}
                    articleAuthor={articleAuthor}
                    articleSection={articleSection}
                    articleTags={articleTags}
                    setArticlePublishedTime={onArticlePublishedTimeChange}
                    setArticleModifiedTime={onArticleModifiedTimeChange}
                    setArticleAuthor={onArticleAuthorChange}
                    setArticleSection={onArticleSectionChange}
                    setArticleTags={onArticleTagsChange}
                />
            )}

            {/* Geo Tags */}
            <GeoFields
                geoRegion={geoRegion}
                geoPlacename={geoPlacename}
                geoLat={geoLat}
                geoLng={geoLng}
                setGeoRegion={onGeoRegionChange}
                setGeoPlacename={onGeoPlacenameChange}
                setGeoLat={onGeoLatChange}
                setGeoLng={onGeoLngChange}
            />

            {/* Hreflang */}
            <HreflangFields
                entries={hreflangEntries}
                setEntries={onHreflangEntriesChange}
            />

            {/* Preconnect / Resource Hints */}
            <PreconnectFields
                entries={preconnectEntries}
                setEntries={onPreconnectEntriesChange}
            />

        </div>
    )
}