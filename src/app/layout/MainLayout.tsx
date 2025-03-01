'use client'
import { MainNav } from "@/components/ui/sidebar/sidebar";
import { usePathname } from "next/navigation";  
import "animate.css";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); 

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register"; 

  return (
    <html lang="en">
          <div className="flex min-h-screen w-full">
            {!isAuthPage && (
              <aside className="hidden lg:block lg:w-72 xl:w-80 h-screen sticky top-0">
                <MainNav />
              </aside>
            )}

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
              <div className="flex-1 overflow-y-auto">{children}</div>
            </main>
          </div>
    </html>
  );
}
