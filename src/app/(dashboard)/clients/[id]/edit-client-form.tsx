"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import type { Client } from "@/types";

export function EditClientForm({ client }: { client: Client }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleCancel() {
    setEditing(false);
    setError(null);
  }

  async function handleDelete() {
    if (!window.confirm(`Delete ${client.full_name}? This cannot be undone.`)) return;

    setDeleting(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("clients")
      .delete()
      .eq("id", client.id);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
      return;
    }

    router.push("/clients");
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const supabase = createClient();

   const { count, error: updateError } = await supabase
  .from("clients")
  .update({
    full_name: data.get("full_name") as string,
    email: (data.get("email") as string) || null,
    phone: (data.get("phone") as string) || null,
    notes: (data.get("notes") as string) || null,
  })
  .eq("id", client.id)
  .select();

    if (updateError || count === 0) {
      setError(updateError?.message ?? "Update failed. You may not have permission to edit this client.");
      setLoading(false);
      return;
    }

    setEditing(false);
    setLoading(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Edit Client</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              id="full_name"
              name="full_name"
              label="Full name"
              defaultValue={client.full_name}
              autoFocus
              required
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              defaultValue={client.email ?? ""}
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              defaultValue={client.phone ?? ""}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={client.notes ?? ""}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" size="sm" loading={loading}>
              Save changes
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{client.full_name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Added{" "}
            {new Date(client.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            loading={deleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      {saved && <p className="text-sm text-green-600">Updated</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <dl className="divide-y divide-gray-100">
          <Row label="Email">
            {client.email ? (
              <a href={`mailto:${client.email}`} className="text-indigo-600 hover:underline">
                {client.email}
              </a>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </Row>
          <Row label="Phone">
            {client.phone ? (
              <a href={`tel:${client.phone}`} className="text-gray-900 hover:underline">
                {client.phone}
              </a>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </Row>
          <Row label="Notes">
            {client.notes ? (
              <p className="whitespace-pre-wrap text-gray-700">{client.notes}</p>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </Row>
        </dl>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-4 px-6 py-4 sm:grid-cols-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="col-span-2 text-sm sm:col-span-3">{children}</dd>
    </div>
  );
}
