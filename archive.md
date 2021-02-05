---
layout: page
title: Archive
permalink: /archive/
---
  <div class="wrapper">

    <div class="footer-col-wrapper">
      <div >
        <p class="feed-subscribe">
          <a href="{{ 'feed.xml' | relative_url }}">
            <svg class="svg-icon orange">
              <use xlink:href="{{ 'assets/minima-social-icons.svg#rss' | relative_url }}"></use>
            </svg><span>Subscribe</span>
          </a>
        </p>
        {% for post in site.posts  %}
          {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
          {% capture this_month %}{{ post.date | date: "%B" }}{% endcapture %}
          {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
          {% capture next_month %}{{ post.previous.date | date: "%B" }}{% endcapture %}

          {% if forloop.first %}
          <div id="{{ this_year }}-ref">{{this_year}}</div>
          <div id="{{ this_year }}-{{ this_month }}-ref">{{ this_month }}</div>
          <ul>
          {% endif %}

          <li><a href="{{ post.url }}">{{ post.title }}</a></li>

          {% if forloop.last %}
          </ul>
          {% else %}
              {% if this_year != next_year %}
              </ul>
              <div id="{{ next_year }}-ref">{{next_year}}</div>
              <div id="{{ next_year }}-{{ next_month }}-ref">{{ next_month }}</div>
              <ul>
              {% else %}    
                  {% if this_month != next_month %}
                  </ul>
                  <div id="{{ this_year }}-{{ next_month }}-ref">{{ next_month }}</div>
                  <ul>
                  {% endif %}
              {% endif %}
          {% endif %}
      {% endfor %}
      </div>
    </div>


  </div>
