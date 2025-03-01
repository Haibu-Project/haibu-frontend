"use client";

import { useAuthCheck } from "@/hooks/useAuthChek";
import { useRouter } from "next/navigation";
import { useAddress } from "@chopinframework/react";
import { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { address, isLoading } = useAddress();
  const { isRegistered } = useAuthCheck();
  const router = useRouter();

  if (!address && !isLoading) {
    router.push("/auth/register");
  }

  if (isLoading || isRegistered === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
