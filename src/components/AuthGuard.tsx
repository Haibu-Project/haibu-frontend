"use client";

import { useRouter } from "next/navigation";
import { useAddress } from "@chopinframework/react";
import { ReactNode } from "react";
import { useAuthCheck } from "@/hooks/useAuthChek";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { address, isLoading } = useAddress();
  const router = useRouter();

  if (!address && !isLoading) {
    router.push("/auth/register");
  }

  useAuthCheck();

  return <>{children}</>;
}
