---
title: About collections
tags:
  - eleventy
  - common
---

There are two cases where Eleventy
uses `collection` as a parameter:

- When you use collections in a template.

  ```liquid
  {%- raw -%}
  {% for tag in collections.tagList %}
  {% set tagUrl %}/tags/{{ tag }}/{% endset %}
  <a href="{{ tagUrl | url }}" class="tag">{{ tag }}</a>
  {% endfor %}
  {%- endraw -%}
  ```

- When you call `addCollection()` in `.eleventy.js`

  ```js
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.startsWith('./posts');
    });
  })
  ```

## Collections in a Template

To find out what `collections` looks like
in a template, I made a file called
`collections.ejs` that looks like this:

```markup
---
permalink: collections-ejs.json
---
<%_
// Using JSON.decycle()
//    from https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
//  the thing we want to print  `collections.all`
//  has circular references, so I found this,
//  which seems to work.
_%>
<%- JSON.stringify(JSON.decycle(collections), null, 2) -%>
```

I used EJS because that made it easier to
output this using `JSON.decycle()`.
Be sure to add `ejs` to the `templateFormats` list.

```json
templateFormats: [
  "md",
  "njk",
  "html",
  "ejs"
]
```

If you look at `collections-ejs.json`,
the output of `collections.ejs`,
it looks something like this:

```json
{
  "all": [],
  "nav": [],
  "post": [],
  "another-tag": [],
  "eleventy": [
    {
      "inputPath": "./posts/inside-collections.md",
      "fileSlug": "inside-collections",
      "date": "2018-09-02T00:49:59.000Z",
      "outputPath": "_site/posts/inside-collections/index.html",
      "url": "/posts/inside-collections/",
      "templateContent": "..."
    }
  ],
  "number-2": [],
  "second-tag": [],
  "posts": [],
  "tagList": [
    "another-tag",
    "number-2",
    "second-tag",
    "eleventy"
  ]
}
```

A saved version is in `collections-page.json`.

[So,][] here's what's in each property of `collections`.

- Every property except `tagList` is a list of rendered pages.
- `all` is the list of all rendered pages.
- Other properties are the names of tags, and the
  contents is a list of posts with that tag.
- `tagList` is a special collection made in `.eleventy.js`
  that lists all of the tags except the special
  metatags (`all`, `nav`, `post`, `posts`).




## Adding a Collection at Startup

Another place that collections turn up
is when you want to create a new collection.
Eleventy lets you do this (create a new collection)
in the user configuration file `.eleventy.js`
with the `addCollection()` method.

```json
eleventyConfig
  .addCollection("tagList",require("./_11ty/getTagList"));
```

`addCollection()` takes two parameters:
  - The name of the new collection.
  - A function that, when called, returns an array of
    stuff (since 5.0.3?) that becomes the value of the property.
    The function takes, as a parameter, a `collection`.

Presumably, `addCollection()` adds a new array of collection items
to the `collections` object that the template uses (above).
In this case, a new property `tagList` is added to the `collections` object.
The value of the new property is created by the function defined in
`./_11ty/getTagList`, which returns an array of tags.

What we want to know is,
what is in the collection parameter.
The doc gives examples, but is there more?

I hacked `./_11ty/getTagList` to dump its `collection` parameter.
I did it here because it was the easiest place to dump
the `JSON.decycle()` code in.

```js
module.exports = function(collection) {
  let tagList = {};

  console.log(JSON.stringify(JSON.decycle(collection), null, 2))

  collection.getAllSorted().forEach(function(item) {
    if( "tags" in item.data ) {
      let tags = item.data.tags;
      if( typeof tags === "string" ) {
        tags = [tags];
      }

      tags.filter(function(item) {
        switch(item) {
          // this list should match the `filter` list in tags.njk
          case "all":
          case "nav":
          case "post":
          case "posts":
            return false;
        }

        return true;
      }).forEach(function(tag) {
        tagList[tag] = true;
      });
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return Object.keys(tagList);
};
```

So the value of `collection` in `getTagList.js` is in `collection-addcollection.json`.
It looks like this:

```json
{
  "items": [
    {
      "inputPath": "./collections.ejs",
      "outputPath": "_site/collections-ejs.json"
      "fileSlug": "collections",
      "url": "/collections-ejs.json",
      "date": "2018-09-06T06:15:24.000Z",
      "data": { ... },
      "template": { ... },
      "_pages": [ ... ],
    },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... },
    { ... }
  ],
  "sortFunctionStringMap": { ... },
  "sortAscending": true,
  "sortNumeric": false
}
```

Each item in the `items` array
represents a processed template.
The one for the
template we defined up above, `collections.ejs`
is the first item.


Those `sortFunctionStringMap`, `sortAscending`, and `sortNumeric`
properties are part of the class of this object.
Eleventy is very OOP. Much class.

### What's in an item?

Just to refresh: here's an item:


```json
{
  "inputPath": "./collections.ejs",
  "outputPath": "_site/collections-ejs.json"
  "fileSlug": "collections",
  "url": "/collections-ejs.json",
  "date": "2018-09-06T06:15:24.000Z",
  "data": { ... },
  "template": { ... },
  "_pages": [ ... ],
}
```
The `inputPath`, `outputPath`, `fileSlug`,  `url`, and `date`
properties are self explantory.
But what's in the other properties?

Trust me that `_pages` is part of Eleventy's caching system.
We're not touching that.



The `data` property looks like this.


```json
"data": {
  "metadata": {
    "title": "Your Blog Name",
    "url": "https://myurl.com/",
    ...
  },
  "pkg": {
    "name": "eleventy-base-blog",
    ...
  },
  "permalink": "collections-ejs.json",
  "page": {
    "date": "2018-09-06T06:15:24.000Z",
    "inputPath": "./collections.ejs",
    "fileSlug": "collections",
    "url": "/collections-ejs.json",
    "outputPath": "_site/collections-ejs.json"
  },
  "collections": { ... }
}
```


- So `data` is the JSONified version of all the data in the `_data` directory.  `metadata` is the contents of   the file _data/metadata.json`.
- And `pkg` is the repository's `package.json` file.
- `permalink` is the template's permalink.
- `page` is information about the page. It's exactly
  the same as the information in the item.
- And `collections` is that big ol' collections thing from up back.




[So,]:  https://google.com?q=so

