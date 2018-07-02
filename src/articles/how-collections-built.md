---
title: How collections get built
tags:
  - eleventy
  - common
---


The `eleventyConfig` object is defined in https://github.com/11ty/eleventy/blob/master/src/UserConfig.js

So a couple of things

Two environments

In `eleventy.js` the `eleventyConfig` object has a bunch of things,
amongst which is `collections`.

Note that `addCollection` doesn't actually do anything: (https://github.com/11ty/eleventy/blob/master/src/UserConfig.js#L213-L223)

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

Where does the thing actually happen?

Added a console.trace here:

```js
  eleventyConfig.addCollection("posts", function(collection) {
console.trace('posts')
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.startsWith('./posts');
    });
```

Got this:


```bash
[inside-collections *+%]$ npx eleventy --serve
Trace: posts
    at Object.posts (/Users/philip/work/eleventy-base-blog/.eleventy.js:17:9)
    at TemplateMap.getUserConfigCollectionsData (/Users/philip/work/eleventy-base-blog/node_modules/@11ty/eleventy/src/TemplateMap.js:170:40)
    at TemplateMap.cache (/Users/philip/work/eleventy-base-blog/node_modules/@11ty/eleventy/src/TemplateMap.js:40:49)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
```


It actually happens in https://github.com/11ty/eleventy/blob/master/src/TemplateMap.js#L165-L189

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





