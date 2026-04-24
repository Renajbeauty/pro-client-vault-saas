"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const data     = new FormData(e.currentTarget);
    const password = data.get("password") as string;
    const confirm  = data.get("confirm")  as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await createClient().auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    formRef.current?.reset();
    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
      <p className="mt-1 text-sm text-gray-500">Choose a new password for your account.</p>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <Input
          id="password"
          name="password"
          type="password"
          label="New password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
        <Input
          id="confirm"
          name="confirm"
          type="password"
          label="Confirm new password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />

        {error   && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">Password updated successfully.</p>}

        <div>
          <Button type="submit" size="sm" loading={loading}>
            Update password
          </Button>
        </div>
      </form>
    </div>
  );
}
