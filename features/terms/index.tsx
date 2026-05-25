import { icons } from "@/components/icons"
import { Legal } from "@/components/legal"
import { Link } from "@/components/link"
import { config } from "@/config"
import { paths } from "@/constants"

export const Terms = () => {
    const { siteName, mailto } = config
    const data = [
        {
            title: 'Acceptance of Terms',
            description: <>
                By accessing and using {siteName} (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the Service.
            </>,
        },
        {
            title: 'Description of Service',
            description: <>
                {siteName} provides a collection of free, browser-based online tools including but not limited to: word counters, password generators, text case converters, Base64 encoders/decoders, URL slug generators, Lorem Ipsum generators and more.
                <br />
                All tools are provided free of charge and without any requirement to register or create an account.
            </>,
        },
        {
            title: 'Acceptable Use',
            description: <>
                You agree to use {siteName} only for lawful purposes. You must not:
                <ul className="mt-3 text-sm space-y-2">
                    <li><span></span> Use the Service to engage in any illegal or harmful activity</li>
                    <li>Attempt to reverse-engineer, scrape, or overload the Service</li>
                    <li>Use automated bots or scripts to abuse the Service</li>
                    <li>Attempt to gain unauthorized access to any systems</li>
                    <li>Use the Service to harm, harass, or deceive others</li>
                </ul>
            </>
        },
        {
            title: 'Disclaimer of Warranties',
            description: <>
                {siteName} is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or completely accurate. Use of any tool, especially the password generator, should be combined with other security best practices.
            </>
        },
        {
            title: 'Limitation of Liability',
            description: <>
                To the maximum extent permitted by law, {siteName} and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use the Service.
            </>
        },
        {
            title: 'Intellectual Property',
            description: <>
                All design, code, and content on {siteName} (excluding user-entered text) is the intellectual property of {siteName}. You may not copy, redistribute, or resell the Service without permission.
            </>
        },
        {
            title: 'Third-Party Advertising',
            description: <>
                We use Google AdSense to display advertisements. These ads are served by Google and are subject to Google&apos;s own Terms of Service and Privacy Policy.
            </>
        },
        {
            title: 'Changes to Terms',
            description: <>
                We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </>
        },
        {
            title: 'Governing Law',
            description: <>
                These Terms are governed by applicable law. Any disputes shall be resolved through good-faith negotiation before any legal proceedings.
            </>
        },
        {
            title: 'Contact',
            description: <>
                For questions about these Terms, please visit our&nbsp;
                <Link variant="underline" {...paths.contact}>{paths.contact.title} page</Link>&nbsp;
                or email <Link href={mailto} variant="underline">{mailto}</Link>
            </>
        }
    ]

    return (
        <Legal
            title={icons.copy}
            gradientText="Terms of Service"
            shortVersion={`Use our tools freely and responsibly. Don't misuse the service or attempt to harm others with it. That's basically it.`}
            data={data}
        />
    )
}