"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const data = new FormData(e.currentTarget);
    const fullName = data.get("full_name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    setError("Signup failed. Please try again.");
    setLoading(false);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unexpected signup error");
    setLoading(false);
  }
}