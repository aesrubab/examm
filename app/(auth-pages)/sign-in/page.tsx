"use client";

import React from "react";
import Link from "next/link";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeStore } from "@/store";

export default function Login({ searchParams }: { searchParams: Promise<Message> }) {
  const params = React.use(searchParams);
  const currentTheme = useThemeStore((state) => state.theme);

  const bgColor = currentTheme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]";
  const inputStyle = currentTheme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]";

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
      <form className="w-full max-w-sm p-6 rounded border border-gray-300 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm mt-1">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              placeholder="you@example.com"
              required
              className={inputStyle}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs underline">
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              required
              className={inputStyle}
            />
          </div>

          <SubmitButton
            formAction={signInAction}
            pendingText="Signing In..."
            className="bg-red-700"
          >
            Sign in
          </SubmitButton>

          <FormMessage message={params} />
        </div>
      </form>
    </div>
  );
}
