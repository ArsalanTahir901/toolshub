import { config } from "../config"
import { icons } from "@/components/icons";
import { BadgeVariantType } from "@/types/badge";

type PathObject = {
    id?: string;
    title: string,
    href: string,
    slug?: string,
    target?: string,
    rel?: string
    icon?: { text?: string, className?: string }
    tag?: { text?: string, variant?: BadgeVariantType };
    description?: string
}

export enum PathConstantKeyEnum {
    HOME = 'home',
    TOOLS = 'tools',
    ABOUT = 'about',
    BLOG = 'blog',
    AI_TOOLS = 'ai_tools',
    CONTACT = 'contact',
    TWITTER = 'twitter',
    SUPPORT = 'support',
    PRIVACY = 'privacy',
    TERMS = 'terms',
    SITEMAP = 'sitemap',
}

const { twitter, mailto, siteName } = config;

const external = { target: '_blank', rel: 'noopener' };

export const paths: Record<PathConstantKeyEnum, PathObject> = {
    home: {
        title: 'Home',
        href: '/',
        slug: '/home',
        icon: { text: icons.home }
    },
    tools: {
        title: 'Tools',
        href: '/tools',
        slug: '/tools',
        icon: { text: icons.tool },
        description: `Browse all free tools available on ${siteName}`
    },
    about: {
        title: 'About',
        href: '/about',
        slug: 'about',
        description: `Learn more about ${siteName} and our free online developer utilities.`,
        icon: { text: icons.zap }
    },
    blog: {
        title: 'Blog',
        href: '/blog',
        slug: 'blog',
        description: `Read developer tutorials, guides, and tool articles on ${siteName}.`,
        icon: { text: icons.book }
    },
    ai_tools: {
        title: 'AI Tools',
        href: '/ai-tools',
        slug: 'ai-tools'
    },
    contact: {
        title: 'Contact',
        href: '/contact',
        slug: 'contact',
        description: `Get in touch with the ${siteName} team.`,
        icon: { text: icons.envelope }
    },
    twitter: {
        title: 'Twitter',
        href: twitter,
        ...external,
        slug: 'twitter'
    },
    support: {
        title: 'Support',
        href: mailto,
        slug: 'support'
    },
    privacy: {
        title: 'Privacy Policy',
        href: '/privacy',
        slug: 'privacy',
        description: `Read the privacy policy of ${siteName}.`,
        icon: { text: icons.lock }
    },
    terms: {
        title: 'Terms of Services',
        href: '/terms',
        slug: 'terms',
        description: `Read the terms and conditions of ${siteName}.`,
        icon: { text: icons.copy }
    },
    sitemap: {
        title: 'Site Map',
        href: '/sitemap',
        slug: 'sitemap',
        description: `Browse all pages and tools available on ${siteName}.`,
        icon: { text: icons.map }
    },
}

export const thirdPartyPaths = {
    googleAdsense: {
        href: 'https://www.google.com/settings/ads',
        title: 'Google Adsense',
        slug: 'google-adsense',
        ...external,
    },
    itemType: {
        href: 'https://schema.org/SoftwareApplication',
        title: 'Software Application',
        slug: ''
    },
} 