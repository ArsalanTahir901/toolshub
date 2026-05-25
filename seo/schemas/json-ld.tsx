import Script from "next/script";

type Props = {
    id: string;
    data: object;
};

export const JsonLd = ({ id, data }: Props) => {
    return (
        <Script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
        />
    );
};