"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setIsSubmitting(true);

    try {
      const { error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। তথ্যগুলো যাচাই করে আবার চেষ্টা করুন।");
        return;
      }

      toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।");
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const { error } = await signIn.social({ provider });
      if (error) {
        toast.error("সামাজিক অ্যাকাউন্ট দিয়ে চালিয়ে যাওয়া যায়নি। আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("সামাজিক অ্যাকাউন্ট দিয়ে চালিয়ে যাওয়া যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <section className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">আপনার অ্যাকাউন্ট তৈরি করুন</h1>
            <p className="mt-2 text-sm text-base-content/65">
              বাজার দর ব্যবহার শুরু করতে নিবন্ধন করুন।
            </p>
          </div>

          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="name"
              validate={(value) =>
                value.length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" : null
              }
            >
              <Label>নাম</Label>
              <Input autoComplete="name" placeholder="আপনার নাম লিখুন" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? null
                  : "সঠিক ইমেইল ঠিকানা লিখুন"
              }
            >
              <Label>ইমেইল</Label>
              <Input autoComplete="email" placeholder="আপনার ইমেইল লিখুন" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                if (!/[A-Z]/.test(value)) return "পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর থাকতে হবে";
                if (!/[0-9]/.test(value)) return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে";
                return null;
              }}
            >
              <Label>পাসওয়ার্ড</Label>
              <Input autoComplete="new-password" placeholder="পাসওয়ার্ড তৈরি করুন" />
              <Description>
                কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা দিন।
              </Description>
              <FieldError />
            </TextField>
            <Button type="submit" isDisabled={isSubmitting} className="w-full bg-[#047F39] font-semibold text-white hover:bg-[#035f2b]">
              {isSubmitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          <SocialAuthButtons
            onGoogleSignIn={() => handleSocialSignIn("google")}
            onGithubSignIn={() => handleSocialSignIn("github")}
          />

          <p className="text-center text-sm text-base-content">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="font-bold text-[#006b2f] underline decoration-2 underline-offset-4 hover:text-[#004d22]">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
