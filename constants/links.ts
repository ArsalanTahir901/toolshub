import { paths } from ".";

interface Link {
    title: string,
    href: string,
    target?: HTMLAnchorElement['target'],
    rel?: HTMLAnchorElement['rel']
}

interface QuickNav {
    heading: string;
    links: Link[]
}

interface FooterLinks {
    quickNav: QuickNav[]
    bottomNav: Link[]
}

const headerLinks: Link[] = [paths.about, paths.contact, paths.blog]

const footerLinks: FooterLinks = {
    quickNav: [
        {
            heading: 'Quick Links',
            links: [paths.about, paths.blog]
        },
        {
            heading: 'Features',
            links: [paths.tools, paths.ai_tools]
        },
        {
            heading: 'Contact',
            links: [paths.contact, paths.twitter, paths.support]
        },
    ],
    bottomNav: [paths.privacy, paths.terms, paths.sitemap, paths.contact]
}

export { headerLinks, footerLinks }