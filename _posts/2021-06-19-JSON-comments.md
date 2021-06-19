---
date: 2021-06-19
tags: javascript json
layout: post
title:  "JSON comments"
category: microblog
thumbnail: ""
description: "How to add comments to JSON"
---

# JSON comments

{% highlight json %}

{% endhighlight %}

This is not allowed:

{% highlight json %}
{
    //some variable
    "foo": "bar":"
}
{% endhighlight %}

But this is allowed:

{% highlight json %}
{
    "//": "some variable",
    "foo": "bar"
}
{% endhighlight %}

What about multiple lines? This is not allowed:

{% highlight json %}
{
    "//": "some variable",
    "foo": "bar",
    "//": "some other variable",
    "name": "Peter"
}
{% endhighlight %}

But how about this:

{% highlight json %}
{
    "// 1": "some variable",
    "foo": "bar",
    "// 2": "some other variable",
    "name": "Peter"
}
{% endhighlight %}

Or this:

{% highlight json %}
{
    "/**": "",
    " * 1": "This is a multiline comment description",
    " * 2": "of a variable",
    "**/": "",
    "name": "Peter"
}
{% endhighlight %}

What about multiple multiline comments? You already can guess it:

{% highlight json %}
{
    "/** 1": "",
    " * 1": "This is a multiline comment description",
    " * 2": "of a variable",
    "**/ 1": "",
    "name": "Peter",
    "/** 2": "",
    " * 1": "This is a multiline comment description",
    " * 2": "of a variable",
    "**/ 2": "",
    "age": "23"
}
{% endhighlight %}

Not very pretty but it serves it's purpose.

I discovered this by looking into Angular source code, take a look at their [package.json](https://github.com/angular/angular/blob/master/package.json):

{% highlight json %}
{
    ...
    "scripts": {
        "/": "",
        "// 1": "Many developer of our checks/scripts/tools have moved to our ng-dev tool",
        "// 2": "Find the usage you are looking for with:",
        "// 3": "yarn ng-dev --help",
        "/ ": "",
        ...
}
{% endhighlight %}
