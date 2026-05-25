import { config } from "@/config";

export const generateWebsiteSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: config.siteName,
        url: config.domainUrl,
        operatingSystem: "All",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
};
