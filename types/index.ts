import { MouseEventHandler, ReactNode } from "react"

interface Children_Type {
    children: React.ReactNode
}

type LinkVariantType = 'ghost' | 'underline';

type LinkProps = {
    href: string
    title?: string
    children: ReactNode
    className?: string
    isActive?: boolean;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    variant?: LinkVariantType;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
}

type LinkVariant = Record<LinkVariantType, string>

type BreadCrumbsProps = {
    items?: {
        label: string;
        href?: string;
        icon?: string;
    }[];
};

type BlogArticleType = {
    slug: string;
    title: string;
    metaDescription: string;
    publishedAt: string;
    readingTimeMinutes: number;
    tags: string[];
    seoTitle?: string;
    updatedAt?: string;
    content: {
        introduction: string;
        sections: {
            heading: string;
            body: string;
        }[];
        conclusion: string;
    };
};

export type {
    BreadCrumbsProps,
    BlogArticleType,
    Children_Type,
    LinkVariant,
    LinkProps,
    LinkVariantType
}