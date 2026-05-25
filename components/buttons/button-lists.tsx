import { Button } from "."
import { SectionTitle } from "../section-title";

interface Props {
    list: { icon?: string, title: string, href?: string }[]
    heading?: string;
}

export const ButtonList = ({ list, heading }: Props) => {
    return (
        <div>
            {heading &&
                <SectionTitle title={heading} />
            }
            <div className="flex items-center gap-2 flex-wrap">
                {list.map((item) => (
                    <Button
                        href={item.href}
                        key={item.title}
                        aria-label={item.title}
                    >
                        {item?.icon} {item.title}
                    </Button>
                ))}
            </div>
        </div>
    )
}