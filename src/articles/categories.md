---
title: Implementing Categories
category: Tech
tags:
  - eleventy
---

I want there to be Categories.


They're like newspaper sections.
The idea is
to build silos ^[I see what I did there.]
for things
that shouldn't go together,
or that don't necessarily go together.


## How we'll use them

Let's look at how categories are used in articles:

- How to specify the category for an article
- How to get an article's category in a template
- How to work with all of the articles in the same category

### Specifying the category

Use the `category` property
like this to specify
the category an article belongs to:

``` text
---
date: 10/30/2018
title: Loomings
category: Tech
tags:
  - tools
  - git
  - eleventy
---
```

Keep in mind:

- An article does not need to specify a category.
- An article can belong to only one category.
- Category names are Capitalized by convention.


### Using the category in a template

In a template, refer to
the category in the usual way:

```html
{%- raw -%}
<a href="/categories/{{category}}">{{category}}</a>
{%- endraw -%}
```

### Working with articles in the same category

To work with articles in the same category,
we introduce
the `categories` collection.
It works like this:
To list
all of the articles in
the `Tech` category,
you could do it this way:

```liquid
{%- raw -%}
<ul>
  {%- for article in collections.categories["Tech"] -%}
    <li>{{ article.data.title }}</li>
  {%- endfor -%}
</ul>
{%- endraw -%}
```


Just as
`collections`
is an object that has
a property for each tag,
so `collections.categories`
has a property for each category.
Each property refers to an array of articles.
It looks something like this:

```js
collections.categories {
  Culture: [article_1, article_4],
  Tech: [article_3],
  Life: [article_1, article_3]
}
```



## The implementation

We want:

- a list of articles for each category
- a list of categories


To get the list of categories,
we iterate over all of the
rendered templates.
This code
creates a collection called
`categoryList`
that contains
the names of all the categories.

```js
getCatList = function(collection) {
  let catSet = new Set()

  collection.getAllSorted().forEach(item =>
        typeof item.data.category === "string"
    &&  catSet.add(item.data.category)
  );

  return [...catSet]
}

eleventyConfig.addCollection("categoryList", getCatList)
```

And now the fun really begins.
We want to
create a property for each
category.
Each property is a list
of articles of that category.

This is the same way that
Eleventy handles tags,
so let's see how it does this.

### Excursus: How do tags become collections?


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

My solution is to gather the categories
while we get the categories list:


```js
module.exports = function(collection) {
  let catSet = new Set()
  let catlist = []
  let decycled = JSON.stringify(decycle(collection), null, 2)
  let sortedCollection = collection.getAllSorted()

  debug(decycled)

  sortedCollection.forEach(function(item) {
    if (! ("categories" in item.data.collections)) {
      // no categories collection? make one
      item.data.collections.categories = {}
    }

    if (typeof item.data.category === "string") {
      catSet.add(item.data.category)
      if (!Array.isArray(item.data.collections.categories[item.data.category])) {
        item.data.collections.categories[item.data.category] = []
      }

      item.data.collections.categories[item.data.category].push(item)
    }
  })

  catlist = [...catSet]

  debug(catlist)
  return catlist
}
```

This works, but can we make it cleaner?


Yes, like so:

```js
module.exports = function(collection) {
  let categories = {}

  collection.getAll().forEach(item => {
    let category = item.data.category

    if (typeof category !== "string")
      return

    if (Array.isArray(categories[category]))
      categories[category].push(item)
    else
      categories[category] = [item]
  })

  return categories
}
```




[addCollection]: https://github.com/11ty/eleventy/blob/master/src/UserConfig.js#L213-L223
