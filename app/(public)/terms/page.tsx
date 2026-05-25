import { Terms } from '@/features/terms';
import { paths } from '@/constants';
import { createPageMetadata } from '@/seo/meta/create-page-meta';
import { config } from '@/config';

export const metadata = createPageMetadata({
    title: "Terms of Service",
    description: `Read the ${config.siteName} terms of service for using free online tools, utilities, calculators, generators, and developer resources.`,
    path: paths.terms.href,
    keywords: [`${config.siteName} terms`, "terms of service", "online tools terms"],
});

const page = () => {
    return (
        <main className='page-padding page-container'>
            <Terms />
        </main>
    )
}

export default page
