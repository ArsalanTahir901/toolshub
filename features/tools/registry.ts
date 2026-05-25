import { icons } from "@/components/icons";
import { BadgeVariantType } from "@/types/badge";
import { ToolCategoryEnum, ToolsConstantKeyEnums, ToolsObject } from "@/types/tools";

const prefix = "/tools/";

export const toolsRegistry: Record<ToolsConstantKeyEnums, ToolsObject> = {
    [ToolsConstantKeyEnums.WORD_COUNTER]: {
        seoCategory: [ToolCategoryEnum.TEXT, ToolCategoryEnum.UTILITY],
        id: "wordCount",
        title: "Word Counter",
        href: `${prefix}${ToolsConstantKeyEnums.WORD_COUNTER}`,
        slug: ToolsConstantKeyEnums.WORD_COUNTER,
        icon: { text: icons.checkList, className: "icon-purple" },
        tag: { text: `${icons.fire} Most Popular`, variant: "danger" },
        description: "Count words, characters, sentences, and paragraphs instantly. Perfect for essays, articles, and social media posts.",
    },
    [ToolsConstantKeyEnums.PASSWORD_GENERATOR]: {
        seoCategory: [ToolCategoryEnum.SECURITY, ToolCategoryEnum.GENERATOR],
        id: "passwordGenerator",
        title: "Password Generator",
        href: `${prefix}${ToolsConstantKeyEnums.PASSWORD_GENERATOR}`,
        slug: ToolsConstantKeyEnums.PASSWORD_GENERATOR,
        icon: { text: icons.lockkey, className: "icon-teal" },
        tag: { text: `${icons.magic} New` },
        description: "Generate strong, secure, random passwords. Customize length and character types for maximum security.",
    },
    [ToolsConstantKeyEnums.CASE_CONVERTER]: {
        seoCategory: [ToolCategoryEnum.TEXT, ToolCategoryEnum.CONVERTER],
        id: "caseConverter",
        title: "Case Converter",
        href: `${prefix}${ToolsConstantKeyEnums.CASE_CONVERTER}`,
        slug: ToolsConstantKeyEnums.CASE_CONVERTER,
        icon: { text: icons.lowercase, className: "icon-yellow" },
        tag: { text: `${icons.star} Popular`, variant: "warning" },
        description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more with one click.",
    },
    [ToolsConstantKeyEnums.BASE_64]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER, ToolCategoryEnum.CONVERTER],
        id: "base64Converter",
        title: "Base64 Encoder / Decoder",
        icon: { text: icons.numbers, className: "icon-blue" },
        href: `${prefix}${ToolsConstantKeyEnums.BASE_64}`,
        slug: ToolsConstantKeyEnums.BASE_64,
        tag: { text: `${icons.magic} Pro`, variant: "success" },
        description: "Encode or decode Base64 strings instantly. Supports text, URL-safe, file, image, audio, video, hex, JSON, HTML, UTF-8 and JWT modes.",
    },
    [ToolsConstantKeyEnums.URL_SLUG]: {
        seoCategory: [ToolCategoryEnum.SEO, ToolCategoryEnum.GENERATOR],
        id: "urlSlugGenerator",
        title: "URL Slug Generator",
        href: `${prefix}${ToolsConstantKeyEnums.URL_SLUG}`,
        slug: ToolsConstantKeyEnums.URL_SLUG,
        icon: { text: icons.link, className: "icon-green" },
        tag: { text: `${icons.magic} SEO`, variant: "info" as BadgeVariantType },
        description: "Convert blog titles or headings into clean, SEO-friendly URL slugs. Great for WordPress, Shopify, and any CMS.",
    },
    [ToolsConstantKeyEnums.LOREM_IPSUM]: {
        seoCategory: [ToolCategoryEnum.TEXT, ToolCategoryEnum.GENERATOR],
        id: "loremIpsumGenerator",
        title: "Lorem Ipsum Generator",
        href: `${prefix}${ToolsConstantKeyEnums.LOREM_IPSUM}`,
        slug: ToolsConstantKeyEnums.LOREM_IPSUM,
        icon: { text: icons.page, className: "icon-red" },
        tag: { text: "Placeholder" },
        description: "Generate placeholder Lorem Ipsum text for web design, UI mockups, and development projects.",
    },
    [ToolsConstantKeyEnums.QR_CODE]: {
        seoCategory: [ToolCategoryEnum.GENERATOR, ToolCategoryEnum.UTILITY],
        id: "qrCodeGenerator",
        title: "QR Code Generator",
        href: `${prefix}${ToolsConstantKeyEnums.QR_CODE}`,
        slug: ToolsConstantKeyEnums.QR_CODE,
        icon: { text: icons.mobile, className: "icon-violet" },
        tag: { text: `${icons.magic} Pro`, variant: "success" },
        description: "Generate QR codes from any text, URL, email, or data. Customize colors, size, error correction level and download as PNG, SVG or JPEG.",
    },
    [ToolsConstantKeyEnums.JSON_FORMATTER]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER, ToolCategoryEnum.UTILITY],
        id: "jsonFormatter",
        title: "JSON Formatter & Validator",
        href: `${prefix}${ToolsConstantKeyEnums.JSON_FORMATTER}`,
        slug: ToolsConstantKeyEnums.JSON_FORMATTER,
        icon: { text: icons.copy, className: "icon-amber" },
        tag: { text: `${icons.fire} Popular`, variant: "warning" },
        description: "Format, validate and minify JSON instantly. Paste raw or minified JSON to beautify it with proper indentation. Supports large payloads.",
    },
    [ToolsConstantKeyEnums.HASH_GENERATOR]: {
        seoCategory: [ToolCategoryEnum.SECURITY, ToolCategoryEnum.DEVELOPER],
        id: "hashGenerator",
        title: "Hash Generator",
        href: `${prefix}${ToolsConstantKeyEnums.HASH_GENERATOR}`,
        slug: ToolsConstantKeyEnums.HASH_GENERATOR,
        icon: { text: icons.lockkey, className: "icon-green" },
        tag: { text: `${icons.fire} Popular`, variant: "warning" },
        description: "Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text or files. Uses WebCrypto API - nothing leaves your browser.",
    },
    [ToolsConstantKeyEnums.REGEX_TESTER]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER],
        id: "regexTester",
        title: "Regex Tester",
        href: `${prefix}${ToolsConstantKeyEnums.REGEX_TESTER}`,
        slug: ToolsConstantKeyEnums.REGEX_TESTER,
        icon: { text: icons.magnify, className: "bg-cyan-100/10" },
        description: "Test, debug and build regular expressions in real time. Highlights matches, shows groups, supports replace, and includes common pattern shortcuts.",
        tag: { text: `${icons.zap} Dev Tool`, variant: "info" },
    },
    [ToolsConstantKeyEnums.COLOR_CONVERTER]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER, ToolCategoryEnum.CONVERTER],
        id: "colorConverter",
        title: "Color Converter",
        href: `${prefix}${ToolsConstantKeyEnums.COLOR_CONVERTER}`,
        slug: ToolsConstantKeyEnums.COLOR_CONVERTER,
        icon: { text: icons.palette, className: "bg-pink-100/10" },
        tag: { text: `${icons.zap} Dev Tool`, variant: "info" },
        description: "Convert colors between HEX, RGB, HSL, HSV and CMYK formats instantly. Includes a color picker, swatch library, and one-click copy for every format.",
    },
    [ToolsConstantKeyEnums.TIME_STAMP_CONVERTER]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER, ToolCategoryEnum.CONVERTER],
        id: "timestampConverter",
        title: "Unix Timestamp Converter",
        href: `${prefix}${ToolsConstantKeyEnums.TIME_STAMP_CONVERTER}`,
        slug: ToolsConstantKeyEnums.TIME_STAMP_CONVERTER,
        icon: { text: icons.clock, className: "icon-amber" },
        tag: { text: `${icons.zap} Dev Tool`, variant: "info" },
        description: "Convert Unix timestamps to human-readable dates and vice versa. Shows UTC, local time, ISO 8601, relative time, week number and more.",
    },
    [ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR]: {
        seoCategory: [ToolCategoryEnum.UTILITY],
        id: "percentageCalculator",
        title: "Percentage Calculator",
        href: `${prefix}${ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR}`,
        slug: ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR,
        icon: { text: icons.hundered, className: "icon-amber" },
        tag: { text: `${icons.fire} Popular`, variant: "warning" },
        description: "Calculate percentages instantly - find % of a number, percentage change, add or subtract %, and score grading. Includes history.",
    },
    [ToolsConstantKeyEnums.MARKDOWN_EDITOR]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER, ToolCategoryEnum.TEXT],
        id: "markdownEditor",
        title: "Markdown Editor",
        href: `${prefix}${ToolsConstantKeyEnums.MARKDOWN_EDITOR}`,
        slug: ToolsConstantKeyEnums.MARKDOWN_EDITOR,
        icon: { text: icons.checkList, className: "icon-blue" },
        tag: { text: `${icons.zap} Essential`, variant: "premium" },
        description: "Convert Markdown to clean HTML and HTML back to Markdown instantly - live preview, syntax highlighting, copy/export tools, and formatting support in one professional editor.",
    },
    [ToolsConstantKeyEnums.DIFF_CHECKER]: {
        seoCategory: [ToolCategoryEnum.DEVELOPER, ToolCategoryEnum.TEXT],
        id: "diffChecker",
        title: "Diff Checker",
        href: `${prefix}${ToolsConstantKeyEnums.DIFF_CHECKER}`,
        slug: ToolsConstantKeyEnums.DIFF_CHECKER,
        icon: { text: icons.difference, className: "bg-cyan-100/10" },
        tag: { text: `${icons.zap} Dev Tool`, variant: "info" },
        description: "Compare two texts and highlight the differences line by line, word by word, or character by character. Export as .patch file.",
    },
    [ToolsConstantKeyEnums.META_TAG_GENERATOR]: {
        seoCategory: [ToolCategoryEnum.SEO, ToolCategoryEnum.GENERATOR],
        id: "metaTag",
        title: "Meta Tag Generator",
        href: `${prefix}${ToolsConstantKeyEnums.META_TAG_GENERATOR}`,
        slug: ToolsConstantKeyEnums.META_TAG_GENERATOR,
        icon: { text: icons.tag, className: "icon-blue" },
        tag: { text: "seo", variant: "success" },
        description: "Generate SEO meta tags (title, description, Open Graph, Twitter Cards) for any page.",
    },
};

export const toolsConstant = toolsRegistry;
export const toolsArray: ToolsObject[] = Object.values(toolsRegistry);
export const slugArray = toolsArray.map(({ slug }) => ({ slug }));

export const getToolBySlug = (slug: ToolsConstantKeyEnums): ToolsObject | undefined => toolsRegistry[slug];

export const getFilteredToolsArray = (slug: ToolsConstantKeyEnums) => toolsArray.filter((tool) => tool.slug !== slug);

export { ToolCategoryEnum, ToolsConstantKeyEnums };
export type { ToolsObject };
