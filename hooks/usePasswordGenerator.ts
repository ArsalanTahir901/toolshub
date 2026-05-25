import { copyToClipboard } from "@/utils";
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast";

export const usePasswordGenerator = () => {

    const options = ['uppercase', 'lowercase', 'numbers', 'symbols'];

    const [progress, setProgress] = useState('16');
    const [checkedOptions, setCheckedOptions] = useState(options);
    const [password, setPassword] = useState('');

    const onProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProgress(value);
    }

    const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        let updatedOptions: string[] = [];

        if (checked) {
            updatedOptions = checkedOptions.includes(name)
                ? checkedOptions
                : [...checkedOptions, name];
        } else {
            updatedOptions = checkedOptions.filter(
                option => option !== name
            );
        }

        setCheckedOptions(updatedOptions);
    };

    const prevent = () => {
        if (!checkedOptions.length) {
            toast.error("Select at least one character type.");
            return true;
        }

        return false;
    }

    const generatePassword = () => {

        if (prevent()) return;

        let chars = "";

        if (checkedOptions.includes("uppercase")) {
            chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        if (checkedOptions.includes("lowercase")) {
            chars += "abcdefghijklmnopqrstuvwxyz";
        }

        if (checkedOptions.includes("numbers")) {
            chars += "0123456789";
        }

        if (checkedOptions.includes("symbols")) {
            chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
        }

        // Safety check
        if (!chars.length) {
            toast.error("Please select at least one option.");
            return;
        }

        const arr = new Uint32Array(Number(progress));

        crypto.getRandomValues(arr);

        const pwd = Array.from(arr).map(v => chars[v % chars.length]).join("");

        setPassword(pwd);
        onCopy();
    };

    const onCopy = () => {
        copyToClipboard({ value: password });
    }

    return {
        options,
        progress,
        onProgressChange,
        onCheckboxChange,
        checkedOptions,
        password,
        generatePassword,
        onCopy
    }
}