Pictures

A new page type for displaying flickr pictures

``` liquid
{%- raw -%}
---
title: Dandelion Junk Queens
flickr:https://farm5.static.flickr.com/4082/4914583899_f75365741d.jpg
---
. . .
{% endraw %}
```
So a page for each picture.

Or

``` liquid
{%- raw -%}
---
title: Dandelion Junk Queens
flickr:https://farm5.static.flickr.com/4082/4914583899_f75365741d.jpg
pagination:
  data: pictures
  size: 1
pictures:
  - Dandelion Junk Queens, https://farm5.static.flickr.com/4082/4914583899_f75365741d.jpg
  - Something, url

layout: page.njk
permalink: /tags/{{ tag }}/


---
. . .
{% endraw %}
```

I don't think this is even yaml
