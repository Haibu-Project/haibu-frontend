"use client";

import { useEffect } from "react";
import { useAddress } from "@chopinframework/react";
import { useRouter } from "next/navigation";
import { checkRegistration } from "@/api/auth.api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { address, isLoading } = useAddress();
  const router = useRouter();

  useEffect(() => {
    async function verifyAuth() {
      if (!address || isLoading) return;

      const isRegistered = await checkRegistration(address);
      if (!isRegistered) {
        router.push("/auth/register");
      }
    }

    verifyAuth();
  }, [address, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
