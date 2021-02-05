---
date: 2021-02-05
tags: programming architecture
category: microblog
excerpt_separator: <!--more-->
---

Two simple rules in dealing with parent/child components interface:
1. Parent component should be aware of behaivour and characteristics of its children and can control them.
2. Child component should not be aware of their parents, but should comunicate with outside world via throwing events and should  yield control to their parent (expose control points or interface)

<!--more-->
