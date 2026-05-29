'use client';

import { useUrlEncodeDecode, Mode } from '@/hooks/useUrlEncodeDecode';
import { ToolCard } from '@/components/tool-card';
import { toolsConstant, ToolsConstantKeyEnums } from '../registry';
import { Button } from '@/components/buttons';
import { Tab } from '@/components/tab';
import { Badge } from '@/components/badge';
import { UrlInput } from './url-input';
import { Output } from './output';
import { UrlBuilder } from './url-builder';
import { History } from './history';

const UrlEncodeDecode = () => {
    const {
        input,
        setInput,
        output,
        mode,
        setMode,
        MODES,
        live,
        setLive,
        handleCopy,
        isValidDecode,
        queryParsed,
        baseUrl,
        setBaseUrl,
        key,
        setKey,
        value,
        setValue,
        params,
        addParam,
        removeParam,
        builtUrl,
        clearAll,
        history,
        handleManualConvert,
        handleClearHistory
    } = useUrlEncodeDecode();

    return (
        <ToolCard
            defaultOpen
            {...toolsConstant[ToolsConstantKeyEnums.URL_ENCODE_DECODE]}
        >

            <Tab
                data={MODES}
                activeVal={mode}
                onClick={(val) => setMode(val as Mode)}
            />
            <UrlInput
                live={live}
                setLive={setLive}
                value={input}
                setValue={setInput}
            />

            {!live && <Button onClick={handleManualConvert}>Convert</Button>}

            {/* OUTPUT */}
            <Output handleCopy={handleCopy} output={output} />

            {/* VALIDATION */}
            {input && mode === 'decode' &&
                <Badge
                    dot={false}
                    title={isValidDecode(input) ? 'Valid' : 'Invalid'}
                />
            }

            {/* QUERY PARSER */}
            {queryParsed && (
                <pre className="border border-(--border) rounded-lg p-2.5 mt-2 wrap-break-word text-wrap">
                    {queryParsed}
                </pre>
            )}

            {/* URL BUILDER */}
            <UrlBuilder
                addParam={addParam}
                baseUrl={baseUrl}
                builtUrl={builtUrl}
                keyVal={key}
                value={value}
                setBaseUrl={(val) => setBaseUrl(val)}
                setKey={(val) => setKey(val)}
                setValue={(val) => setValue(val)}
                params={params}
                handleCopy={handleCopy}
                removeParam={removeParam}
            />

            <div className='text-end'>
                <Button onClick={clearAll}>Clear All</Button>
            </div>

            {/* HISTORY */}
            <History
                history={history}
                onClearHistory={handleClearHistory}
            />

        </ToolCard>
    );
};

export default UrlEncodeDecode;