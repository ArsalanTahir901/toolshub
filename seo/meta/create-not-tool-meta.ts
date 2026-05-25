export const createNoToolMetadata = () => {
    return {
        title: `Tool Not Found`,
        description: "The requested tool could not be found.",
        robots: {
            index: false,
            follow: false,
        },
    }
}