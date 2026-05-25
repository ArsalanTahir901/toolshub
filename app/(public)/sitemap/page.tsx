import { SiteMap } from '@/features/site-map';
import { paths } from '@/constants';
import { createPageMetadata } from '@/seo/meta/create-page-meta';
import { config } from '@/config';

const sitename = config.siteName;

export const metadata = createPageMetadata({
    title: `${sitename} Sitemap`,
    description: `Browse every ${sitename} page, free online tool, and guide from one sitemap.`,
    path: paths.sitemap.href,
    keywords: [`${sitename} sitemap`, "online tools sitemap", `all ${sitename} pages`],
});

const page = () => {
    return (
        <main className='page-padding page-container'>
            <SiteMap />
        </main>
    )
}

export default page
