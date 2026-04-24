import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/types";
import { AddClientForm } from "./add-client-form";
import { ClientSearch } from "./client-search";

export const metadata: Metadata = {
  title: "Clients — Pro Client Vault",
};

export default async function ClientsPage() {
  await new Promise(res => setTimeout(res, 1500)); // TODO: remove
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (clients ?? []) as Client[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="mt-1 text-sm text-gray-500">
            {rows.length} client{rows.length !== 1 ? "s" : ""}
          </p>
        </div>
        {rows.length > 0 && <AddClientForm />}
      </div>

      {rows.length > 0 ? (
        <ClientSearch rows={rows} />
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <p className="text-base font-semibold text-gray-900">No clients yet</p>
          <p className="mt-1 text-sm text-gray-500">Add your first client to get started</p>
          <div className="mt-5">
            <AddClientForm />
          </div>
        </div>
      )}
    </div>
  );
}
