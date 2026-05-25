import { icons } from "@/components/icons";
import { config } from "@/config";
import { toolsConstant } from "@/features/tools/registry";
import { toolsArray } from "@/features/tools/registry";
import { ToolsConstantKeyEnums } from "@/types/tools";

export const aboutContent = {

    hero: {
        icon: icons.zap,
        heading: "Built for People",
        gradientText: 'Who Just Want Things to Work',
        subheading: `${config.siteName} is a free, no-login, no-nonsense collection of online tools for writers, developers, designers, and everyday users who need fast, reliable results without the friction.`,
    },

    story: {
        icon: icons.bulb,
        heading: "Why We Built This",
        content: `We got tired of the same experience every time we needed a simple tool online - cookie banners, forced sign-ups, paywalls after two uses, and ads covering half the screen.\n\nEvery tool we needed existed somewhere, but using it felt like a chore. So we built ${config.siteName}: a clean, fast, always-free alternative where you can open a tool, get your result, and move on with your day.\n\nNo accounts. No data collection. Just tools that work.`,
    },

    mission: {
        icon: icons.target,
        heading: "Our Mission",
        content: `To make everyday digital tasks faster and simpler for everyone - whether you're a student checking your word count, a developer decoding a JWT, a designer converting a color code, or a marketer building a URL slug.\n\nWe believe useful tools should be free and accessible to everyone, not locked behind subscriptions or cluttered with distractions.`,
    },

    whatWeOffer: {
        icon: icons.briefcase,
        heading: "What You'll Find Here",
        intro: `${config.siteName} currently offers ${toolsArray.length} free tools across writing, development, design, and math - with more on the way.`,
        categories: [
            {
                icon: icons.writing,
                name: "Writing Tools",
                description: "Tools for writers, bloggers, students, and content creators.",
                tools: [
                    toolsConstant[ToolsConstantKeyEnums.WORD_COUNTER],
                    toolsConstant[ToolsConstantKeyEnums.CASE_CONVERTER],
                    toolsConstant[ToolsConstantKeyEnums.LOREM_IPSUM],
                ]
            },
            {
                icon: icons.laptop,
                name: "Developer Tools",
                description: "Tools built for developers, engineers, and technical users.",
                tools: [
                    toolsConstant[ToolsConstantKeyEnums.BASE_64],
                    toolsConstant[ToolsConstantKeyEnums.JSON_FORMATTER],
                    toolsConstant[ToolsConstantKeyEnums.HASH_GENERATOR],
                    toolsConstant[ToolsConstantKeyEnums.REGEX_TESTER],
                    toolsConstant[ToolsConstantKeyEnums.TIME_STAMP_CONVERTER],
                ]
            },
            {
                icon: icons.link,
                name: "SEO & URL Tools",
                description: "Tools for marketers, content managers, and SEO professionals.",
                tools: [
                    toolsConstant[ToolsConstantKeyEnums.URL_SLUG],
                    toolsConstant[ToolsConstantKeyEnums.QR_CODE]
                ]
            },
            {
                icon: icons.palette,
                name: "Design & Math Tools",
                description: "Tools for designers, students, and everyday users.",
                tools: [
                    toolsConstant[ToolsConstantKeyEnums.COLOR_CONVERTER],
                    toolsConstant[ToolsConstantKeyEnums.PASSWORD_GENERATOR],
                    toolsConstant[ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR]
                ]
            },
        ]
    },

    whyChooseUs: {
        icon: icons.check,
        heading: `Why ${config.siteName}`,
        points: [
            {
                icon: icons.free,
                heading: "Completely Free",
                description: `Every tool on ${config.siteName} is free to use with no usage limits, no trial periods, and no hidden charges. We don't believe in paywalling basic utilities.`
            },
            {
                icon: icons.door,
                heading: "No Sign-Up Required",
                description: "You don't need an account, an email address, or a password to use any tool. Open the page and start working immediately."
            },
            {
                icon: icons.lock,
                heading: "Your Data Stays Private",
                description: `Almost everything on ${config.siteName} runs directly in your browser. Your text, files, and data are never uploaded to our servers, never stored, and never shared with anyone.`
            },
            {
                icon: icons.zap,
                heading: "Fast and Lightweight",
                description: "Every tool is built to load fast and respond instantly. No heavy frameworks, no unnecessary requests, no waiting around."
            },
            {
                icon: icons.mobile,
                heading: "Works on Any Device",
                description: `${config.siteName} is fully responsive and works on desktop, tablet, and mobile without needing to install anything.`
            },
        ]
    },

    privacy: {
        icon: icons.lock,
        heading: "A Note on Privacy",
        content: "We take privacy seriously - not as a marketing line, but as a design principle.\n\nMost of our tools process everything locally in your browser using JavaScript and the native WebCrypto API. That means your text, files, passwords, and data never leave your device. There's no database storing what you typed, no logs of what you searched, and no third-party trackers analyzing your behavior.\n\nFor tools that don't require any server interaction at all - like the Word Counter, JSON Formatter, Hash Generator, and Password Generator - the processing is entirely client-side from start to finish.",
    },

    whoItsFor: {
        icon: icons.users,
        heading: `Who Uses ${config.siteName}`,
        groups: [
            {
                icon: icons.graduationCap,
                name: "Students",
                description: "Check essay word counts, convert units, calculate grades, and format academic content without signing up for anything."
            },
            {
                icon: icons.writing,
                name: "Writers & Bloggers",
                description: "Track word and character counts, format headlines with the correct case, and generate SEO-friendly slugs for every post."
            },
            {
                icon: icons.laptop,
                name: "Developers",
                description: "Debug JWT tokens, format JSON responses, test regex patterns, generate hashes, convert timestamps, and encode or decode Base64 - all in one place."
            },
            {
                icon: icons.palette,
                name: "Designers",
                description: "Convert colors between HEX, RGB, HSL, and CMYK, generate Lorem Ipsum placeholder text, and create QR codes for mockups and presentations."
            },
            {
                icon: icons.graph,
                name: "Marketers & SEO Professionals",
                description: "Build clean URL slugs, check content length against SEO targets, stay within social media character limits, and generate QR codes for campaigns."
            },
            {
                icon: icons.user,
                name: "Everyday Users",
                description: "Calculate tips and discounts, generate secure passwords, create QR codes to share links, and get quick answers without installing anything."
            },
        ]
    },

    closingCta: {
        icon: icons.rocket,
        heading: `Start Using ${config.siteName}`,
        content: "All tools are free, open instantly, and require nothing from you. Pick a tool and get started.",
        buttonText: "Browse All Tools",
    }

}