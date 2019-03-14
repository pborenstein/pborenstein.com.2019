---
date: 2001-01-01
layout: page.njk
tags:
  - _nav
navtitle: Home
templateEngineOverride: njk,md
categories:
  - Tech
  - Life
  - Culture
---

<style>
    p     { margin-top: .5em !important; }
    p img { margin: 0 !important;
            width: 100% }

    h2, h3 {
      font-weight: 700;
    }

</style>
![](https://picsum.photos/512/128?gravity=center&random)
{% from "macros.njk" import articlesList  %}

{# collections.catList #}

{% for cat in categories %}


{% if ((cat !== "Q") and (cat !== "Visual")) %}
  ### {{cat}}
  {{ articlesList(collections.categories[cat] | head(-2)) }}
{% endif %}


{%- endfor -%}




