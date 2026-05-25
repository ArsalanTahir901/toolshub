import { icons } from "@/components/icons"
import { Legal } from "@/components/legal"
import { Link } from "@/components/link"
import { config } from "@/config"
import { paths, thirdPartyPaths } from "@/constants"

export const Privacy = () => {
    const { siteName, mailto, } = config
    const data = [
        {
            title: 'Information We Collect',
            description: <>
                {siteName} is designed with privacy as a core principle. We do not collect:
                <ul>
                    <li>Any text you enter into our tools</li>
                    <li>Passwords you generate</li>
                    <li>Files you process</li>
                    <li>Personal identifying information</li>
                </ul>
                All tool processing happens locally in your browser. Your data never leaves your device.
            </>,
        },
        {
            title: thirdPartyPaths.googleAdsense.title,
            description: <>
                We display advertisements through {thirdPartyPaths.googleAdsense.title}. Google may use cookies to show relevant ads based on your browsing history. You can opt out of personalized ads by visiting
                &nbsp;<Link variant="underline" {...thirdPartyPaths.googleAdsense}>{thirdPartyPaths.googleAdsense.title}</Link>
            </>,
        },
        {
            title: 'Third-Party Links',
            description: <>
                Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.
            </>
        },
        {
            title: "Children's Privacy",
            description: <>
                {siteName} does not knowingly collect information from children under 13. Our tools are general-purpose utilities suitable for all ages.
            </>
        },
        {
            title: 'Changes to This Policy',
            description: <>
                We may update this Privacy Policy occasionally. Changes will be reflected by the &quot;Last updated&quot; date at the top of this page.
            </>
        },
        {
            title: 'Contact Us',
            description: <>
                Questions about this policy? Reach us at our
                &nbsp;<Link variant="underline" {...paths.contact}>{paths.contact.title} Page</Link>&nbsp; or email
                &nbsp;<Link href={mailto} variant="underline">{mailto}</Link>
            </>
        },
    ]

    return (
        <Legal
            title={icons.lock}
            gradientText="Privacy Policy"
            shortVersion={`We don't collect, store, or sell any of your data. All tools run 100% inside your browser. Nothing is sent to our servers.`}
            data={data}
        />

    )
}