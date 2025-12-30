"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => signIn("github", { callbackUrl: "/admin/dashboard" })}
        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-colors"
      >
        Войти через GitHub
      </button>
    </div>
  );
}
