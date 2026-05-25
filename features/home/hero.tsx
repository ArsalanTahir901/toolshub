import { Badge } from "@/components/badge"
import { icons } from "@/components/icons"
import { Section } from "@/components/section"
import { SectionIntro } from "@/components/section-intro"

export const Hero = () => {
    return (
        <Section aria-label="hero section">
            <div className="text-center space-y-6">
                <Badge
                    variant="premium"
                    title={`${icons.rocket} 100% Free · Instant Results`}
                    className="text-sm!"
                />
                <SectionIntro
                    title="The Best Free Online"
                    gradientText="Productivity Tools"
                    description="Word counter, password generator, case converter, Base64 encoder and more, all free, all instant."
                />
            </div>
        </Section>
    )
}