---
title: Implementing Categories
date: 2019-01-20
subhead: A collection of collections.
category: Tech
tags:
  - eleventy
  - collections
---

I want there to be Categories in Eleventy
to organize articles into
broad domains.[^That's what I say _now_.
The original impetus for this was to figure
out [how collections work](/articles/collections/).]
The idea is that all articles about
books will go into the Culture category,
articles about tech go into the Tech category,
and so on.

- An article does not have to specify a category.
- An article can belong to only one category.
- Category names are Capitalized by convention.

Tags, on the other hand, can be in any
category. A weird book and
some weird code would be
in different categories,
but they could both be tagged `weird`.



## How we'll use them

Let's look at how we'll use categories:

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


### Using the category in a template

In a template, refer to
the category property in the usual way:

```html
{%- raw -%}
<a href="/categories/{{category}}">{{category}}</a>
{%- endraw -%}
```

### Working with articles in the same category

We can work with articles in the same category
by creating a `categories` collection.^[You can use any name
you like. I happen to like "categories".]
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

``` json
collections: {
  all: [ items ],
  categories: {
    Culture: [ items ],
    Life: [ items ],
    Thinking: [ items ]
  }
}
```


## The implementation

We want:

- a list of categories
- an object that contains
  a property for each category,
  and each property is a list
  of articles for that category

### Creating a list of categories

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
    &&  catSet.add(item.data.category))

  return [...catSet]
}

eleventyConfig.addCollection("categoryList", getCatList)
```

### Creating a list of articles for each category

To get lists of each article in a category,
we want to create an object
that has a property for each category,
and each property contains a list
of articles of that category.
In other words,
we want to end up with
an object that looks like this:

```js
categories {
  Culture: [article_1, article_4],
  Tech: [article_3],
  Life: [article_1, article_3]
}
```

We can use the
`makeCategories()` function
as a callback to
to `addCollection()`
to create this object.
We iterate over each item
that has a `category`
property in its
front matter
and add it to the list
for that category:[^explanation]

[^explanation]:
    This `if (Array.isArray(categories[category]))`
    thing is really stupid.
    Isn't there a way to push to an array,
    creating it if it doesn't exist.

```js
makeCategories = function(collection) {
  let categories = {}

    // Every rendered page

  collection.getAllSorted().forEach(item => {
    let category = item.data.category

      // Ignore the ones without a category

    if (typeof category !== "string")
      return

    if (Array.isArray(categories[category]))
        //  category array exists? Just push
      categories[category].push(item)
    else
        //  Otherwise create it and
        //  make `item` the first, uh, item.
      categories[category] = [item]
  })

  return categories
}
```

Since we want to call our collection of categories
`categories`, we'd build it like this:

```js
addCollection("categories", makeCategories)
```

So now we have a way to make a collection
that has collections of its own.
I use it to segregate my posts into
unique buckets.
