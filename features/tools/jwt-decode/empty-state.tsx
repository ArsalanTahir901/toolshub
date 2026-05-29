
export const EmptyState = ({ visible }: { visible: boolean }) => {

    if (!visible) return null

    return (
        <div
            className="flex border border-(--muted) bg-(--card)/10 rounded-md items-center justify-center flex-col gap-2.5 p-3.5 min-h-50"
        >
            <svg width="46" height="46" fill="none" viewBox="0 0 48 48">
                <rect x="8" y="8" width="32" height="32" rx="6" stroke='#506079' strokeWidth="1.8" />
                <path d="M16 20h16M16 24h12M16 28h8" stroke='#506079' strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="36" cy="36" r="8" fill="var(--muted)" stroke='#506079' strokeWidth="1.8" />
                <path d="M33 36h6M36 33v6" stroke='#506079' strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: 12, color: '#506079' }}>
                Paste a JWT token above to decode, inspect and verify it
            </p>
        </div>
    )
}