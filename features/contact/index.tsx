'use client'
import { Button } from "@/components/buttons"
import { Card } from "@/components/card"
import { Section } from "@/components/section"
import { SectionIntro } from "@/components/section-intro"
import { ToolCard } from "@/components/tool-card"
import { config } from "@/config"
import Link from "next/link"
import { useContact } from "./useContact"
import { GoogleAd } from "@/components/google-ad"
import { ErrorMsg } from "@/components/error-msg"
import { icons } from "@/components/icons"
import { Label } from "@/components/label"

export const Contact = () => {

    const cards = [
        {
            icon: icons.bug,
            title: 'Report a Bug',
            description: "Something broken? Let us know and we'll fix it fast."
        },
        {
            icon: icons.bulb,
            title: 'Suggest a Tool',
            description: "Have an idea for a new tool? We'd love to build it."
        },
        {
            icon: icons.handshake,
            title: 'Partnership',
            description: "Want to collaborate or advertise? Let's talk."
        },
    ];

    const { fields, onChange, onSubmit, subjects, errors } = useContact();

    return (
        <Section aria-label="Contact page" className="p-0!">
            <div className="text-center">
                <SectionIntro
                    title={icons.envelope}
                    gradientText="Get in Touch"
                    description="Bug report, feature request, or just want to say hi? We're all ears."
                />
            </div>

            <div className="mt-3 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                    {cards.map((card) => (
                        <ToolCard
                            key={card.title}
                            icon={{ text: card.icon, className: 'mx-auto! icon-purple' }}
                            heading={card.title}
                            description={card.description}
                            className="text-center!"
                        />
                    ))}
                </div>
                <Card heading={`${icons.envelope} Send a Message`}>
                    <form
                        aria-label="contact form"
                        className="grid grid-cols-1 gap-4 mt-6"
                        onSubmit={onSubmit}
                    >
                        <div className="hidden opacity-0">
                            <input
                                id='website'
                                type="text"
                                name="website"
                                autoComplete="off"
                                tabIndex={-1}
                                className="hidden"
                            />
                        </div>
                        <div>
                            <Label htmlFor="name">Your Name</Label>
                            <input
                                type='text'
                                id="name"
                                name='name'
                                value={fields.name}
                                onChange={onChange}
                                placeholder="Enter your name"
                                aria-label="name input"
                            />
                            <ErrorMsg error={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                value={fields.email}
                                onChange={onChange}
                                placeholder="Enter your email"
                                aria-label="email input"
                            />
                            <ErrorMsg error={errors.email} />
                        </div>
                        <div>
                            <Label htmlFor="subject">Subject</Label>
                            <select
                                id="subject"
                                name='subject'
                                aria-label="subject input"
                                value={fields.subject}
                                onChange={onChange}
                            >
                                {subjects.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.icon} {option.label}
                                    </option>
                                ))}
                            </select>
                            <ErrorMsg error={errors.subject} />
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                value={fields.message}
                                onChange={onChange}
                                name="message"
                                id="message"
                                rows={5}
                            />
                            <ErrorMsg error={errors.message} />
                        </div>
                        <Button variant="glow" type="submit">Send Message {icons.rocket}</Button>

                        <div className="text-center mt-7 text-(--muted) text-sm">
                            Or email us directly at
                            <Link
                                href={config.mailto}
                                className="text-(--accent) no-underline ml-1"
                            >
                                {config.mailto}
                            </Link>
                        </div>
                    </form>
                </Card>
                <GoogleAd />
            </div>
        </Section>
    )
}