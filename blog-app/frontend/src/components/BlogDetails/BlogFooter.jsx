import { Share2 } from "lucide-react";

const BlogFooter = ({ readTime, onShare }) => {
  return (
    <footer className="mx-auto mt-14 max-w-[720px] border-t border-zinc-100 pt-8">
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>{readTime} min read</span>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-2 font-medium transition-colors hover:text-zinc-950"
        >
          <Share2 size={16} />
          Share story
        </button>
      </div>
    </footer>
  );
};

export default BlogFooter;
