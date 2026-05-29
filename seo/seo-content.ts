import { ToolsConstantKeyEnums } from "@/types/tools";

export type SeoContentType = {
    intro: string,
    whatIsIt: string,
    howToUse: string[],
    benefits: string[],
    faq: { question: string, answer: string }[]
}

export const toolsSeoContent = {
    [ToolsConstantKeyEnums.WORD_COUNTER]: {
        intro: "Whether you're a student trying to hit a minimum word count, a blogger fine-tuning your article length, or a marketer crafting the perfect tweet, our free Word Counter has you covered.\n\nSimply paste your text and instantly get a full breakdown: word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time.\n\nNo sign-up, no ads, no waiting. Just accurate, real-time results you can actually rely on.",
        whatIsIt: "A word counter is an online writing productivity tool that analyzes your text in real time and gives you detailed writing metrics.\n\nBeyond just counting words, it tells you how many characters you've used, how many sentences and paragraphs you have, and how long it would take an average reader to get through your content.\n\nIt's used by students, authors, content marketers, SEO professionals, journalists, and anyone who works with written text on a regular basis.",
        howToUse: [
            "Paste or type your text directly into the editor , it starts counting immediately",
            "Check the live word count, character count, sentence count, and paragraph totals in the stats panel",
            "Use the reading time estimate to gauge whether your content is the right length for your audience",
            "Compare your count against platform limits , Twitter (280 chars), LinkedIn posts (3,000 chars), or essay requirements",
            "Clear the editor and start fresh whenever you need , no data is saved or stored"
        ],
        benefits: [
            "Instantly check essay or assignment word limits without manual counting",
            "Optimize SEO content to the ideal article length for better search rankings",
            "Stay within character limits for Twitter, LinkedIn, Instagram captions, and meta descriptions",
            "Estimate reading time to improve user experience on blog posts and landing pages",
            "Works entirely in your browser , your text never leaves your device",
            "No login required , just open and start typing"
        ],
        faq: [
            {
                question: "How do I count words and characters online for free?",
                answer: "Simply paste or type your text into the word counter tool. It immediately shows your word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time , all in real time, completely free."
            },
            {
                question: "Is this word counter accurate for academic essays and assignments?",
                answer: "Yes. The tool counts words the same way most word processors do , by splitting on whitespace and punctuation. It's reliable for meeting essay word limits, submission guidelines, and academic requirements."
            },
            {
                question: "Can I use this tool to check my SEO content length?",
                answer: "Absolutely. Content length is a known SEO factor for certain types of pages. Most well-ranking blog posts fall between 1,500 and 2,500 words, though this varies by topic and competition. You can use the word counter to stay within your target range while writing."
            },
            {
                question: "Does the word counter work for social media posts?",
                answer: "Yes. You can paste or type your caption, tweet, or post and check it against platform limits. Twitter allows 280 characters, Instagram captions support up to 2,200, and LinkedIn posts go up to 3,000 characters , our tool shows character counts instantly."
            },
            {
                question: "Is my text stored or shared when I use this tool?",
                answer: "No. Everything happens locally in your browser. Your text is not uploaded to any server, stored in a database, or shared with anyone. It's a fully private, client-side tool."
            },
            {
                question: "What is the reading time estimate based on?",
                answer: "Reading time is calculated using the average adult reading speed of approximately 200–250 words per minute. It's a useful estimate for blog posts, articles, and newsletters where reader engagement matters."
            }
        ],
    },

    [ToolsConstantKeyEnums.PASSWORD_GENERATOR]: {
        intro: "Using weak or reused passwords is one of the most common reasons people get hacked. Our free Password Generator creates strong, random, and completely unpredictable passwords in seconds.\n\nCustomize your preferred length, include or exclude uppercase letters, lowercase letters, numbers, and special symbols, then instantly copy your new password.\n\nSince everything runs in your browser, the password is never transmitted or saved anywhere. Fast, private, and more secure than anything you'd come up with on your own.",
        whatIsIt: "A password generator is a security tool that creates random, complex passwords based on rules you define.\n\nUnlike passwords you make up yourself - which often follow patterns, use personal information, or get reused across multiple sites - a generated password is cryptographically random and nearly impossible to guess or brute-force.\n\nPassword generators are widely recommended by cybersecurity professionals, IT teams, and platforms like LastPass, 1Password, and Bitwarden as the safest way to create credentials.",
        howToUse: [
            "Choose your desired password length , 12 characters is a good minimum, 16–20 is even better for sensitive accounts",
            "Select which character types to include: uppercase (A–Z), lowercase (a–z), numbers (0–9), and/or symbols (!@#$...)",
            "Click Generate to instantly create a random password based on your settings",
            "Use the copy button to copy the password to your clipboard with one click",
            "Save your new password in a password manager like Bitwarden, 1Password, or your browser's built-in vault"
        ],
        benefits: [
            "Generates truly random passwords that are extremely difficult to crack",
            "Reduces your risk of being hacked through weak or reused credentials",
            "Fully customizable , control length, character types, and complexity",
            "Passwords are generated client-side and never stored or transmitted",
            "Saves time compared to thinking up and testing passwords manually",
            "Useful for developers, sysadmins, and anyone managing multiple online accounts"
        ],
        faq: [
            {
                question: "What makes a password strong and secure?",
                answer: "A strong password is long (at least 12–16 characters), uses a mix of uppercase and lowercase letters, includes numbers and special symbols, and has no predictable patterns or dictionary words. Our generator creates passwords that meet all of these criteria."
            },
            {
                question: "Is it safe to generate passwords online?",
                answer: "Yes , as long as the tool processes everything locally in your browser without sending data to a server. Our password generator works entirely client-side, meaning the password is generated on your device and never leaves it."
            },
            {
                question: "How long should my password be?",
                answer: "Security experts recommend at least 12–16 characters for most accounts. For high-value accounts like email, banking, or work systems, aim for 20+ characters. Longer passwords are exponentially harder to crack."
            },
            {
                question: "Should I use a password manager with this tool?",
                answer: "Absolutely. Since strong passwords are complex and hard to memorize, we recommend saving generated passwords in a trusted password manager like Bitwarden (free), 1Password, or Dashlane. Don't write passwords down or store them in plain text files."
            },
            {
                question: "Can I generate multiple passwords at once?",
                answer: "You can click Generate multiple times to create different password options with the same settings. Each click produces a new, unique random password."
            },
            {
                question: "Is this tool useful for developers and sysadmins?",
                answer: "Yes. Developers use it to generate API keys, database passwords, secret tokens, and environment variable values. Sysadmins use it for service account credentials and server access passwords."
            }
        ],
    },

    [ToolsConstantKeyEnums.CASE_CONVERTER]: {
        intro: "Stop manually retyping text just to change its capitalization. Our Case Converter tool lets you instantly transform any text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more - all with a single click.\n\nWhether you're a developer renaming variables, a writer formatting headlines, or a marketer cleaning up copy, this tool eliminates the tedious work of reformatting text by hand.\n\nPaste your content, pick your format, and copy the result. That's it.",
        whatIsIt: "A case converter is a text transformation tool that changes the capitalization style of any input text.\n\nDifferent industries and contexts have different naming conventions - code uses camelCase and snake_case, titles use Title Case, legal documents use ALL CAPS, and URLs use kebab-case.\n\nA case converter handles all of these transformations instantly, saving you time and reducing the risk of inconsistent formatting in your work.",
        howToUse: [
            "Paste your text into the input field , any length, any format",
            "Choose your target case from the options: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case",
            "The converted text appears instantly in the output area",
            "Click the copy button to copy the result directly to your clipboard",
            "Paste the formatted text wherever you need it , no extra cleanup required"
        ],
        benefits: [
            "Saves developers time when converting variable names between coding conventions",
            "Instantly format blog titles, headings, and subheadings to Title Case",
            "Clean up messy ALL CAPS text that's hard to read",
            "Convert text to slug-friendly kebab-case for URLs and file names",
            "Useful for data cleaning when working with CSV files or databases",
            "Works on any text , from a single word to multi-paragraph content"
        ],
        faq: [
            {
                question: "What text case formats can I convert to?",
                answer: "You can convert text to UPPERCASE, lowercase, Title Case (every major word capitalized), Sentence case (only the first word capitalized), camelCase (used in JavaScript), PascalCase (used in class names), snake_case (used in Python), and kebab-case (used in URLs and CSS)."
            },
            {
                question: "How is Title Case different from Sentence case?",
                answer: "Title Case capitalizes the first letter of every major word , like a book or article title. Sentence case only capitalizes the very first word of each sentence, like normal written English. Both are useful in different contexts."
            },
            {
                question: "Is case conversion useful for developers?",
                answer: "Extremely useful. Different programming languages have different naming conventions. JavaScript uses camelCase for variables and PascalCase for classes. Python uses snake_case. URLs use kebab-case. Our tool helps you switch between these formats without retyping anything."
            },
            {
                question: "Can I use this to format social media content?",
                answer: "Yes. Many content creators use Title Case for post headlines and ALL CAPS for emphasis. You can quickly format caption titles, hashtag-adjacent text, and branded content to look consistent and polished."
            },
            {
                question: "Does it work with long paragraphs or just single words?",
                answer: "It works with any amount of text , a single word, a sentence, a paragraph, or multiple paragraphs. The conversion applies to all text at once."
            },
            {
                question: "Can I use this to clean up data from spreadsheets?",
                answer: "Yes. If you've exported text from a spreadsheet or database that's inconsistently capitalized, you can paste it here, convert it to the correct case, and paste it back. It's much faster than using Excel formulas."
            }
        ],
    },

    [ToolsConstantKeyEnums.LOREM_IPSUM]: {
        intro: "Every designer and developer knows the feeling - you need to show a client a layout, but the real content isn't ready yet. That's where Lorem Ipsum comes in.\n\nOur Lorem Ipsum Generator lets you create as much placeholder text as you need in seconds: choose the number of paragraphs, sentences, or words, and instantly get clean, print-ready filler text.\n\nIt's the standard placeholder used in graphic design, web development, publishing, and UI prototyping worldwide - and it's completely free to use.",
        whatIsIt: "Lorem Ipsum is a type of placeholder text derived from a Latin text by Cicero, first used by typesetters in the 1500s.\n\nToday it's used by designers, developers, and publishers as dummy content to fill layouts while the real copy is being written. Because it looks like real language but is actually meaningless, it prevents readers and clients from getting distracted by the words and lets them focus on the visual design instead.\n\nLorem Ipsum is supported by virtually every design tool - Figma, Adobe XD, Sketch, InDesign, WordPress, and more.",
        howToUse: [
            "Choose whether you want to generate paragraphs, sentences, or individual words",
            "Set how many units you need , a single paragraph, five paragraphs, or a custom amount",
            "Click Generate and your Lorem Ipsum text appears instantly",
            "Copy the text with one click and paste it into Figma, Sketch, WordPress, or any other tool",
            "Regenerate as many times as you need , each result is slightly different"
        ],
        benefits: [
            "Speeds up mockup creation by providing instant placeholder copy",
            "Prevents stakeholders from focusing on copy during design review",
            "Supported by virtually every design tool , Figma, Adobe XD, InDesign, and more",
            "Flexible output: choose paragraphs, sentences, or words based on your layout needs",
            "Avoids the distraction of using real but sensitive or irrelevant text in early designs",
            "Completely free , generate as much placeholder text as you need"
        ],
        faq: [
            {
                question: "What is Lorem Ipsum and where does it come from?",
                answer: "Lorem Ipsum is placeholder text derived from 'de Finibus Bonorum et Malorum,' a work by the Roman philosopher Cicero from 45 BC. It's been used as standard dummy text in typesetting since the 1500s and is now universally used in design and development to fill layouts with dummy copy."
            },
            {
                question: "Why do designers use Lorem Ipsum instead of real text?",
                answer: "Using meaningful text in early design mockups can distract stakeholders from evaluating the visual layout, typography, and spacing. Lorem Ipsum looks like real writing but is unreadable, so it keeps the focus on design rather than content."
            },
            {
                question: "Can I generate specific amounts , like just two sentences or 50 words?",
                answer: "Yes. You can choose to generate output by paragraphs, sentences, or words, and specify exactly how many you need. This gives you precise control over how much placeholder content appears in your designs."
            },
            {
                question: "Is Lorem Ipsum suitable for responsive design testing?",
                answer: "Yes. Using Lorem Ipsum of varying lengths is a great way to stress-test how your layout handles different content sizes, especially for card components, sidebars, and dynamic content areas."
            },
            {
                question: "Does Lorem Ipsum work inside Figma or Adobe XD?",
                answer: "Yes. You can generate your placeholder text here and paste it directly into any design tool. Figma also has a built-in Lorem Ipsum shortcut, but our generator gives you more control over the exact length and format."
            },
            {
                question: "Can I use Lorem Ipsum in a live website temporarily?",
                answer: "While it's technically possible, it's not recommended to ship Lorem Ipsum to a live site , search engines may index it and penalize the page for low-quality content. Only use it in staging or prototype environments."
            }
        ],
    },

    [ToolsConstantKeyEnums.URL_SLUG]: {
        intro: "A clean, descriptive URL slug is one of the easiest SEO wins you can get - and it takes less than five seconds with the right tool.\n\nOur URL Slug Generator converts any blog title, heading, or phrase into a perfectly formatted, SEO-friendly slug. It removes special characters, converts spaces to hyphens, lowercases everything, and strips out words that could make your URLs messy.\n\nWhether you're publishing on WordPress, Shopify, Webflow, or a custom CMS, our generator ensures your URLs are clean, readable, and search engine optimized every time.",
        whatIsIt: "A URL slug is the part of a web address that comes after the domain name and identifies a specific page. For example, in the URL 'example.com/blog/how-to-start-a-podcast', the slug is 'how-to-start-a-podcast'.\n\nGood slugs are short, lowercase, hyphen-separated, keyword-rich, and free of special characters. They improve click-through rates from search results, make URLs shareable, and help search engines understand what your page is about.\n\nAll of which contribute to better SEO performance.",
        howToUse: [
            "Type or paste your blog title, article heading, or any phrase into the input field",
            "The tool instantly converts it into a clean, lowercase, hyphen-separated slug",
            "Review the generated slug and optionally tweak it manually if needed",
            "Copy the slug with one click and paste it into your CMS's URL field",
            "Use it in WordPress, Shopify, Ghost, Webflow, or any other publishing platform"
        ],
        benefits: [
            "Improves your page's SEO by producing keyword-rich, clean URLs",
            "Removes special characters, accents, and symbols that break URLs",
            "Makes your links more shareable and easier to read in search results",
            "Consistent URL formatting across all your pages and blog posts",
            "Helps search engines understand your page content through descriptive slugs",
            "Works with any CMS , WordPress, Shopify, Webflow, Ghost, and more"
        ],
        faq: [
            {
                question: "What is a URL slug and why does it matter for SEO?",
                answer: "A URL slug is the readable identifier at the end of a web address that describes the page content. For example, '/best-running-shoes-2024' is a slug. Clean, keyword-rich slugs help search engines understand your content, improve your click-through rate from search results, and make your URLs easier to share."
            },
            {
                question: "Should I include keywords in my URL slug?",
                answer: "Yes. Including your primary keyword in the slug is a well-known on-page SEO best practice. It helps search engines quickly understand what your page is about and can contribute to better rankings for that keyword."
            },
            {
                question: "Should URL slugs use hyphens or underscores?",
                answer: "Hyphens. Google explicitly recommends using hyphens (-) instead of underscores (_) to separate words in URLs. Search engines treat hyphens as word separators, while underscores cause words to be read as a single string. Our tool uses hyphens by default."
            },
            {
                question: "Can I use this tool for Shopify product URLs?",
                answer: "Yes. Shopify automatically generates slugs for products and collections, but they're not always optimized. You can use our generator to create a better slug and then manually set it in the Shopify URL and handle field in the product editor."
            },
            {
                question: "Should I keep URL slugs short or long?",
                answer: "Keep them concise , typically 3 to 5 words that describe the page content and include your target keyword. Avoid unnecessary words like 'the', 'a', 'and', and 'for' that don't add SEO value. Shorter slugs are cleaner, easier to share, and perform slightly better in search results."
            },
            {
                question: "What happens to accented characters and symbols in my title?",
                answer: "Our slug generator automatically converts accented characters (like é, ñ, ü) to their ASCII equivalents and removes special characters and symbols that would break a URL. The result is always a clean, URL-safe string."
            }
        ],
    },

    [ToolsConstantKeyEnums.BASE_64]: {
        intro: "Whether you're debugging a JWT token, embedding an image in a CSS file, or transferring binary data through a text-based API - Base64 encoding is something every developer eventually needs.\n\nOur Base64 Converter makes it effortless: encode plain text or files to Base64, decode Base64 strings back to readable content, inspect JWTs, and handle special modes like URL-safe encoding, hex, and JSON.\n\nAll directly in your browser. No server. No uploads. No privacy concerns.",
        whatIsIt: "Base64 is a binary-to-text encoding scheme that converts binary data - like images, files, or raw bytes - into a string of ASCII characters.\n\nIt's widely used in web development and software engineering because many data transfer protocols - like HTTP, email (MIME), and JSON APIs - work with text and can't reliably handle raw binary data.\n\nBase64 lets you safely transmit or embed binary content anywhere that only accepts text. Common use cases include embedding images in HTML/CSS, encoding credentials for HTTP Basic Auth, handling JWT tokens, and transmitting files through REST APIs.",
        howToUse: [
            "Choose your mode: Encode (text/file to Base64) or Decode (Base64 to text/file)",
            "For text encoding, type or paste your input into the text field",
            "For file encoding, upload an image, PDF, audio file, or any other file type",
            "Select a variant if needed , standard Base64, URL-safe Base64, or JWT decode mode",
            "Copy the output with one click or download the decoded file if applicable",
            "For JWTs, switch to JWT mode to see the decoded header and payload in JSON format"
        ],
        benefits: [
            "Instantly encode or decode Base64 without writing a single line of code",
            "Inspect and decode JWT tokens to debug authentication issues",
            "Embed images, fonts, or files as Base64 strings in HTML and CSS",
            "Supports URL-safe Base64 encoding for query parameters and API calls",
            "All processing happens in your browser , no files or strings are uploaded",
            "Handles multiple modes: text, file, hex, JSON, HTML, UTF-8, and JWT"
        ],
        faq: [
            {
                question: "What is Base64 encoding and when do I need it?",
                answer: "Base64 is an encoding method that converts binary data into a plain text string made up of letters, numbers, and symbols. You need it when you want to transmit binary content (like a file or image) through a channel that only handles text , such as a JSON API, an email, or an HTML attribute."
            },
            {
                question: "How do I decode a JWT token using this tool?",
                answer: "Switch to JWT mode, paste your full JWT token (the three-part string separated by dots), and the tool will decode and display the header and payload sections as formatted JSON. Note that JWT signature verification requires your secret key and is not performed by this tool."
            },
            {
                question: "What is the difference between standard Base64 and URL-safe Base64?",
                answer: "Standard Base64 uses '+' and '/' characters, which have special meanings in URLs and can cause issues when used in query parameters. URL-safe Base64 replaces '+' with '-' and '/' with '_', making the encoded string safe to use directly in URLs without additional encoding."
            },
            {
                question: "Can I encode images and files to Base64?",
                answer: "Yes. You can upload any file , image, PDF, audio, video, font , and the tool will convert it to a Base64 string. This is useful for embedding images as data URIs in HTML and CSS, which eliminates the need for a separate HTTP request to load the image."
            },
            {
                question: "Is my data safe when I use this tool?",
                answer: "Completely. All encoding and decoding happens locally in your browser using JavaScript. No data is sent to any server, no files are uploaded, and nothing is logged or stored. It's fully private."
            },
            {
                question: "Can Base64 be used for encryption or data security?",
                answer: "No. Base64 is encoding, not encryption. It can be decoded by anyone who knows the Base64 alphabet , which is public. Never use Base64 to protect sensitive data. Use proper encryption methods like AES-256 or RSA for security purposes."
            }
        ]
    },

    [ToolsConstantKeyEnums.QR_CODE]: {
        intro: "QR codes have become one of the most effective ways to bridge the gap between physical and digital - whether it's a restaurant menu, a product package, a business card, or a marketing flyer.\n\nOur free QR Code Generator lets you create a fully customized QR code in seconds. Enter any URL, email address, phone number, text, or business information, then customize the colors, size, and error correction level.\n\nDownload your finished QR code as a high-resolution PNG, scalable SVG, or JPEG - ready for print or digital use, no watermarks, no account required.",
        whatIsIt: "A QR code (Quick Response code) is a two-dimensional barcode that can be scanned by any smartphone camera to instantly open a URL, display text, save a contact, or trigger a specific action.\n\nQR codes were invented in Japan in 1994 but became globally mainstream after 2020 when contactless sharing became a priority. Today they're used in marketing campaigns, restaurant menus, packaging, event ticketing, payments, social media profiles, app downloads, and much more.\n\nA QR code generator is the tool that converts your content into this scannable format.",
        howToUse: [
            "Enter the content you want to encode , a URL, plain text, email address, phone number, or SMS",
            "Customize the QR code: adjust size, foreground color, background color, and error correction level",
            "Preview the QR code in real time as you make adjustments",
            "Test it with your phone's camera to make sure it scans correctly",
            "Download the final QR code as PNG (for screens), SVG (for print and scaling), or JPEG"
        ],
        benefits: [
            "Perfect for restaurants, retail stores, and service businesses adopting contactless sharing",
            "Create branded QR codes with custom colors that match your visual identity",
            "SVG format ensures your QR code stays sharp at any size , from a business card to a billboard",
            "Higher error correction levels keep the QR code scannable even if it's partially damaged or obscured",
            "No watermarks, no account required, no usage limits",
            "Works for URLs, phone numbers, emails, text, Wi-Fi credentials, and more"
        ],
        faq: [
            {
                question: "What can I create QR codes for?",
                answer: "You can create QR codes for website URLs, email addresses, phone numbers, plain text, SMS messages, vCard contacts, Wi-Fi credentials, app store links, social media profiles, and payment links. Essentially, anything you want someone to access quickly by scanning their phone."
            },
            {
                question: "Can I use custom colors in my QR code?",
                answer: "Yes. You can customize both the foreground (module) color and background color of your QR code. This lets you create branded QR codes that match your company colors. Just make sure there's enough contrast between foreground and background for reliable scanning."
            },
            {
                question: "What format should I download my QR code in?",
                answer: "Use SVG for print materials (business cards, flyers, posters, signage) since SVG scales infinitely without losing quality. Use PNG for digital use , websites, email, social media. JPEG is an option for digital use but is not recommended if you need a transparent background."
            },
            {
                question: "What is error correction level and what should I choose?",
                answer: "Error correction lets QR codes remain scannable even if part of the code is damaged, dirty, or obscured. There are four levels: L (7%), M (15%), Q (25%), and H (30%). Higher levels recover more damage but make the QR code visually denser. For print on materials that could get worn or dirty, use Q or H."
            },
            {
                question: "Do QR codes expire?",
                answer: "Static QR codes (like the ones created with this tool) never expire on their own , they will always encode the same information. However, if the URL you encoded goes offline or changes, the QR code will appear broken even though the code itself is technically still valid."
            },
            {
                question: "Can I add a logo to the center of my QR code?",
                answer: "Many QR code generators support logo overlays. When adding a logo, the error correction level should be set to H (High) so the code remains scannable even though part of it is covered. The logo should not exceed about 30% of the QR code's total area."
            }
        ],
    },

    [ToolsConstantKeyEnums.JSON_FORMATTER]: {

        intro: "Ever tried reading a response from an API that came back as a single line of minified JSON? It's practically impossible. Our JSON Formatter solves that in one paste.\n\nDrop in your raw, minified, or broken JSON and instantly get a clean, properly indented, color-highlighted version that's actually readable. Beyond formatting, it validates your JSON on the fly - catching syntax errors, missing brackets, and trailing commas before they cause bugs in production.\n\nYou can also minify formatted JSON back to a compact string when you need to reduce payload size.",
        whatIsIt: "A JSON formatter (also called a JSON beautifier) is a developer tool that takes raw or minified JSON text and restructures it with proper indentation and line breaks to make it human-readable.\n\nJSON (JavaScript Object Notation) is the most widely used data format for APIs, configuration files, and data exchange between systems - but it's often transmitted in minified form with no whitespace, making it very hard to read and debug.\n\nA JSON formatter also validates the JSON structure and highlights errors, making it an essential tool for any developer working with APIs or data pipelines.",
        howToUse: [
            "Paste your raw or minified JSON into the input field",
            "The formatter immediately validates and beautifies it with proper indentation",
            "If there are errors, the tool highlights the problematic line and explains the issue",
            "Use the Format button to add indentation, or Minify to compress it back to a single line",
            "Copy the formatted or minified output with one click",
            "Use the tree view (if available) to navigate complex nested JSON structures visually"
        ],
        benefits: [
            "Turns unreadable minified API responses into clean, structured JSON in one click",
            "Catches JSON syntax errors instantly so you don't waste time debugging",
            "Minify option compresses JSON for smaller API payloads and faster data transfer",
            "Handles large JSON payloads without slowing down or crashing",
            "No data is sent to any server , everything processes locally in your browser",
            "Essential tool for REST API testing, debugging webhooks, and working with config files"
        ],
        faq: [
            {
                question: "What does a JSON formatter actually do?",
                answer: "It takes raw or minified JSON text and adds proper indentation, line breaks, and spacing to make it easy to read. It also validates the JSON syntax and highlights any errors , like missing commas, unclosed brackets, or invalid values , so you can fix them quickly."
            },
            {
                question: "Can this tool detect JSON syntax errors?",
                answer: "Yes. The formatter validates your JSON as you paste it and highlights any syntax errors with a description of the problem. Common JSON errors include missing commas between keys, trailing commas after the last item, unquoted keys, and single quotes instead of double quotes."
            },
            {
                question: "What is JSON minification and when should I use it?",
                answer: "JSON minification removes all unnecessary whitespace, indentation, and line breaks from a JSON string to make it as compact as possible. You'd use this when sending JSON data in an API request or storing it in a database , smaller payloads mean faster transfer and lower bandwidth costs."
            },
            {
                question: "Can I format large JSON files with this tool?",
                answer: "Yes. The formatter is optimized to handle large payloads without timing out or freezing your browser. That said, extremely large files (several megabytes of JSON) may take a moment to process depending on your device."
            },
            {
                question: "Is this JSON formatter useful for debugging API responses?",
                answer: "Definitely. When testing REST APIs or webhooks, response bodies often come back as minified or condensed JSON. Pasting that response into the formatter lets you instantly see the full structure, understand the data hierarchy, and identify missing or unexpected fields."
            },
            {
                question: "Is my JSON data safe when I use this tool?",
                answer: "Yes. All formatting and validation happens locally in your browser using JavaScript. Your JSON data is never sent to a server, never stored, and never logged. This is especially important when working with API keys, user data, or proprietary data structures."
            }
        ],
    },

    [ToolsConstantKeyEnums.HASH_GENERATOR]: {

        intro: "Need to verify file integrity, generate a checksum, test a password hashing function, or debug a security implementation? Our Hash Generator has you covered.\n\nIt supports all major cryptographic hash algorithms - MD5, SHA-1, SHA-256, SHA-384, and SHA-512 - and works on both text input and file uploads.\n\nThe entire process runs using the browser's native WebCrypto API, which means your data never touches an external server. Fast, private, and accurate.",
        whatIsIt: "A hash generator is a cryptographic tool that converts any input - whether text or a file - into a fixed-length string of characters called a hash or digest.\n\nHash functions are one-way: given the same input, they always produce the same output, but you can't reverse a hash back to the original data. This makes hashing fundamental to data integrity verification, password storage, digital signatures, and cybersecurity.\n\nCommon hash algorithms include MD5 (fast but outdated for security), SHA-1 (deprecated for cryptographic use), and the SHA-2 family (SHA-256, SHA-384, SHA-512) which are considered secure and widely used today.",
        howToUse: [
            "Choose your input type: text or file",
            "For text, type or paste the content you want to hash into the input field",
            "For files, upload any file type , the hash is computed from the file's binary content",
            "Select your desired hash algorithm: MD5, SHA-1, SHA-256, SHA-384, or SHA-512",
            "The hash output is generated instantly and displayed in the result field",
            "Copy the hash with one click to use it for checksum verification or security testing"
        ],
        benefits: [
            "Verify downloaded file integrity by comparing checksums with the publisher's hash",
            "Test and understand SHA-256 and other hash functions used in authentication systems",
            "Generate deterministic identifiers for content, strings, or data records",
            "Powered by the browser's native WebCrypto API , no external libraries, no data leakage",
            "Supports both text hashing and file hashing in one unified tool",
            "Useful for developers, security researchers, sysadmins, and IT professionals"
        ],
        faq: [
            {
                question: "What is a cryptographic hash and why is it useful?",
                answer: "A cryptographic hash is a fixed-length fingerprint generated from any input data. Even a tiny change in the input , like adding a space , produces a completely different hash. This makes hashes useful for detecting data tampering, verifying file integrity, storing passwords securely, and creating digital signatures."
            },
            {
                question: "Which hash algorithm should I use?",
                answer: "For security-sensitive applications, use SHA-256 or SHA-512 from the SHA-2 family. MD5 and SHA-1 are considered cryptographically broken and should not be used for security purposes , though they're still useful for non-security tasks like checksums or quick content fingerprinting."
            },
            {
                question: "Can I use this tool to verify a downloaded file's checksum?",
                answer: "Yes. Upload the file, select the same algorithm the publisher used (commonly SHA-256 or MD5), and compare the generated hash against the one provided on the download page. If they match, the file is intact and hasn't been tampered with."
            },
            {
                question: "Can I hash files in addition to plain text?",
                answer: "Yes. The tool supports file hashing , you can upload any file type and it will compute the hash from the file's binary content. This is exactly how checksums are generated for software releases, ISO images, and other downloadable files."
            },
            {
                question: "Is hashing the same as encryption?",
                answer: "No. Hashing is a one-way function , you can't reverse a hash back to the original data. Encryption is two-way , you can decrypt it with the right key. Hashing is used for integrity checks and password verification. Encryption is used for data confidentiality."
            },
            {
                question: "Is my data safe when I use this hash generator?",
                answer: "Completely. The tool uses the browser's native WebCrypto API to compute hashes entirely on your device. No text, files, or hashes are transmitted to any external server. Your data stays private from start to finish."
            }
        ],
    },

    [ToolsConstantKeyEnums.REGEX_TESTER]: {

        intro: "Regular expressions are incredibly powerful - but writing them from memory and hoping they work is a recipe for frustration. Our Regex Tester gives you an interactive environment to build, test, and debug regex patterns in real time.\n\nPaste your test string, write your regex, and instantly see every match highlighted in context. Capture groups, flags, global matching, and replacement strings are all supported.\n\nWhether you're validating email addresses, extracting data from logs, or just learning how regex works - this tool makes the process visual and immediate.",
        whatIsIt: "Regular expressions (regex or regexp) are sequences of characters that define a search pattern. They're used in programming to search, match, validate, and manipulate text based on rules rather than exact strings.\n\nRegex is supported in virtually every programming language - JavaScript, Python, Java, PHP, Rust, Go - and in text editors, databases, command-line tools, and log analyzers.\n\nA regex tester provides a visual interface where you can write a pattern and immediately see how it matches against a test string, which is far more efficient than running code every time you want to test a change.",
        howToUse: [
            "Enter your regular expression pattern in the regex input field",
            "Set your flags if needed , g (global), i (case-insensitive), m (multiline), s (dotAll)",
            "Paste or type your test string in the test input area",
            "Matches are highlighted in real time as you type your pattern",
            "Check the capture groups panel to see what each group matched individually",
            "Use the Replace tab to test substitution patterns and see the resulting string"
        ],
        benefits: [
            "See regex matches highlighted in real time , no need to run code to test your pattern",
            "Capture group visualization makes complex regex much easier to understand and debug",
            "Support for all major regex flags: global, case-insensitive, multiline, and dotAll",
            "Built-in replace testing shows the result of your substitution pattern instantly",
            "Common pattern shortcuts help beginners get started without memorizing syntax",
            "Saves significant development time when building validators, parsers, or search features"
        ],
        faq: [
            {
                question: "What is regex used for in programming?",
                answer: "Regex is used to search, validate, extract, and replace text based on patterns. Common use cases include validating email addresses, phone numbers, and URLs; parsing log files; extracting specific data from a large text; building search-and-replace features; and cleaning up user input in forms."
            },
            {
                question: "What regex flags are supported?",
                answer: "The most common flags are: g (global , find all matches, not just the first), i (case-insensitive matching), m (multiline , ^ and $ match line start/end), and s (dotAll , makes the dot . match newline characters too). You can combine flags as needed."
            },
            {
                question: "How do capture groups work in regex?",
                answer: "Capture groups are defined with parentheses in your regex pattern. They let you extract specific parts of a match. For example, the pattern (\\d{4})-(\\d{2})-(\\d{2}) applied to '2024-01-15' creates three capture groups: '2024', '01', and '15'. Our tester shows each group's match separately."
            },
            {
                question: "Can beginners use a regex tester to learn?",
                answer: "Absolutely. A regex tester is one of the best ways to learn regex because you get immediate visual feedback. You can experiment with small patterns, see exactly what they match, and gradually build up to more complex expressions. Many people find regex much more approachable with a live tester than when working blind in code."
            },
            {
                question: "Can I test regex replacement patterns?",
                answer: "Yes. The Replace mode lets you enter both a regex pattern and a replacement string and shows you the resulting text after substitution. You can use backreferences like $1, $2 to reference captured groups in your replacement string."
            },
            {
                question: "Is the regex flavor used here compatible with JavaScript?",
                answer: "Yes, the regex engine uses JavaScript's built-in RegExp implementation, which is the same engine used in Node.js, all major browsers, and many frontend frameworks. Patterns tested here will behave the same way when used in your JavaScript or TypeScript code."
            }
        ],
    },

    [ToolsConstantKeyEnums.COLOR_CONVERTER]: {

        intro: "Color consistency across design tools, development environments, and print materials is harder than it should be - especially when each platform speaks a different color language.\n\nOur Color Converter bridges that gap instantly. Enter any color value in HEX, RGB, HSL, HSV, or CMYK and see the equivalent in every other format at once.\n\nUse the built-in color picker to explore colors visually, browse the swatch library for inspiration, and copy any value with a single click.",
        whatIsIt: "A color converter is a tool that translates a color value from one format to another. Different tools and workflows use different color systems: web developers use HEX and RGB for CSS, UI designers often work in HSL for intuitive color adjustments, and print designers need CMYK values for accurate ink reproduction.\n\nThe same color can be expressed as #FF5733 in HEX, rgb(255, 87, 51) in RGB, hsl(11, 100%, 60%) in HSL, and roughly cmyk(0, 66, 80, 0) in CMYK.\n\nA color converter performs these translations accurately so you can move seamlessly between design tools and production environments.",
        howToUse: [
            "Enter a color value in any supported format , HEX (#), RGB, HSL, HSV, or CMYK",
            "All equivalent values in other formats are shown instantly",
            "Use the color picker to select a color visually if you don't have a specific value yet",
            "Browse the swatch library to explore palettes and common brand colors",
            "Click the copy button next to any format to copy that value directly to your clipboard",
            "Use the copied values in CSS, Figma, Photoshop, InDesign, or any other tool"
        ],
        benefits: [
            "Instantly convert colors between all major digital and print color formats",
            "Built-in color picker lets you select and convert colors visually",
            "One-click copy for every format , HEX, RGB, HSL, HSV, and CMYK",
            "Ensures color consistency when moving between design tools and development environments",
            "CMYK support is essential for designers preparing files for print production",
            "Swatch library helps with color exploration and palette building"
        ],
        faq: [
            {
                question: "What color formats does this tool support?",
                answer: "The tool supports HEX (web colors like #FF5733), RGB (Red, Green, Blue values from 0–255), HSL (Hue, Saturation, Lightness , great for intuitive adjustments), HSV/HSB (Hue, Saturation, Value , used in many design tools), and CMYK (Cyan, Magenta, Yellow, Key/Black , used for print)."
            },
            {
                question: "What is the difference between RGB and HEX color formats?",
                answer: "They represent the same color model (Red, Green, Blue) just in different notation. RGB uses decimal values: rgb(255, 87, 51). HEX converts each channel to hexadecimal: #FF5733. Both are widely used in CSS and web design, and they're fully interchangeable."
            },
            {
                question: "When should I use HSL instead of RGB?",
                answer: "HSL is easier to work with when you want to adjust a color intuitively. For example, to make a color lighter, just increase the Lightness value. To shift hue, adjust the Hue value. In CSS, HSL is increasingly preferred over RGB for dynamic color systems like design tokens and themes."
            },
            {
                question: "Why do I need CMYK values if I'm designing for web?",
                answer: "If your design will ever go to print , brochures, business cards, packaging, signage , you need CMYK values for accurate color reproduction. Print uses ink layers (Cyan, Magenta, Yellow, Black) rather than light, so colors look different from screen if not properly converted."
            },
            {
                question: "Can I use this tool inside Figma or Sketch workflows?",
                answer: "Yes. Figma and Sketch both display HEX, RGB, and HSL values. You can copy a color from your design, convert it here to find the equivalent in another format (like CMYK for a print deliverable), and use that value directly in the appropriate context."
            },
            {
                question: "Does the tool support alpha/transparency values?",
                answer: "Most color tools support RGBA and HSLA formats which include an alpha channel for transparency. If you need to convert colors with transparency, look for the alpha input field alongside the standard color values."
            }
        ],
    },

    [ToolsConstantKeyEnums.TIME_STAMP_CONVERTER]: {

        intro: "You're digging through server logs or debugging an API response and you see a number like 1704067200 - and you have absolutely no idea what date or time that is. Our Timestamp Converter solves that in an instant.\n\nPaste any Unix timestamp and get the equivalent in UTC, your local timezone, ISO 8601 format, relative time (like '3 days ago'), and more.\n\nOr go the other direction - pick a date and time and convert it to a Unix timestamp for use in your database queries, API payloads, or scheduling logic.",
        whatIsIt: "A Unix timestamp (also called Epoch time) is a way of representing a specific moment in time as the number of seconds (or milliseconds) that have elapsed since January 1, 1970, 00:00:00 UTC - known as the Unix Epoch.\n\nIt's used universally in programming because it's a single number that's timezone-independent and easy to store, compare, and calculate with. However, Unix timestamps are not human-readable.\n\nThat's where a timestamp converter becomes essential - it translates between the machine-friendly Unix integer and the human-friendly date and time formats we actually understand.",
        howToUse: [
            "Enter a Unix timestamp in the input field , the tool auto-detects whether it's seconds or milliseconds",
            "See the equivalent date and time displayed in UTC, your local timezone, and ISO 8601 format",
            "View the relative time (e.g., '2 hours ago' or 'in 3 days') for quick context",
            "Check the week number and day of the year for calendar-related calculations",
            "Or switch to date-to-timestamp mode: pick a date and time and get the corresponding Unix timestamp",
            "Copy any output value with one click for use in code, queries, or documentation"
        ],
        benefits: [
            "Instantly decode Unix timestamps from API responses, logs, and database records",
            "Shows UTC, local time, ISO 8601, and relative time all at once , no switching",
            "Converts both ways , timestamp to date and date to timestamp",
            "Auto-detects seconds vs milliseconds so you don't have to convert manually",
            "Useful for debugging cron jobs, scheduled tasks, API expiry times, and event logs",
            "Saves time compared to writing throwaway conversion scripts"
        ],
        faq: [
            {
                question: "What is a Unix timestamp?",
                answer: "A Unix timestamp is the number of seconds (or milliseconds) that have passed since January 1, 1970, 00:00:00 UTC, which is called the Unix Epoch. It's the most universal way to store and exchange time data in programming because it's timezone-independent and works as a simple integer."
            },
            {
                question: "How do I know if a timestamp is in seconds or milliseconds?",
                answer: "Unix timestamps in seconds are typically 10 digits long (e.g., 1704067200). Millisecond timestamps are 13 digits long (e.g., 1704067200000). Our tool automatically detects which format you've entered and converts accordingly."
            },
            {
                question: "What is the difference between UTC and local time?",
                answer: "UTC (Coordinated Universal Time) is the global time standard with no timezone offset. Local time is UTC adjusted for your device's timezone. For example, 1704067200 UTC is '2024-01-01 00:00:00 UTC' , but in UTC+5, that same moment is '2024-01-01 05:00:00'. Our tool shows both."
            },
            {
                question: "Why do developers use Unix timestamps instead of formatted dates?",
                answer: "Unix timestamps are timezone-independent, compact, and trivial to compare and calculate with. You can subtract two timestamps to find the difference in seconds, compare them with a simple '<' or '>', and store them as integers in any database. Formatted date strings are messier to work with programmatically."
            },
            {
                question: "What is ISO 8601 format and why does it matter?",
                answer: "ISO 8601 is the international standard for date and time representation, formatted as '2024-01-15T10:30:00Z'. The 'Z' indicates UTC. It's used in REST APIs, JSON payloads, XML data, and most modern web standards because it's unambiguous and sortable as a string."
            },
            {
                question: "Can I convert a specific date and time back to a Unix timestamp?",
                answer: "Yes. Switch to date-to-timestamp mode, enter the date and time you want (including timezone), and the tool will give you the corresponding Unix timestamp in both seconds and milliseconds. This is useful for constructing API requests, setting up cron jobs, or querying databases by time range."
            }
        ],
    },

    [ToolsConstantKeyEnums.PERCENTAGE_CALCULATOR]: {

        intro: "Percentages are everywhere - discounts, tips, tax, grades, profit margins, interest rates, data analysis - and mentally calculating them under pressure is something most of us struggle with.\n\nOur Percentage Calculator takes that friction away entirely. Whether you need to find what percentage 45 is of 180, calculate how much a price increased from last month, or convert an exam score to a grade - it's all here in one clean, easy-to-use tool.\n\nResults are instant, calculations are saved in history, and you never have to do the mental math again.",
        whatIsIt: "A percentage calculator is a math utility that solves the most common percentage-based equations that come up in everyday life, finance, academics, and business.\n\nPercentages express a ratio as a fraction of 100 and are used everywhere - from tax calculations and discount pricing to academic grading and financial growth analysis.\n\nWhile the underlying math isn't overly complex, having a reliable tool that handles it instantly - without rearranging formulas or reaching for a calculator - saves a meaningful amount of time and eliminates errors.",
        howToUse: [
            "Choose the type of calculation you need: percentage of a number, percentage change, add/subtract a percentage, or score grading",
            "Enter the required numbers in the input fields for your chosen formula",
            "The result appears instantly , no need to press Enter or click Calculate",
            "View the formula and explanation below the result to understand how it was calculated",
            "Check your calculation history to review or reuse previous results",
            "Switch between calculation types freely , all your inputs are preserved"
        ],
        benefits: [
            "Covers all common percentage calculations in one place , no switching between tools",
            "Instant results with formula explanations so you understand the math behind the answer",
            "Calculation history lets you reference and reuse previous results",
            "Perfect for students calculating grades, shoppers evaluating discounts, and professionals doing financial analysis",
            "No app download, no account, no setup , open it and start calculating",
            "Works on any device , desktop, tablet, or mobile"
        ],
        faq: [
            {
                question: "What types of percentage calculations can I do with this tool?",
                answer: "You can calculate: the percentage of a number (e.g., 20% of 150), percentage change between two values (increase or decrease), what percentage one number is of another, add or subtract a percentage from a number, and convert a score to a letter grade or percentage grade."
            },
            {
                question: "How do I calculate percentage increase or decrease?",
                answer: "Percentage change is calculated as: ((new value - old value) / old value) × 100. A positive result means an increase, a negative result means a decrease. For example, if a price went from $80 to $100, the increase is ((100 - 80) / 80) × 100 = 25%. Our tool does this automatically when you select the percentage change mode."
            },
            {
                question: "Can I calculate a tip or service charge using this?",
                answer: "Yes. Select 'Percentage of a number', enter the bill amount as the base, and enter your desired tip percentage (15%, 18%, 20%). The result is the tip amount. You can also add it back to the original total to get the final amount owed."
            },
            {
                question: "How do I find what percentage one number is of another?",
                answer: "Select the 'What percent is X of Y?' mode, enter both numbers, and the result is the percentage. For example, 45 out of 180 = (45 / 180) × 100 = 25%. This is useful for calculating test scores, completion rates, market share, and more."
            },
            {
                question: "Is this tool useful for financial calculations?",
                answer: "Yes. Common financial uses include calculating discount amounts (30% off a price), computing profit margins, finding tax amounts, analyzing investment growth as a percentage return, and breaking down what portion of a budget is allocated to a specific category."
            },
            {
                question: "Does the tool save my calculations?",
                answer: "Yes. The tool keeps a calculation history during your session, so you can scroll back through previous results without re-entering the numbers. This is especially useful when you're doing a series of related calculations, like comparing percentage changes across multiple data points."
            }
        ]
    },
    [ToolsConstantKeyEnums.MARKDOWN_EDITOR]: {

        intro: "Writing online often means switching between raw content and polished presentation - Markdown for speed, HTML for structure. But manually converting between them can be tedious, error-prone, and frustrating.\n\nOur Markdown to HTML Converter removes that friction completely. Whether you're writing blog posts, documentation, emails, landing page content, or developer notes, you can instantly transform Markdown into sanitized, production-ready HTML or convert existing HTML back into readable Markdown.\n\nLive preview, syntax highlighting, copy tools, export options, and two-way conversion make it more than a converter. It's a full productivity tool for writers, developers, and content teams.",
        whatIsIt: "A Markdown to HTML Converter is a content formatting utility that transforms Markdown syntax (like headings, lists, links, and code blocks) into structured HTML for websites, apps, and publishing platforms.\n\nMarkdown is popular because it's faster and cleaner to write than raw HTML, while HTML is essential for browser rendering and advanced web formatting.\n\nThis tool bridges both worlds instantly - allowing you to write efficiently in Markdown, publish in HTML, or reverse existing HTML into Markdown for easier editing. It saves time, reduces formatting mistakes, and improves workflow efficiency for technical and non-technical users alike.",
        howToUse: [
            "Choose your conversion mode: Markdown → HTML for rendering content, or HTML → Markdown for simplifying existing markup",
            "Paste or type your content into the editor panel",
            "Watch the live output update instantly with no manual conversion button required",
            "Use formatting toolbar shortcuts to insert headings, bold text, lists, tables, code blocks, and links faster",
            "Copy the converted result directly to clipboard or export it as .md or .html files",
            "Switch between split view, source view, or preview mode depending on your workflow"
        ],
        benefits: [
            "Two-way conversion saves time whether you're writing from scratch or cleaning up old HTML",
            "Live preview shows exactly how your Markdown renders before publishing",
            "Syntax-highlighted code blocks make technical documentation cleaner and easier to read",
            "Sanitized HTML output helps protect against unsafe markup and formatting issues",
            "Export and copy tools streamline workflows for blogging, CMS publishing, documentation, and development",
            "Perfect for developers, technical writers, bloggers, SEO teams, students, and content creators"
        ],

        faq: [
            {
                question: "What is Markdown, and why use it instead of HTML?",
                answer: "Markdown is a lightweight formatting language designed for speed and readability. Instead of writing verbose HTML tags, you can use simple symbols like # for headings, ** for bold text, or - for lists. It's faster to write, easier to edit, and widely used for blogs, documentation, README files, and CMS platforms."
            },
            {
                question: "Can this tool convert HTML back into Markdown?",
                answer: "Yes. In HTML → Markdown mode, you can paste raw HTML and instantly convert it into cleaner, easier-to-edit Markdown syntax. This is especially useful when repurposing website content, cleaning exported CMS pages, or simplifying existing markup-heavy text."
            },
            {
                question: "Does the generated HTML support code blocks and tables?",
                answer: "Yes. The converter supports GitHub Flavored Markdown (GFM), which includes fenced code blocks, syntax highlighting, tables, blockquotes, headings, lists, and more. This makes it ideal for developer documentation and technical publishing."
            },
            {
                question: "Is the HTML output safe to use on websites?",
                answer: "Yes. Sanitization removes potentially unsafe or harmful code while preserving valid formatting. This helps reduce XSS risks and ensures cleaner HTML output for websites, blogs, or shared content."
            },
            {
                question: "Who should use a Markdown to HTML converter?",
                answer: "This tool is valuable for developers writing documentation, bloggers formatting posts, SEO teams preparing structured content, students creating notes, and businesses publishing knowledge base articles. Anyone who works with formatted digital text can benefit."
            },
            {
                question: "Can I download my converted files?",
                answer: "Yes. You can export your work as Markdown (.md) or HTML (.html), making it easy to save documentation, publish content, migrate notes, or share formatted text across platforms."
            }
        ]
    },

    [ToolsConstantKeyEnums.DIFF_CHECKER]: {
        intro: "Whether you're a developer reviewing code changes, a writer comparing two drafts, or a student checking revisions, our free Diff Checker makes it effortless.\n\nPaste your original and modified text side by side and instantly see exactly what changed - additions, deletions, and modifications highlighted line by line, word by word, or character by character.\n\nNo sign-up, no ads, no waiting. Just a clean, accurate comparison you can trust.",

        whatIsIt: "A diff checker is an online text comparison tool that analyzes two pieces of text and highlights exactly what's different between them.\n\nInstead of reading through both versions manually, it shows you insertions, deletions, and changes in a color-coded view - so you can spot differences in seconds, not minutes.\n\nIt's used by developers reviewing code, writers comparing drafts, editors tracking revisions, students checking rewritten work, and anyone who needs to know precisely what changed between two versions of a document.",

        howToUse: [
            "Paste your original text into the left panel and your updated text into the right panel",
            "Differences appear instantly - green highlights show additions, red shows deletions, and yellow marks modified lines",
            "Switch between Lines, Words, or Characters mode depending on how granular you need the comparison to be",
            "Enable inline mode to see character-level changes within each modified line, side by side",
            "Use the Export button to download a standard .patch file, or copy the diff directly to your clipboard"
        ],

        benefits: [
            "Instantly spot changes between two drafts without reading both documents word by word",
            "Review code changes without a full Git setup - just paste and compare",
            "Catch unintended edits in contracts, essays, or legal documents before finalizing",
            "Compare API responses, config files, or JSON payloads to debug differences quickly",
            "Works entirely in your browser - your text never leaves your device",
            "No login required - just open and start comparing"
        ],

        faq: [
            {
                question: "How do I compare two texts online for free?",
                answer: "Simply paste your original text into the left panel and your revised text into the right panel. The tool instantly highlights every addition, deletion, and change between the two versions - completely free, with no sign-up required."
            },
            {
                question: "What do the colors mean in the diff view?",
                answer: "Green highlights indicate lines or words that were added in the new version. Red indicates content that was removed from the original. When inline mode is on, you'll also see character-level changes within modified lines so you can pinpoint exactly what shifted."
            },
            {
                question: "What is the difference between Lines, Words, and Characters mode?",
                answer: "Lines mode compares your text line by line - best for code or structured documents. Words mode breaks the comparison down word by word, which works well for prose and articles. Characters mode goes even deeper, highlighting individual character changes - useful for spotting subtle typos or punctuation differences."
            },
            {
                question: "Can I use this to compare code?",
                answer: "Yes. The diff checker works with any plain text, including source code, JSON, YAML, HTML, and config files. For a quick comparison without setting up Git or a code editor, just paste both versions and get an instant result."
            },
            {
                question: "Is my text stored or shared when I use this tool?",
                answer: "No. All comparisons happen locally in your browser. Your text is never uploaded to a server, saved in a database, or shared with anyone. It's a fully private, client-side tool."
            },
            {
                question: "What is the .patch file export?",
                answer: "The export feature downloads your diff in a standard unified patch format - the same format used by Git and other version control systems. Lines prefixed with + were added, lines with - were removed, and unmarked lines are unchanged. You can share this file with teammates or apply it directly using patch tools."
            }
        ],
    },
    [ToolsConstantKeyEnums.META_TAG_GENERATOR]: {
        intro: "Whether you're launching a new website, optimizing an existing page for search, or building a Next.js app, our free Meta Tag Generator takes the guesswork out of SEO.\n\nFill in your page details and instantly get production-ready HTML meta tags, Open Graph tags, Twitter cards, JSON-LD schema, and a Next.js Metadata API export - all in one place.\n\nNo sign-up, no ads, no bloat. Just clean, accurate tags you can drop straight into your project.",

        whatIsIt: "A meta tag generator is an online tool that builds the HTML tags search engines and social platforms use to understand and display your page.\n\nInstead of writing every tag by hand and hunting through documentation, you fill in a form and get a complete, correctly formatted block of tags in seconds - covering SEO basics, Open Graph for Facebook and LinkedIn, Twitter cards, canonical URLs, robots directives, and structured data.\n\nIt's used by developers shipping new pages, marketers improving click-through rates, bloggers optimizing their posts, and anyone who wants their content to look great in search results and social media previews.",

        howToUse: [
            "Enter your page title, description, and canonical URL in the input fields - the live SERP preview updates as you type so you can see exactly how Google will display your page",
            "Add your Open Graph image URL and site name to control how your page looks when shared on Facebook, LinkedIn, and Twitter - switch between platforms in the OG Card Preview",
            "Fill in optional fields like author, keywords, theme color, and Twitter handle to generate a complete tag set",
            "Switch between the HTML, Next.js, JSON-LD, and Favicon output tabs to get the exact format your project needs",
            "Fix any red or amber validation warnings - the checker flags missing required fields, titles that are too short or too long, invalid URLs, and common formatting mistakes",
            "Copy the output with one click or use the per-section copy buttons in the JSON-LD and Favicon tabs"
        ],

        benefits: [
            "Generate a complete set of HTML meta tags, OG tags, Twitter cards, and structured data in seconds - no documentation hunting required",
            "Catch SEO mistakes before publishing with built-in validation that flags missing fields, incorrect lengths, and malformed URLs",
            "Preview exactly how your page appears in Google search results and on Twitter, Facebook, and LinkedIn before going live",
            "Export structured JSON-LD schema for WebPage, Article, Organization, FAQ, and Breadcrumb types to unlock rich results in Google",
            "Get a ready-to-paste Next.js Metadata API export for static pages, dynamic routes, and root layouts - no manual conversion needed",
            "Generate favicon HTML tags, a manifest.json, and a browserconfig.xml for full cross-platform icon support",
            "Works entirely in your browser - your content is never sent to a server or stored anywhere"
        ],

        faq: [
            {
                question: "What meta tags does this tool generate?",
                answer: "The tool generates a full set including primary SEO tags (title, description, keywords, author, robots), canonical link, viewport and charset declarations, Open Graph tags for Facebook and LinkedIn, Twitter card tags, Apple web app tags, Microsoft tile tags, and a theme color tag. You can also export JSON-LD structured data and a Next.js Metadata API object from the output tabs."
            },
            {
                question: "What is the ideal length for a meta title and description?",
                answer: "Google typically displays page titles up to 60 characters and meta descriptions up to 160 characters before truncating them in search results. The character count indicators under each field show your current length and turn amber when you're approaching the limit, so you can adjust before publishing."
            },
            {
                question: "What is an Open Graph image and what size should it be?",
                answer: "An Open Graph image is the thumbnail that appears when your page is shared on social media platforms like Facebook, LinkedIn, and Twitter. The recommended size is 1200×630 pixels. The OG Card Preview in this tool shows you how your image and text will look on each platform before you publish."
            },
            {
                question: "What is JSON-LD and do I need it?",
                answer: "JSON-LD is a format for adding structured data to your page so Google can display rich results - things like star ratings, FAQ dropdowns, article author information, and breadcrumb navigation in search listings. It's placed in a script tag and doesn't affect your page's visual design. The JSON-LD tab in this tool generates ready-to-use schema for WebPage, Article, Organization, FAQ, and Breadcrumb types."
            },
            {
                question: "How do I use the Next.js Metadata API export?",
                answer: "The Next.js tab generates a typed metadata export for the App Router. For static pages, copy the exported metadata object into your page.tsx or layout.tsx file. For dynamic routes, use the generateMetadata function snippet, which you can extend to fetch data before returning the metadata. The root layout snippet includes a title template so child pages inherit the site name automatically."
            },
            {
                question: "What does the robots field control?",
                answer: "The robots meta tag tells search engine crawlers whether to index your page and whether to follow its links. 'index, follow' is the default and tells crawlers to include the page in search results and crawl its links. 'noindex' prevents the page from appearing in search results - useful for admin pages, thank-you pages, or duplicate content. 'nofollow' tells crawlers not to pass authority through the page's outbound links."
            },
            {
                question: "Is my content stored or shared when I use this tool?",
                answer: "No. All processing happens locally in your browser. Nothing you type is sent to a server, saved in a database, or shared with any third party. You can use it with confidential page copy, internal tools, or staging URLs without any privacy concerns."
            }
        ],
    },
    [ToolsConstantKeyEnums.CRON_PARSER]: {
        intro: "Cron expressions are powerful, but remembering the syntax can be frustrating. A single misplaced value can change a schedule from running every hour to running once a month.\n\nOur free Cron Parser helps you instantly validate cron expressions, understand what they mean in plain English, inspect each field, and preview upcoming execution times.\n\nWhether you're configuring Linux cron jobs, CI/CD pipelines, Kubernetes CronJobs, GitHub Actions schedules, cloud automation, or application task schedulers, this tool makes cron expressions easier to read, verify, and debug.",

        whatIsIt: "A cron parser is a tool that reads a cron expression and converts it into a human-readable schedule.\n\nInstead of manually interpreting values like '*/5 * * * *' or '0 9 * * 1-5', a cron parser explains exactly when the task will run, validates the syntax, highlights invalid fields, and calculates future execution times.\n\nDevelopers, DevOps engineers, system administrators, and cloud engineers use cron parsers to avoid scheduling mistakes, troubleshoot automation issues, and verify recurring jobs before deploying them to production environments.",

        howToUse: [
            "Enter a cron expression in the input field using the standard five-field format: minute, hour, day of month, month, and day of week",
            "Watch the parser validate each field in real time and highlight any invalid values, ranges, lists, or step intervals",
            "Read the generated human-readable description to confirm the schedule matches your intention",
            "Review the field breakdown table to understand exactly what each cron segment represents",
            "Check the upcoming execution times section to see when the job will run next",
            "Use one of the built-in presets such as Every Minute, Daily at Midnight, Weekdays at 9 AM, or Monthly schedules to get started quickly",
            "Copy the validated cron expression and use it in Linux crontab files, Kubernetes CronJobs, GitHub Actions, cloud schedulers, or application task runners"
        ],

        benefits: [
            "Instantly validate cron expressions and catch syntax errors before deploying scheduled jobs",
            "Convert complex cron schedules into clear, human-readable descriptions that are easier to understand and review",
            "Preview upcoming execution times to verify exactly when tasks will run",
            "Break down each cron field individually to simplify learning and debugging",
            "Reduce production mistakes caused by incorrect schedules, invalid ranges, or misunderstood cron syntax",
            "Works with common cron patterns including wildcards, ranges, lists, and step values",
            "Runs entirely in your browser with no server processing, ensuring privacy and fast performance"
        ],

        faq: [
            {
                question: "What is a cron expression?",
                answer: "A cron expression is a scheduling format used to define recurring tasks. It consists of five fields representing minute, hour, day of month, month, and day of week. For example, '0 9 * * 1-5' means a task runs at 9:00 AM every weekday."
            },
            {
                question: "What do the five cron fields mean?",
                answer: "The fields are ordered as Minute, Hour, Day of Month, Month, and Day of Week. For example, in '30 14 * * 1', the task runs at 2:30 PM every Monday. Each field controls a different part of the schedule."
            },
            {
                question: "What does the asterisk (*) mean in cron?",
                answer: "The asterisk is a wildcard that means 'every possible value' for that field. For example, '* * * * *' runs every minute, while '0 * * * *' runs at the start of every hour."
            },
            {
                question: "What does */5 or */15 mean?",
                answer: "Step values specify intervals. '*/5' means every 5 units of the field, while '*/15' means every 15 units. In the minute field, '*/15 * * * *' runs every 15 minutes."
            },
            {
                question: "How do ranges and lists work?",
                answer: "Ranges use a hyphen to define a span of values, such as '1-5' for Monday through Friday. Lists use commas to specify multiple values, such as '1,3,5' for Monday, Wednesday, and Friday."
            },
            {
                question: "Can I use this tool for Linux cron jobs?",
                answer: "Yes. The parser supports standard five-field cron expressions commonly used in Linux crontab files, servers, containers, CI/CD pipelines, and cloud schedulers."
            },
            {
                question: "Why are next execution times useful?",
                answer: "Human-readable descriptions help explain a schedule, but upcoming execution times provide confirmation. They allow you to verify exactly when a job will run before deploying it to production."
            },
            {
                question: "What happens if my cron expression is invalid?",
                answer: "The parser validates each field individually and displays clear error messages for invalid values, ranges, steps, or syntax. This makes it easier to identify and fix mistakes quickly."
            },
            {
                question: "Does this tool support advanced cron syntax?",
                answer: "The parser focuses on standard five-field cron expressions and common scheduling patterns such as wildcards, ranges, lists, and step values. Support for advanced platform-specific syntax depends on the scheduler being used."
            },
            {
                question: "Is my cron expression stored anywhere?",
                answer: "No. All parsing, validation, and schedule calculations happen locally in your browser. Nothing is transmitted to a server, stored in a database, or shared with third parties."
            }
        ],
    },
    [ToolsConstantKeyEnums.URL_ENCODE_DECODE]: {
        intro:
            "URLs cannot safely contain spaces, symbols, or certain special characters, which is why URL encoding is essential for web development.\n\nOur free URL Encoder / Decoder helps you instantly convert text into URL-safe format and decode encoded URLs back into readable form. It's useful for APIs, query strings, redirects, and web requests where data must be safely transmitted over the internet.",

        whatIsIt:
            "A URL Encoder / Decoder is a tool that converts text into a URL-safe format and vice versa.\n\nURL encoding replaces unsafe characters like spaces, &, ?, =, and / with percent-encoded values (for example, space becomes %20).\n\nURL decoding reverses this process, turning encoded strings back into readable text.\n\nDevelopers use it when working with query parameters, API requests, web forms, redirects, and any system where data is passed through URLs.",

        howToUse: [
            "Enter the text or URL you want to encode or decode in the input field",
            "Click on Encode to convert normal text into URL-safe format",
            "Click on Decode to convert encoded URLs back into readable text",
            "Copy the result with a single click for use in your code or browser",
            "Use encoded URLs in API requests, query strings, and redirects safely",
            "Switch between encode and decode modes instantly without reloading the tool"
        ],

        benefits: [
            "Safely convert URLs and text into a format that can be transmitted over the internet",
            "Avoid broken URLs caused by spaces or special characters",
            "Easily debug encoded query parameters in API requests",
            "Quickly decode complex URLs into readable format for troubleshooting",
            "Useful for developers working with REST APIs, web forms, and routing",
            "Works instantly in the browser with no server processing required"
        ],

        faq: [
            {
                question: "What is URL encoding?",
                answer:
                    "URL encoding is the process of converting special characters into a percent-encoded format so they can be safely used in URLs. For example, a space becomes %20."
            },
            {
                question: "Why do we need URL encoding?",
                answer:
                    "URLs can only contain a limited set of characters. Encoding ensures that special characters like spaces, &, ?, and = do not break the URL structure."
            },
            {
                question: "What is URL decoding?",
                answer:
                    "URL decoding is the reverse process of encoding. It converts percent-encoded characters back into their original readable form."
            },
            {
                question: "What is the difference between encodeURI and encodeURIComponent?",
                answer:
                    "encodeURI is used for full URLs and preserves URL structure characters, while encodeURIComponent encodes almost all special characters and is used for query parameters."
            },
            {
                question: "Where is URL encoding used?",
                answer:
                    "It is used in query strings, API requests, form submissions, redirects, and anywhere data is passed through a URL."
            },
            {
                question: "Can URL decoding fail?",
                answer:
                    "Yes, decoding can fail if the input contains invalid percent-encoding. In such cases, the tool will show an error or return invalid input message."
            },
            {
                question: "Is my data stored in this tool?",
                answer:
                    "No. All encoding and decoding happens directly in your browser. Nothing is sent to a server or stored anywhere."
            }
        ]
    },
    [ToolsConstantKeyEnums.JWT_DECODE]: {
        intro:
            "JWT (JSON Web Token) is widely used for authentication and secure data exchange in modern web applications.\n\nOur free JWT Decoder & Security Analyzer helps you instantly decode tokens into readable format, inspect header, payload, and signature, and analyze security risks like expired tokens, missing claims, and tampering attempts.",

        whatIsIt:
            "A JWT Decoder is a tool that breaks down a JSON Web Token into its three core parts: Header, Payload, and Signature.\n\nIt converts Base64URL-encoded data into human-readable JSON so developers can inspect authentication data such as user ID, roles, expiration time, and issuer.\n\nAdvanced JWT tools also analyze security risks and validate token integrity.",

        howToUse: [
            "Paste your JWT token into the input field",
            "The tool automatically decodes header and payload",
            "View token details like issuer, subject, and expiration",
            "Check security analysis for risks like missing exp or alg:none",
            "Use the tabs to explore decoded data, claims, and time info",
            "Copy or export the decoded result for debugging or development use",
        ],

        benefits: [
            "Instantly decode JWT tokens without backend tools",
            "Debug authentication issues in APIs and frontend apps",
            "Inspect user roles, permissions, and claims easily",
            "Detect security risks like expired tokens or missing signatures",
            "Validate OAuth and authentication flows during development",
            "Improve security awareness by analyzing token structure",
        ],

        faq: [
            {
                question: "What is a JWT token?",
                answer:
                    "A JWT (JSON Web Token) is a compact token used for securely transmitting information between two parties. It contains a header, payload, and signature."
            },
            {
                question: "Is JWT decoding safe?",
                answer:
                    "Yes. Decoding a JWT is safe because it only converts encoded data into readable format. It does not require the secret key and does not modify the token."
            },
            {
                question: "Can I see the password in a JWT token?",
                answer:
                    "No. JWT tokens should never contain passwords. They usually contain user ID, roles, and metadata, but not sensitive secrets."
            },
            {
                question: "What happens if a JWT is expired?",
                answer:
                    "If a JWT is expired, the server will reject it during authentication. The decoder will also show it as expired based on the 'exp' claim."
            },
            {
                question: "Can JWT tokens be modified?",
                answer:
                    "Yes, but modifying a JWT without the correct signature will make it invalid. The server will reject tampered tokens."
            },
            {
                question: "What is alg:none vulnerability?",
                answer:
                    "It is a security issue where a JWT is unsigned or incorrectly configured, allowing attackers to bypass signature verification."
            },
            {
                question: "Is my JWT data stored anywhere?",
                answer:
                    "No. All decoding happens locally in your browser. Your token is never sent to a server or stored."
            }
        ]
    }
} satisfies Record<ToolsConstantKeyEnums, SeoContentType>;