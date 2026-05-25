"use client";

import Link from "next/link";
import { useBreadcrumbs } from "./useBreadcrumbs";
import { icons } from "../icons";
import { JsonLd } from "@/seo/schemas/json-ld";
import { generateBreadcrumbSchema } from "@/seo/schemas/generate-breadcrumb-schema";

export const BreadCrumbs = () => {
    const { items, isMatched } = useBreadcrumbs();

    // Don't render on home page or if no items
    if (!items.length) return null;

    const allItems = [
        { label: "Home", href: "/", icon: icons.home },
        ...items,
    ];

    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className={`w-full overflow-x-auto ${isMatched ? '' : 'page-container mb-6 '} page-padding`}
            >
                <ol className="inline-flex items-center gap-2 flex-wrap rounded-lg backdrop-blur-md">
                    {allItems.map((item, index) => {
                        const isLast = index === allItems.length - 1;

                        return (
                            <li
                                key={`${item.label}-${index}`}
                                className="inline-flex items-center gap-2"
                            >
                                <span
                                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm shadow-sm ${isLast ? "ring-1 ring-cyan-400/30" : ""
                                        }`}
                                    aria-hidden="true"
                                >
                                    {item.icon ?? "📄"}
                                </span>

                                {!isLast ? (
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-cyan-400"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className="text-sm font-medium bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                                        aria-current="page"
                                    >
                                        {item.label}
                                    </span>
                                )}

                                {!isLast && (
                                    <span
                                        className="text-zinc-600 text-sm"
                                        aria-hidden="true"
                                    >
                                        /
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            <JsonLd
                id="breadcrumb-schema"
                data={generateBreadcrumbSchema(items)}
            />
        </>
    );
};