const BlogCoverImage = ({ image, title, caption }) => {
  if (!image) return null;

  return (
    <div className="w-full">
      <div className="w-full bg-[#f9f9f9]">
        <img
          src={image}
          alt={title || "Blog cover"}
          className="mx-auto h-auto max-h-[600px] w-full object-contain"
          loading="eager"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs tracking-tight text-[#6b6b6b]">
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export default BlogCoverImage;
