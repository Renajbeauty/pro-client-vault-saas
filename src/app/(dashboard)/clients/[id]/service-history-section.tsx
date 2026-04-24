"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import type { ServiceHistory } from "@/types";

const TEXTAREA_CLASS =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 " +
  "placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

function formatDate(yyyy_mm_dd: string) {
  const [y, m, d] = yyyy_mm_dd.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Shared hook ──────────────────────────────────────────────────────────────

function useEntryActions(entry: ServiceHistory) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [gone, setGone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${entry.service_name}"? This cannot be undone.`)) return;
    setDeleting(true);
    setGone(true);
    const { error: err } = await createClient()
      .from("service_history")
      .delete()
      .eq("id", entry.id);
    if (err) { setGone(false); setDeleting(false); setError(err.message); return; }
    router.refresh();
  }

  async function handleSave(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const { error: err } = await createClient()
      .from("service_history")
      .update({
        service_name: fd.get("service_name") as string,
        service_date: fd.get("service_date") as string,
        notes:        (fd.get("notes") as string) || null,
      })
      .eq("id", entry.id);
    if (err) { setError(err.message); setSaving(false); return; }
    setEditing(false);
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  }

  function cancelEdit() { setEditing(false); setError(null); }

  return { editing, setEditing, saving, deleting, gone, error, saved, handleDelete, handleSave, cancelEdit };
}

// ── Shared edit form ─────────────────────────────────────────────────────────

function EditForm({
  entry, onSave, onCancel, saving, error,
}: {
  entry: ServiceHistory;
  onSave: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  return (
    <form onSubmit={onSave} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input name="service_name" label="Service" defaultValue={entry.service_name} required />
        <Input name="service_date" type="date" label="Date" defaultValue={entry.service_date} required />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Notes</label>
        <textarea name="notes" rows={2} defaultValue={entry.notes ?? ""} className={TEXTAREA_CLASS} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" loading={saving}>Save</Button>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

// ── Entry card ───────────────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  maxWidth: "680px",
};

function ServiceEntryCard({ entry, isFirst }: { entry: ServiceHistory; isFirst?: boolean }) {
  const a = useEntryActions(entry);
  if (a.gone) return null;

  if (a.editing) {
    return (
      <div style={CARD}>
        <EditForm
          entry={entry}
          onSave={a.handleSave}
          onCancel={a.cancelEdit}
          saving={a.saving}
          error={a.error}
        />
      </div>
    );
  }

  return (
    <div style={CARD}>
      {/* "Most Recent" badge — only on first entry when 2+ exist */}
      {isFirst && (
        <span style={{ display: "inline-block", marginBottom: "8px", fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6366f1", background: "#eef2ff", borderRadius: "4px", padding: "2px 7px" }}>
          Most Recent
        </span>
      )}

      {/* Top row: info left, actions right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: "16px", color: "#111827", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {entry.service_name}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#9ca3af" }}>
            {formatDate(entry.service_date)}
          </p>
          {entry.notes && (
            <p style={{ margin: "10px 0 0", paddingTop: "10px", borderTop: "1px solid #f3f4f6", fontSize: "13px", color: "#374151", lineHeight: "1.6" }}>
              {entry.notes}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <button
            onClick={() => a.setEditing(true)}
            style={{ fontSize: "12px", padding: "4px 10px", border: "1px solid #d1d5db", borderRadius: "5px", background: "#f9fafb", color: "#374151", cursor: "pointer" }}
          >
            Edit
          </button>
          <button
            onClick={a.handleDelete}
            disabled={a.deleting}
            style={{ fontSize: "12px", padding: "4px 10px", border: "1px solid #fca5a5", borderRadius: "5px", background: "#fff", color: "#dc2626", cursor: "pointer" }}
          >
            {a.deleting ? "…" : "Delete"}
          </button>
        </div>

      </div>
      {a.saved && <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#16a34a" }}>Updated</p>}
      {a.error && <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#dc2626" }}>{a.error}</p>}
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function ServiceHistorySection({
  clientId,
  entries,
}: {
  clientId: string;
  entries: ServiceHistory[];
}) {
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
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to add a service entry.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("service_history").insert({
      user_id:      user.id,
      client_id:    clientId,
      service_name: data.get("service_name") as string,
      service_date: data.get("service_date") as string,
      notes:        (data.get("notes") as string) || null,
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

  const sorted = [...entries].sort((a, b) => b.service_date.localeCompare(a.service_date));

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Service History</h2>
        {!open && (
          <Button size="sm" onClick={() => setOpen(true)}>Add Entry</Button>
        )}
      </div>

      {/* Add-entry form */}
      {open && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input id="service_name" name="service_name" label="Service" placeholder="e.g. Haircut, Facial, Massage" autoFocus required />
              <Input id="service_date" name="service_date" type="date" label="Date" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</label>
              <textarea id="notes" name="notes" rows={3} placeholder="Any notes about this session…" className={TEXTAREA_CLASS} />
            </div>
            {error   && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">Entry saved!</p>}
            <div className="flex gap-3">
              <Button type="submit" size="sm" loading={loading}>Save entry</Button>
              <Button type="button" variant="secondary" size="sm" onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Entry list */}
      {sorted.length > 0 ? (
        <div>
          {sorted.map((entry, index) => (
            <ServiceEntryCard
              key={entry.id}
              entry={entry}
              isFirst={sorted.length > 1 && index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
          <p className="text-base font-semibold text-gray-900">No service history yet</p>
          <p className="mt-1 text-sm text-gray-500">Start tracking services for this client</p>
          <div className="mt-5">
            <Button size="sm" onClick={() => setOpen(true)}>Add Entry</Button>
          </div>
        </div>
      )}
    </div>
  );
}
