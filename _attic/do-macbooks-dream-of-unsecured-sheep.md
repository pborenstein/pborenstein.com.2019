---
comments: true
date: 2010-11-07 23:52:33
layout: layouts/post.njk
slug: do-macbooks-dream-of-unsecured-sheep
title: Do MacBooks Dream of Unsecured Sheep?
alttitle: 'Do <span style="color: #c22323">MacBooks</span> Dream of Unsecured Sheep?'
wordpress_id: 539
categories:
- Tech
- tools
---

[![Retrato campeiro](https://farm5.static.flickr.com/4026/4529636027_772ccfcc1c.jpg)](https://www.flickr.com/photos/bombeador/4529636027/)

Late last month, [Eric Butler](https://codebutler.com/), a software developer from Seattle, released a Firefox plugin called [Firesheep](https://codebutler.com/firesheep). The plugin analyzes traffic on a local network segment,  looking for traffic to well known sites. If the traffic includes user information, the plugin displays the user's name and the name of the service. And if the traffic includes a cookie that lets the site know that the user has already been authenticated, double-clicking on the user information lets you log into the user's account on the service.

Firesheep can do this because many sites use encryption only to authenticate users. Once that's done, the site gives your browser a cookie. The next time you need information from the site, it just checks whether your browser has a valid cookie. The problem is that although your username and password might have been encrypted when you logged in, the cookie is transmitted in the clear, without encryption. Firesheep can easily create its own cookie and use it to connect  to the site. The site sees a valid cookie and assumes that authentication has already taken place.

As Butler points out, there is nothing new here. Network savvy people have long known that any information transmitted in the clear on a local network can easily be intercepted. What's different about Firesheep, is that it makes getting the information dead easy without learning how to use [network analysis tools](https://wireshark.com).

The solution is pretty clear. All communication on between a browser and a web site should be encrypted. The companies that manage the web sites that Firesheep looks for, choose to encrypt only the the login portion of the user's communication. They could choose to encrypt the entire  transaction. This is what Google mail  does, and it better be what your bank is doing.

So now that you're worried about all your data floating around in the clear, what do you do?

First, don't worry so much.  Second, worry a little bit.

The wireless network in your house is probably OK as long as you have secured it with some sort of encryption like WPA. Someone would have to actually be on the network to sniff traffic on it. Keep your network password-protected, and let only trusted people use it.

What if you like to take advantage of the open WiFi access in cafes, libraries, hotels, and so on? In those places, you can take some basic precautions. Eric Butler offers some good ideas in his [day-after followup](https://codebutler.com/firesheep-a-day-later). The entire post is well worth reading.

My solution was to use a SSH tunnel. As Butler notes, this just moves the issue from one network to another. That's OK  with me because I'm tunneling from a known insecure network, to a network I'm reasonably secure in: my house.

My Macintosh at home is set up to allow remote logins over SSH. When I'm working at the library or some other place where the WiFi is insecure, I create a tunnel from my laptop using SSH's dynamic port forwarding. In a Terminal window I type this:

`ssh -fCqND 8998 user@123.234.56.78`

The fCqN flags tell SSH to run in the background, compress the data, run quietly, and not execute any commands after connecting. The D flag tells SSH use port 8998 for the tunnel. 123.234.56.78 is the IP address of my Mac at home, and "user" is my login name on that machine. (It isn't really, and there isn't a key under my doormat, either.) Although I'm using my home machine as my tunnel endpoint, you can use any machine on a trusted network as the tunnel endpoint as long as it's running OpenSSH and can get to the internet.

This means that all traffic that my laptop sends to port 8998 is redirected to my home machine, which is acting as a [proxy server](https://en.wikipedia.org/wiki/Proxy_server).

Now I just need to tell my laptop to send all network traffic to port 8998 instead of its usual port. To do this, I open the Network panel in System Preferences and click Advanced, and do the following:





  * Choose SOCKS Proxy


  * Enter _localhost : 8998_ as my proxy server (that's the tunnel to my Mac at home)


  * Click **OK**


  * Click **Apply**



![](/IMAGE/socksproxy-500x390.png)

The thing to keep in mind about this is that the connection is encrypted only from one end of the tunnel to the other. It does not magically add encryption all the way to the web site that might be leaking cookies. All I'm doing is moving the vulnerability from a network I know I don't trust to one that I do trust.

