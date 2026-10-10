"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
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
        const message = "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।";
        setErrorMessage(message);
        toast.error(message);
      } else {
        toast.success("সফলভাবে সাইন আউট হয়েছে।");
      }
    } catch {
      const message = "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  if (isPending) {
    return <div aria-hidden="true" className="h-10 w-32 animate-pulse rounded-lg bg-base-200" />;
  }

  if (!user) {
    return (
      <nav aria-label="অ্যাকাউন্ট" className="flex items-center justify-end gap-2 sm:gap-3">
        <Link href="/sign-in" className="btn border-2 border-[#047F39] font-semibold text-[#006b2f] hover:bg-[#047F39] hover:text-white">
          সাইন ইন
        </Link>
        <Link href="/sign-up" className="btn bg-[#047F39] font-semibold text-white hover:bg-[#035f2b]">
          নিবন্ধন
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
        aria-label={`${user.name || user.email}-এর প্রোফাইল খুলুন`}
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
              <p className="truncate font-semibold">{user.name || "ব্যবহারকারী"}</p>
              <p className="truncate text-sm text-base-content/65">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-t border-base-300 pt-3">
            {errorMessage && <p role="alert" className="px-3 py-2 text-sm text-error">{errorMessage}</p>}
            <Link href="/profile" className="btn btn-ghost justify-start font-semibold text-[#006b2f] hover:bg-[#e6f4eb]">
              প্রোফাইল
            </Link>
            <button
              type="button"
              className="btn btn-ghost justify-start font-semibold text-error"
              onClick={handleSignOut}
            >
              সাইন আউট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
