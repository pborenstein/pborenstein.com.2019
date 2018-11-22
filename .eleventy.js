const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("d LLLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });



  //  The `articles` collection contains
  //  only pages that are in the `./src/articles/` directory

  eleventyConfig
    .addCollection("articles",
        (collection) =>
          collection
            .getAllSorted()
            .filter((item) =>
              item.url && item.inputPath.startsWith('./src/articles/')
    )
  );

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
  eleventyConfig.addCollection("catList", require("./_11ty/getCatList"));

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/portfolio");
  eleventyConfig.addPassthroughCopy("src/resume")
  eleventyConfig.addPassthroughCopy("src/rbac")
  eleventyConfig.addPassthroughCopy("src/assets")

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItMMDTables = require("markdown-it-multimd-table");
  let options = {
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
    .use(markdownItMMDTables)
    .use(require('markdown-it-footnote'))
  );

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      'liquid',
      "ejs"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
