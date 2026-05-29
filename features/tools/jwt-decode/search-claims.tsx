import { icons } from "@/components/icons";
import { SearchResult } from "@/types/jwt.type";

interface Props {
    visible: boolean
    searchQuery: string
    setSearchQuery: (val: string) => void
    searchResults: SearchResult[]
}

export const SearchClaims = ({ visible, searchQuery, setSearchQuery, searchResults }: Props) => {

    if (!visible) return null;

    return (
        <div className="rounded-lg border border-(--border) my-3 overflow-auto">
            <div className="text-xs border-b border-(--border) flex justify-between items-center gap-3 p-2 px-3">
                <span className="text-(--muted)">Claims Search</span>
            </div>
            <div className="p-3">
                <div className="mb-2 relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2">{icons.magnify}</span>
                    <input
                        type="text"
                        className="pl-10!"
                        placeholder="Search claim keys or values…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {!searchQuery.trim() &&
                    <span className="text-xs opacity-50">
                        Type to search across all claims (keys and values)…
                    </span>
                }
                {searchQuery.trim() && searchResults.length === 0 &&
                    <div className="text-xs opacity-50">
                        No matching claims found
                    </div>
                }

                {searchResults.map((r, i) => (
                    <div key={i} className="mb-2 py-1.5 px-2.5 rounded-md bg-(--muted)/10 border border-(--muted)/30">
                        <div className="text-xs text-white/50 mb-1">📍 {r.path}</div>
                        <span className="text-cyan-300">&quot;{r.key}&quot;</span>:
                        <span className="text-green-300">{JSON.stringify(r.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}