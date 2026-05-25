import { combineSchemas } from '@/seo/schemas/combine-schema';
import { Home } from '@/features/home';
import { generateOrgSchema } from '@/seo/schemas/generate-org-schema';
import { generateWebsiteSchema } from '@/seo/schemas/generate-website-schema';
import { JsonLd } from '@/seo/schemas/json-ld';
import { createPageMetadata } from '@/seo/meta/create-page-meta';
import { config } from '@/config';

export const metadata = createPageMetadata({
  title: `${config.siteName} - Free Online Developer and Productivity Tools`,
  description: "Use free browser-based tools for writing, development, SEO, passwords, JSON, Base64, QR codes, colors, timestamps, percentages, Markdown, and diffs.",
  path: "/",
  keywords: ["free online tools", "developer tools", "browser based tools", "productivity tools", "seo tools"],
});

export default function page() {
  return (
    <>
      <main>
        <Home />
      </main>
      <JsonLd
        id='homepage-schema'
        data={combineSchemas(
          generateWebsiteSchema(),
          generateOrgSchema()
        )}
      />
    </>
  );
}
