type JsonLdSchema = Record<string, unknown>;

export const combineSchemas = (...schemas: JsonLdSchema[]) => ({
    "@context": "https://schema.org",
    "@graph": schemas
})