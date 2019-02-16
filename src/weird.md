---
date: 2018-01-01
layout: page.njk
title: Stylesheet
templateEngineOverride: njk,md
---

# Heading 1

Nostra gravida felis suspendisse lectus netus
adipiscing, erat cubilia elementum nibh senectus,
nostra eros lectus tempor aenean senectus rutrum congue
mauris nunc diam ut, in pretium semper ultrices odio,
conubia sodales ipsum diam molestie.


<table>
<thead>
<tr>
<th style="text-align:left">state</th>
<th style="text-align:left">capital</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">texas</td>
<td style="text-align:left">austin</td>
</tr>
<tr>
<td style="text-align:left">california</td>
<td style="text-align:left">sacramento</td>
</tr>
<tr>
<td style="text-align:left">massachusetts</td>
<td style="text-align:left">boston</td>
</tr>
</tbody>
<caption id="divclasstablecaptioncitiesdiv"><div class="table-caption">cities</div></caption>
</table>

```
<table>
	<thead>
		<tr>
			<th style="text-align:left">state</th>
			<th style="text-align:left">capital</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="text-align:left">texas</td>
			<td style="text-align:left">austin</td>
		</tr>
		<tr>
			<td style="text-align:left">california</td>
			<td style="text-align:left">sacramento</td>
		</tr>
		<tr>
			<td style="text-align:left">massachusetts</td>
			<td style="text-align:left">boston</td>
		</tr>
	</tbody>
	<caption id="divclasstablecaptioncitiesdiv">
	<div class="table-caption">
		cities
	</div>
	</caption>
</table>
```

State
  Texas

Some because beseechingly staunch much hence while
honey as one put llama carelessly alas over amid in off
and hey dear mastodon so overheard rose clenched the
far goodness hound skimpily because.

| state | capital |
| :--- | :--- |
| texas | austin |
| california | sacramento |
| massachusetts | boston |
[<div class="table-caption">cities</div>]

But this

<style>
div[class="hack"]   {
  font-family: "Georgia";
}

div[class="hack"] > ul {
  display: inherit;
}

div[class="hack"] > ul > li > ul {
  font-family: "Helvetica"
  display: block !important;
}

</style>

<div class="hack" markdown="1">

- - State
  - Capital
  - Size
- - Texas
  - Austin
  - Medium
- - California
  - Sacramento
  - Medium
- - Illinois
  - Springfield
  - Medium

</div>

https://developer.mozilla.org/en-US/docs/Web/CSS/display

```
<div class="hack" markdown="1">
	<ul>
		<li>
		<ul>
			<li>State</li>
			<li>Capital</li>
			<li>Size</li>
		</ul>
		</li>
		<li>
		<ul>
			<li>Texas</li>
			<li>Austin</li>
			<li>Medium</li>
		</ul>
		</li>
		<li>
		<ul>
			<li>California</li>
			<li>Sacramento</li>
			<li>Medium</li>
		</ul>
		</li>
		<li>
		<ul>
			<li>Illinois</li>
			<li>Springfield</li>
			<li>Medium</li>
		</ul>
		</li>
	</ul>
</div>
```

This is how RST does it:

```
.. list-table:: Title
   :widths: 25 25 50
   :header-rows: 1

   * - Heading row 1, column 1
     - Heading row 1, column 2
     - Heading row 1, column 3
   * - Row 1, column 1
     -
     - Row 1, column 3
   * - Row 2, column 1
     - Row 2, column 2
     - Row 2, column 3
```
the html

```
<table border="0" class="colwidths-given table" id="id1">
	<caption><span class="caption-text">Title</span><a class="headerlink" href="#id1" title="Permalink to this table">¶</a></caption>
	<colgroup> <col width="25%"> <col width="25%"> <col width="50%"> </colgroup>
	<thead valign="bottom">
		<tr class="row-odd">
			<th class="head">Heading row 1, column 1</th>
			<th class="head">Heading row 1, column 2</th>
			<th class="head">Heading row 1, column 3</th>
		</tr>
	</thead>
	<tbody valign="top">
		<tr class="row-even">
			<td>Row 1, column 1</td>
			<td>&nbsp;</td>
			<td>Row 1, column 3</td>
		</tr>
		<tr class="row-odd">
			<td>Row 2, column 1</td>
			<td>Row 2, column 2</td>
			<td>Row 2, column 3</td>
		</tr>
	</tbody>
</table>
```

Result:

<table border="0" class="colwidths-given table" id="id1">
	<caption><span class="caption-text">Title</span><a class="headerlink" href="#id1" title="Permalink to this table">¶</a></caption>
	<colgroup> <col width="25%"> <col width="25%"> <col width="50%"> </colgroup>
	<thead valign="bottom">
		<tr class="row-odd">
			<th class="head">Heading row 1, column 1</th>
			<th class="head">Heading row 1, column 2</th>
			<th class="head">Heading row 1, column 3</th>
		</tr>
	</thead>
	<tbody valign="top">
		<tr class="row-even">
			<td>Row 1, column 1</td>
			<td>&nbsp;</td>
			<td>Row 1, column 3</td>
		</tr>
		<tr class="row-odd">
			<td>Row 2, column 1</td>
			<td>Row 2, column 2</td>
			<td>Row 2, column 3</td>
		</tr>
	</tbody>
</table>

So us:

- Heading one
  - Heading 1
  - Heading 2
  - Heading 3

What about this
-
  - Heading 1
  - Heading 2
  - Heading 3
- c
  - line 1
  - line 2
  - line 3



### Heading 3

Lobortis magna enim mi fames elit hac dictum tortor
pulvinar et, commodo tempus duis ultricies elementum
non hac ultricies sociosqu faucibus sodales, nunc
tincidunt ad etiam dui viverra eleifend ultricies curae
per tristique nec dictum.


| Property          | Description                                                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputPath`       | Path to this file including the `input` directory.<hr><code class="phony">./src/articles/finding-oz.md</code>                                                               |
| `outputPath`      | Path to the rendered file.<hr><code class="phony">articles/finding-oz/index.html</code>                                                                                     |
| `fileSlug`        | Short name from the file name. [There are rules](https://www.11ty.io/docs/data/#fileslug). <hr><code class="phony">./src/articles/finding-oz.md</code>                      |
[<div class="table-caption">collection item properties</div>]


