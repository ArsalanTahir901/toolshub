import { BadgeVariantType } from "./badge"

export enum ToolCategoryEnum {
    TEXT = 'text',
    DEVELOPER = 'developer',
    SEO = 'seo',
    SECURITY = 'security',
    CONVERTER = 'converter',
    GENERATOR = 'generator',
    UTILITY = 'utility',
    CALCULATOR = 'calculator',
    IMAGE = 'image'
}

export enum ToolsConstantKeyEnums {
    WORD_COUNTER = 'word-counter',
    PASSWORD_GENERATOR = 'password-generator',
    CASE_CONVERTER = 'case-converter',
    BASE_64 = 'base64',
    URL_SLUG = 'url-slug',
    LOREM_IPSUM = 'lorem-ipsum',
    QR_CODE = 'qr-code',
    JSON_FORMATTER = 'json-formatter',
    HASH_GENERATOR = 'hash-generator',
    REGEX_TESTER = 'regex-tester',
    COLOR_CONVERTER = 'color-converter',
    TIME_STAMP_CONVERTER = 'time-stamp-converter',
    PERCENTAGE_CALCULATOR = 'percentage-calculator',
    MARKDOWN_EDITOR = 'markdown-editor',
    DIFF_CHECKER = 'diff-checker',
    META_TAG_GENERATOR = 'meta-tag-generator'
}

export type ToolsObject = {
    id: string,
    title: string,
    href: string,
    slug: ToolsConstantKeyEnums,
    icon: { text: string, className?: string },
    tag: { text: string, variant?: BadgeVariantType },
    description: string
    seoCategory: ToolCategoryEnum[]
}