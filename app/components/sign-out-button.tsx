"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full border border-gray-200 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition"
    >
      Sign out
    </button>
  );
}
