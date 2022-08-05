---
date: 2022-08-05
title:  "How I saved my Nexus 7 from planned obsolescence"
tags: diy nexus custom
layout: post
category: diy
excerpt_separator: <!--more-->
thumbnail: "/assets/2022-08-05-nexus7.jpg"
description: "How I saved my Nexus 7 from planned obsolescence"

---



# Device history

Back in 2014, I bough a Nexus 7 tablet for around 150 euros. It was very affordable, considering what you get for the money. Unlike common tablets in that year, this device had a good reading resolution, multiple point and precise touch capabilites, and it was fast! I remember playing impressive games for the time, though, i mostly used it for reading, browsing, video watching and sometimes organizing tasks and calendar.

<!--more-->

Years pass, and new Android versions cannot be supported for the tablet. I don't mind because I was quite happy with what I had. But unfortunately, app updates did manage to choke the performance of the device. Besides, limited space of 16GB becomes laughable for todays OS and app sizes. The tablet begins to be pain in the ass to use.

I tried uninstalling apps, disabling animations, factory reset, but I could not remove the sluggish experience. It was unthinkable for me to have a great gaming tablet at one point, but in later years to experience the keyboard to be oppened for five seconds after touching any input box, and typing having a few seconds lag per character.

I researched what could be causing the performance problems, and at one point I found an [reddit comment](https://www.reddit.com/r/Nexus7/comments/7p38bt/comment/dso48qa/?utm_source=reddit&utm_medium=web2x&context=3) where some owners explain that it is one of the android or google services is bringing the tablet to unusable state, but also disabling updates for it during first moments of factory reset prevents it to update security features, leaving the tablet vulnerable. For me, it smelled like an early adaptation of [planned obsolescence](https://en.wikipedia.org/wiki/Planned_obsolescence). 

# Solution

The solution I have found by accident is my friend mentioning installing Lineage OS on one of his devices. His intention was to degoogle it for privacy reasons. I was inspired to degoogle the nexus tablet to try to prove the theory that some of the android services implemented by google were causing all the problems.

The steps for installing Lineage OS are well described [here](https://wiki.lineageos.org/devices/flox/install), and I accompanied it with a video presentation from a youtuber Honosuseri ([see video here](https://www.youtube.com/watch?v=7vA_PYULwk0)).

I had plenty of problems that were hard to solve. One was repartitioning. Repartitioning step was stuck on one point, I was waiting for half an hour, and then lost patience so I exited. That caused me to mess up the data from the point that I thought I bricked the device, but returning to native bootloader menu and removing cache enabled me to start from scratch. The setup was stuck again, but I waited a few more minutes before simply continuing with the process hoping averything would workout. And it did!

![Nexus 7 with Lineage OS 18](/assets/2022-08-05-nexus7.jpg)

# Experience

The new installation definitely improved performance for simple apps, the apps build today are much more hungry for resources, which is evident using the webapps which can choke the tablet to unusability. 

Simple native apps were slow as well, but not an anoyance (keyboard was working good enough). I had to disable animations to try to give it some more improvement. I did not think of a way I could effectively use this tablet, other than read, or play retro games. I have to note that reading is not as good once you tried modern devices with perfect screens that adapt lightning and colors to environment light and time of day, but the screen is 7 inches which is one of the comforts of reading in living room conditions. 


# Conclusion

I recently dug out a Nokia C3-00 from one of the boxes of old stuff, and it worked the same as before, even the battery lasts for a week. I really miss having a reliable cheap device, but we are stuck with perpetually buying very expencive devices that last for a short period. I am not happy with the modern experience of mobile devices having a lifespan of a fly.

I used to have a Nexus 4 that I bought used and it lasted a couple of years until I couldn't start it again. Then I bought a brand new Nexus 5 which suddenly died during a vacation, the morning before my flight to Cretes (caused me to pay extra during checking since my online checkin code was on the bricked phone). Most Nexus 5 devices die due to heat melting something on the motherboard. This anoyance caused me to buy an iPhone 6s which lasted for 3 or 4 years until the battery was barely lasting half a day.

I am currently using a Samsung Galaxy S10e that I bought back in 2019 (3 years ago), and battery is excelent but it starts feeling sluggish already. It was a premium device back then. It's either going to brick it self, or it's going to be so sluggish that I would have to install a custom ROM, or just get rid of it.

[Any comments? Write a tweet response here](https://mobile.twitter.com/covekzbrda/status/1555476779833479169?t=XRfyojvaMRMevVXVCQpKOw&s=19)