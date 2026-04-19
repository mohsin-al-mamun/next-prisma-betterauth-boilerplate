import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { SignOutButton } from "@/app/components/sign-out-button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          next-prisma-betterauth
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Next.js · Prisma · BetterAuth boilerplate
        </p>

        {session ? (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-left">
              <p className="text-xs text-gray-400 mb-1">Signed in as</p>
              <p className="text-sm font-medium text-gray-900">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              href="/signup"
              className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="w-full border border-gray-200 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
