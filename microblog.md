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

{% for post in site.categories.microblog %}
    <span class="post-meta">{{ post.date | date: date_format }}</span>
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