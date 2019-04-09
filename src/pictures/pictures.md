---
layout: page.njk
templateEngineOverride: njk
pagination:
  data: flickr
  size: 2
  alias: ph
---
{% from "macros.njk" import card  %}
{% from "macros.njk" import timeTag %}


### thing

```json
. . .
{{pagination.firstPageHref}}
{{pagination.lastPageHref}}
{{page.url}}
```




<div style="display: flex; justify-content: space-evenly">
<span>
<a href="{{pagination.firstPageHref}}">first</a></span>
<a href="{{pagination.previousPageHref}}">previous</a>
<a href="{{pagination.nextPageHref}}">next</a>
<span><a href="{{pagination.lastPageHref}}">last</a>
</div>

{% for f in ph  %}

{{card("https://www.flickr.com/photos/"+f.owner+"/"+f.id,
       f.title,
       "<img src='"+f.url_n+"' width=100%>",
       "Visual",
       [],
       f.datetaken)}}



<pre><code>
{{f.title}}
{{f.url_m}}
<!-- img src="{{f.url_m}}" -->
</code></pre>
{% endfor %}
