---
date: 2018-10-22
title: Data Structures
tags:
  - eleventy
templateClass: tmpl-post
---

OK, so.

This is all throat-clearing to get to where
we want to go: To create a page-level property
`categories` that works in a way similar to `tags`.

It may turn out that the easier way to do this
is to just use the existing `tag` mechanism.
It's just that the idea of having to write something
like this is kind of gross:

``` text
---
date: 10/30/2018
title: Loomings
tags:
  - classics
  - contrived
  - _cat_examples
---
```

It should look like this:

``` text
---
date: 10/30/2018
title: Loomings
categories:
  - examples
tags:
  - classics
  - contrived
---
```

## Effing `tags`: how do they work?

Eleventy treats the `tags` page property special.
For every tag name, there's a corresponding array
of all the templates with that tag.^[I should probably
write this in English at some point.]

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

## Eff that. Use the VS Code debugger

Because what we really want to do
is: to create a page-level property
`categories` that works in a way similar to `tags`.

How do the tagged items end up in the collections?
Haven't we done this already?
[Yes we have.](/articles/how-collections-built/)

The [place where that happens](https://github.com/11ty/eleventy/blob/master/src/TemplateMap.js#L165-L189)
looks like this:

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

It used to look like this:

``` js
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

And this is the typical way of creating a collection:

``` js
eleventyConfig.addCollection("articles", function(collection) {
  return collection.getAllSorted().filter(function(item) {
    return item.url && item.inputPath.startsWith('./src/articles/');
  });
});
```


## The Lost Examples

> There's a set of `addCollection()` examples
> that went missing around v5.0.4.
>
> Most of them are examples of sorting.

The data collection gets passed to the callback.
You can use it in all sorts of ways:

```js
module.exports = function(eleventyConfig) {
  // Unsorted items (in whatever order they were added)
  eleventyConfig.addCollection("allMyContent", function(collection) {
    return collection.getAll();
  });
};
```

```js
module.exports = function(eleventyConfig) {
  // Use the default sorting algorithm (ascending by date, filename tiebreaker)
  eleventyConfig.addCollection("allMySortedContent", function(collection) {
    return collection.getAllSorted();
  });
};
```


```js
module.exports = function(eleventyConfig) {
  // Get only content that matches a tag
  eleventyConfig.addCollection("myPosts", function(collection) {
    return collection.getFilteredByTag("post");
  });
};
```

```js
module.exports = function(eleventyConfig) {
  // Filter using `Array.filter`
  eleventyConfig.addCollection("keyMustExistInData", function(collection) {
    return collection.getAll().filter(function(item) {
      // Side-step tags and do your own filtering
      return "myCustomDataKey" in item.data;
    });
  });
};
```

```js
module.exports = function(eleventyConfig) {
  // Filter using `Array.filter`
  eleventyConfig.addCollection("onlyMarkdown", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      // Only return content that was originally a markdown file
      let extension = item.inputPath.split('.').pop();
      return extension === "md";
    });
  });
};
```
```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("onlyMarkdown", function(collection) {
    return collection.getFilteredByGlob("**/*.md");
  });
};
```

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("_posts/*.md");
  });
};
```

```js
module.exports = function(eleventyConfig) {
  // Sort with `Array.sort`
  eleventyConfig.addCollection("myCustomSort", function(collection) {
    return collection.getAll().sort(function(a, b) {
      return b.date - a.date;
    });
  });
};
```

For example, that last `myCustomSort` collection will be available in your templates as `collections.myCustomSort`.

Hmmm. Here's something. Let's look at how `getFilteredByTag()`
is implemented.[^not-really]

[^not-really]: This is kind of like it's implemented.
  It should use `some()`.

``` js/6-10
getFilteredByTag(tagName) {
  return this.getAllSorted()
             .filter(item =>
                item.data.tags.some(e => tag === tagName))
}
```
