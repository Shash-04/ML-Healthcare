import type React from "react"
import { Toaster } from 'react-hot-toast';

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (

        <div>
            <main>
                <Toaster position="top-right" />
                {children}
            </main>
        </div>
    )
}

