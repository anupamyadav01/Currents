const BlogDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-10 h-5 w-32 animate-pulse rounded bg-zinc-100" />

        {/* Title */}
        <div className="space-y-3">
          <div className="h-10 w-full animate-pulse rounded-lg bg-zinc-100 sm:h-14" />
          <div className="h-10 w-4/5 animate-pulse rounded-lg bg-zinc-100 sm:h-14" />
        </div>

        {/* Description */}
        <div className="mt-6 space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-100" />
        </div>

        {/* Author */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-100" />

          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-40 animate-pulse rounded bg-zinc-100" />
          </div>
        </div>

        {/* Image */}
        <div className="mt-10 h-72 w-full animate-pulse rounded-2xl bg-zinc-100 sm:h-[430px]" />

        {/* Content */}
        <div className="mt-10 space-y-4">
          <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-zinc-100" />
          <div className="h-5 w-full animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    </main>
  );
};

export default BlogDetailsSkeleton;
