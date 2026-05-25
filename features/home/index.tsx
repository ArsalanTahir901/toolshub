import { GoogleAd } from "@/components/google-ad";
import { Stats } from "@/components/stats";
import { PopularTools } from "../popular-tools";
import { CTA } from "./cta";
import { FAQ } from "./faq";
import { Hero } from "./hero";
import { Marquee } from "./marquee";
import { NewAiTools } from "./new-ai-tools";
import { WhyPeopleChoose } from "./why-people-choose";

export const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Marquee />
            <WhyPeopleChoose />
            <PopularTools />
            <NewAiTools />
            <FAQ />
            <CTA />
            <GoogleAd />
        </>
    )
}
