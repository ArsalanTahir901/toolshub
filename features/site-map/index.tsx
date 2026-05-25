import { Card } from "@/components/card"
import { CardAnchor } from "@/components/card/card-anchor"
import { GoogleAd } from "@/components/google-ad"
import { icons } from "@/components/icons"
import { Section } from "@/components/section"
import { SectionIntro } from "@/components/section-intro"
import { config } from "@/config"
import { paths } from "@/constants"
import { toolsArray } from "@/features/tools/registry"

export const SiteMap = () => {

    const { siteName } = config

    const mainPages = [
        {
            icon: icons.home,
            title: 'Homepage, All Tools',
            subtitle: `${siteName}`,
            href: paths.home.href,
        },
        {
            icon: icons.envelope,
            title: 'Contact Us',
            subtitle: `${siteName}/contact`,
            href: paths.contact.href
        },
        {
            icon: icons.lock,
            title: 'Privacy Policy',
            subtitle: `${siteName}/privacy`,
            href: paths.privacy.href
        },
        {
            icon: icons.copy,
            title: 'Terms of Services',
            subtitle: `${siteName}/terms`,
            href: paths.terms.href
        },
        {
            icon: icons.robot,
            title: 'Sitemap (for Google)',
            subtitle: `${siteName}/sitemap`,
            href: paths.sitemap.href
        },
    ];

    return (
        <Section aria-label="Site map" className="p-0!">
            <div className="text-center">
                <SectionIntro
                    title={icons.map}
                    gradientText="Sitemap"
                    description={`All pages and tools available on ${siteName}`}
                />
            </div>
            <div className="space-y-6">
                <Card heading={`${icons.ranch} Free Online Tools`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
                        {toolsArray.map((tool) => (
                            <CardAnchor
                                key={tool.slug}
                                href={tool.href}
                                icon={tool?.icon?.text}
                                title={tool.title}
                                subtitle={tool.description}
                            />
                        ))}
                    </div>
                </Card>
                <Card heading="📄 Main Pages">
                    <div className="grid grid-cols-1 gap-3.5 mt-4">
                        {mainPages.map((tool) => (
                            <CardAnchor
                                key={tool.title}
                                {...tool}
                                className="items-center!"
                                contentClassName="flex items-center flex-1"
                                titleClassName="flex-1"
                                subtitleClassName="lowercase"
                            />
                        ))}
                    </div>
                </Card>
                <GoogleAd />
            </div>
        </Section>
    )
}