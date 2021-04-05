---
date: 2021-04-05
title: "P5 mouse controls"
tags: p5 react javascript
layout: post
excerpt_separator: <!--more-->
---
In this post, I am assuming the use of p5 in _instance_ mode.

<!--more-->

# Panning

In p5, there are couple of ways to use mouse events for panning: `mousePressed`/`mouseReleased` pair and `mouseDragged`. I find that using `mouseDragged` is easier there are cases that the former is more useful as addition, especialy when we want to save the activation or completion of the movement.

When using `mouseDragged`, it fires when you start holding a click, will continue firing while you move the mouse, and will have a final fire when the click is released. In the event handler, the `sketch` instance carries 4 useful variables: `mouseX` and `mouseY` for current mouse coordinates, and `pmouseX` and `pmouseY` for previous mouse coordinates.

Example:

```jsx
export const getSketch = (sketch) => {
  const worldPosition = { x: 0, y: 0 };

  sketch.setup = () => {
    sketch.createCanvas(400, 400);
  };

  sketch.mousePressed = function () {
    console.log("Mouse pressed...");
  };

  sketch.mouseReleased = function () {
    console.log("Mouse released...");
  };

  sketch.mouseDragged = function () {
    const { pmouseX, pmouseY, mouseX, mouseY } = sketch;
    console.log(pmouseX, pmouseY, mouseX, mouseY);
  };

  sketch.draw = () => {
    sketch.background(220);
  };
};
```

![Mouse dragging example](/assets/2021-04-05-mouse_drag.gif)

For panning, we will have a _world position_ point, starting at (0,0) and will translate everything by adding the difference of mouse coordinates and previous mouse coordinates each time `mouseDragged` is fired. I'll also draw a rectangle to show the translation.

```jsx
export const getSketch = (sketch) => {
  const worldPosition = { x: 0, y: 0 };
  //...skipped code for brewity
  sketch.mouseDragged = function () {
    worldPosition.x += sketch.mouseX - sketchpmouseX;
    worldPosition.y += sketch.mouseY - sketch.pmouseY;
  };

  sketch.draw = () => {
    sketch.background(220);
    sketch.translate(worldPosition.x, worldPosition.y);
    sketch.rect(50, 50, 100, 100);
  };
};
```

![Mouse dragging example with rectangle](/assets/2021-04-05-mouse_drag_rect.gif)

# Zooming in and out

For zooming in and out, I use the `mouseWheel` event. The event handler receives and `event` object with `delta` property, that can be positive and negative, and we can treat it as _amount of scrolling_.

In p5, we can change the size of the drawing by transforming with different scale values. Intuitively we would be using the `delta` from `mouseWheel` event for calculating the `scale`, but I found that having the `scale` multiplied or divided by a constant `zoomFactor`, and doint that `delta` times works best. It's easier to show it with code and example:

```jsx
//...skipped code for brewity
let zoomFactor = 1.01;

sketch.mouseWheel = function (event) {
  let absDelta = Math.abs(event.delta);
  for (let i = 0; i < absDelta; i++) {
    if (event.delta < 0) {
      //zoom in
      worldScale *= zoomFactor;
    }

    if (event.delta > 0) {
      //zoom out
      worldScale /= zoomFactor;
    }
  }
};

sketch.draw = () => {
  sketch.background(220);
  sketch.scale(worldScale);
  sketch.translate(worldPosition.x, worldPosition.y);
  sketch.rect(50, 50, 100, 100);
};
```

![Mouse zoom](/assets/2021-04-05-mouse_zoom.gif)

You may notice a problem in previous example - when panning, it does so with offset from mouse (drags slower or faster than the mouse), depending in which direction the world is scaled (zoomed in or out). That's because the worlds coordinate system is not the same as mouse coordinate system when `scale` is not 1, so we need to project the mouse coordinates into scaled one when panning. We can quickly fix it with dividing the mouse drag difference with the scale:

```jsx
sketch.mouseDragged = function () {
  const { pmouseX, pmouseY, mouseX, mouseY } = sketch;
  worldPosition.x += (mouseX - pmouseX) / worldScale;
  worldPosition.y += (mouseY - pmouseY) / worldScale;
};
```

One more problem is that wen we change the scale, it naturally scales it towards the 0,0 coordinate, which is in upper left corner of the canvas, but we would intuitively expect it to zoom towards the mouse position. That means that we need to move the world position a little while calculating the scale. This is the fix:

```jsx
sketch.mouseWheel = function (event) {
  let zoomFactor = 1.01;
  let absDelta = Math.abs(event.delta);
  const { mouseX, mouseY } = sketch;
  const pWorldScale = worldScale;
  for (let i = 0; i < absDelta; i++) {
    if (event.delta < 0) {
      //zoom in
      worldScale *= zoomFactor;
    }

    if (event.delta > 0) {
      //zoom out
      worldScale /= zoomFactor;
    }
  }

  worldPosition.x += mouseX / worldScale - mouseX / pWorldScale;
  worldPosition.y += mouseY / worldScale - mouseY / pWorldScale;
};
```

I have defined here `pWorldScale` which represents the scale before the zoom change, and we calculate world position by adding the difference of mouse position in both before and after scales.

# Completed example

```jsx
export const getSketch = (sketch) => {
  const worldPosition = { x: 0, y: 0 };
  let worldScale = 1;

  sketch.setup = () => {
    sketch.createCanvas(400, 400);
  };

  sketch.mouseDragged = function () {
    const { pmouseX, pmouseY, mouseX, mouseY } = sketch;
    worldPosition.x += (mouseX - pmouseX) / worldScale;
    worldPosition.y += (mouseY - pmouseY) / worldScale;
  };

  sketch.mouseWheel = function (event) {
    let zoomFactor = 1.01;
    let absDelta = Math.abs(event.delta);
    const { mouseX, mouseY } = sketch;
    const pWorldScale = worldScale;
    for (let i = 0; i < absDelta; i++) {
      if (event.delta < 0) {
        //zoom in
        worldScale *= zoomFactor;
      }

      if (event.delta > 0) {
        //zoom out
        worldScale /= zoomFactor;
      }
    }

    worldPosition.x += mouseX / worldScale - mouseX / pWorldScale;
    worldPosition.y += mouseY / worldScale - mouseY / pWorldScale;
  };

  sketch.draw = () => {
    sketch.background(220);
    sketch.scale(worldScale);
    sketch.translate(worldPosition.x, worldPosition.y);
    sketch.rect(50, 50, 100, 100);
  };
};
```

![Mouse zoom](/assets/2021-04-05-mouse_zoom_fixed.gif)