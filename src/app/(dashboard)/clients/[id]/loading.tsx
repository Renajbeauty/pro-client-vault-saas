export default function ClientDetailLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Back link */}
      <div className="h-4 w-16 rounded bg-gray-200" />

      {/* Client name + date */}
      <div className="flex items-start justify-between">
        <div>
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-32 rounded bg-gray-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-16 rounded-lg bg-gray-200" />
          <div className="h-9 w-20 rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Detail card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 border-b border-gray-100 px-6 py-4 last:border-0">
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="col-span-3 h-4 w-48 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      {/* Service history section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 rounded bg-gray-200" />
          <div className="h-9 w-24 rounded-lg bg-gray-200" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-5 w-40 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-100" />
                <div className="h-3 w-64 rounded bg-gray-100" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-12 rounded bg-gray-200" />
                <div className="h-7 w-16 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
