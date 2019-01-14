---
title: Collections
category: Tech
tags:
  - eleventy
---

Eleventy uses `collections`
to **group posts**
according to various criteria.
A collection might consist
of articles in a series.
Another collection could be
of posts about transportation.
A third could be
all the posts
in a particular directory.

Eleventy gives you two ways to create collections:

- implicitly, with tags in the front matter
- explicitly, with `addCollection()`

## Tag-based collections

Pages that share a tag
are in the same collection.
A page with the
A template with the following front matter
would generate
pages in the collections a page the belongs
`posts`
and `scifi`.

``` liquid
{%- raw -%}
---
title: Flying Autos
tags:
  - posts
  - scifi
---
. . .
{% endraw %}
```

Within a template
collections are accessed
by name
as properties
of the global `collections` object.
It looks like this:


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

Each property is an array of page objects.
The special `all` collection is an array
of all of the page objects Eleventy generates.

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


``` liquid
{% raw %}
<p>
  The title of this page is:
  {{ collections.transportation[0].data.title }}
</p>
{% endraw %}
```

This:  X


I think there are two versions of an item object:

1.  The one here in collections.x in a template
2.  The other one in the collection parameter to addCollection()


<details>
<summary>
Implementation notes
</summary>

[`getTaggedCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L146-L161)
is the function that turns tags into collections.

``` js/9-10
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

`getTaggedCollectionsData()` gets called
in `TemplateMap.cache()` which is where
Eleventy builds the collections.
</details>






## Explicit Collections

Explicit Collections is a stupid name
for this.

When you want to create a new collection that's not
a tag, you can use `addCollection()` in your
`.eleventy.js` configuration file.

`addCollection()` takes two arguments:
- the name of the collection (a string)
- a function that takes a `collection` as an argument.


```js
eleventyConfig.addCollection("articles",
  collection => collection
    .getAllSorted()
    .filter(item => item.url
                 && ! item.inputPath.includes('index.njk')
                 && item.inputPath.startsWith('./src/articles/')))
```

So, what's in this `collection` parameter?

<div class="mdhack"></div>

| Property              | Type     | Description                                                                                   |
| :-------------------- | :------- | :-------------------------------------------------------------------------------------------- |
| items                 | [`item`] | All of the templates that Eleventy processed. Is this always the same as the number of pages? |
| sortAscending         | Boolean  | ? Whether the items are sorted in ascending order?                                            |
| sortNumeric           | Boolean  | ? Whether the items are sorted in numeric order?                                              |
| sortFunctionStringMap | object   | Something to do with the sorting stuff. We're not going to talk about it here.                |
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

| Property   | Type      | Description                                                                                                                                            |
| :--------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| template   | object    | Content and metadata about this item's template. In other words, its page.                                                                             |
| inputPath  | string    | A path relative to the source directory. Though really it's more like `./src/index.md` where `src` is the source directory.                            |
| fileSlug   | string    | The base name of the input file. The final element in the path. Never `index`. If the file is index.md, the slug is an empty string.                   |
| data       | object    | Whoa                                                                                                                                                   |
| date       | string    | An the file's date in <span style="font-variant-caps: small-caps; font-variant: small-caps">ISO 8601</span> format. There's some trickery about dates. |
| _pages     | [`stuff`] | Something to do with Elventy's caching that I'm not even going to think about.                                                                         |
| url        | string    | The URL of this page. Actually just the path without the scheme, host, port info etc.                                                                  |
| outputPath | string    | Where the processed file ended up. Relative to where `.eleventy.js` is                                                                                 |
[<div class="table-caption">item properties</div>]

Let's put links in these tables.


https://www.11ty.io/docs/collections/#collection-api-methods

https://www.11ty.io/docs/collections/#collection-item-data-structure

The `collection` item itself isn't all that interesting.
It contains the array of items
and some other stuff used for sorting.


The collection API

All of these return an array of collection items.

| Method                        | Description                                                                |
| :---------------------------- | :------------------------------------------------------------------------- |
| `getAll()`                    | Gets all of the items in arbitrary order.                                  |
| `getAllSorted()`              | Gets all of the items in order.                                            |
| `getFilteredByTag( tagName )` | Get all of the items with a specific tag.                                  |
| `getFilteredByGlob( glob )`   | Gets all of the items whose `inputPath` matches one or more glob patterns. |





============ how it happens

IT =  how named (non-tag) get built
      - stash a function that creates the collection
      - where the function gets called.

      Collections are central data structures
      There are two collection-building mechanisms:
        - tags
        - addCollection()


The [place where that happens](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L167-L191)


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


but this is for collection building functions
that were stashed by [addCollection()](https://github.com/11ty/eleventy/blob/d70abd65cfa2235dc29657fc6e0d714248c70eed/src/UserConfig.js#L233-L243)

```js
addCollection(name, callback) {
  name = this.getNamespacedName(name);

  if (this.collections[name]) {
    throw new UserConfigError(
      `config.addCollection(${name}) already exists. Try a different name for your collection.`
    );
  }

  this.collections[name] = callback;
}
```

looks like this:[^realgetuser]

``` js/6
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



================== what's in addCollection's collection param






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
