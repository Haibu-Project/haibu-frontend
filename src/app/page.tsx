import FeedContainer from "@/components/features/feed/feed-charge";
import { RightSidebar } from "@/components/home/feed/right-sidebar";
import AuthGuard from "@/components/AuthGuard";

export default function Page() {
  return (
    <AuthGuard>
      <div className="animate__animated animate__fadeInRight">
        <div className="flex min-h-screen w-full dark:bg-primary-dark">
          <main className="flex-1 border-x dark:border-accent/10 px-4 sm:px-8">
            <div className="max-w-2xl mx-auto py-8">
              <FeedContainer />
            </div>
          </main>
          <aside className="hidden lg:block lg:w-80 xl:w-96 h-screen sticky top-0 overflow-y-auto p-8 pr-[5rem]">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </AuthGuard>
  );
}
