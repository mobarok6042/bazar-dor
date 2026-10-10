"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";

const AccountMenu = () => {
  const { data: session, isPending } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const user = session?.user;

  const handleSignOut = async () => {
    setErrorMessage("");
    try {
      const { error } = await signOut();
      if (error) {
        setErrorMessage(error.message || "Unable to sign out. Please try again.");
      }
    } catch {
      setErrorMessage("Unable to sign out. Please try again.");
    }
  };

  if (isPending) {
    return <div aria-hidden="true" className="h-10 w-32 animate-pulse rounded-lg bg-base-200" />;
  }

  if (!user) {
    return (
      <nav aria-label="Account" className="flex items-center justify-end gap-2 sm:gap-3">
        <Link href="/sign-in" className="btn btn-outline">
          Sign In
        </Link>
        <Link href="/sign-up" className="btn bg-[#047F39] text-white">
          Sign Up
        </Link>
      </nav>
    );
  }

  const initials = user.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="group relative">
      <Link
        href="/profile"
        className="flex max-w-56 items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-base-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047F39]"
        aria-label={`Open profile for ${user.name || user.email}`}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            width={40}
            height={40}
            unoptimized
            className="size-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#047F39] font-semibold text-white">
            {initials}
          </span>
        )}
        <span className="truncate font-medium">{user.name || user.email}</span>
      </Link>

      <div className="invisible absolute right-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="rounded-xl border border-base-300 bg-base-100 p-4 shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt=""
                width={48}
                height={48}
                unoptimized
                className="size-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#047F39] text-lg font-semibold text-white">
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold">{user.name || "User"}</p>
              <p className="truncate text-sm text-base-content/65">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-t border-base-300 pt-3">
            {errorMessage && <p role="alert" className="px-3 py-2 text-sm text-error">{errorMessage}</p>}
            <Link href="/profile" className="btn btn-ghost justify-start">
              Profile
            </Link>
            <button
              type="button"
              className="btn btn-ghost justify-start text-error"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
