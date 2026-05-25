// ─── Types ────────────────────────────────────────────────────────────────────

export type HashAlgorithm =
    | 'MD5'
    | 'SHA-1'
    | 'SHA-256'
    | 'SHA-384'
    | 'SHA-512';

export type InputMode = 'text' | 'file';

export type HashResult = {
    algorithm: HashAlgorithm;
    hash: string;
};

export const ALGORITHMS: HashAlgorithm[] = [
    'MD5',
    'SHA-1',
    'SHA-256',
    'SHA-384',
    'SHA-512',
];

export const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
export const MAX_TEXT_LENGTH = 5_000_000;
export const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB

type SparkMD5Module = { default: typeof import("spark-md5") };
type HashWasmModule = typeof import("hash-wasm");

type SparkMd5ArrayBufferHasher = {
    append: (chunk: ArrayBuffer) => void;
    end: () => string;
};

type UnifiedHasher = {
    update: (chunk: Uint8Array) => void;
    digest: () => string;
};

let sparkPromise: Promise<SparkMD5Module> | null = null;
let hashWasmPromise: Promise<HashWasmModule> | null = null;

const loadSparkMd5 = (): Promise<SparkMD5Module> => {
    if (!sparkPromise) {
        sparkPromise = import("spark-md5").then((mod) => ({ default: mod.default }));
    }
    return sparkPromise;
};

const loadHashWasm = async (): Promise<HashWasmModule> => {
    if (!hashWasmPromise) hashWasmPromise = import("hash-wasm");
    return hashWasmPromise;
};

// ─── Hash Factory ─────────────────────────────────────────────────────────────

const toArrayBuffer = (chunk: Uint8Array): ArrayBuffer => {
    if (chunk.byteOffset === 0 && chunk.byteLength === chunk.buffer.byteLength) {
        return chunk.buffer as ArrayBuffer;
    }
    return chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength) as ArrayBuffer;
};

export async function createHasher(algo: HashAlgorithm): Promise<UnifiedHasher> {
    switch (algo) {
        case "MD5": {
            const SparkMD5 = (await loadSparkMd5()).default;
            const md5 = new SparkMD5.ArrayBuffer() as SparkMd5ArrayBufferHasher;
            return {
                update: (chunk) => md5.append(toArrayBuffer(chunk)),
                digest: () => md5.end(),
            };
        }

        case "SHA-1": {
            const { createSHA1 } = await loadHashWasm();
            const hasher = await createSHA1();
            return {
                update: (chunk) => hasher.update(chunk),
                digest: () => hasher.digest(),
            };
        }

        case "SHA-256": {
            const { createSHA256 } = await loadHashWasm();
            const hasher = await createSHA256();
            return {
                update: (chunk) => hasher.update(chunk),
                digest: () => hasher.digest(),
            };
        }

        case "SHA-384": {
            const { createSHA384 } = await loadHashWasm();
            const hasher = await createSHA384();
            return {
                update: (chunk) => hasher.update(chunk),
                digest: () => hasher.digest(),
            };
        }

        case "SHA-512": {
            const { createSHA512 } = await loadHashWasm();
            const hasher = await createSHA512();
            return {
                update: (chunk) => hasher.update(chunk),
                digest: () => hasher.digest(),
            };
        }
    }
}

// ─── Text Hashing ─────────────────────────────────────────────────────────────

export async function hashText(
    input: string,
    selected: HashAlgorithm[]
): Promise<HashResult[]> {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(input);

    const results = await Promise.all(
        selected.map(async (algo) => {
            const hasher = await createHasher(algo);
            hasher.update(bytes);
            return {
                algorithm: algo,
                hash: hasher.digest(),
            };
        })
    );

    return results;
}

// ─── File Hashing (Chunked) ──────────────────────────────────────────────────

export async function hashFile(
    file: File,
    selected: HashAlgorithm[],
    onProgress?: (progress: number) => void
): Promise<HashResult[]> {
    const hashers = await Promise.all(
        selected.map(async (algo) => ({
            algorithm: algo,
            hasher: await createHasher(algo),
        }))
    );

    let offset = 0;

    while (offset < file.size) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        const buffer = await chunk.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        for (const item of hashers) {
            item.hasher.update(bytes);
        }

        offset += CHUNK_SIZE;

        if (onProgress) {
            onProgress(Math.min(100, Math.round((offset / file.size) * 100)));
        }

        // Yield to UI
        await new Promise((resolve) => setTimeout(resolve, 0));
    }

    return hashers.map((item) => ({
        algorithm: item.algorithm,
        hash: item.hasher.digest(),
    }));
}