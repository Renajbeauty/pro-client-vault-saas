export default function ClientsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="h-8 w-24 rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-16 rounded bg-gray-100" />
        </div>
        <div className="h-9 w-28 rounded-lg bg-gray-200" />
      </div>

      {/* Table skeleton */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header row */}
        <div className="flex gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="ml-auto h-4 w-16 rounded bg-gray-200" />
        </div>
        {/* Data rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-gray-100 px-4 py-3 last:border-0">
            <div className="h-4 w-36 rounded bg-gray-200" />
            <div className="h-4 w-44 rounded bg-gray-100" />
            <div className="h-4 w-28 rounded bg-gray-100" />
            <div className="ml-auto h-4 w-20 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
