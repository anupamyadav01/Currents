const BlogContent = ({ paragraphs, fallbackText }) => {
  return (
    <div className="mx-auto max-w-[680px]">
      {paragraphs?.length > 0 ? (
        <div className="space-y-8 font-serif text-[19px] leading-[32px] tracking-[-0.003em] text-[#242424] sm:text-[20px] sm:leading-[32px]">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="font-serif text-[19px] leading-[32px] text-[#6b6b6b]">
          {fallbackText || "This story does not contain any content yet."}
        </p>
      )}
    </div>
  );
};

export default BlogContent;
