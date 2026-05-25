import { ImageResponse } from 'next/og'
import { getToolBySlug } from '@/features/tools/registry'
import { config } from '@/config'
import { ToolsConstantKeyEnums } from '@/types/tools'

export const runtime = 'edge'

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

type Props = {
    params: Promise<{
        slug: ToolsConstantKeyEnums
    }>
}

export default async function OpenGraphImage({
    params,
}: Props) {
    const { slug } = await params

    const tool = getToolBySlug(slug)

    if (!tool) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#020617',
                        color: 'white',
                        fontSize: 48,
                        fontWeight: 700,
                    }}
                >
                    Tool Not Found
                </div>
            ),
            size
        )
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    background:
                        'linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 100%)',
                    color: 'white',
                    padding: '64px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: -200,
                        right: -150,
                        width: 500,
                        height: 500,
                        borderRadius: '9999px',
                        background:
                            'rgba(168, 85, 247, 0.18)',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        bottom: -180,
                        left: -120,
                        width: 420,
                        height: 420,
                        borderRadius: '9999px',
                        background:
                            'rgba(59, 130, 246, 0.14)',
                    }}
                />

                {/* Category */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            padding: '10px 20px',
                            borderRadius: 999,
                            background:
                                'rgba(255,255,255,0.08)',
                            border:
                                '1px solid rgba(255,255,255,0.1)',
                            fontSize: 24,
                            opacity: 0.9,
                            textTransform: 'uppercase',
                        }}
                    >
                        {tool.seoCategory?.[0] || 'Tool'}
                    </div>
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: 76,
                        lineHeight: 1.05,
                        fontWeight: 800,
                        maxWidth: '90%',
                        letterSpacing: '-2px',
                    }}
                >
                    {tool.title}
                </div>

                {/* Description */}
                <div
                    style={{
                        marginTop: 28,
                        fontSize: 32,
                        lineHeight: 1.4,
                        opacity: 0.78,
                        maxWidth: '82%',
                    }}
                >
                    {tool.description}
                </div>

                {/* Footer */}
                <div
                    style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            fontSize: 28,
                            opacity: 0.7,
                        }}
                    >
                        {config.siteName}
                    </div>

                    <div
                        style={{
                            fontSize: 24,
                            opacity: 0.45,
                        }}
                    >
                        Free Online Tool
                    </div>
                </div>
            </div>
        ),
        size
    )
}