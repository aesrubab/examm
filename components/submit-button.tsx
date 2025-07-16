"use client";

import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface SubmitBtnProps extends ComponentProps<typeof Button> {
  loadingText?: string;
}

export function SubmitButton({
  children,
  loadingText = "Submitting...",
  ...rest
}: SubmitBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...rest}>
      {pending ? loadingText : children}
    </Button>
  );
}
