---
layout: page.njk
templateEngineOverride: njk,md
pagination:
  data: flickr
  size: 3
  alias: ph
---

{{ "•" if pagination.firstPageHref == page.url }} [first]({{pagination.firstPageHref}})
[previous]({{pagination.previousPageHref}})
[next]({{pagination.nextPageHref}})
[last]({{pagination.lastPageHref}}) {{ "•" if pagination.lastPageHref == page.url }}

{% from "macros.njk" import card  %}
{% from "macros.njk" import timeTag %}

{% for f in ph  %}

```
pagination: {{pagination.pageNumber}}/{{pagination.links.length}}
```

{% set orientation =  f.exif | rotate  %}
{% set theName = f.name if f.name != " " else "nope" %}

{{card(f.photopage,
       theName,"<img src='" + f.original + "' width=200 class='" + orientation +"'>",
       "Visual",
       f.date_taken)}}

{% endfor %}

```
{{pagination.links.length}}

{{pagination|pdump|safe}}
```


{{ "•" if pagination.firstPageHref == page.url }} [first]({{pagination.firstPageHref}})
[previous]({{pagination.previousPageHref}})
[next]({{pagination.nextPageHref}})
[last]({{pagination.lastPageHref}}) {{ "•" if pagination.lastPageHref == page.url }}

