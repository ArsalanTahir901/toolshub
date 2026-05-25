// Uses arrayBuffer() instead of FileReader:
//   - No callback pyramid
//   - Faster (direct memory access, no data-URL overhead)
//   - Easier error handling

self.onmessage = async (event: MessageEvent<File>) => {
    const file = event.data;

    try {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        // Chunk-based btoa — avoids stack overflow on large files
        const CHUNK = 8192;
        let binary = "";
        for (let i = 0; i < bytes.length; i += CHUNK) {
            binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
        }

        const base64 = btoa(binary);

        self.postMessage({
            success: true,
            base64,
            fileName: file.name,
            size: file.size,
        });
    } catch (err) {
        self.postMessage({
            success: false,
            error: err instanceof Error ? err.message : "Worker encoding failed",
        });
    }
};