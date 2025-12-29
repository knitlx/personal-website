"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-2 bg-[#A60000] text-white font-semibold rounded-lg shadow-md hover:bg-[#8B0000] transition-colors"
    >
      Выйти
    </button>
  )
}