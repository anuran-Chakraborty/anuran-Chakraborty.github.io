import {
    readPostsByCategories,
    readFrontMatterAndContentForAPost,
} from "@/api";
import md from "markdown-it";
import toc from "markdown-it-table-of-contents"
import markdownItPlantuml from "markdown-it-plantuml";
import hljs from "highlight.js";
import React from "react";
import PostMetadata from "@/components/PostMetadata";
import "highlight.js/styles/a11y-dark.css";
import WrapperComponent from "@/components/WrapperComponent";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
markdownRenderer.use(toc, {
    "includeLevel": [1, 2, 3, 4]
});

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
    return { props: { key: slug, frontMatter, content, slug } };
};

const BlogPage = ({ frontMatter, content }) => {
    let image = frontMatter.thumbnailImage ? (
        <img
            src={frontMatter.thumbnailImage}
            alt="thumbnail"
        />
    ) : null;
    return (
        <WrapperComponent>
            <div className="overflow-hidden bg-white shadow-2xl sm:rounded-lg mb-5 container mx-auto max-w-5xl">
                {image}
                <div className="lg:px-10 md:px-5 sm:px-5 pb-5">
                    <PostMetadata frontMatter={frontMatter} />
                    <article
                        className="prose prose-slate prose-lg prose-tight leading-tight font-body mx-auto max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: markdownRenderer.render(content),
                        }}
                    />
                </div>
            </div>
            <ScrollToTopButton />
        </WrapperComponent>
    );
};

export default BlogPage;
