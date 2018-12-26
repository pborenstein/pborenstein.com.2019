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
you would write something like this:

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





