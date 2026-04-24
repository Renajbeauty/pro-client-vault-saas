import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Client, ServiceHistory } from "@/types";
import { EditClientForm } from "./edit-client-form";
import { ClientSnapshot } from "./client-snapshot";
import { ServiceHistorySection } from "./service-history-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("clients")
    .select("full_name")
    .eq("id", id)
    .single();

  return {
    title: data ? `${data.full_name} — Pro Client Vault` : "Client — Pro Client Vault",
  };
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await new Promise(res => setTimeout(res, 1500)); // TODO: remove
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: clientData }, { data: serviceData }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).single(),
    supabase
      .from("service_history")
      .select("*")
      .eq("client_id", id)
      .order("service_date", { ascending: false }),
  ]);

  if (!clientData) notFound();

  return (
    <div className="flex flex-col gap-8">
      <Link href="/clients" className="text-sm text-indigo-600 hover:underline">
        ← Clients
      </Link>
      <EditClientForm client={clientData as Client} />
      <ClientSnapshot
        entries={(serviceData ?? []) as ServiceHistory[]}
        notes={(clientData as Client).notes}
      />
      <ServiceHistorySection
        clientId={id}
        entries={(serviceData ?? []) as ServiceHistory[]}
      />
    </div>
  );
}
