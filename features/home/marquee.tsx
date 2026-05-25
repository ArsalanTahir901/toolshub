import { toolsArray } from "@/features/tools/registry"

export const Marquee = () => {
    return (
        <div className="relative z-1 overflow-hidden border-y border-(--border) bg-[linear-gradient(90deg,var(--bg),transparent_5%,transparent_95%,var(--bg))] py-2 my-10">
            <div className="flex gap-0 whitespace-nowrap animate-[scroll_25s_linear_infinite]">
                {toolsArray.map((tool) => (
                    <div
                        key={tool.id}
                        className="flex items-center gap-2.5 border-r border-(--border) px-7 text-[13px] font-medium tracking-[0.04em] text-(--muted)"
                    >
                        {tool.icon.text}
                        <span className="text-(--accent2)">{tool.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}