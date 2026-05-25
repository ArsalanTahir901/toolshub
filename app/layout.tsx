import type { Metadata } from "next";
import { AppLayout } from "@/layout";
import { Providers } from "@/providers";
import "./globals.css";
import { config } from "@/config";
import { BreadCrumbs } from "@/components/breadcrumbs";
import { seoConfig } from "@/seo/config";

const url = config.domainUrl;

export const metadata: Metadata = {
  metadataBase: new URL(url),

  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${config.siteName}`,
  },

  description: seoConfig.defaultDescription,

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    siteName: config.siteName,
    type: "website",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url,
    images: [
      {
        url: seoConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: config.siteName,
      },
    ],
  },

  alternates: {
    canonical: url,
  },

  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    creator: seoConfig.twitterHandle,
    images: [seoConfig.defaultImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AppLayout>
          <Providers>
            <BreadCrumbs />
            {children}
          </Providers>
        </AppLayout>
      </body>
    </html>
  );
}
