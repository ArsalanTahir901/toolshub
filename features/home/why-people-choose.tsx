import { icons } from "@/components/icons"
import { Section } from "@/components/section"
import { SectionIntro } from "@/components/section-intro"
import { ToolCard } from "@/components/tool-card"
import { config } from "@/config"

export const WhyPeopleChoose = () => {
    const data = [
        {
            icon: { text: icons.zap, className: 'icon-purple' },
            title: 'Instant Results',
            description: 'All tools process in milliseconds directly in your browser. No server round-trips, no waiting, no lag. Just results.'
        },
        {
            icon: { text: icons.lockkey, className: 'icon-teal' },
            title: '100% Private',
            description: "Your text never leaves your device. We don't log, store, or sell anything you type. Full privacy, always."
        },
        {
            icon: { text: icons.free, className: 'icon-red' },
            title: 'Always Free',
            description: "Every tool on ToolsHub is free forever. No paywalls, no trial limits, no credit card required. Ever."
        },
        {
            icon: { text: icons.robot, className: 'icon-blue' },
            title: 'AI-Powered Tools',
            description: "Beyond simple utilities our AI tools help you write, summarize, paraphrase, and create content in seconds."
        },
        {
            icon: { text: icons.mobile, className: 'icon-green' },
            title: 'Works Everywhere',
            description: "Fully responsive design. Works perfectly on desktop, tablet, and mobile. No app download needed."
        },
        {
            icon: { text: icons.recycle, className: 'icon-violet' },
            title: 'Always Updated',
            description: "We constantly add new tools based on user feedback. New tools every month. Suggest a tool anytime."
        },
    ]

    return (
        <Section aria-label="why people choose">
            <div className="text-center">
                <SectionIntro
                    title='Why People Choose'
                    gradientText={`${config.siteName}`}
                    description="Everything you need to get work done, fast, free, and private."
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {data.map((item, i) => (
                    <ToolCard
                        key={item.title}
                        className="relative before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(124,92,252,.05)_0%,transparent_60%)] before:content-['']"
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        tag={{ 
                            text: `0${i + 1}`, 
                            className:'bg-transparent! border-none! text-4xl! opacity-10!'
                         }}
                    >
                    </ToolCard>
                ))}
            </div>
        </Section>
    )
}