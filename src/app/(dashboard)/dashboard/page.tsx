import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — Pro Client Vault",
};

export default async function DashboardPage() {
  await new Promise(res => setTimeout(res, 1500)); // TODO: remove
  const supabase = await createClient();

  const now = new Date();
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  const [
    { count: clientCount },
    { count: serviceCount },
    { count: monthCount },
    { data: recentClients },
  ] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("service_history").select("*", { count: "exact", head: true }),
    supabase
      .from("service_history")
      .select("*", { count: "exact", head: true })
      .gte("service_date", firstOfMonth),
    supabase
      .from("clients")
      .select("id, full_name, email, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Total Clients",   value: clientCount  ?? 0 },
    { label: "Service Entries", value: serviceCount ?? 0 },
    { label: "This Month",      value: monthCount   ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to Pro Client Vault</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {recentClients && recentClients.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Clients</h2>
              <Link href="/clients" className="text-sm text-indigo-600 hover:underline">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-gray-100">
              {recentClients.map((client) => (
                <li key={client.id} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600 hover:underline"
                    >
                      {client.full_name}
                    </Link>
                    {client.email && (
                      <p className="text-xs text-gray-400">{client.email}</p>
                    )}
                  </div>
                  <p className="shrink-0 text-xs text-gray-400">
                    {new Date(client.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="text-base font-semibold text-gray-900">No clients yet</p>
            <p className="mt-1 text-sm text-gray-500">Once you add clients, they&apos;ll show here</p>
          </div>
        )}
      </div>
    </div>
  );
}
