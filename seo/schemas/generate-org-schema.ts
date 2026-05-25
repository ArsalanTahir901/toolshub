import { config } from "@/config";

export const generateOrgSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: config.siteName,
        url: config.domainUrl,
        logo: `${config.domainUrl}/android-chrome-512x512.png`
    };
};