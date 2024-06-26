import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
//import footnotes from "https://deno.land/x/lume_markdown_plugins/footnotes.ts";

import footnote from "npm:markdown-it-footnote";
import anchor from "npm:markdown-it-anchor";

// Generate graphs that need not be stored in the repository but are needed for the blog.
import { generateBlogInputs } from "./src/generate-blog-inputs/index.ts";
generateBlogInputs();


const markdown = {
  plugins: [
    [anchor, { level: 1}],
    footnote,
  ],
};
const site = lume({
  location: new URL("https://uharm.org/"),
}, {
  markdown
});

// site.hooks.addMarkdownItPlugin(anchor, { level: 2 });
// site.hooks.addMarkdownItPlugin(footnote);

site
  .ignore("README.md")
  .ignore("/README")
  .ignore("/generated-by-analysis")
  .copy("img")
  .copy("graphs")
  .copy("js")
  .use(postcss())
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(sitemap())
  .use(pageFind({
    ui: {
      resetStyles: false,
    },
  }))
  .use(slugifyUrls({ alphanumeric: false }))
  .use(feed({
    output: ["/feed.json", "/feed.xml"],
    query: "type=posts",
    info: {
      title: "=site.title",
      description: "=site.description",
    },
    items: {
      title: "=title",
      content: "$.post-body",
      description: "=description",
    },
  }))
  .use(resolveUrls())

export default site;
