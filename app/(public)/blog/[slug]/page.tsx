import { BlogContent } from '@/features/blog/blog-content';
import { blogSlugArray, getBlogBySlug } from '@/features/blog/registry';
import { createBlogMetadata } from '@/seo/meta/create-blog-meta';
import { createNoBlogMetadata } from '@/seo/meta/create-not-blog-meta';
import { generateBlogSchema } from '@/seo/schemas/generate-blog-schema';
import { JsonLd } from '@/seo/schemas/json-ld';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return blogSlugArray
}

export async function generateMetadata({ params, }: Props): Promise<Metadata> {

    const { slug } = await params;

    const blog = getBlogBySlug(slug);

    if (!blog) return createNoBlogMetadata();

    return createBlogMetadata(blog);
}

export default async function BlogPage({ params }: Props) {
    const { slug } = await params;

    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <>
            <main className="page-container page-padding">
                <BlogContent blog={blog} />
            </main>
            <JsonLd
                id={`blog-${blog.slug}`}
                data={generateBlogSchema(blog)}
            />
        </>
    );
}
