import { About } from '@/features/about';
import { paths } from '@/constants';
import { createPageMetadata } from '@/seo/meta/create-page-meta';
import { config } from '@/config';

const sitename = config.siteName;

export const metadata = createPageMetadata({
    title: `About ${sitename}`,
    description: `Learn why ${sitename} offers fast, private, no-login online tools for developers, writers, designers, students, and everyday productivity.`,
    path: paths.about.href,
    keywords: [`about ${sitename}`, "free online tools", "private browser tools"],
});

const page = () => {
    return (
        <main className='page-container page-padding'>
            <About />
        </main>
    )
}

export default page
