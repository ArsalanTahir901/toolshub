import { copyToClipboard } from "@/utils";
import { ChangeEvent, useState } from "react"

export const useLoremIpsumGenerator = () => {

    const limit = 20;

    const LOREM_PARAS = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
    ];

    const [count, setCount] = useState('1');
    const [generatedContent, setGeneratedContent] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (+value > limit) return;
        setCount(value);
    }

    const onGenerate = () => {
        const n = Math.min(10, Math.max(1, +count || 2));
        const result = Array.from({ length: n }, (_, i) => LOREM_PARAS[i % LOREM_PARAS.length]).join('\n\n');
        setGeneratedContent(result);
        onCopy();
    }

    const onCopy = () => {
        copyToClipboard({ value: generatedContent });
    }

    return {
        count,
        onChange,
        onGenerate,
        onCopy,
        generatedContent,
        limit
    }
}