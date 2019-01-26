---
layout: page.njk
templateEngineOverride: njk,md
pagination:
  data: photos
  size: 1
  alias: huh
photos:
  - title: Dandelion Junk Queens
    loc: https://farm5.static.flickr.com/4082/4914583899_f75365741d_s.jpg
  - title: Garage
    loc: https://farm6.staticflickr.com/5696/29915594713_9a244a6b6a_s.jpg
  - title: Dress
    loc: https://farm6.staticflickr.com/5215/5393430759_fa384b52bd_s.jpg
  - title: Robosapien
    loc: http://farm1.staticflickr.com/2/1395256_ee5e5ff215_s.jpg

---

```
{{huh|pdump|safe}}
```

### {{huh.title}}
It's in: {{huh.loc}}

do: {{ 1==1}}

{{ "_wtf_" if 0 == 1 }}

- [first]({{pagination.firstPageHref}}) {{ "_we are here_" if pagination.firstPageHref == page.url }}
- [previous]({{pagination.previousPageHref}})
- [next]({{pagination.nextPageHref}})
- [last]({{pagination.lastPageHref}}) {{ "_we are here_" if pagination.lastPageHref == page.url }}


![{{huh.title}}]({{huh.loc}})

dump

```
{{page|pdump|safe}}
```

```
{{pagination|pdump|safe}}
```
