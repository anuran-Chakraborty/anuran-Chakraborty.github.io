/** @type {import('next').NextConfig} */
// const markdownIt = require('markdown-it');
// const markdownItPrism = require('markdown-it-prism');

const nextConfig = {
  // webpack: configuration => {
  //   configuration.module.rules.push({
  //     test: /\.md$/,
  //     loader: 'frontmatter-markdown-loader',
  //     options: {
  //       markdownIt: markdownIt({ html: true }).use(markdownItPrism),
  //     },
  //   });
  //   return configuration;
  // },
  reactStrictMode: true,
}

module.exports = nextConfig
