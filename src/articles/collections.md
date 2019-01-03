---
title: Collections
category: Tech
tags:
  - eleventy
---

Eleventy uses tags
to group pages
into collections.
Pages that share a tag
are in the same collection.
For example,
a template with the following front matter
would generate a page the belongs
to the `transportation`
and `fantasy` collections.

``` liquid
{%- raw -%}
---
title: Flying Machines
tags:
  - transportation
  - fantasy
---
. . .
{% endraw %}
```


Collections are accessed
by name
as properties
of the global `collections` object:

``` liquid
{% raw %}
{{ collections.posts }}
{% endraw %}
```


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

<div class="mdhack"></div>

| Property | Type | Description |
| :---     | :--- | :---        |
| items | [`item`] | All of the templates that Eleventy processed. Is this always the same as the number of pages? |
| sortAscending | Boolean | ? Whether the items are sorted in ascending order? |
| sortNumeric | Boolean | ? Whether the items are sorted in numeric order? |
| sortFunctionStringMap | object | Something to do with the sorting stuff. We're not going to talk about it here. |
[<div class="table-caption">Collection properties</div>]

We're interested in the `items` array.
This table shows what an `item` looks like.[^item]

[^item]: I'm using the notation `[item]` to indicate that
      the property called `items` is an array of item objects.
      There really isn't an `item` object. In other words,
      you'll never see JSON like this:

      ```json
      {
        "item" : { ... }
      }
      ```

<div class="mdhack"></div>

| Property | Type | Description |
| :---     | :--- | :---        |
| template | object | Content and metadata about this item's template. In other words, its page. |
| inputPath | string | A path relative to the source directory. Though really it's more like `./src/index.md` where `src` is the source directory. |
| fileSlug | string | The base name of the input file. The final element in the path. Never `index`. If the file is index.md, the slug is an empty string. |
| data | object | Whoa |
| date | string | An the file's date in <span style="font-variant-caps: small-caps; font-variant: small-caps">ISO 8601</span> format. There's some trickery about dates. |
| _pages | [`stuff`] | Something to do with Elventy's caching that I'm not even going to think about. |
| url | string | The URL of this page. Actually just the path without the scheme, host, port info etc. |
| outputPath | string | Where the processed file ended up. Relative to where `.eleventy.js` is |
[<div class="table-caption">item properties</div>]

Let's put links in these tables.




How do the tagged items end up in the collections?
Haven't we done this already?
[Yes we have.](/articles/how-collections-built/)

The [place where that happens](https://github.com/11ty/eleventy/blob/master/src/TemplateMap.js#L165-L189)
looks like this:[^realgetuser]

``` js/6
async getUserConfigCollectionsData() {
  let collections = {};
  let configCollections =
    this.configCollections || eleventyConfig.getCollections();
  for (let name in configCollections) {
    collections[name] = this.createTemplateMapCopy(
      configCollections[name](this.collection)
    );
    debug(
      `Collection: collections.${name} size: ${collections[name].length}`
    );
  }
  return collections;
}
```


This is a typical way of creating a collection.

``` js
eleventyConfig.addCollection("articles", collection =>
  collection.getAllSorted()
            .filter(item => item.url &&
                            item.inputPath.startsWith('./src/articles/'))
})
```

We're creating a collection
made up of pages
that were rendered
from templates
in the `./src/articles/` directory.^[The current directory `.` is the directory
that you're executing `eleventy` in. It contains `.eleventy.js`.]


And this collection is
made up of pages
that were rendered
from templates
that have a `fun-examples` tag.

``` js
  eleventyConfig.addCollection("fun-examples", collection =>
    collection.getFilteredByTag("fun-examples"));
```


Let's look at how `getFilteredByTag()` is implemented:[^realgetfiltered]

``` js
getFilteredByTag(tagName) {
  return this.getAllSorted()
             .filter(item =>
                item.data.tags.some(tag => tag === tagName))
}
```

This is how the the individual collections
get into to the `collections` property:


``` js/9
async getTaggedCollectionsData() {
  let collections = {};
  collections.all = this.createTemplateMapCopy(
    this.collection.getAllSorted()
  );
  debug(`Collection: collections.all size: ${collections.all.length}`);

  let tags = this.getAllTags();
  for (let tag of tags) {
    collections[tag] = this.createTemplateMapCopy(
      this.collection.getFilteredByTag(tag)
    );
    debug(`Collection: collections.${tag} size: ${collections[tag].length}`);
  }
  return collections;
}

```

Where does `getTaggedCollectionsData` get called?
In `TemplateMap.cache()`.
Hmmm. That's not terribly useful. Is that where
the magic happens?



# Other Stuff

---
date: 2018-10-18
title: About collections
category: Tech
tags:
  - eleventy
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




<!--
            F O O T N O T E S
-->

[^realgetuser]: `getUserConfigCollectionsData` is actually implemented like this:
      ```js
      async getUserConfigCollectionsData() {
        let collections = {};
        let configCollections =
          this.configCollections || eleventyConfig.getCollections();
        for (let name in configCollections) {
          let ret = configCollections[name](this.collection);

          // work with arrays and strings returned from UserConfig.addCollection
          if (
            Array.isArray(ret) &&
            ret.length &&
            ret[0].inputPath &&
            ret[0].outputPath
          ) {
            collections[name] = this.createTemplateMapCopy(ret);
          } else {
            collections[name] = ret;
          }

          debug(
            `Collection: collections.${name} size: ${collections[name].length}`
          );
        }
        return collections;
      }
      ```

[^realgetfiltered]: `getFilteredByTag` is actually implemented like this:
      ``` js
      getFilteredByTag(tagName) {
      return this.getAllSorted().filter(function(item) {
        let match = false;
        if (!tagName) {
          return true;
        } else if (Array.isArray(item.data.tags)) {
          item.data.tags.forEach(tag => {
            if (tag === tagName) {
              match = true;
            }
          });
          // This branch should no longer be necessary per TemplateContent.cleanupFrontMatterData
        } else if (typeof item.data.tags === "string") {
          match = item.data.tags === tagName;
        }
        return match;
      });
      ```
