---
layout: page.njk
templateEngineOverride: njk
pagination:
  data: flickr
  size: 12
  alias: ph
---
{% from "macros.njk" import card  %}
{% from "macros.njk" import timeTag %}



<style>
.card {
  width: 47% !important;
}
</style>


<div style="display: flex; justify-content: space-evenly">
<span>
<a href="{{pagination.firstPageHref}}">first</a></span>
<a href="{{pagination.previousPageHref}}">previous</a>
<a href="{{pagination.nextPageHref}}">next</a>
<span><a href="{{pagination.lastPageHref}}">last</a>
</div>

<div class="flexbin">
  {% for f in ph  %}
  <a style="margin: 0" href="https://www.flickr.com/photos/{{ f.owner}}/{{f.id}}/">
    <img src="{{f.url_z}}">
  </a>
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
