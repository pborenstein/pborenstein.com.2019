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

We want to:

- a list of articles for each category
- a list of categories



OK, so what we're going to do is
to make our `getCatList` function
do several things:

- create the categories collection^[I am embarrassed about this side-effect thing.]
- create a collection with all of the
  category names

Have we talked about how we're actually going
going to use these categories?
Something like this:

``` liquid
{%- raw -%}
{{ collections.categories.Culture }}
{%- endraw -%}
```

## Now what?

Let's see if this works.
Let's try to make category pages
analogous to the tag pages.

Where to start? The tag list in
`tags-list.njk` looks like this:

``` liquid
{%- raw -%}
---
permalink: /tags/
---
<h1>Tags</h1>

{% for tag in collections.tagList | sort %}
  {% set tagUrl %}/tags/{{ tag }}/{% endset %}
  <a href="{{ tagUrl | url }}" class="tag">{{ tag }}</a>
{% endfor %}
{%- endraw -%}
```

Let's make a copy of it called
`category-list.njk`.
And copy `tags.njk`
to `categories.njk`.

OK, this is weird.

This is how I create the categories.
There's a new `categories` property in `data.collections`.
Then for each category, the idea is to create
an array element / object property.
I want to be able to write
`collections.categories.Culture`.



``` js
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
  });
```
So I'll get something like this:

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

I was getting an error:

``` text
TypeError: collections[collectionName] is not iterable
```

This turned out to be a bug,
where Eleventy was expecting
that every property was some sort
of array. This gets fixed in [version
0.6.0.](https://github.com/11ty/eleventy/issues/277).



## Do we really need to do this?

It may turn out that the easier way
to implement categories
is to use the existing `tag` mechanism.
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





============

We'll start with three categories.

<div style="column-count: 3">
<div>

- CULTURE
  - movies
  - books
  - writing
  - poetry
</div>
<div>

- TECH
  - code
  - gadgets
  - tools
  - work
</div>
<div>

- LIFE
  - parenting
  - relationships
  - divorce
  - religion
</div>
</div>


