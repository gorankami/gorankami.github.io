---
layout: page
title: Microblog
permalink: /microblog/
---

<div class="main">
{% if site.paginate %}
    {% assign posts = paginator.posts %}
{% else %}
    {% assign posts = site.categories.microblog %}
{% endif %}

{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

{% for post in site.categories.microblog %}
    <a class="post-link" href="{{ post.url | relative_url }}">
        <span class="post-meta">{{ post.date | date: date_format }}</span>
    </a>
    {{ post.excerpt }}
{% endfor %}

{% if site.paginate %}
<div class="pager">
    <ul class="pagination">
    {%- if paginator.previous_page %}
    <li><a href="{{ paginator.previous_page_path | relative_url }}" class="previous-page">{{ paginator.previous_page }}</a></li>
    {%- else %}
    <li><div class="pager-edge">•</div></li>
    {%- endif %}
    <li><div class="current-page">{{ paginator.page }}</div></li>
    {%- if paginator.next_page %}
    <li><a href="{{ paginator.next_page_path | relative_url }}" class="next-page">{{ paginator.next_page }}</a></li>
    {%- else %}
    <li><div class="pager-edge">•</div></li>
    {%- endif %}
    </ul>
</div>
{%- endif %}
</div>