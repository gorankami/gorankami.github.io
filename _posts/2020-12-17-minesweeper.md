---
layout: post
title:  "Building a minesweeper clone"
date:   2020-12-17
categories: javascript
---

![Minesweeper thumbnail](/assets/screenshot.jpg)

You can find the code here: [https://github.com/gorankami/minesweeper](https://github.com/gorankami/minesweeper)

About 4 or 5 years ago, I was applying for a front end job based in San Francisco. I received a task for technical assessment - build a minesweeper clone!  
I was happy for the task because it was the most fun I had doing something for someone else and not getting paid for it. It was an opportunity for me to play with 
the idea of building a SPA with components without using a framework or a library (though, later on, realized the pains of vanilla).

I started off with creating files that presented components, and each component was a function that can be instantiated into a class object. 
This was the time when `es6` was coming but not really there - so I didn't want to pull the code through a preprocessor, I WANTED as vanilla as possible, 
and the reason was not to make simple apps with complex methods. I came to some conclusions what vanilla `javascript`, as it was interpreted by browsers, 
was missing that most of the libraries and frameworks always offer.

As I started doing vanilla, I started recognizing parts that were irritating for implementation, either because of boilerplate or because I was used to many things 
that web tools provide to make web development easier. Very early I decided to add a build tool (choice was `webpack`) so I can offload the dependency management to the 
tool. After the fact, a great benefit emerged - I can write unit tests easily now. So vanilla would be great if it had added taste of support for modules in the 
browser https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules. 

I also felt that dealing with the DOM just using `document.getElementById()` or `document.getElementsByName()` and working with their events had to be simplified somehow. 
Decision was made, and I was not surprised the tool of choice of dealing with this was `jQuery`! I never hated `jQuery`, but the community did and I didn't think it was 
reasonable to think so. When `es6` arrived, much of `jQuery` was not needed anymore, but working with it on this projects was enjoyable so I just went with it. It made no 
sense to inject `Angular` or `React` for such a small task.

Minesweeper, for the sake of interactivity, had two components - a cell and a table of cells. Everything else was styled html, with exception of three buttons for 
starting a new game: easy, medium and hard. The component constructor initialized the data. Example: table constuctor:

{% highlight jsx %}
function Table() {
	this.tableElement = null;
}
{% endhighlight %}

In the same file, there would be `init(size)` to set up the table cells, then there's `getElement($)` singleton for creating a DOM element for the table and it's children:

{% highlight jsx %}
Table.prototype.getElement = function ($) {
  if (!this.tableElement) {
    this.tableElement = $('<table></table>');
  }
  return this.tableElement;
};
{% endhighlight %}

 and `render($)` for updating the DOM after an update:

{% highlight jsx %}
Table.prototype.render = function ($) {
  var tableElement = this.getElement($);
  tableElement.empty();

  for (var i = 0; i < settingsService.size; i++) {
    var rowElement = $('<tr></tr>');
    for (var j = 0; j < settingsService.size; j++) {
      var cell = this.getCells()[i*settingsService.size + j];
      var td = $('<td></td>');
      td.append(cell.getElement($));
      cell.render($);
      rowElement.append(td);
    }
    tableElement.append(rowElement);
  }
  return tableElement;
};
{% endhighlight %}

Notice that two of those methods receive `$` as an argument. I avoided global references for future-proofing the source code - in context of the time I was making this, global variables were a no-go, and future felt like everything will be in modules and will be in functional programming paradigm. 

The reason React uses virtual DOM is because DOM updates are very expensive in terms of processing, 
but I don't think it's warranted in this simple scenario. In hindsight, the `render` method could have been improved by pre-tagging the cells that should be updated instead of updating the whole table and I do notice a lag on the large "hard" level, but I could not be bothered to do it right now. I think the lesson here is to invest more care into DOM manipulation.

For any behaivor that is not inert for the components themselves (parent-child relationship) I took the idea of `AngularJS`
services, but without the DI mechanics. Services are `javascript` objects with functions that do stuff related to the service. So I created three utility services:
* Icon - for dealing with cell UI depending on the cell state
* Navigation - Utility for checking cell neighbors.
* Settings -  For keeping the few settings and setting them depending on difficulty

All of those components and services are being setup and their behavior registered in a single controller, which was also an entry file for `webpack`. 

That's it. Big takeaways are:
* we need modules to work in `html` so we can build simple apps effectively.
* handle with DOM sparingly, it may ruin your performance if you are not careful

As for the job, they ghosted me after I gave them my location information. It's too bad to start a process without pointing out that they are not sponsoring visas. I was glad to work on the task anyway.
