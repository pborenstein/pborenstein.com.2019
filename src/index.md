---
date: 2018-01-01
layout: page.njk
tags:
  - nav
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
<style>
  .card { width: 42%;
          grid-template-rows: 1fr 4fr 1fr;
          grid-row-gap: 2px;
          grid-column-gap: 2px;
          height: 8em;}
</style>
{{ articlesList(collections.articles | head(-6)) }}


[Eleventy]: https://www.11ty.io/
[about that]: /tags/eleventy/


{% from "macros.njk" import articlesList  %}
<style>
  .card { width: 32%;
          grid-template-rows: 1fr 4fr 1fr;
          height: 8em;}
</style>
{{ articlesList(collections.articles | head(-4)) }}


This is a random picture from [Lorem Picsum](https://picsum.photos/).

![](https://picsum.photos/512/128?gravity=center&random)


I'm redoing this site in [Eleventy][].

Read all [about that][].


[Eleventy]: https://www.11ty.io/
[about that]: /tags/eleventy/


