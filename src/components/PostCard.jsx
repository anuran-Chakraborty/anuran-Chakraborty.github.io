import React from "react";
import path from "path";
import Link from "next/link";

const PostCard = ({ post }) => {
    return (
        <Link href={`blog/${post.slug}`}>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <img
                        src={`images/${path.join(...post.slug.split("_"))}/thumbnail.png`}
                        alt="thumbnail"
                    />
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {post.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {new Date(Date.parse(post.date)).toDateString("dd/MM/yyyy")}
                    </p>
                    <p className="mt-1 max-w-2xl text-md text-gray-500">
                        {post.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
