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

So I have my dump from FLickr
I think I can use jq to get just the info I need.

philip@ningal: ~/projects/flickr-data/72157706055333385_e56880227933_part1
$ jq '{ url: .photopage, image:  .original }'  photo_9119411418.json
{
  "url": "https://www.flickr.com/photos/twohorses/9119411418/",
  "image": "http://farm6.staticflickr.com/5483/9119411418_7a1c6e9c40_o.jpg"
}

philip@ningal: ~/projects/flickr-data/72157706055333385_e56880227933_part1

