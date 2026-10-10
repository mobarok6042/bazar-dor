"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import PasswordVisibilityToggle from "../PasswordVisibilityToggle";
import SocialAuthButtons from "../SocialAuthButtons";

const SignInPage = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("required") === "product") {
      toast("বিস্তারিত দেখতে আগে সাইন ইন করুন।");
      params.delete("required");
      const query = params.toString();
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${query ? `?${query}` : ""}`,
      );
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const callbackURL = getSafeCallbackURL();

    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL,
      });

      if (error) {
        toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।");
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.push(callbackURL);
    } catch {
      toast.error("সাইন ইন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: getSafeCallbackURL(),
      });
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
            <h1 className="text-3xl font-bold tracking-tight">আবার স্বাগতম</h1>
            <p className="mt-2 text-sm text-base-content/65">
              আপনার বাজার দর অ্যাকাউন্টে সাইন ইন করুন।
            </p>
          </div>

          <Form className="auth-form flex w-full flex-col gap-4" onSubmit={onSubmit}>
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
              name="password"
            >
              <Label>পাসওয়ার্ড</Label>
              <div className="relative w-full">
                <Input
                  autoComplete="current-password"
                  className="password-input"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  type={isPasswordVisible ? "text" : "password"}
                />
                <PasswordVisibilityToggle
                  isVisible={isPasswordVisible}
                  onToggle={() => setIsPasswordVisible((visible) => !visible)}
                />
              </div>
              <FieldError />
            </TextField>
            <Button type="submit" className="w-full bg-[#047F39] font-semibold text-white hover:bg-[#035f2b]">
              সাইন ইন করুন
            </Button>
          </Form>

          <SocialAuthButtons
            onGoogleSignIn={() => handleSocialSignIn("google")}
            onGithubSignIn={() => handleSocialSignIn("github")}
          />

          <p className="text-center text-sm text-base-content">
            এই সাইটে নতুন?{" "}
            <Link href="/sign-up" className="font-bold text-[#006b2f] underline decoration-2 underline-offset-4 hover:text-[#004d22]">
              নিবন্ধন করুন
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

const getSafeCallbackURL = () => {
  const callbackURL = new URLSearchParams(window.location.search).get("callbackURL");
  return callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
    ? callbackURL
    : "/";
};

export default SignInPage;
