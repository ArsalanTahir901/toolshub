'use client'
import { Toaster } from "react-hot-toast"

export const ToastProvider = () => {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: "var(--card)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    backdropFilter: "blur(12px)",
                },

                success: {
                    iconTheme: {
                        primary: "var(--accent2)",
                        secondary: "var(--card)",
                    },
                },

                error: {
                    iconTheme: {
                        primary: "var(--accent3)",
                        secondary: "var(--card)",
                    },
                },
            }}
        />
    )
}