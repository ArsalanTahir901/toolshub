import { SectionIntro } from "@/components/section-intro"
import { aboutContent } from "./data"
import { Card } from "@/components/card";
import { CardAnchor } from "@/components/card/card-anchor";
import { Button } from "@/components/buttons";
import Link from "next/link";
import { GoogleAd } from "@/components/google-ad";

export const About = () => {
    const {
        hero,
        story,
        mission,
        whatWeOffer,
        whyChooseUs,
        privacy,
        whoItsFor,
        closingCta
    } = aboutContent;
    return (
        <div>
            <div className="text-center">
                <SectionIntro
                    title={hero.icon}
                    gradientText={`${hero.heading} ${hero.gradientText}`}
                    description={hero.subheading}
                />
            </div>
            <div className="space-y-5 mt-3">
                {/* story */}
                <Card heading={`${story.icon} ${story.heading}`}>
                    <p className="text-sm text-(--muted)">{story.content}</p>
                </Card>

                {/* mission */}
                <Card heading={`${mission.icon} ${mission.heading}`}>
                    <p className="text-sm text-(--muted)">{mission.content}</p>
                </Card>

                {/* What we offer */}
                <Card heading={`${whatWeOffer.icon} ${whatWeOffer.heading}`}>
                    <p className="text-sm text-(--muted)">{whatWeOffer.intro}</p>
                    <ul className="mt-5 space-y-5">
                        {whatWeOffer.categories.map((cat) => (
                            <li key={cat.name}>
                                <div>
                                    {cat.icon} {cat.name}
                                </div>
                                <p className="text-sm text-(--muted)">{cat.description}</p>
                                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {cat.tools.map((tool) => (
                                        <li key={tool.id}>
                                            <CardAnchor
                                                href={tool.href}
                                                icon={tool?.icon?.text}
                                                title={tool.title}
                                                subtitle={tool.description}
                                                className="h-full"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Why choose us */}
                <Card heading={`${whyChooseUs.icon} ${whyChooseUs.heading}`}>
                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {whyChooseUs.points.map((point) => (
                            <li key={point.heading}>
                                <CardAnchor
                                    href="#"
                                    icon={point.icon}
                                    title={point.heading}
                                    subtitle={point.description}
                                    className="h-full cursor-default"
                                />
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* whoItsFor */}
                <Card heading={`${whoItsFor.icon} ${whoItsFor.heading}`}>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {whoItsFor.groups.map((group) => (
                            <li key={group.name}>
                                <CardAnchor
                                    href="#"
                                    title={group.name}
                                    subtitle={group.description}
                                    icon={group.icon}
                                    className="h-full cursor-default"
                                />
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* cta */}
                <Card heading={`${closingCta.icon} ${closingCta.heading}`}>
                    <p className="text-sm text-(--muted) mb-3">{closingCta.content}</p>
                    <Link href='/'>
                        <Button variant="glow">{closingCta.buttonText}</Button>
                    </Link>
                </Card>

                {/* privacy */}
                <Card heading={`${privacy.icon} ${privacy.heading}`}>
                    <p className="text-sm text-(--muted)">{privacy.content}</p>
                </Card>
            </div>
            <GoogleAd />
        </div>
    )
}