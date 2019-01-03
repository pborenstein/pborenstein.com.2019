---
title: "Excursus: How tags become categories"
category: Tech
tags:
  - eleventy
  - odds
---

Here's how you create a collection
by hand:

```js
eleventyConfig.addCollection("posts",
  collection => collection
    .getAllSorted()
    .filter(
      item => item
        .inputPath
        .startsWith('./posts'))
  );
```

The implementation of `addCollection()` looks
[like this][addCollection]:

```js
addCollection(name, callback) {
  name = this.getNamespacedName(name);

  if (this.collections[name]) {
    throw new Error(
      `config.addCollection(${name}) already exists. Try a different name for your collection.`
    );
  }

  this.collections[name] = callback;
}
```


All that does is
to stash the function
that actually creates the group.


The [place where that happens](https://github.com/11ty/eleventy/blob/master/src/TemplateMap.js#L167-L191)
looks like this:

``` js/5
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

[addCollection]: https://github.com/11ty/eleventy/blob/master/src/UserConfig.js#L213-L223
