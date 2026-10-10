const SkeletonCards = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        aria-hidden="true"
        className="card h-44 border border-base-300 bg-base-100 shadow-sm"
      >
        <div className="card-body gap-4 p-5">
          <div className="skeleton h-6 w-3/5" />
          <div className="skeleton h-4 w-1/4" />
          <div className="mt-auto flex justify-between">
            <div className="skeleton h-6 w-2/5" />
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const HomeProductSkeleton = () => (
  <div role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে" className="space-y-10">
    {[0, 1, 2].map((section) => (
      <section key={section} className="space-y-4">
        <div aria-hidden="true" className="skeleton h-7 w-44" />
        <SkeletonCards count={section === 2 ? 6 : 3} />
      </section>
    ))}
    <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</span>
  </div>
);

export const CategoryProductSkeleton = () => (
  <section
    role="status"
    aria-label="বিভাগের পণ্য লোড হচ্ছে"
    className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
  >
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <div aria-hidden="true" className="skeleton h-9 w-48" />
        <div aria-hidden="true" className="skeleton h-4 w-64 max-w-full" />
      </div>
      <div aria-hidden="true" className="skeleton h-12 w-full sm:w-56" />
    </div>
    <SkeletonCards />
    <span className="sr-only">বিভাগের পণ্য লোড হচ্ছে...</span>
  </section>
);
