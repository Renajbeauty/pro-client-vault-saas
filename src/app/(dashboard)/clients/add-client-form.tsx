"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function AddClientForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleCancel() {
    setOpen(false);
    setError(null);
    setSuccess(false);
    formRef.current?.reset();
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("clients").insert({
      full_name: data.get("full_name") as string,
      email: (data.get("email") as string) || null,
      phone: (data.get("phone") as string) || null,
      notes: (data.get("notes") as string) || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    formRef.current?.reset();
    setSuccess(true);
    setLoading(false);
    router.refresh();
    setTimeout(() => { setSuccess(false); setOpen(false); }, 1000);
  }

  if (!open) {
    return (
      <Button size="sm" onClick={() => setOpen(true)}>
        Add Client
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-900">New Client</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            id="full_name"
            name="full_name"
            label="Full name"
            placeholder="Jane Smith"
            autoFocus
            required
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="jane@example.com"
          />
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Phone"
            placeholder="+1 555 000 0000"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Anything worth remembering about this client…"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {error   && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">Client saved!</p>}

        <div className="flex gap-3">
          <Button type="submit" size="sm" loading={loading}>
            Save client
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
