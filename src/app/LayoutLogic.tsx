"use client"
import { MainNav } from "@/components/ui/sidebar/sidebar";

import { usePathname } from "next/navigation";
import "./globals.css";
import "animate.css";


export default function LayoutLogic({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    const showNav = pathname && !['/auth/login', '/auth/register'].includes(pathname);

    return (
        <div className="flex min-h-screen w-full">
            {showNav && (
                <aside className="hidden lg:block lg:w-72 xl:w-80 h-screen sticky top-0">
                    <MainNav />
                </aside>
            )}
            {children}
        </div>
    );
}