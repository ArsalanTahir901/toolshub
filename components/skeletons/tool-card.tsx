import './style.css';

export const ToolCardSkeleton = () => {
    return (
        <div className='block max-w-205'>
            <article className="tool-card-skeleton">

                {/* Tag — top right */}
                <div className="sk tag" style={{ width: 90, height: 18 }} />

                {/* Icon */}
                <div className="sk tool-icon" style={{ marginBottom: 16 }} />

                {/* Heading */}
                <div className="sk" style={{ width: '65%', height: 16, marginBottom: 10, borderRadius: 6 }} />

                {/* Description lines */}
                <div className="sk" style={{ width: '100%', height: 11, marginBottom: 6, borderRadius: 6 }} />
                <div className="sk" style={{ width: '88%', height: 11, marginBottom: 6, borderRadius: 6 }} />
                <div className="sk" style={{ width: '72%', height: 11, marginBottom: 16, borderRadius: 6 }} />

                {/* Footer buttons */}
                <div style={{ display: 'flex', gap: 8 }}>
                    <div className="sk" style={{ width: 70, height: 28, borderRadius: 6 }} />
                    <div className="sk" style={{ width: 70, height: 28, borderRadius: 6 }} />
                </div>

            </article>
        </div>
    )
}