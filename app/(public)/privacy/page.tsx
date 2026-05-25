import { Privacy } from '@/features/privacy';
import { paths } from '@/constants';
import { createPageMetadata } from '@/seo/meta/create-page-meta';
import { config } from '@/config';

export const metadata = createPageMetadata({
    title: "Privacy Policy",
    description: `Read the ${config.siteName} privacy policy and learn how browser-based tools keep your text, files, passwords, and data private.`,
    path: paths.privacy.href,
    keywords: [`${config.siteName} privacy policy`, "private online tools", "browser based tools privacy"],
});

const page = () => {
    return (
        <main className='page-container page-padding'>
            <Privacy />
        </main>
    )
}

export default page
