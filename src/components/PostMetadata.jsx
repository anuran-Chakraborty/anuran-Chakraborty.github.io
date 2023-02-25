import React from "react";

const PostMetadata = ({ frontMatter, thumbnailImage }) => {
  let image = frontMatter.thumbnailImage ? (
    <img src={frontMatter.thumbnailImage} alt="thumbnail" />
  ) : null;
  return (
    <div className="mb-8">
      <div>
        <h1 className="text-5xl font-heading font-black">{frontMatter.title}</h1>
        {image}
        <h2 className="mt-2 text-md font-date">{`Posted on ${new Date(frontMatter.date).toDateString()}`}</h2>
      </div>
    </div>
  );
};

export default PostMetadata;
