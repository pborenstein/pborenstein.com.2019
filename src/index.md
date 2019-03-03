---
date: 2001-01-01
layout: page.njk
tags:
  - _nav
navtitle: Home
templateEngineOverride: njk,md
---

<style>
    p     { margin-top: .5em !important; }
    p img { margin: 0 !important;
            width: 100% }
</style>
![](https://picsum.photos/512/128?gravity=center&random)
{% from "macros.njk" import articlesList  %}


{% for cat in collections.catList %}

## {{cat}}

{{ articlesList(collections.categories[cat] | head(-2)) }}


{%- endfor -%}




