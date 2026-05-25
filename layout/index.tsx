import React from "react"
import { Header } from "./header"
import { Children_Type } from "@/types"
import { Footer } from "./footer"

export const AppLayout = ({ children }: Children_Type) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
