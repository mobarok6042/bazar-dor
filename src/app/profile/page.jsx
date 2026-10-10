"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const updatedName = name.trim();
    if (!updatedName) {
      const message = "আপনার নাম লিখুন।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await updateUser({ name: updatedName });

      if (error) {
        const message = "নাম পরিবর্তন করা যায়নি। আবার চেষ্টা করুন।";
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      const message = "আপনার নাম পরিবর্তন করা হয়েছে।";
      setSuccessMessage(message);
      toast.success(message);
    } catch {
      const message = "নাম পরিবর্তন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
      <section className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-3xl font-bold">আপনার প্রোফাইল</h1>
          <p className="text-sm text-base-content/65">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন। এখান থেকে ইমেইল ঠিকানা পরিবর্তন করা যাবে না।
          </p>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="form-control w-full">
              <span className="label-text mb-2">নাম</span>
              <input
                className="input input-bordered w-full"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={1}
                maxLength={100}
              />
            </label>
            <div className="form-control w-full">
              <span className="label-text mb-2">ইমেইল</span>
              <p className="rounded-lg border border-base-300 bg-base-200 px-4 py-3 text-base-content/70">
                {user.email}
              </p>
            </div>
            {errorMessage && <p role="alert" className="text-sm text-error">{errorMessage}</p>}
            {successMessage && <p role="status" className="text-sm text-success">{successMessage}</p>}
            <button type="submit" className="btn w-full bg-[#047F39] font-semibold text-white hover:bg-[#035f2b]" disabled={isSaving}>
              {isSaving ? "সংরক্ষণ হচ্ছে..." : "নাম সংরক্ষণ করুন"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <main className="mx-auto w-full max-w-xl px-4 py-16" aria-busy="true" />;
  }

  if (!session?.user) {
    return (
      <main className="mx-auto w-full max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">প্রোফাইল দেখতে সাইন ইন করুন</h1>
        <Link href="/sign-in" className="btn mt-5 bg-[#047F39] font-semibold text-white hover:bg-[#035f2b]">
          সাইন ইন
        </Link>
      </main>
    );
  }

  return <ProfileForm key={session.user.id} user={session.user} />;
};

export default ProfilePage;
