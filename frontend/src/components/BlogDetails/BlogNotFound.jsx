import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogNotFound = ({ error }) => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
          <span className="text-xl">📖</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          {error || "Story not found"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          The story may have been removed or the link may no longer be valid.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:shadow-lg"
        >
          <ArrowLeft size={16} />
          Back to stories
        </Link>
      </div>
    </main>
  );
};

export default BlogNotFound;
