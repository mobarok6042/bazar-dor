"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import SocialAuthButtons from "../SocialAuthButtons";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        setErrorMessage(error.message || "Unable to create your account.");
        return;
      }

      setSuccessMessage("Your account has been created successfully.");
    } catch {
      setErrorMessage("Unable to create your account. Please try again.");
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
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-base-content/65">
              Sign up to get started with Bazar Dor.
            </p>
          </div>

          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="name"
              validate={(value) =>
                value.length < 3 ? "Name must be at least 3 characters" : null
              }
            >
              <Label>Name</Label>
              <Input autoComplete="name" placeholder="John Doe" />
              <FieldError />
            </TextField>
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
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                return null;
              }}
            >
              <Label>Password</Label>
              <Input autoComplete="new-password" placeholder="Create a password" />
              <Description>
                At least 8 characters, including one uppercase letter and one number.
              </Description>
              <FieldError />
            </TextField>
            {errorMessage && <p role="alert" className="text-sm text-error">{errorMessage}</p>}
            {successMessage && <p role="status" className="text-sm text-success">{successMessage}</p>}
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </Form>

          <SocialAuthButtons
            onGoogleSignIn={() => handleSocialSignIn("google")}
            onGithubSignIn={() => handleSocialSignIn("github")}
          />

          <p className="text-center text-sm text-base-content/70">
            Already a user?{" "}
            <Link href="/sign-in" className="font-semibold text-[#047F39] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
