---
layout: page.njk
templateEngineOverride: njk,md
pagination:
  data: flickr
  size: 6
  alias: ph
photos:
  - title: Dandelion Junk Queens
    loc: https://farm5.static.flickr.com/4082/4914583899_f75365741d_s.jpg
  - title: Garage
    loc: https://farm6.staticflickr.com/5696/29915594713_9a244a6b6a_s.jpg
  - title: Dress
    loc: https://farm6.staticflickr.com/5215/5393430759_fa384b52bd_s.jpg
  - title: Robosapien
    loc: https://farm1.staticflickr.com/2/1395256_ee5e5ff215_s.jpg

---

{{ "•" if pagination.firstPageHref == page.url }} [first]({{pagination.firstPageHref}})
[previous]({{pagination.previousPageHref}})
[next]({{pagination.nextPageHref}})
[last]({{pagination.lastPageHref}}) {{ "•" if pagination.lastPageHref == page.url }}



{% for f in ph  %}
### {{f.name}}

<a href="{{f.photopage}}">
  <img class="{{ f.exif | rotate }}" src="{{f.original}}" width=200>
</a>

{% endfor %}

