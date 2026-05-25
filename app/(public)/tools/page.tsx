import { Tools } from '@/components/tools';
import { toolsArray } from "@/features/tools/registry"
import { JsonLd } from '@/seo/schemas/json-ld';
import { generateToolsSchema } from '@/seo/schemas/generate-tools-schema';
import { Section } from '@/components/section';
import { SectionIntro } from '@/components/section-intro';
import { icons } from '@/components/icons';
import { paths } from '@/constants';
import { createPageMetadata } from '@/seo/meta/create-page-meta';

export const metadata = createPageMetadata({
    title: "Free Online Tools",
    description: `${toolsArray.length} free online tools for developers, writers, SEO work, security, encoding, formatting, colors, QR codes, timestamps, and calculations.`,
    path: paths.tools.href,
    keywords: ["free online tools", "developer tools", "writing tools", "seo tools", "utility tools"],
});

const page = () => {
    return (
        <>
            <main>
                <Section aria-label="Online Tools">
                    <div className="text-center mb-5">
                        <SectionIntro
                            title={icons.tool}
                            gradientText="All Free Online"
                            description={`${toolsArray.length} free, instant, browser-based tools for every task.`}
                        />
                    </div>
                    <Tools tools={toolsArray} />
                </Section>
            </main>
            <JsonLd
                id='tools-list'
                data={generateToolsSchema(toolsArray)}
            />
        </>
    )
}

export default page
