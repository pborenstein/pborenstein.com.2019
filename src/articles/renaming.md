---
title: "Renamering"
layout: layouts/article.njk
tags:
  - eleventy
#   - nav
# navtitle: Renamering
templateClass: tmpl-post
---

The basic thing is that the base
I'm starting with calls everything
a post. but do i really want to
call them articles?

* Do I need to do this?
* What are the advantages?
* What's wrong with `posts`?
* Do we really want to call everything an `article`?

What's wrong with posts?

Blogs, mostly. I don't want this to be a blog. By which I mean:
  - a collection of texts arranged in a reverse chronological order
  - articles on personal topics

Also, it's a way to see how things are connected in Eleventy.

So, we already have an `articles.njk` and changed the nav strings. What we're doing here is renaming things like `collections.posts`

`postslist.njk` is used whenever we want a list of posts/articles.
It expects that the list is in a variable called `postslist`.
The templates that use this are:

- `articles.njk`
- `tags.njk`

They both have code like this, where you set up `postslist`, then use `postslist.njk` to do the rendering.

  ``` liquid
  {%- raw -%}
  {% set postslist = collections.posts %}
  {% include "postslist.njk" %}
  {%- endraw -%}
  ```

We're going to want to change that.
And as long as we're making changes,
setting `postslist` to pass an argument seems messy.
Let's try using a [macro](https://mozilla.github.io/nunjucks/templating.html#macro).


Let's call the macro `articlesList`. It looks just like
postslist.njk.

  ``` liquid
  {%- raw -%}
<ol reversed class="postlist" style="counter-reset: start-from {{ postslist.length + 1 }}">
{% for post in postslist | reverse %}
	<li class="postlist-item{% if post.url == url %} postlist-item-active{% endif %}">
		<a href="{{ post.url | url }}" class="postlist-link">{% if post.data.title %}{{ post.data.title }}{% else %}<code>{{ post.url }}</code>{% endif %}</a>
		<span class="postlist-date">{{ post.date | readableDate }}</span>
		{% for tag in post.data.tags %}
      {%- if tag != "post" -%}
      {% set tagUrl %}/tags/{{ tag }}/{% endset %}
      <a href="{{ tagUrl | url }}" class="tag">{{ tag }}</a>
      {%- endif -%}
    {% endfor %}
	</li>
{% endfor %}
</ol>
  {%- endraw -%}
  ```

And here's how we call it:

``` liquid
{% raw %}
{% from "macros.njk" import articlesList  %}

<h1>All the things</h1>

{{ articlesList(collections.posts) }}
{% endraw %}
```

OK, let's take `collections.posts`. We're going to want to make that `collections.articles`. Where does that `dot.posts` come from?

We know from our work on collections, that within a template, the collections object has a property for each tag. That's why you can get a list of articles  (I keep calling them posts) with `collections[ tag ]`.

But there's this `posts` property there. Was that a tag? Nope. The `posts` collection was created in the `.eleventy.js` startup file.

``` js
// only content in the `posts/` directory
eleventyConfig.addCollection("posts", function(collection) {
  return collection.getAllSorted().filter(function(item) {
    return item.inputPath.startsWith('./posts');
  });
});
```

So to change things to use articles, we should be able to just:

``` js
// only content in the `articles/` directory
eleventyConfig.addCollection("articles", function(collection) {
  return collection.getAllSorted().filter(function(item) {
    return item.inputPath.startsWith('./articles');
  });
});
```

That won't be enough. We also need to rename the `posts` directory. Will that do it?

Let's find out.

Rather than editing the posts collection function, we'll just add the articles-collection function. But here's a twist: we're going to create the new collection, but have it use the old data.

``` js
// only content in the `articles/` directory
eleventyConfig.addCollection("articles", function(collection) {
  return collection.getAllSorted().filter(function(item) {
    return item.inputPath.startsWith('./posts');
  });
});
```

Everything should still work. And now, the two collections, `posts` and `articles`, should be identical.

That means we should be able to change articles.njk from this

``` liquid
{% raw %}
{{ articlesList(collections.posts) }}
{% endraw %}
```

to

``` liquid
{% raw %}
{{ articlesList(collections.articles) }}
{% endraw %}
```

and everything should still work. And it does.

So, these lines in the `articlesList` macro are weird:

``` liquid/2,5
{% raw %}
{% for tag in post.data.tags %}
  {%- if tag != "post" -%}
  {% set tagUrl %}/tags/{{ tag }}/{% endset %}
  <a href="{{ tagUrl | url }}" class="tag">{{ tag }}</a>
  {%- endif -%}
{% endfor %}
{% endraw %}
```

When would there ever be a `post` tag? At one time there may have been a reason to tag everything that was going to be a post. But then they implemented by directory.

Take it out.

But wait. In the [README](https://github.com/11ty/eleventy-base-blog#implementation-notes) it says:

> `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.

Anyway.


## Moving on

We're still interested in changing the terminology from posts to articles.
What's next to do?

How about we rename `/posts` to `/articles`.
That should fail right away.

Yup.

There's a problem with the feed.njk file, which I've been ignoring from day one. Let's take a look.

Renamed collections.posts to collections.articles.

Let's fix up the collection functions. Point the articles collection to the right directory:

``` js/3
// only content in the `articles/` directory
eleventyConfig.addCollection("articles", function(collection) {
  return collection.getAllSorted().filter(function(item) {
    return item.inputPath.startsWith('./articles');
  });
});
```

And we're good. There are still post things over in the feeds directory, but we're going to keep ignoring it for now.

## What we learned

There is no implicit / magic link between directory names
and collection names. That happens explicitly in the .eleventy.js configuration file through an addCollection() invokation.

``` js
// only content in the `articles/` directory
eleventyConfig.addCollection("articles", function(collection) {
  return collection.getAllSorted().filter(function(item) {
    return item.inputPath.startsWith('./articles');
  });
});
```

So actually, that code up there has a little problem.
It's this:


``` js
.startsWith('./articles')
```

The template that lists all the articles is called
articles.njk. In the list I was getting an entry
called `/articles/`, which I thought was weird.
I chased the wrong rabbit, but eventually,
I found myself to:

``` js
.startsWith('./articles/')
```
