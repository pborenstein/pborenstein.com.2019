---
date: 2018-01-01
layout: page.njk
templateEngineOverride: njk,md
---

### This is weird

This is what it looks like with Markdown,
as opposed to straight HTML and Nunjucks.

- The `articlesList` macro expands to
  HTML first.
- That then gets rendered as Markdown,
  and since some of the code is indented
  4 spaces, it gets treated as code.
- I can either:
  #. Write a macro that's all Markdown
  #. Rewrite the macro to eat all whitespace

Option 2 turned out to be the thing.


{% from "macros.njk" import articlesList  %}
{% from "macros.njk" import taglist  %}

<hr>

{{ taglist([])}}

<hr>

{{ articlesList(collections.articles | head(-3) ) }}
