import { Contact } from '@/features/contact';
import { paths } from '@/constants';
import { createPageMetadata } from '@/seo/meta/create-page-meta';
import { config } from '@/config';

const sitename = config.siteName;

export const metadata = createPageMetadata({
    title: `Contact ${sitename}`,
    description: `Contact ${sitename} to report a bug, suggest a new online tool, ask a question, or discuss partnerships and advertising.`,
    path: paths.contact.href,
    keywords: [`contact ${sitename}`, "suggest online tool", "report tool bug"],
});

const page = () => {
    return (
        <main className='page-container page-padding'>
            <Contact />
        </main>
    )
}

export default page
