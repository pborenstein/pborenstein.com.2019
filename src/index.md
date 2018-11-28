---
date: 2018-01-01
layout: page.njk
tags:
  - nav
navtitle: Home
templateEngineOverride: njk
---

<h3 id="im-philip-borenstein">I’m Philip Borenstein</h3>
<p>This is a random picture from <a href="https://picsum.photos/">Lorem Picsum</a>.</p>
<p><img src="https://picsum.photos/512/128?gravity=center&amp;random" /></p>
<p>I’m redoing this site in <a href="https://www.11ty.io/">Eleventy</a>.</p>
<p>Read all <a href="/tags/eleventy/">about that</a>.</p>


{% from "macros.njk" import articlesList  %}
{{ articlesList(collections.articles | head(-3)) }}
