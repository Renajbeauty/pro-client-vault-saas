"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function ProfileForm({ fullName, email }: { fullName: string; email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const newName  = data.get("full_name") as string;
    const newEmail = data.get("email") as string;

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      ...(newEmail !== email ? { email: newEmail } : {}),
      data: { full_name: newName },
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setEmailChanged(newEmail !== email);
    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Profile</h2>
      <p className="mt-1 text-sm text-gray-500">Update your name and email address.</p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <Input
          id="full_name"
          name="full_name"
          label="Full name"
          defaultValue={fullName}
          autoComplete="name"
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          defaultValue={email}
          autoComplete="email"
          required
        />

        {error   && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-green-600">
            Profile updated.{emailChanged && " Check your inbox to confirm your new email address."}
          </p>
        )}

        <div>
          <Button type="submit" size="sm" loading={loading}>
            Save profile
          </Button>
        </div>
      </form>
    </div>
  );
}
