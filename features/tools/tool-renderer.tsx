"use client";

import { ToolCardSkeleton } from "@/components/skeletons/tool-card";
import { ToolsConstantKeyEnums } from "@/types/tools";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

const loading = () => <ToolCardSkeleton />;

const toolComponents: Record<ToolsConstantKeyEnums, ComponentType> = {
    [ToolsConstantKeyEnums.WORD_COUNTER]: dynamic(() => import("@/features/tools/word-counter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.PASSWORD_GENERATOR]: dynamic(() => import("@/features/tools/password-generator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.CASE_CONVERTER]: dynamic(() => import("@/features/tools/case-converter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.LOREM_IPSUM]: dynamic(() => import("@/features/tools/lorem-ipsum-generator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.URL_SLUG]: dynamic(() => import("@/features/tools/url-slug-generator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.BASE_64]: dynamic(() => import("@/features/tools/base-converter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.QR_CODE]: dynamic(() => import("@/features/tools/qr-code-generator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.JSON_FORMATTER]: dynamic(() => import("@/features/tools/json-formatter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.HASH_GENERATOR]: dynamic(() => import("@/features/tools/hash-generator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.REGEX_TESTER]: dynamic(() => import("@/features/tools/regex-tester").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.COLOR_CONVERTER]: dynamic(() => import("@/features/tools/color-converter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.TIME_STAMP_CONVERTER]: dynamic(() => import("@/features/tools/time-stamp-converter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR]: dynamic(() => import("@/features/tools/percentage-calculator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.MARKDOWN_EDITOR]: dynamic(() => import("@/features/tools/markdown-html-converter").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.DIFF_CHECKER]: dynamic(() => import("@/features/tools/diff-checker").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.META_TAG_GENERATOR]: dynamic(() => import("@/features/tools/meta-tag-generator").then((mod) => mod.default), { loading }),
    [ToolsConstantKeyEnums.CRON_PARSER]: dynamic(() => import('@/features/tools/cron-parser').then(mod => mod.default), { loading }),
    [ToolsConstantKeyEnums.URL_ENCODE_DECODE]: dynamic(() => import('@/features/tools/url-encode-decode').then(mod => mod.default), { loading }),
    [ToolsConstantKeyEnums.JWT_DECODE]: dynamic(() => import('@/features/tools/jwt-decode').then(mod => mod.default), { loading })
};

export const ToolRenderer = ({ slug }: { slug: ToolsConstantKeyEnums }) => {
    const Component = toolComponents[slug];

    return <Component />;
};
