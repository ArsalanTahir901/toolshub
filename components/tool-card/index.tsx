'use client'
import './style.css';
import { Badge } from '../badge';
import { thirdPartyPaths } from '@/constants';
import { ToolCardProps } from '@/types/card';

export const ToolCard = ({
    id = 'tool-card',
    slug,
    icon,
    heading,
    title,
    tag,
    description,
    children,
    stats,
    textarea,
    footer,
    input,
    className = '',
    defaultOpen = false
}: ToolCardProps) => {

    return (
        <article id={slug || id} className={`tool-card ${className}`} itemScope itemType={thirdPartyPaths.itemType.href}>

            {/* <span className={`tag ${tag.className}`}>{tag.text}</span> */}
            {!!tag && <Badge
                title={tag.text}
                variant={tag.variant}
                className={`tag ${tag?.className}`}
            />}

            <div className={defaultOpen ? 'flex items-center gap-3 flex-wrap' : ''}>
                {!!icon && <div className={`tool-icon ${icon?.className}`}>{icon?.text}</div>}
                <h2 itemProp="name">{heading || title}</h2>
            </div>

            <p itemProp="description">{description}</p>

            {defaultOpen &&
                <div className={`tool-workspace ${defaultOpen ? 'active' : ''}`}>
                    {!!textarea && <textarea rows={5} {...textarea} />}

                    {!!input && <input {...input} />}

                    {children}

                    {!!stats && <div className="stats-row">
                        {stats.map((stat) => (
                            <span key={stat} className="stat-chip">{stat}</span>
                        ))}
                    </div>}

                    {!!footer && <div className="btn-row">
                        {footer}
                    </div>}
                </div>
            }
        </article>
    )
}