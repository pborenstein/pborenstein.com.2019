const { DateTime } = require("luxon")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {

/*  PLUGINS */

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

/* FILTERS */

  eleventyConfig.addFilter("readableDate", dateObj =>
    DateTime.fromJSDate(dateObj).toFormat("d LLLL yyyy"))

  eleventyConfig.addFilter("shortDate", dateObj =>
    DateTime.fromJSDate(dateObj).toFormat("d LLL yyyy"))

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", dateObj =>
    DateTime.fromJSDate(dateObj).toISODate())


  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) =>
    n < 0 ? array.slice(n) : array.slice(0,n))


/* COLLECTIONS */

  //  The `articles` collection contains
  //  only pages that are in the `./src/articles/` directory

  eleventyConfig.addCollection("articles",
    collection => collection
      .getAllSorted()
      .filter(item => item.url
                   && ! item.inputPath.includes('index.njk')
                   && item.inputPath.startsWith('./src/articles/')))

  eleventyConfig.addCollection("tagList",    require("./_11ty/getTagList"))
  eleventyConfig.addCollection("catList",    require("./_11ty/getCatList"))
  eleventyConfig.addCollection("categories", require("./_11ty/makeCategories"))

/* PASSTHROUGH */

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/portfolio");
  eleventyConfig.addPassthroughCopy("src/resume")
  eleventyConfig.addPassthroughCopy("src/rbac")
  eleventyConfig.addPassthroughCopy("src/assets")

  /* Markdown Plugins */

  eleventyConfig.setLibrary("md", require("markdown-it")({
                                    html: true,
                                    breaks: false,
                                    linkify: false,
                                    typographer: true
                                  })
    .use(require("markdown-it-anchor"), {
            permalink: true,
            permalinkClass: "direct-link",
            permalinkSymbol: "• • •"
          })
    .use(require("markdown-it-multimd-table"))
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
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      output: "_site",
      input: "src",
      includes: "_includes",  // inside the input directory
      data: "_data"           // inside the input directory
    }
  };
};
