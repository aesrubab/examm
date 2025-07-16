"use client";

import React from "react";
import Link from "next/link";
import { useThemeStore } from "@/store";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup({ searchParams }: { searchParams: Promise<Message> }) {
  const params = React.use(searchParams);
  const theme = useThemeStore((state) => state.theme);

  const bgClass = theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]";
  const inputClass = theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]";

  if (Object.prototype.hasOwnProperty.call(params, "message")) {
    return (
      <div className="flex items-center justify-center w-full h-screen p-4 sm:max-w-md">
        <FormMessage message={params} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass}`}>
      <form className="w-full max-w-sm p-6 border border-gray-300 rounded-md space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Sign up</h2>
          <p className="text-sm mt-1">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              minLength={6}
              required
              className={inputClass}
            />
          </div>

          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="bg-red-700"
          >
            Sign up
          </SubmitButton>

          <FormMessage message={params} />
        </div>
      </form>
    </div>
  );
}
