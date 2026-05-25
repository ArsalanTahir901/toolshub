import { Children_Type } from "@/types"
import { ToastProvider } from "./toast-provider"

export const Providers = ({ children }: Children_Type) => {
    return (
        <>
            <ToastProvider />
            {children}
        </>
    )
}