const BlogCoverImage = ({ image, title }) => {
  if (!image) {
    return null;
  }

  return (
    <figure className="my-10 sm:my-12">
      <div className="group relative overflow-hidden rounded-xl bg-zinc-100 shadow-sm">
        <img
          src={image}
          alt={title || "Blog cover"}
          className="h-auto max-h-[470px] min-h-[280px] w-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.015] sm:min-h-[400px]"
        />
      </div>
    </figure>
  );
};

export default BlogCoverImage;
