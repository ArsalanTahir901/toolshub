import { Metadata } from "next";
import { SeoContent } from "@/components/seo-content";
import { getToolBySlug, slugArray } from "@/features/tools/registry";
import { notFound } from "next/navigation";
import { getSeoContent } from "@/seo/getSeoContent";
import { JsonLd } from "@/seo/schemas/json-ld";
import { generateToolSchema } from "@/seo/schemas/generate-tool-schema";
import { ToolsConstantKeyEnums } from "@/types/tools";
import { createToolMetadata } from "@/seo/meta/create-tool-meta";
import { createNoToolMetadata } from "@/seo/meta/create-not-tool-meta";
import { ToolRenderer } from "@/features/tools/tool-renderer";

type Props = {
    params: Promise<{ slug: ToolsConstantKeyEnums }>;
};

export function generateStaticParams() {
    return slugArray
}

export async function generateMetadata({ params, }: Props): Promise<Metadata> {

    const { slug } = await params;

    const tool = getToolBySlug(slug);

    if (!tool) return createNoToolMetadata();

    return createToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
    const { slug } = await params;

    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const content = await getSeoContent(tool.slug);

    return (
        <>
            <main className="page-container page-padding">
                <ToolRenderer slug={tool.slug} />
                <SeoContent
                    content={content}
                    slug={tool.slug}
                />
            </main>
            <JsonLd
                id={`tool-${tool.slug}`}
                data={generateToolSchema(tool)}
            />
        </>
    );
}
