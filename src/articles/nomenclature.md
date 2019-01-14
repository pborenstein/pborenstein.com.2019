---
title: Nomenclature
category: Tech
tags:
  - eleventy
---

This stuff gets confusing.

**template**: the source of a page

**page**: the rendered page

In most cases, one template = one page

With pagination
  one template = one or more pages`


## Data Structures

### Global

https://www.11ty.io/docs/data/#eleventy-provided-data-variables

- pkg: The local project’s package.json values.
- pagination, when enabled using pagination in front matter. Read more about Pagination.
- collections: Lists of all of your content, grouped by tags. Read more about Collections
- page: Has information about the current page. See code block below for page contents. For example, page.url is useful for finding the current page in a collection. Read more about Collections (look at Example: Navigation Links with an active class added for on the current page).

Also: stuff in `_data` can be accessed in each page without qualification

(later on we can use `data` of individual pages in list collection[n].data)

Also `content`


### Page

Different values for each rendered page

XX:
```
{
  "date": "2001-04-01T00:00:00.000Z",
  "inputPath": "./src/categories.njk",
  "fileSlug": "categories",
  "url": "/categories/Life/",
  "outputPath": "_site/categories/Life/index.html"
}
```

```
  // URL can be used in <a href> to link to other templates
  url: "/current/page/myFile/",

  // Mapped from inputPath, useful for permalinks (New in v0.3.4)
  fileSlug: "myFile",

  // JS Date Object for current page (used to sort collections)
  date: new Date(),

  // The path to the original source file for the template
  // Note: this will include your input directory path!
  inputPath: "./current/page/myFile.md",

  // Depends on your output directory (the default is _site)
  // You probably won’t use this: `url` is better.
  outputPath: "./_site/current/page/myFile/index.html"
};
```

### Collections

```json
{
  "all": [...],
  "nav": [...],
  "books": [
    {
      "inputPath": "./src/articles/finding-oz.md",
      "outputPath": "_site/articles/finding-oz/index.html",
      "fileSlug": "finding-oz",
      "data": {...},
      "date": "2009-08-07T13:52:12.000Z",
      "url": "/articles/finding-oz/",
      "templateContent": "<p>As with most books ... much about The Wizard of Oz</li>\n</ul>\n",
      "template": {...}
    },
    ...
  ],
  "programming": [...],
}
```

### Collection Items

<div class="mdhack"></div>

| Property          | Description                                                                                                                                                      |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputPath`       | Path to this file including the `input` directory.<hr><code class="phony">./src/articles/finding-oz.md</code>                                                  |
| `outputPath`      | Path to the rendered file.<hr><code class="phony">articles/finding-oz/index.html</code>                                                                                                    |
| `fileSlug`        | Short name from the file name. [There are rules](https://www.11ty.io/docs/data/#fileslug). <hr><code class="phony">./src/articles/finding-oz.md</code> |
| `data`            | ...                                                                                                                                                              |
| `date`            | The date of this file in UTC. [There are rules](https://www.11ty.io/docs/dates/). <hr><code class="phony">2009-08-07T13:52:12.000Z</code>                      |
| `url`             | Path to this content. Doesn't include protocol or host. <hr><code class="phony">/articles/finding-oz/</code>                                                                 |
| `templateContent` | The rendered content, not including any layout wrappers.<hr><code class="phony">&lt;p&gt;As with most books ... much about The Wizard of Oz&lt;/li&gt;\n&lt;/ul&gt;\n</code> |
| `template`        | ...                                                                                                                                                              |
[<div class="table-caption">collection item properties</div>]


### Pagination

```
{
  items: [], // Array of current page’s chunk of data
  pageNumber: 0, // current page number, 0 indexed

  // Cool URLs, added in v0.6.0
  nextPageHref: "…", // put inside <a href="">Next Page</a>
  previousPageHref: "…", // put inside <a href="">Previous Page</a>
  firstPageHref: "…",
  lastPageHref: "…",
  hrefs: [], // Array of all page hrefs (in order)

  // Uncool URLs (these include index.html file names)
  nextPageLink: "…", // put inside <a href="">Next Page</a>
  previousPageLink: "…", // put inside <a href="">Previous Page</a>
  firstPageLink: "…", // added in v0.6.0
  lastPageLink: "…", // added in v0.6.0
  links: [], // Array of all page links (in order)
  pageLinks: [], // Array of deprecated alias to `links`

  data: …, // pointer to dataset
  size: 1, // chunk sizes
}
```
