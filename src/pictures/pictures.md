---
layout: page.njk
templateEngineOverride: njk
pagination:
  data: flickr
  size: 4
  alias: ph
---
{% from "macros.njk" import card  %}
{% from "macros.njk" import timeTag %}



<style>
.card {
  width: initial !important;
}
</style>


<div style="display: flex; justify-content: space-evenly">
<span>
<a href="{{pagination.firstPageHref}}">first</a></span>
<a href="{{pagination.previousPageHref}}">previous</a>
<a href="{{pagination.nextPageHref}}">next</a>
<span><a href="{{pagination.lastPageHref}}">last</a>
</div>

<div class="articleList">
{% for f in ph  %}
{{card("https://www.flickr.com/photos/"+f.owner+"/"+f.id,
       f.title,
       "<img src='"+f.url_s+"' >",
       "Visual",
       [],
       f.datetaken)}}

{% endfor %}
</div>

<div style="display: flex; justify-content: space-evenly">
<span>
{{ "-" if pagination.firstPageHref == page.url }}
<a href="{{pagination.firstPageHref}}">first</a></span>
<a href="{{pagination.previousPageHref}}">previous</a>
<a href="{{pagination.nextPageHref}}">next</a>
<span><a href="{{pagination.lastPageHref}}">last</a>
{{ "-" if pagination.lastPageHref == page.url }}</span>
</div>
