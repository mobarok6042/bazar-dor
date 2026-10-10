"use client";

import { useState } from "react";
import Link from "next/link";
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
      setErrorMessage("Please enter your name.");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await updateUser({ name: updatedName });

      if (error) {
        setErrorMessage(error.message || "Unable to update your name.");
        return;
      }

      setSuccessMessage("Your name has been updated.");
    } catch {
      setErrorMessage("Unable to update your name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
      <section className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-3xl font-bold">Your profile</h1>
          <p className="text-sm text-base-content/65">
            Update your profile name. Your email address cannot be changed here.
          </p>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="form-control w-full">
              <span className="label-text mb-2">Name</span>
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
              <span className="label-text mb-2">Email</span>
              <p className="rounded-lg border border-base-300 bg-base-200 px-4 py-3 text-base-content/70">
                {user.email}
              </p>
            </div>
            {errorMessage && <p role="alert" className="text-sm text-error">{errorMessage}</p>}
            {successMessage && <p role="status" className="text-sm text-success">{successMessage}</p>}
            <button type="submit" className="btn w-full bg-[#047F39] text-white" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save name"}
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
        <h1 className="text-2xl font-bold">Sign in to view your profile</h1>
        <Link href="/sign-in" className="btn mt-5 bg-[#047F39] text-white">
          Sign In
        </Link>
      </main>
    );
  }

  return <ProfileForm key={session.user.id} user={session.user} />;
};

export default ProfilePage;
