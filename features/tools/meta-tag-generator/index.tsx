'use client'

import { useState } from 'react'
import { Button } from '@/components/buttons'
import { icons } from '@/components/icons'
import { ToolCard } from '@/components/tool-card'
import { toolsConstant } from '@/features/tools/registry'
import { useMetaGenerator } from '@/hooks/useMetaTagGenerator'
import { Tab } from '@/components/tab'
import { ToolsConstantKeyEnums } from "@/types/tools"

import ValidationWarnings from './validation-warning'
import SerpPreview from './serp-preview'
import OgCardPreview from './ogcard-preview'
import JsonLdGenerator from './json-ld-generator'
import FaviconManifest from './favicon-minifest'
import NextJsMetadataExport from './nextjs-metadata-export'
import { Fields } from './fields'

type OutputTab = 'html' | 'nextjs' | 'jsonld' | 'favicon'

const OUTPUT_TABS: { value: OutputTab; label: string; icon: string }[] = [
    { value: 'html', label: 'HTML Meta', icon: '⟨/⟩' },
    { value: 'nextjs', label: 'Next.js', icon: '▲' },
    { value: 'jsonld', label: 'JSON-LD', icon: '{}' },
    { value: 'favicon', label: 'Favicon', icon: '⬡' },
]

const MetaTagGenerator = () => {
    const [activeTab, setActiveTab] = useState<OutputTab>('html')
    const [showPreviews, setShowPreviews] = useState(true)

    const {
        // Core
        title, description, url, image, keywords, author,
        siteName, twitterHandle, themeColor, robots, locale, type,
        setTitle, setDescription, setUrl, setImage, setKeywords, setAuthor,
        setSiteName, setTwitterHandle, setThemeColor, setRobots, setLocale, setType,

        // Geo
        geoRegion, geoPlacename, geoLat, geoLng,
        setGeoRegion, setGeoPlacename, setGeoLat, setGeoLng,

        // Article
        articlePublishedTime, articleModifiedTime, articleAuthor, articleSection, articleTags,
        setArticlePublishedTime, setArticleModifiedTime, setArticleAuthor, setArticleSection, setArticleTags,

        // Hreflang
        hreflangEntries, setHreflangEntries,

        // Preconnect
        preconnectEntries, setPreconnectEntries,

        // Computed
        metaTags, validationWarnings,
        handleCopy, handleCopyText,
    } = useMetaGenerator()

    return (
        <ToolCard
            {...toolsConstant[ToolsConstantKeyEnums.META_TAG_GENERATOR]}
            defaultOpen
            footer={
                <Button onClick={handleCopy}>
                    {icons.copy} Copy HTML
                </Button>
            }
        >
            <div className='space-y-6'>

                {/* Validation Warnings */}
                <ValidationWarnings warnings={validationWarnings} />

                {/* All Input Fields */}
                <Fields
                    // Core
                    title={title} onTitleChange={setTitle}
                    description={description} onDescriptionChange={setDescription}
                    url={url} onUrlChange={setUrl}
                    image={image} onImageChange={setImage}
                    keywords={keywords} onKeywordsChange={setKeywords}
                    author={author} onAuthorChange={setAuthor}
                    siteName={siteName} onSiteNameChange={setSiteName}
                    twitterHandle={twitterHandle} onTwitterHandlerChange={setTwitterHandle}
                    themeColor={themeColor} onThemeColorChange={setThemeColor}
                    robots={robots} onRobotsChange={setRobots}
                    locale={locale} onLocaleChange={setLocale}
                    type={type} onTypeChange={setType}

                    // Geo
                    geoRegion={geoRegion} onGeoRegionChange={setGeoRegion}
                    geoPlacename={geoPlacename} onGeoPlacenameChange={setGeoPlacename}
                    geoLat={geoLat} onGeoLatChange={setGeoLat}
                    geoLng={geoLng} onGeoLngChange={setGeoLng}

                    // Article
                    articlePublishedTime={articlePublishedTime} onArticlePublishedTimeChange={setArticlePublishedTime}
                    articleModifiedTime={articleModifiedTime} onArticleModifiedTimeChange={setArticleModifiedTime}
                    articleAuthor={articleAuthor} onArticleAuthorChange={setArticleAuthor}
                    articleSection={articleSection} onArticleSectionChange={setArticleSection}
                    articleTags={articleTags} onArticleTagsChange={setArticleTags}

                    // Hreflang
                    hreflangEntries={hreflangEntries} onHreflangEntriesChange={setHreflangEntries}

                    // Preconnect
                    preconnectEntries={preconnectEntries} onPreconnectEntriesChange={setPreconnectEntries}
                />

                {/* Live Previews */}
                <div className='space-y-3'>
                    <Button
                        onClick={() => setShowPreviews(v => !v)}
                        className='flex w-full items-center justify-between text-sm font-medium transition-colors'
                    >
                        <span>Live Previews</span>
                        <span className='text-xs'>
                            {showPreviews ? `${icons.chevronUp} Hide` : `${icons.chevronDown} Show`}
                        </span>
                    </Button>

                    {showPreviews && (
                        <div className='space-y-4'>
                            <SerpPreview title={title} description={description} url={url} />
                            <OgCardPreview
                                title={title} description={description}
                                url={url} image={image} siteName={siteName}
                            />
                        </div>
                    )}
                </div>

                {/* Output Tabs */}
                <div className='space-y-3'>
                    <Tab
                        data={OUTPUT_TABS}
                        activeVal={activeTab}
                        onClick={(val) => setActiveTab(val as OutputTab)}
                    />

                    {activeTab === 'html' && (
                        <div className='result-box my-4! overflow-x-auto'>
                            <pre className='whitespace-pre-wrap break-all text-sm'>
                                {metaTags}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'nextjs' && (
                        <NextJsMetadataExport
                            title={title} description={description} url={url} image={image}
                            keywords={keywords} author={author} siteName={siteName}
                            twitterHandle={twitterHandle} themeColor={themeColor}
                            robots={robots} locale={locale} type={type}
                            onCopy={handleCopyText}
                        />
                    )}

                    {activeTab === 'jsonld' && (
                        <JsonLdGenerator
                            title={title} description={description} url={url}
                            image={image} author={author} siteName={siteName}
                            onCopy={handleCopyText}
                        />
                    )}

                    {activeTab === 'favicon' && (
                        <FaviconManifest
                            siteName={siteName} themeColor={themeColor}
                            url={url} onCopy={handleCopyText}
                        />
                    )}
                </div>

            </div>
        </ToolCard>
    )
}

export default MetaTagGenerator