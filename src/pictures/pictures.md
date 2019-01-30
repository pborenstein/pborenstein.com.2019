---
layout: page.njk
templateEngineOverride: njk
pagination:
  data: flickr
  size: 6
  alias: ph
---

<div style="display: flex; justify-content: space-evenly">
<span>
{{ "¥" if pagination.firstPageHref == page.url }}
<a href="{{pagination.firstPageHref}}">first</a></span>
<a href="{{pagination.previousPageHref}}">previous</a>
<a href="{{pagination.nextPageHref}}">next</a>
<span><a href="{{pagination.lastPageHref}}">last</a>
{{ "¥" if pagination.lastPageHref == page.url }}</span>
</div>

{% from "macros.njk" import card  %}
{% from "macros.njk" import timeTag %}

<div class="articleList">
{% for f in ph  %}

{% set orientation =  f.exif | rotate  %}
{% set theName = f.name if f.name != " " else "Photo" %}

{{card(f.photopage,
       theName,"<img src='" + f.original + "' width=100% class='" + orientation +"'>",
       "Visual",
       f.date_taken)}}

{% endfor %}
</div>

<div style="display: flex; justify-content: space-evenly">
<span>
{{ "¥" if pagination.firstPageHref == page.url }}
<a href="{{pagination.firstPageHref}}">first</a></span>
<a href="{{pagination.previousPageHref}}">previous</a>
<a href="{{pagination.nextPageHref}}">next</a>
<span><a href="{{pagination.lastPageHref}}">last</a>
{{ "¥" if pagination.lastPageHref == page.url }}</span>
</div>
