import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <form className="max-w-md w-full p-6 border border-gray-300 rounded shadow-sm space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Forgot Password?</h2>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 underline">
              Sign in
            </Link>
          </p>
        </header>

        <div className="space-y-3">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              required
              className="mt-1"
            />
          </div>

          <SubmitButton formAction={forgotPasswordAction}>
            Proceed
          </SubmitButton>

          <FormMessage message={params} />
        </div>
      </form>
    </div>
  );
}
