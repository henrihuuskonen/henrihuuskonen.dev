import React from "react";
import {Box} from "@/components/Box";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <Box
            css={{
                maxW: "100%"
            }}
        >
            {children}
        </Box>
    )
}

export default Layout