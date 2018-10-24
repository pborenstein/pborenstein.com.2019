---
date: 2018-10-22
layout: layouts/home.njk
title: Data Structures
tags:
  - nav
navtitle: data
---

# {{ title }}

OK, so.

When you want to create a new collection that's not
a tag, you can use `addCollection()` in your
`.eleventy.js` configuration file.

`addCollection()` takes two arguments:
- the name of the collection (a string)
- a function that takes a `collection` as an argument.


```js
  eleventyConfig.addCollection("articles", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.url && item.inputPath.startsWith('./src/articles/');
    });
  });
```

So, what's in this `collection` parameter?

| Property | Type | Description |
| :---     | :--- | :---        |
| items | [item] | All of the templates that Eleventy processed. Is this always the same as the number of pages? |
| sortAscending | Boolean | ? Whether the items are sorted in ascending order? |
| sortNumeric | Boolean | ? Whether the items are sorted in numeric order? |
| sortFunctionStringMap | object | Something to do with the sorting stuff. We're not going to talk about it here. |


