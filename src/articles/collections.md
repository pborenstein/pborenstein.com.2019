---
title: Collections
category: Tech
tags:
  - eleventy
---

Eleventy treats the `tags`  property special.
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
