---
title: Front Matter
category: Tech
tags:
  - eleventy
---

<style>
  table {
    table-layout: auto;
  }
</style>

| Property                                                                                         | Description                                                                                                                                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`permalink`](https://www.11ty.io/docs/permalinks/)                                              | Sets the output target of the current template. Template syntax is allowed.<hr><code class="phony">permalink: /stories/{%- raw -%}{{page.fileSlug}}{%- endraw -%}</code>                                                                                                               |
| [`layout`](https://www.11ty.io/docs/layouts/)                                                    | The layout to use to render this template. Templates are found in the `_includes` folder.<hr><code class="phony">layout: layouts/story.njk</code>.                                                                                                                                     |
| [`pagination`](https://www.11ty.io/docs/pagination/)                                             | Enable to iterate over data. Output multiple HTML files from a single template.<hr><code class="phony">pagination: <br>&emsp;data: collections<br>&emsp;size: 1</code>                                                                                                                 |
| [`tags`](https://www.11ty.io/docs/collections/)                                                  | A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template.<hr><code class="phony">tags: <br>&emsp;- stories<br>&emsp;- avocadoes</code>.                                                               |
| [`date`](https://www.11ty.io/docs/dates/)                                                        | Override the default date (file creation) to customize how the file is sorted in a collection.<hr><code class="phony">date: 2012-05-18 16:40:46</code>                                                                                                                                 |
| [`templateEngineOverride`](https://www.11ty.io/docs/languages/#overriding-the-template-language) | Specify the template engine on a per-file basis. The template engine is usually configured through its file extension or specifed globally with the `markdownTemplateEngine` and `htmlTemplateEngine` configuration options.<hr><code class="phony">date: 2012-05-18 16:40:46</code>. |



