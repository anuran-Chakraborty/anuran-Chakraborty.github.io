import {
    readPostsByCategories,
    readFrontMatterAndContentForAPost,
} from "@/api";
import md from "markdown-it";
import markdownItPlantuml from "markdown-it-plantuml";
import hljs from "highlight.js";
import React from "react";
import PostMetadata from "@/components/PostMetadata";
import "highlight.js/styles/a11y-dark.css";
import path from "path";
import fs from "fs";
import { DEFAULT_THUMBNAIL_FILE } from "@/api/constants";

let markdownRenderer = md({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</code></pre>"
                );
            } catch (__) { }
        }

        return (
            '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
        );
    },
});

markdownRenderer.use(markdownItPlantuml);

export const getStaticPaths = async () => {
    const allPostDetails = readPostsByCategories();
    const paths = allPostDetails.map((post) => ({
        params: {
            slug: post.slug,
        },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const { frontMatter, content } = readFrontMatterAndContentForAPost(slug);
    frontMatter["slug"] = slug;
    const thumbnailImagePath = path.join(
        "/images",
        ...frontMatter.slug.split("_"),
        DEFAULT_THUMBNAIL_FILE
    );
    if (!("thumbnailImage" in frontMatter) && fs.existsSync(path.join(process.cwd(), 'public', thumbnailImagePath))) {
        frontMatter["thumbnailImage"] = thumbnailImagePath;
    }
    return { props: { key: slug, frontMatter, content, slug } };
};

const BlogPage = ({ frontMatter, content }) => {
    return (
        <div className="container mx-auto max-w-5xl">
            <PostMetadata frontMatter={frontMatter} />

            <article
                className="prose prose-slate prose-lg leading-6 font-body mx-auto max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownRenderer.render(content) }}
            />
        </div>
    );
};

export default BlogPage;
