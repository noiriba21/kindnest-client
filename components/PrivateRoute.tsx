"use client";
import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PageSkeleton } from "./Skeletons";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  // Wait for the session first, so reload does not kick you to Login
  if (isPending || !session) return <PageSkeleton />;
  return <>{children}</>;
}