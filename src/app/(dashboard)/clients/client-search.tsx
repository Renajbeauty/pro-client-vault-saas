"use client";

import { useState } from "react";
import Link from "next/link";
import type { Client } from "@/types";

type SortKey = "newest" | "oldest" | "name_asc" | "name_desc";

function applySorting(clients: Client[], sort: SortKey): Client[] {
  const sorted = [...clients];
  switch (sort) {
    case "oldest":    return sorted.sort((a, b) => a.created_at.localeCompare(b.created_at));
    case "name_asc":  return sorted.sort((a, b) => a.full_name.localeCompare(b.full_name));
    case "name_desc": return sorted.sort((a, b) => b.full_name.localeCompare(a.full_name));
    default:          return sorted.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }
}

export function ClientSearch({ rows }: { rows: Client[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = query.trim() === ""
    ? rows
    : rows.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.full_name.toLowerCase().includes(q) ||
          (c.email?.toLowerCase().includes(q) ?? false)
        );
      });

  const results = applySorting(filtered, sort);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name_asc">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
        </select>
      </div>

      {results.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                <th className="hidden px-4 py-3 font-medium text-gray-500 sm:table-cell">Email</th>
                <th className="hidden px-4 py-3 font-medium text-gray-500 md:table-cell">Phone</th>
                <th className="px-4 py-3 font-medium text-gray-500">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link
                      href={`/clients/${client.id}`}
                      className="hover:text-indigo-600 hover:underline"
                    >
                      {client.full_name}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                    {client.email ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                    {client.phone ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-base font-semibold text-gray-900">No clients found</p>
          <p className="mt-1 text-sm text-gray-500">Try a different name or email</p>
        </div>
      )}
    </div>
  );
}
