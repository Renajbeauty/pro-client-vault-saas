export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="h-8 w-36 rounded-lg bg-gray-200" />
        <div className="mt-2 h-4 w-48 rounded bg-gray-100" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="mt-3 h-8 w-12 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Recent clients card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <div className="h-5 w-32 rounded bg-gray-200" />
        </div>
        <ul className="divide-y divide-gray-100">
          {[...Array(4)].map((_, i) => (
            <li key={i} className="flex items-center justify-between px-6 py-3">
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-36 rounded bg-gray-200" />
                <div className="h-3 w-48 rounded bg-gray-100" />
              </div>
              <div className="h-3 w-20 rounded bg-gray-100" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
