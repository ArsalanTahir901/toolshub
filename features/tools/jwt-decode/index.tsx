'use client'
import { useJwtDecode } from "@/hooks/useJwtDecode";
import { ToolCard } from "@/components/tool-card";
import { toolsConstant, ToolsConstantKeyEnums } from "../registry";
import { ErrorMsg } from "@/components/error-msg";
import { Actions } from "./actions";
import { ShareUrl } from "./share-url";
import { Statusbar } from "./status-bar";
import { Tab } from "@/components/tab";
import { DecodedTab } from "./decoded-tab";
import { SecurityTab } from "./security-tab";
import { ClaimsTab } from "./claims-tab";
import { TimeTab } from "./time-tab";
import { SignatureVerfication } from "./signature-verification";
import { MetadataTab } from "./metadata-tab";
import { SearchClaims } from "./search-claims";
import { DiffTab } from "./diff-tab";
import { EmptyState } from "./empty-state";
import { Chart } from "./chart";
import { RawOutput } from "./raw-output";

export default function JwtDecoder() {
    const {
        token, setToken,
        tab, setTab,
        verifySecret, setVerifySecret,
        verifyAlg, setVerifyAlg,
        showSecret, setShowSecret,
        verifyResult, setVerifyResult,
        searchQuery, setSearchQuery,
        diffA, setDiffA,
        diffB, setDiffB,
        diffResult, setDiffResult,
        showShare, setShowShare,
        expectedAud, setExpectedAud,
        searchResults,
        audienceMismatch,
        TABS,
        exportReport,
        verifyAlgNote,
        runVerify,
        runDiff,
        shareUrl,
        decoded,
        raw, security, time, claims, meta,
        handleClear,
        onShare, copyText
    } = useJwtDecode()

    const tool = toolsConstant[ToolsConstantKeyEnums.JWT_DECODE];

    return (
        <ToolCard
            defaultOpen
            {...tool}
            description={<>
                <span className="block text-xs font-medium mb-1">
                    Decode · Verify · Inspect · Diff · Search · Export
                </span>
                {tool.description}
            </>}
            textarea={{
                value: token,
                onChange: (e) => setToken(e.target.value),
                placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…",
                spellCheck: false,
                autoFocus: true,
                onDrop: (e) => {
                    e.preventDefault();
                    const t = e.dataTransfer.getData("text");
                    if (t?.includes(".")) setToken(t.trim());
                }
            }}
        >
            {token.trim() && !decoded && raw && <ErrorMsg error={raw?.error} />}
            <Actions
                copyText={() => { if (token.trim()) copyText(token.trim()) }}
                exportReport={exportReport}
                onClear={handleClear}
                onShare={() => { onShare(); copyText(shareUrl, 'Url Copied') }}
                setToken={setToken}
            />
            <ShareUrl
                visible={showShare && !!shareUrl}
                url={shareUrl}
                clear={() => setShowShare(false)}
                copyText={copyText}
            />

            <Statusbar
                decoded={decoded}
                security={security}
                time={time}
                token={token}
            />

            {decoded &&
                <Tab
                    data={TABS.map((t) => ({ value: t.id, label: t.label }))}
                    onClick={(val) => { setTab(val) }}
                    activeVal={tab}
                />
            }

            <DecodedTab
                visible={tab === 'decoded'}
                copyText={copyText}
                decoded={decoded}
            />

            <SecurityTab
                visible={tab === 'security'}
                security={security}
                expectedAud={expectedAud}
                setExpectedAud={setExpectedAud}
                aud={decoded?.payload.aud}
                audienceMismatch={audienceMismatch}
            />

            <ClaimsTab
                visible={tab === 'claims'}
                claims={claims}
                copyText={() => copyText(JSON.stringify(decoded?.payload, null, 2))}
            />

            <TimeTab
                visible={tab === 'time'}
                time={time}
            />

            <SignatureVerfication
                verifyAlgNote={verifyAlgNote}
                visible={tab === 'verify'}
                decoded={decoded}
                setVerifyAlg={setVerifyAlg}
                verifyAlg={verifyAlg}
                reset={() => { setVerifyResult(null); setVerifySecret(""); }}
                runVerify={runVerify}
                setShowSecret={setShowSecret}
                showSecret={showSecret}
                setVerifySecret={setVerifySecret}
                verifySecret={verifySecret}
                verifyResult={verifyResult}
            />

            <MetadataTab
                visible={tab === 'metadata'}
                meta={meta}

            />

            <SearchClaims
                visible={tab === 'search'}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}

            />
            <DiffTab
                visible={tab === 'diff'}
                diffA={diffA}
                setDiffA={setDiffA}
                diffB={diffB}
                setDiffB={setDiffB}
                clear={() => {
                    setDiffA('')
                    setDiffB('')
                    setDiffResult(null)
                }}
                runDiff={runDiff}
                token={token}
                diffResult={diffResult}
            />

            <EmptyState visible={!token.trim()} />

            <Chart decoded={decoded} />

            <RawOutput decoded={decoded} raw={raw} />
        </ToolCard>
    );
}