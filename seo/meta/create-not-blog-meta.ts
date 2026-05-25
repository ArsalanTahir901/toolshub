export const createNoBlogMetadata = () => {
    return {
        title: `Blog Not Found`,
        description: "The requested blog could not be found.",
        robots: {
            index: false,
            follow: false,
        },
    }
}