export function CardSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card bg-base-200 h-96">
          <div className="skeleton h-48 w-full rounded-b-none" />
          <div className="card-body gap-3">
            <div className="skeleton h-5 w-24" />
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-10 w-full mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-4">
      <div className="skeleton h-10 w-1/2" />
      <div className="skeleton h-6 w-1/3" />
      <div className="skeleton h-64 w-full" />
    </div>
  );
}