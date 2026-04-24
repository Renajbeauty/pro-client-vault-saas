import type { ServiceHistory } from "@/types";

function formatDate(yyyy_mm_dd: string) {
  const [y, m, d] = yyyy_mm_dd.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ClientSnapshot({
  entries,
  notes,
}: {
  entries: ServiceHistory[];
  notes: string | null;
}) {
  const lastEntry  = entries[0] ?? null;
  const totalCount = entries.length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        Client Snapshot
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Last service */}
        <div>
          <p className="text-xs font-medium text-gray-400">Last Service</p>
          {lastEntry ? (
            <>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {lastEntry.service_name}
              </p>
              <p className="text-xs text-gray-400">{formatDate(lastEntry.service_date)}</p>
            </>
          ) : (
            <p className="mt-1 text-sm text-gray-400">No services recorded yet</p>
          )}
        </div>

        {/* Total services */}
        <div>
          <p className="text-xs font-medium text-gray-400">Total Services</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">{totalCount}</p>
        </div>

        {/* Client notes */}
        <div>
          <p className="text-xs font-medium text-gray-400">Notes</p>
          <p className="mt-1 text-sm text-gray-700">
            {notes ?? <span className="text-gray-400">—</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
