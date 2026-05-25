import { Button } from "@/components/buttons"
import { icons } from "@/components/icons"
import { Section } from "@/components/section"
import { SectionTitle } from "@/components/section-title"
import { ToolCard } from "@/components/tool-card"
import { paths } from "@/constants"

export const NewAiTools = () => {
    return (
        <Section>
            <SectionTitle
                title={`${icons.robot} AI Tools`}
                action={<Button href={paths.ai_tools.href}>All AI Tools →</Button>}
            />
            <div className="page-container">
                <ToolCard
                    tag={{ text: `${icons.magic} New AI Tools`, variant: 'premium' }}
                    title="Meet Our AI-Powered Tools"
                    description="Beyond simple text utilities. our AI tools use the power of large language models to help you write, rewrite, summarize, and create content 10x faster."
                    defaultOpen
                    footer={<Button variant="glow" href={paths.ai_tools.href}>Explore AI Tools →</Button>}
                >
                    ✍️ AI Writer
                    🔄 Paraphraser
                    📋 Summarizer
                    🐛 Grammar Fixer
                    💡 Idea Generator
                </ToolCard>
            </div>
        </Section>
    )
}