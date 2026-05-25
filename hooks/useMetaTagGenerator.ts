"use client";

import { getValidationWarnings } from "@/features/tools/meta-tag-generator/get-validation-warning";
import { copyToClipboard } from "@/utils";
import { escapeHtml } from "@/utils/markdown-to-html";
import { useMemo, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export interface HreflangEntry {
    lang: string
    url: string
}

export interface PreconnectEntry {
    url: string
    crossorigin: boolean
}

// ── Hook ───────────────────────────────────────────────────────────────────

export const useMetaGenerator = () => {
    // Existing fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [image, setImage] = useState("")
    const [keywords, setKeywords] = useState("")
    const [author, setAuthor] = useState("")
    const [siteName, setSiteName] = useState("")
    const [twitterHandle, setTwitterHandle] = useState("")
    const [themeColor, setThemeColor] = useState("#000000")
    const [robots, setRobots] = useState("index, follow")
    const [locale, setLocale] = useState("en_US")
    const [type, setType] = useState("website")

    // ── Geo fields ──────────────────────────────────────────────────────────
    const [geoRegion, setGeoRegion] = useState("")
    const [geoPlacename, setGeoPlacename] = useState("")
    const [geoLat, setGeoLat] = useState("")
    const [geoLng, setGeoLng] = useState("")

    // ── Article fields (only rendered when type === "article") ──────────────
    const [articlePublishedTime, setArticlePublishedTime] = useState("")
    const [articleModifiedTime, setArticleModifiedTime] = useState("")
    const [articleAuthor, setArticleAuthor] = useState("")
    const [articleSection, setArticleSection] = useState("")
    const [articleTags, setArticleTags] = useState("")

    // ── Hreflang entries ────────────────────────────────────────────────────
    const [hreflangEntries, setHreflangEntries] = useState<HreflangEntry[]>([
        { lang: "x-default", url: "" },
    ])

    // ── Preconnect entries ──────────────────────────────────────────────────
    const [preconnectEntries, setPreconnectEntries] = useState<PreconnectEntry[]>([
        { url: "", crossorigin: false },
    ])

    // ── Generated meta tags ─────────────────────────────────────────────────
    const metaTags = useMemo(() => {
        const t = escapeHtml(title || "Page Title")
        const d = escapeHtml(description || "Page description")
        const u = escapeHtml(url || "https://yoursite.com")
        const i = escapeHtml(image || "https://yoursite.com/og-image.jpg")
        const k = escapeHtml(keywords)
        const a = escapeHtml(author)
        const s = escapeHtml(siteName || "Your Site")
        const tw = escapeHtml(twitterHandle)
        const r = escapeHtml(robots)
        const l = escapeHtml(locale)
        const ty = escapeHtml(type)
        const theme = escapeHtml(themeColor)

        // Geo block
        const geoLines = [
            geoRegion ? `<meta name="geo.region"    content="${escapeHtml(geoRegion)}">` : "",
            geoPlacename ? `<meta name="geo.placename" content="${escapeHtml(geoPlacename)}">` : "",
            geoLat && geoLng ? `<meta name="geo.position"  content="${escapeHtml(geoLat)};${escapeHtml(geoLng)}">` : "",
            geoLat && geoLng ? `<meta name="ICBM"           content="${escapeHtml(geoLat)}, ${escapeHtml(geoLng)}">` : "",
        ].filter(Boolean)
        const geoBlock = geoLines.length ? `\n<!-- Geo -->\n${geoLines.join("\n")}` : ""

        // Article block
        const articleLines = type === "article" ? [
            articlePublishedTime ? `<meta property="article:published_time" content="${escapeHtml(articlePublishedTime)}">` : "",
            articleModifiedTime ? `<meta property="article:modified_time"  content="${escapeHtml(articleModifiedTime)}">` : "",
            articleAuthor ? `<meta property="article:author"         content="${escapeHtml(articleAuthor)}">` : "",
            articleSection ? `<meta property="article:section"        content="${escapeHtml(articleSection)}">` : "",
            ...articleTags.split(",").filter(Boolean).map(tag =>
                `<meta property="article:tag" content="${escapeHtml(tag.trim())}">`
            ),
        ].filter(Boolean) : []
        const articleBlock = articleLines.length ? `\n<!-- Article -->\n${articleLines.join("\n")}\n` : ""

        // Hreflang block
        const hreflangLines = hreflangEntries.filter(e => e.url).map(e =>
            `<link rel="alternate" hreflang="${escapeHtml(e.lang)}" href="${escapeHtml(e.url)}">`
        )
        const hreflangBlock = hreflangLines.length ? `\n<!-- Alternate Languages -->\n${hreflangLines.join("\n")}` : ""

        // Preconnect block
        const preconnectLines = preconnectEntries.filter(e => e.url).flatMap(e => [
            `<link rel="preconnect"  href="${escapeHtml(e.url)}"${e.crossorigin ? " crossorigin" : ""}>`,
            `<link rel="dns-prefetch" href="${escapeHtml(e.url)}">`,
        ])
        const preconnectBlock = preconnectLines.length ? `\n<!-- Resource Hints -->\n${preconnectLines.join("\n")}` : ""

        return `<!-- Primary Meta Tags -->
<title>${t}</title>
<meta name="title"        content="${t}">
<meta name="description"  content="${d}">
<meta name="keywords"     content="${k}">
<meta name="author"       content="${a}">
<meta name="robots"       content="${r}">
<meta name="viewport"     content="width=device-width, initial-scale=1.0">
<meta charset="UTF-8">

<!-- Canonical -->
<link rel="canonical" href="${u}">

<!-- Theme -->
<meta name="theme-color" content="${theme}">

<!-- Open Graph / Facebook -->
<meta property="og:type"        content="${ty}">
<meta property="og:url"         content="${u}">
<meta property="og:title"       content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image"       content="${i}">
<meta property="og:site_name"   content="${s}">
<meta property="og:locale"      content="${l}">
${articleBlock}
<!-- Twitter -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:url"         content="${u}">
<meta name="twitter:title"       content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image"       content="${i}">
<meta name="twitter:creator"     content="${tw}">
<meta name="twitter:site"        content="${tw}">

<!-- Apple -->
<meta name="apple-mobile-web-app-capable"          content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title"            content="${t}">

<!-- Microsoft -->
<meta name="msapplication-TileColor"       content="${theme}">
<meta name="msapplication-navbutton-color" content="${theme}">

<!-- Misc -->
<meta name="format-detection"      content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">${geoBlock}${hreflangBlock}${preconnectBlock}`
    }, [
        title, description, url, image, keywords, author, siteName,
        twitterHandle, themeColor, robots, locale, type,
        geoRegion, geoPlacename, geoLat, geoLng,
        articlePublishedTime, articleModifiedTime, articleAuthor, articleSection, articleTags,
        hreflangEntries, preconnectEntries,
    ])

    const validationWarnings = useMemo(() =>
        getValidationWarnings({ title, description, url, image, keywords, twitterHandle }),
        [title, description, url, image, keywords, twitterHandle]
    )

    const handleCopy = () => copyToClipboard({ value: metaTags })
    const handleCopyText = (text: string) => copyToClipboard({ value: text })

    return {
        title, description, url, image, keywords, author,
        siteName, twitterHandle, themeColor, robots, locale, type,
        geoRegion, geoPlacename, geoLat, geoLng,
        articlePublishedTime, articleModifiedTime, articleAuthor, articleSection, articleTags,
        hreflangEntries, preconnectEntries,

        setTitle, setDescription, setUrl, setImage, setKeywords, setAuthor,
        setSiteName, setTwitterHandle, setThemeColor, setRobots, setLocale, setType,
        setGeoRegion, setGeoPlacename, setGeoLat, setGeoLng,
        setArticlePublishedTime, setArticleModifiedTime, setArticleAuthor,
        setArticleSection, setArticleTags,
        setHreflangEntries, setPreconnectEntries,

        metaTags,
        validationWarnings,
        handleCopy,
        handleCopyText,
    }
}