import {
    readPostsByCategories,
    readFrontMatterAndContentForAPost,
} from "@/api";
import md from "markdown-it";
import markdownItPlantuml from "markdown-it-plantuml";
import hljs from "highlight.js";
import React from "react";
import 'highlight.js/styles/a11y-dark.css';

let markdownRenderer = md({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
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
    return { props: { key: slug, frontMatter, content } };
};

const BlogPage = ({ frontMatter, content }) => {
    return (
        <div>
            <h1>{frontMatter.title}</h1>
            <article className="prose lg:prose-xl dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: markdownRenderer.render(content) }}
            />
        </div>
    );
};

export default BlogPage;
