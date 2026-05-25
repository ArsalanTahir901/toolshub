import { config } from "@/config"
import { Card } from "../card"
import { Section } from "../section"
import { SectionIntro } from "../section-intro"
import { GoogleAd } from "../google-ad"
import { ReactNode } from "react"
import './style.css';

interface Props {
    title: string;
    gradientText: string
    shortVersion: string
    data: { title: string, description: ReactNode }[]
}

export const Legal = ({ gradientText, title, data, shortVersion }: Props) => {

    return (
        <Section aria-label={gradientText} className="p-0!">
            <div className="text-center">
                <SectionIntro
                    title={title}
                    gradientText={gradientText}
                    description={`Last updated: ${config.lastUpdated}`}
                />
            </div>
            <Card>
                <div className="info-box">
                    <strong>🌟 Short version:</strong>&nbsp;{shortVersion}
                </div>
                <div>
                    {data.map((item, i) => (
                        <div key={item.title + i} className="content-section">
                            <div>
                                <h2>{i + 1}- {item.title}</h2>
                                <div className="desc">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <GoogleAd />
        </Section>
    )
}