import { icons } from "@/components/icons";

export enum AIToolsConstantKeyEnums {
    AI_WRITER = "ai-writer",
    PARAPHRASER = "paraphraser",
    SUMMARIZER = "summarizer",
    GRAMMAR_FIXER = "grammar-fixer",
    IDEA_GENERATOR = "idea-generator",
}

type AIToolObject = {
    id: string;
    title: string;
    href: string;
    slug: AIToolsConstantKeyEnums;
    icon: { text: string; className?: string };
    tag: { text: string };
    description: string;
    status: "coming-soon";
};

const aiToolsPrefix = "/ai-tools/";

export const AIToolsConstant: Record<AIToolsConstantKeyEnums, AIToolObject> = {
    [AIToolsConstantKeyEnums.AI_WRITER]: {
        id: "aiWriter",
        title: "AI Writer",
        href: `${aiToolsPrefix}${AIToolsConstantKeyEnums.AI_WRITER}`,
        slug: AIToolsConstantKeyEnums.AI_WRITER,
        icon: { text: icons.magic, className: "icon-purple" },
        tag: { text: "Coming Soon" },
        description: "Draft content ideas, outlines, and short-form copy faster.",
        status: "coming-soon",
    },
    [AIToolsConstantKeyEnums.GRAMMAR_FIXER]: {
        id: "grammarFixer",
        title: "Grammar Fixer",
        href: `${aiToolsPrefix}${AIToolsConstantKeyEnums.GRAMMAR_FIXER}`,
        slug: AIToolsConstantKeyEnums.GRAMMAR_FIXER,
        icon: { text: icons.checkList, className: "icon-green" },
        tag: { text: "Coming Soon" },
        description: "Clean up grammar, spelling, and sentence clarity.",
        status: "coming-soon",
    },
    [AIToolsConstantKeyEnums.IDEA_GENERATOR]: {
        id: "ideaGenerator",
        title: "Idea Generator",
        href: `${aiToolsPrefix}${AIToolsConstantKeyEnums.IDEA_GENERATOR}`,
        slug: AIToolsConstantKeyEnums.IDEA_GENERATOR,
        icon: { text: icons.bulb, className: "icon-yellow" },
        tag: { text: "Coming Soon" },
        description: "Generate content, product, and campaign ideas quickly.",
        status: "coming-soon",
    },
    [AIToolsConstantKeyEnums.PARAPHRASER]: {
        id: "paraphraser",
        title: "Paraphraser",
        href: `${aiToolsPrefix}${AIToolsConstantKeyEnums.PARAPHRASER}`,
        slug: AIToolsConstantKeyEnums.PARAPHRASER,
        icon: { text: icons.writing, className: "icon-blue" },
        tag: { text: "Coming Soon" },
        description: "Rewrite text while preserving the original meaning.",
        status: "coming-soon",
    },
    [AIToolsConstantKeyEnums.SUMMARIZER]: {
        id: "summarizer",
        title: "Summarizer",
        href: `${aiToolsPrefix}${AIToolsConstantKeyEnums.SUMMARIZER}`,
        slug: AIToolsConstantKeyEnums.SUMMARIZER,
        icon: { text: icons.page, className: "icon-teal" },
        tag: { text: "Coming Soon" },
        description: "Turn long text into concise summaries.",
        status: "coming-soon",
    },
};

export const aiToolsArray = Object.values(AIToolsConstant);
