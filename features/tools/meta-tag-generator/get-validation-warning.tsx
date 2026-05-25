export interface ValidationWarning {
    field: string
    message: string
    severity: 'error' | 'warning' | 'info'
}

export interface ValidationWarningsProps {
    warnings: ValidationWarning[]
}

export const getValidationWarnings = ({
    title,
    description,
    url,
    image,
    keywords,
    twitterHandle,
}: {
    title: string
    description: string
    url: string
    image: string
    keywords: string
    twitterHandle: string
}): ValidationWarning[] => {
    const warnings: ValidationWarning[] = []

    // Title
    if (!title) {
        warnings.push({ field: 'Title', message: 'Page title is required for SEO.', severity: 'error' })
    } else if (title.length < 30) {
        warnings.push({ field: 'Title', message: `Title is short (${title.length} chars). Aim for 50–60.`, severity: 'warning' })
    } else if (title.length > 60) {
        warnings.push({ field: 'Title', message: `Title exceeds 60 chars — may be truncated in SERPs.`, severity: 'warning' })
    }

    // Description
    if (!description) {
        warnings.push({ field: 'Description', message: 'Meta description is required for SEO.', severity: 'error' })
    } else if (description.length < 120) {
        warnings.push({ field: 'Description', message: `Description is short (${description.length} chars). Aim for 150–160.`, severity: 'warning' })
    }

    // URL
    if (!url) {
        warnings.push({ field: 'URL', message: 'Canonical URL helps avoid duplicate content issues.', severity: 'info' })
    } else {
        try {
            new URL(url)
        } catch {
            warnings.push({ field: 'URL', message: 'URL format appears invalid.', severity: 'error' })
        }
    }

    // OG Image
    if (!image) {
        warnings.push({ field: 'OG Image', message: 'Missing OG image. Social shares will have no preview image.', severity: 'warning' })
    } else {
        try {
            new URL(image)
        } catch {
            warnings.push({ field: 'OG Image', message: 'OG Image URL format appears invalid.', severity: 'error' })
        }
    }

    // Keywords
    if (!keywords) {
        warnings.push({ field: 'Keywords', message: 'Keywords have low SEO impact but help with context clarity.', severity: 'info' })
    }

    // Twitter
    if (twitterHandle && !twitterHandle.startsWith('@')) {
        warnings.push({ field: 'Twitter', message: 'Twitter handle should start with @.', severity: 'warning' })
    }

    return warnings
}