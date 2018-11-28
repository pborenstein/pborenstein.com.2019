---
date: 2018-01-10
layout: layouts/home.njk
title: Portfolio
---

# {{ title }}

Here are some examples of the things I've worked on.
If you're looking for my resume, you can find it [here][resume]

<!-- https://web.archive.org/web/20110429000741/https://pborenstein.com/./ -->


## Joyent Documentation

I worked on a lot of things at Joyent:

* Joyent Public Cloud
* CloudAPI Documentation
* Manta Documentation
* SmartDataCenter Documentation

### Joyent Public Cloud Documentation

JPC is Joyent's public cloud service.
After setting up an account,
customers can spin up virtual machines,
and manage their Manta storage.

The [Role Based Access Control][rbac] section
is typical of my work in this section.

This section was complicated
because
it applies to the Joyent Public Cloud
and the the Manta storage product.
It has both a command-line interface
and a web interface
available through the Joyent portal

### CloudAPI Documentation

The [CloudAPI][cloudapi] documentation
describes the public API
that customers can use to
provision and manage virtual machines.
The API is available
as a REST API,
a command-line interface,
and a node.js SDK.


I wrote most of the Getting Started section
which walked customers through installation
and basic usage.
The initial API documentation was
scaffolded by the developers.
I edited each entry,
made sure that all the result codes were listed,
and verified the examples.




### Manta Documentation

Manta is Joyent's object storage product.
Its unique feature is
that customers can run jobs on the stored
data without spinning up instances and transferring data.

The [Manta documentation][manta]'s
Getting Started section includes
an overview of the service,
a guided introduction to working with data,
and an introduction to running compute jobs on the data.
I wrote most of this section.

The rest of the Manta documentation
is made up of
references pages
for various parts of the system.
I wrote the reference sections based
on notes from the developers.
The basic API documentation
was scaffolded by the developers.
I edited the API documentation
and verified the examples.

Finally, I wrote the tools
that collected the different kinds
of documentation
(prose, API references, man pages, etc.)
and produced the unified documentation page.


### SmartDataCenter Documentation

SmartDataCenter is the software that runs
the Joyent Public Cloud.
Since mid-2015
it has been rebranded
as Triton Elastic Container.

SmartDataCenter 6.5 was the version used until
early 2014. I wrote most of the
[SmartDataCenter 6.5][sdc6] documentation.
This documentation set
was originally hosted as Confluence wiki.
It has since been migrated
to [Kirby][kirby],
so some odd formatting artifacts may appear.


The [SmartDataCenter 7][sdc7] documentation
started as a clone of the SmartDataCenter 6.5 documentation
on an internal Confluence wiki.
This documentation was updated
by developers and customer support
to describe the new version.
I wrote tools to convert these topics to
Markdown for the [Kirby][kirby] CMS.


### Tools and Extras

In the course of my work
I provisioned and destroyed
bunches of instances,
so I wrote
a set of bash scripts,
[sdctools][sdctools]
to make this easier.

I needed to convert
a bunch of Confluence wiki pages
to Markdown,
and I wanted to play with node.js,
so I wrote [confluence2markdown][c2m]
to do this.





## HP EAsE Administrator Guide

HP Email Archiving software for Exchange (HP EAsE)
"is a combination of hardware and software that archives
mail from [an] Exchange server to external storage."
I updated the [administrator guide][easeadmin]
to reflect changes in the software, including a
completely new user interface and support for SMTP journaling.
This guide is intended for moderately technical users,
typically IT support staff and MS Exchange administrators.

As part of this project, I also updated the
[installation guide][easeinstall]
(for internal HP use), and the Users Guide.

## VisionPro

VisionPro is Cognex's general purpose vision software product.
It provides both an interactive development environment as well as
a rich .NET-based vision library.
Here are the sections I worked on and some of the pages I wrote.

### VisionPro Programming Reference

The Programming Reference is the
API reference to the hundreds of classes
and methods VisionPro class library.
The documentation for
[ICogAcqFifo.CompleteAcquire Method][acquire]
is a good example of what the pages in this
section looked like. I wrote the bulk of the
Programming Reference section.

### VisionPro Application Development Guide

The
Application Development Guide section
led customers through the steps needed to create a
vision application using VisionPro's interactive
development tools. [Creating a Vision Application][appdev]
takes a new user from opening launching VisionPro
to generating a complete vision application.
I wrote most of the Application Development section.


### VisionPro Users Guide

The Users Guide
section helped customers learn how
to combine the VisionPro components
to build vision applications.
This section included practical
advice on selecting the best parameters
for various vision tools as well as
instruction on how to make use of the
VisionPro framework. I wrote most of
the programming-related topics such
[About Events in VisionPro][events],
which describes generally the events
that VisionPro raises and responds to,
and
[Using Changed Events][codewalk],
which is a walkthrough that illustrates
how to write the code to handle events.

### GigE Vision Cameras User's Guide

The [GigE Vision Cameras User's Guide (pdf)][gige]
is one of the few printed pieces of documentation
included with VisionPro.
It describes how to configure the drivers
used to support Gigabit Ethernet cameras.


## CVL

CVL (Cognex Vision Library) is a very large C++ library. This
manual was designed to be printed, but exists now as a PDF file.
The entire document is quite large (over 3000 pages and nearly
17MB), but this short section that describes the
[ccAcqFifo][acqfifo] class is
representative.
I designed the page
layout for this manual.



[acqfifo]: ./AcqFifo.pdf
[acquire]: ./Cognex.VisionPro.ICogAcqFifo.CompleteAcquire.html
[appdev]: ./story01.html
[c2m]: https://github.com/pborenstein/confluence2markdown
[cloudapi]: https://apidocs.joyent.com/cloudapi/
[codewalk]: ./Programming.Events.CodeWalkthrough.UseChangeEvents.html
[easeadmin]: ./HPEAsEAdmin22.pdf
[easeinstall]: ./EASE22_install.pdf
[events]: ./Programming.Events.Theory.Events.html
[gige]: ./GigEGuide.pdf
[kirby]: https://getkirby.com
[manta-jobs]: https://apidocs.joyent.com/manta/#running-compute-on-data
[manta-storage]: https://apidocs.joyent.com/manta/#create-data
[manta]: https://apidocs.joyent.com/manta/
[rbac]: /rbac
[resume]: /about
[sdc6]: https://docs.joyent.com/sdc6
[sdc7]: https://docs.joyent.com/sdc7
[sdctools]: https://github.com/pborenstein/sdctools






