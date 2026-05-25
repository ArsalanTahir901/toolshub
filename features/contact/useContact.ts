import { icons } from "@/components/icons"
import { ChangeEvent, useState } from "react"

type FieldErrors = {
    name?: string
    email?: string
    subject?: string
    message?: string
}

export const useContact = () => {

    const subjects = [
        { value: 'bug', label: 'Bug Report', icon: icons.bug },
        { value: 'feature', label: 'Feature Request', icon: icons.bulb },
        { value: 'partnership', label: 'Partnership', icon: icons.handshake },
        { value: 'adsense', label: 'Advertising', icon: icons.moneyBag },
        { value: 'other', label: 'Other', icon: icons.message },
    ]

    const defaultFields = {
        name: '',
        email: '',
        subject: subjects[0].value,
        message: ''
    }

    const [fields, setFields] = useState(defaultFields);

    const [errors, setErrors] = useState<FieldErrors>({})

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setFields(pre => ({ ...pre, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    }

    const validate = () => {

        const newErrors: FieldErrors = {}

        // Name
        if (!fields.name.trim()) {
            newErrors.name = "Name is required"
        }

        // Email
        if (!fields.email.trim()) {
            newErrors.email = "Email is required"
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.email)
        ) {
            newErrors.email = "Invalid email address"
        }

        // Message
        if (!fields.message.trim()) {
            newErrors.message = "Message is required"
        } else if (fields.message.trim().length < 10) {
            newErrors.message =
                "Message must be at least 10 characters"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const onSubmit = () => {
        // const website = 
        const isValid = validate();
        if (!isValid) return
        console.log(fields)

        // Reset form
        setFields(defaultFields)
        setErrors({})
    }

    return {
        subjects,
        fields,
        onChange,
        onSubmit,
        errors
    }
}