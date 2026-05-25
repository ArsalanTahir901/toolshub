import React from "react"

export const Label = ({ className = '', ...props }: React.ComponentProps<'label'>) => {
    return (
        <label className={`text-xs text-(--muted) ${className}`} {...props}/>
    )
}