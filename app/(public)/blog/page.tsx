import { Blog } from "@/features/blog";
import { paths } from "@/constants";
import { toolsBlogArticlesArray } from "@/features/blog/registry";
import { generateBlogsSchema } from "@/seo/schemas/generate-blogs-schema";
import { JsonLd } from "@/seo/schemas/json-ld";
import { createPageMetadata } from "@/seo/meta/create-page-meta";
import { config } from "@/config";

export const metadata = createPageMetadata({
    title: `${config.siteName} Blog`,
    description: "Read practical guides about online tools, writing productivity, developer utilities, SEO, password security, formatting, and workflow tips.",
    path: paths.blog.href,
    keywords: ["tool guides", "developer tutorials", "productivity blog", "seo guides", "writing tools blog"],
});

const page = () => {
    return (
        <>
            <main className='page-padding'>
                <Blog />
            </main>
            <JsonLd
                id="blogs"
                data={generateBlogsSchema(toolsBlogArticlesArray)}
            />
        </>
    )
}

export default page
