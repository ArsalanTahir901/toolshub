import { Button } from "@/components/buttons"
import { Section } from "@/components/section"
import { SectionIntro } from "@/components/section-intro"
import { paths } from "@/constants"

export const CTA = () => {
    return (
        <Section aria-label="cta" className="text-center space-y-4">
            <SectionIntro
                title="Start Using"
                gradientText="Tools Right Now"
                description="No signup. No download. No credit card. Just open a tool and get to work."
            />
            <div className="flex items-center justify-center flex-wrap gap-4">
                <Button variant="glow" href={paths.tools.href}>
                    Browse All Tools →
                    </Button>
                <Button>Create Free Account</Button>
            </div>
        </Section>
    )
}