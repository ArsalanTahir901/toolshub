import { Card } from "@/components/card"
import { icons } from "@/components/icons"
import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { config } from "@/config"
import { generateFAQSchema } from "@/seo/schemas/generate-faq-schema"
import { JsonLd } from "@/seo/schemas/json-ld"

export const FAQ = () => {

    const siteName = config.siteName;
    const data = [
        {
            question: 'Are all tools really free?',
            answer:
                `Yes - every tool on ${siteName} is completely free to use. There are no subscriptions, hidden charges, usage caps, or locked premium features. Whether you're using a simple converter, developer utility, writing assistant, or AI-powered tool, you get full access without creating an account or entering payment details. Our goal is to build genuinely useful tools that stay accessible to everyone.`
        },
        {
            question: 'Do I need to create an account to use the tools?',
            answer:
                "No signup is required for most tools. You can open a tool and start using it instantly. We intentionally keep the experience fast and frictionless - no lengthy registration forms, no unnecessary onboarding, and no spam emails. If we ever add optional accounts in the future, the core tools will still remain publicly accessible."
        },
        {
            question: 'Is my data safe? Do you store what I type?',
            answer:
                "Privacy is a major priority for us. Most tools process everything directly inside your browser, which means your text, code, passwords, or files never get uploaded to our servers. We don't track or store the content you paste into standard tools. You can even inspect the Network tab in DevTools to verify that no sensitive data is being transmitted during local processing."
        },
        {
            question: 'How do the AI tools work?',
            answer:
                "AI-powered tools work differently from regular browser-based utilities. When you use an AI feature, your input is securely sent to a language model API so it can generate a response. These requests are processed temporarily and are not permanently stored by us. We also avoid using AI prompts for advertising, profiling, or selling user data."
        },
        {
            question: 'Are the generated passwords secure?',
            answer:
                "Yes. Our password generator creates passwords locally inside your browser using secure randomization methods. Generated passwords are never transmitted over the network or saved in a database. Because everything happens on-device, only you can see or copy the generated result."
        },
        {
            question: 'Can I use these tools on mobile devices?',
            answer:
                `Absolutely. ${siteName} is fully responsive and designed to work across phones, tablets, laptops, and desktop computers. Whether you're editing text, converting files, generating passwords, or using AI tools, the experience is optimized for both touch and keyboard-based devices.`
        },
        {
            question: 'Do the tools work offline?',
            answer:
                "Many tools continue working even without an internet connection because they run entirely in the browser. Examples include formatters, converters, calculators, generators, and text utilities. However, AI-powered features and tools that rely on external APIs still require an active internet connection."
        },
        {
            question: 'Can I suggest a new tool or feature?',
            answer:
                "Definitely. We actively build tools based on user feedback and real-world developer needs. If there's a utility, converter, calculator, or workflow tool you'd like to see added, send us a feature request through the Contact page. Community suggestions directly influence our roadmap."
        },
        {
            question: 'Why are there no ads, popups, or intrusive banners?',
            answer:
                `We believe utility websites should feel fast, clean, and distraction-free. Many tool websites overload users with aggressive ads and tracking scripts, which slows everything down. ${siteName} focuses on performance, usability, and simplicity first - especially for developers and productivity-focused users.`
        },
        {
            question: 'How often are new tools added?',
            answer:
                "New tools, improvements, and feature updates are released regularly. We continuously refine existing utilities, improve performance, fix edge cases, and expand the collection based on analytics and community requests. The platform is actively maintained rather than being a static collection of abandoned tools."
        },
    ]
    return (
        <>
            <Section aria-label="faq">
                <SectionTitle title={`${icons.question} FAQs`} />
                <section className="page-container">
                    <Card className="space-y-4">
                        {data.map((item, i) => (
                            <details key={item.question + i}>
                                <summary className="cursor-pointer leading-relaxed">{item.question}</summary>
                                <p className="pl-4 mt-2 text-(--muted)">{item.answer}</p>
                            </details>
                        ))}
                    </Card>
                </section>
            </Section>
            <JsonLd
                id='faq-schema'
                data={generateFAQSchema(data)}
            />
        </>
    )
}