"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import SocialAuthButtons from "../SocialAuthButtons";

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      if (error) {
        setErrorMessage(error.message || "Unable to sign in with those credentials.");
      }
    } catch {
      setErrorMessage("Unable to sign in. Please try again.");
    }
  };

  const handleSocialSignIn = async (provider) => {
    setErrorMessage("");
    try {
      const { error } = await signIn.social({ provider });
      if (error) {
        setErrorMessage(error.message || `Unable to continue with ${provider}.`);
      }
    } catch {
      setErrorMessage(`Unable to continue with ${provider}. Please try again.`);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <section className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-base-content/65">
              Sign in to your Bazar Dor account.
            </p>
          </div>

          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? null
                  : "Please enter a valid email address"
              }
            >
              <Label>Email</Label>
              <Input autoComplete="email" placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label>Password</Label>
              <Input autoComplete="current-password" placeholder="Enter your password" />
              <FieldError />
            </TextField>
            {errorMessage && <p role="alert" className="text-sm text-error">{errorMessage}</p>}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </Form>

          <SocialAuthButtons
            onGoogleSignIn={() => handleSocialSignIn("google")}
            onGithubSignIn={() => handleSocialSignIn("github")}
          />

          <p className="text-center text-sm text-base-content/70">
            New to this site?{" "}
            <Link href="/sign-up" className="font-semibold text-[#047F39] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
