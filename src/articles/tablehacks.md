---
title: Turning Lists into Tables for Markdown
subhead: "Can we make it easier to make tables in Markdown?"
date: 2019-02-15T20:28:40-05:00
category: Tech
tags:
  - markdown
  - tables
  - css
---

I think that tables are the best way
to present a lot of structured information.
Unfortunately, they're so damn hard to do in Markdown,
that I don't use them as much as I'd like.^[
Not because they're tedious to get right,
but because maintaining them is error prone.]
There really has to be an easier way to do tables.

**tl;dr**
- use the `display` property to make list elements behave like table elements
- the [CSS you're looking for](#styling-a-list-as-a-table)
- a [codepen](https://codepen.io/pborenstein/pen/QYxWNR) if you just want to see the code


## How Markdown Does Tables

Original Markdown didn't have tables.
If you wanted tables, you just used HTML.
That's fine for
[ocassional tables](https://www.google.com/search?tbm=isch&q=occasional+tables)
but not when you're doing a lot of them.^[
There are external tools that help, but
I want to deal with straight Markdown as much as possible.
]

Most modern Markdown processors
follow GitHub Flavored Markdown's (GFM)
implementation of tables.
So this:

``` markdown
| State         | Capital |
| :------------ | :------ |
| New York      | Albany  |
| Nebraska      | Lincoln |
| New Hampshire | Concord |
```

…is rendered like this:

| State         | Capital |
| :------------ | :------ |
| New York      | Albany  |
| Nebraska      | Lincoln |
| New Hampshire | Concord |

Not too bad. And there are some
nice tools, like
Brett Terpstra's
[Markdown Service Tools](http://brettterpstra.com/projects/markdown-service-tools/),
that help you format them.

But what if you want a table with
complicated cells:

| State         | Capital & Top Cities                                                                                                      |
| :------------ | :------------------------------------------------------------------------------------------------------------------------ |
| New York      | Albany<ul><li>New York City<br>A lot of people think that this is the capital</li><li>Buffalo</li><li>Rochester</li></ul> |
| Nebraska      | Lincoln<ul><li>Omaha</li><li>Lincoln</li><li>Bellevue</li></ul>                                                           |
| New Hampshire | Concord<ul><li>Manchester</li><li>Nashua</li><li>Concord</li></ul>                                                        |


<br><a id="complex-table">

In GFM, table cells can be only one line,
so you can't use multiline Markdown inside them.
You *can* use raw HTML written all on one line,
like this, but that's tedious to write
and impossible to maintain.

``` markdown
| State         | Capital & Top Cities                                                                                                      |
| :------------ | :------------------------------------------------------------------------------------------------------------------------ |
| New York      | Albany<ul><li>New York City<br>A lot of people think that this is the capital</li><li>Buffalo</li><li>Rochester</li></ul> |
| Nebraska      | Lincoln<ul><li>Omaha</li><li>Lincoln</li><li>Bellevue</li></ul>                                                           |
| New Hampshire | Concord<ul><li>Manchester</li><li>Nashua</li><li>Concord</li></ul>                                                        |
```

GFM tables are great, as long as you can fit everything
on one line. Is there a way around this
that doesn't involve introducing
new Markdown elements or using
a preprocessor?


## How reStructuredText Does It

In [reStructuredText](http://docutils.sourceforge.net/rst.html) (RST)
you can use the [`list-table`](http://docutils.sourceforge.net/docs/ref/rst/directives.html#list-table)
directive to express a table as a list:


``` text
.. list-table:: Title
   :widths: 25 25 50
   :header-rows: 1

   - - Heading row 1, column 1
     - Heading row 1, column 2
     - Heading row 1, column 3
   - - Row 1, column 1
     -
     - Row 1, column 3
   - - Row 2, column 1
     - Row 2, column 2
     - Row 2, column 3
```

This gets rendered as a table:

<table border="0" class~="colwidths-given table" id="id1">
	<caption><span class~="caption-text">Title</span><a class~="headerlink" href="#id1" title="Permalink to this table">¶</a></caption>
	<colgroup> <col width="25%"> <col width="25%"> <col width="50%"> </colgroup>
	<thead valign="bottom">
		<tr class~="row-odd">
			<th class~="head">Heading row 1, column 1</th>
			<th class~="head">Heading row 1, column 2</th>
			<th class~="head">Heading row 1, column 3</th>
		</tr>
	</thead>
	<tbody valign="top">
		<tr class~="row-even">
			<td>Row 1, column 1</td>
			<td>&nbsp;</td>
			<td>Row 1, column 3</td>
		</tr>
		<tr class~="row-odd">
			<td>Row 2, column 1</td>
			<td>Row 2, column 2</td>
			<td>Row 2, column 3</td>
		</tr>
	</tbody>
</table>

<br>

<details>
<summary>
We're not going to talk about it,
but if you're curious,
here's what
the HTML rendered by reStructuredText looks like.
</summary>


``` html
<table border="0" class~="colwidths-given table" id="id1">
	<caption><span class~="caption-text">Title</span><a class~="headerlink" href="#id1" title="Permalink to this table">¶</a></caption>
	<colgroup> <col width="25%"> <col width="25%"> <col width="50%"> </colgroup>
	<thead valign="bottom">
		<tr class~="row-odd">
			<th class~="head">Heading row 1, column 1</th>
			<th class~="head">Heading row 1, column 2</th>
			<th class~="head">Heading row 1, column 3</th>
		</tr>
	</thead>
	<tbody valign="top">
		<tr class~="row-even">
			<td>Row 1, column 1</td>
			<td>&nbsp;</td>
			<td>Row 1, column 3</td>
		</tr>
		<tr class~="row-odd">
			<td>Row 2, column 1</td>
			<td>Row 2, column 2</td>
			<td>Row 2, column 3</td>
		</tr>
	</tbody>
</table>
```
</details>



## Can We Do That in Markdown?

Can we borrow this list-to-table
technique from reStructuredText
and use it in Markdown?
I think so.

We want to start with a list like this:

``` markdown
<div class="t" markdown="1">

- - **Property**
  - **Description**
- - `inputPath`
  - Path to this file including the `input` directory.
- - `outputPath`
  - Path to the rendered file.
    `articles/finding-oz/index.html`
- - `fileSlug`
  - Short name from the file name.
    [There are rules](https://www.11ty.io/docs/data/#fileslug).

</div>
```

That `div class="t"` is how we let Markdown
know which lists get rendered as lists
and which ones get rendered as tables.
^[Different Markdown
processors have different rules about embedding
Markdown inside HTML. Many use the property
`markdown="1"` to allow it. The one
I'm using, `markdown-it`, follows the
[CommonMark](https://commonmark.org/)
spec which requires that
the `<div>` and `</div>` be
[followed by a blank line](https://spec.commonmark.org/0.28/#html-blocks).
]


Using our regular CSS stylesheet,
the list above renders like
a normal list.
<br><br>

<div class="dummy graybox" markdown="1">

- - **Property**
  - **Description**
- - `inputPath`
  - Path to this file including the `input` directory.
- - `outputPath`
  - Path to the rendered file.
    `articles/finding-oz/index.html`
- - `fileSlug`
  - Short name from the file name.
    [There are rules](https://www.11ty.io/docs/data/#fileslug).

</div>


Let's look at the HTML of that
so we can
see what CSS we need to write.
I formatted the `li` and `ul`
elements to show how they
can be arranged and a table-like way.

``` html
<div class="t" markdown="1"><ul>
 <li><ul>
  <li><strong>Property</strong></li>
  <li><strong>Description</strong></li>
 </ul></li>
 <li><ul>
  <li><code>inputPath</code></li>
  <li>Path to this file including the <code>input</code> directory.</li>
 </ul></li>
 <li><ul>
  <li><code>outputPath</code></li>
  <li>Path to the rendered file. <code>articles/finding-oz/index.html</code></li>
 </ul></li>
 <li><ul>
  <li><code>fileSlug</code></li>
  <li>Short name from the file name. <a href="https://www.11ty.io/docs/data/#fileslug">There are rules</a>.</li>
 </ul></li>
</ul></div>
```

## Mapping Table Elements to List Elements

We can now map the table elements
to list elements like this:^[Dogfooding!]
<br>


<div class="t">

- - **Table Elements**
  - **List Elements**
- - `table`
  - `<div><ul>`
- - `tr`
  - `<div><ul><li><ul>`
- - `td`
  - `<div><ul><li><ul><li>`

</div>

At some point in getting this to work,
I came across
[this piece of CSS](https://www.w3.org/TR/CSS21/tables.html#value-def-table-row-group)
that gives the
[`display` property](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
of each of the table-related elements.


``` css
table    { display: table }
tr       { display: table-row }
thead    { display: table-header-group }
tbody    { display: table-row-group }
tfoot    { display: table-footer-group }
col      { display: table-column }
colgroup { display: table-column-group }
td, th   { display: table-cell }
caption  { display: table-caption }
```

Given our table/list mapping
and armed with the knowledge of
how our HTML is rendered, we
can use this CSS to make the list elements
behave like tables. Probably.


``` css
div[class~="t"] > ul {
  display: table
  list-style: none;
}

div[class~="t"] > ul > li > ul {
  display: table-row
}

div[class~="q"] > ul > li > ul > li {
  display: table-cell
}
```

<style>
div[class~="q"] > ul {
  display: table
  list-style: none;
}

div[class~="q"] > ul > li > ul {
  display: table-row
}

div[class~="q"] > ul > li > ul > li {
  display: table-cell
}
</style>

Here's what that looks like.
It _kind of_ works, but the spacing is way off,
to say nothing of the bullet points.
<br><br>

<div class="q graybox" markdown="1">

- - **Property**
  - **Description**
- - `inputPath`
  - Path to this file including the `input` directory.
- - `outputPath`
  - Path to the rendered file.
    `articles/finding-oz/index.html`
- - `fileSlug`
  - Short name from the file name.
    [There are rules](https://www.11ty.io/docs/data/#fileslug).

</div>

## Styling a List as a Table


When I hit the wall in CSS,
I just start pulling levers and pushing buttons.
I played with
[this codepen,](https://codepen.io/pborenstein/pen/QYxWNR)
and eventually came to this CSS.
I don't know _why_ it works.
If you do know, please send me a note.

``` css
div[class~="t"] > ul {
  display: table;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}

div[class~="t"] > ul > li {
    display: table-row-group;
}

div[class~="t"]  > ul > li:nth-child(even) {
    background-color: #eee;
}

div[class~="t"]  > ul > li:nth-child(odd) {
    background-color: #fff;
}

div[class~="t"] > ul > li > ul {
    display: table-row;
}

div[class~="t"] > ul > li > ul > li {
  display: table-cell;
  padding: 0 .25em;
}
```


<style>

div[class~="t"] > ul {
  display: table;
  list-style: none;
  width: 100%;
  margin: 1em 0;
  padding: 0;
}

div[class~="t"] > ul > li {
    display: table-row-group;
}

div[class~="t"]  > ul > li:nth-child(even) {
    background-color: var(--lightgray);
}
div[class~="t"]  > ul > li:nth-child(odd) {
    background-color: #fff;
}

div[class~="t"] > ul > li > ul {
    display: table-row;
}

div[class~="t"] > ul > li > ul > li {
  display: table-cell;
  padding: 0 .25em;
}

</style>

<br>

This is what the result looks like.
Not too bad.

<div class="t">

- - **Property**
  - **Description**
- - `inputPath`
  - Path to this file including the `input` directory.
- - `outputPath`
  - Path to the rendered file.
    `articles/finding-oz/index.html`
- - `fileSlug`
  - Short name from the file name.
    [There are rules](https://www.11ty.io/docs/data/#fileslug).

</div>

## OMG It Works

Remember our [complex table](#complex-table)?
We should be able to express the table as a list,
and get a table.
This is the Markdown:

``` markdown
<div class="t" markdown="1">

- - **State**
  - **Capital & Top Cities**
- - New York
  - Albany
    - New York City<br>
      A lot of people think that this is the capital
    - Buffalo
    - Rochester
- - Nebraska
  - Lincoln
    - Omaha
    - Lincoln
    - Bellevue
- - New Hampshire
  - Concord
    - Manchester
    - Nashua
    - Concord

</div>

```

And this is the result. Pretty good.

<div class="t" markdown="1">

- - **State**
  - **Capital & Top Cities**
- - New York
  - Albany
    - New York City<br>
      A lot of people think that this is the capital
    - Buffalo
    - Rochester
- - Nebraska
  - Lincoln
    - Omaha
    - Lincoln
    - Bellevue
- - New Hampshire
  - Concord
    - Manchester
    - Nashua
    - Concord

</div>



## Nested Tables?

Although we didn't design the tables
to be nested, it's totally possible
to do it:


<div class="t" markdown="1">

- - **State**
  - **Capital & Top Cities**
- - New York
  - Albany

    <div class="t" markdown="1">

    - - **City**
      - ***Pop***
    - - New York City<br>
        A lot of people think that this is the capital
      - 8.6 million
    - - Buffalo
      - 250,000
    - - Rochester
      - 210,000

    </div>

- - Nebraska
  - Lincoln

    <div class="t" markdown="1">

    - - **City**
      - **Pop**
    - - Omaha
      - 408,958
    - - Lincoln
      - 258,370
    - - Bellevue
      - 50,137

    </div>

- - New Hampshire
  - Concord

    <div class="t" markdown="1">

    - - **City**
      - *Pop*
    - - Manchester
      - 110,000
    - - Nashua
      - 88,000
    - - Concord
      - 43,000

    </div>

</div>

<details>
<summary>
The Markdown for that is a little messy,
but still editable and legible.
</summary>

``` markdown
<div class="t" markdown="1">

- - **State**
  - **Capital & Top Cities**
- - New York
  - Albany

    <div class="t" markdown="1">

    - - **City**
      - ***Pop***
    - - New York City<br>
        A lot of people think that this is the capital
      - 8.6 million
    - - Buffalo
      - 250,000
    - - Rochester
      - 210,000

    </div>

- - Nebraska
  - Lincoln

    <div class="t" markdown="1">

    - - **City**
      - **Pop**
    - - Omaha
      - 408,958
    - - Lincoln
      - 258,370
    - - Bellevue
      - 50,137

    </div>

- - New Hampshire
  - Concord
    <div class="t" markdown="1">

    - - **City**
      - **Pop**
    - - Manchester
      - 110,000
    - - Nashua
      - 88,000
    - - Concord
      - 43,000

    </div>

</div>

```

</details>


## What Now?

It works^[on my machine] well enough
for my purposes, but there's still more to do:

- Captions
- More/better CSS
- Compatibility

Most Markdown processors can handle
lists that don't really have a first
element:

``` markdown
- - `inputPath`
  - Path to this file including the `input` directory.
- - `outputPath`
  - Path to the rendered file.
    `articles/finding-oz/index.html`
```

Some have different ways of allowing
Markdown within HTML, and some processors
don't allow it at all.

Most processors render the HTML
for lists in similar ways.
There may be variations for formatting and
whitespace, but as long as the HTML is structurally
the same, this technique should work.

If you want to take on compatibility,
Babelmark 3 is a good place to start.
This [clip will show you](https://babelmark.github.io/?text=%3Cdiv+class%3D%22t%22+markdown%3D%221%22%3E%0A%0A-+-+**State**%0A++-+**Capital+%26+Top+Cities**%0A-+-+New+York%0A++-+Albany%0A++++-+New+York+City%3Cbr%3E%0A++++++A+lot+of+people+think+that+this+is+the+capital%0A++++-+Buffalo%0A++++-+Rochester%0A-+-+Nebraska%0A++-+Lincoln%0A++++-+Omaha%0A++++-+Lincoln%0A++++-+Bellevue%0A-+-+New+Hampshire%0A++-+Concord%0A++++-+Manchester%0A++++-+Nashua%0A++++-+Concord%0A%0A%3C%2Fdiv%3E%0A)
which processors
don't like Markdown in their HTML
and which don't like the way I make the lists.

