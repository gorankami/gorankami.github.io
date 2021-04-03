---
layout: post
title:  "React useContext: a portal to component data and behaviour"
date:   2020-12-26
category: react
---

Before React 16.8, there were things that really bothered me in the way React Components were sharing data. 
1. In most basic use, when a child needs data from an ancestor (somewhere up the parent hierarchy), all the components between those two need to bear the dead weight of transporting the params. That's a lot of params management, particularly when dealing with event handlers or other functions that children call for parents to catch.
2. When delegating this to redux, you might take off the weight of any component between those that share params, but complexity of managing the applications goes up. I have not yet taken the benefit of easier management on redux as everyone was talking about, might be me? Or was it just a hype that much of loud devs were buying into. 
3. Back when I used AngularJS in projects, I remember I created vanilla JS files for keeping some data and behaviour, and for components to react to the data, you just need to bind them - a very easy managing problem for devs but heavy duty processing for the browser, once the app gets big. And I wish I can do that for React, but I can only think of very complex workarounds to make it react to data changes.

Let's look an example of the first case so we can experiment with solving it. The app where you implement the code has a scenario: you have a checklist of groceries but ain't got enough money so you need to pick which items you want to remove from list:

{% highlight jsx %}
import { useState } from "react";

const groceries = [
  { id: 23, item: "Milk", price: 5 },
  { id: 98, item: "Bread", price: 1 },
  { id: 12, item: "Cheese", price: 10 },
  { id: 1, item: "Bananas", price: 2 },
];

function Table() {
  const [rows, setRows] = useState(groceries);

  function deleteRow(id) {
    setRows(rows.filter((r) => r.id !== id));
  }

  return (
    <>
      {rows.map((r) => (
        <Row key={r.id} row={r} onDeleteAction={deleteRow} />
      ))}
    </>
  );
}

function Row({ row, onDeleteAction }) {
  return (
    <div>
      {row.item} ${row.price} {' '}
      <ActionRow id={row.id} onDeleteAction={onDeleteAction} />
    </div>
  );
}

function ActionRow({ id, onDeleteAction }) {
  return (
    <>
      <button onClick={() => onDeleteAction(id)}>Delete</button>
      {/* Other actions */}
    </>
  );
}

export default Table;
{% endhighlight %}

See that `onDeleteAction` that gets carried around on everyones components back just so we can have a button that takes 
some action on the list? Notice also that I cheated and used `useState` to prove a point on a problem for a time before 
hooks were introduced? Yeah, I still want to make the example readable, good riddance for classes.

I would like to skip the mastodon of an example that would redux cause and get right to point. 

## Simple useContext example using teleportation analogy

Instead of carrying the data around I would like to setup a system where a parent component can teleport data or behaviour to any descendant in the hierarchy. The teleport machine is called `context` and we create it like this:

{% highlight jsx %}
const Portal = React.createContext();
{% endhighlight %}

Instead of `Portal`, you can name it whatever you like. 

We want to make sure this instance is accessible to all the components involved in the teleportation, so create it in a file where you can export the instance. For this example we will just create it on top . 

The portal entry point would in this case be `Portal.Provider` and it accepts `value`. Value can be anything, it's a sink for any kind of data. Let's modify `Table` component so it can use the entry point for `deleteRow` function;

{% highlight jsx %}
...
return (
    <Portal.Provider value={deleteRow}>
      {rows.map((r) => (
        <Row key={r.id} row={r} /> 
      ))}
    </Portal.Provider>
);
...
{% endhighlight %}

Notice that we added the `deleteRows` function into the `Provider` but removed the `deleteRows` function from the 
`Row` component props. We can skip this prop from every descendant down to `ActionRow`.

Last thing to do is to setup the target where the data can teleport to. The destination is created by using 
`useContext` hook, let's add it to `ActionRow` component:


{% highlight jsx %}
function ActionRow({ id }) {
  const onDeleteAction = useContext(Portal);
  return (
    <>
      <button onClick={() => onDeleteAction(id)}>Delete</button>
    </>
  );
}
{% endhighlight %}

Notice that `useContext` accepts the context instance as an argument, and it will work only if a provider wraps around 
the component using it, otherwise it will just return `undefined`.

Full example:

{% highlight jsx %}
import React, { useContext, useState } from "react";

const Portal = React.createContext();

const groceries = [
  { id: 23, item: "Milk", price: 5 },
  { id: 98, item: "Bread", price: 1 },
  { id: 12, item: "Cheese", price: 10 },
  { id: 1, item: "Bananas", price: 2 },
];

function Table() {
  const [rows, setRows] = useState(groceries);

  function deleteRow(id) {
    setRows(rows.filter((r) => r.id !== id));
  }

  return (
    <Portal.Provider value={deleteRow}>
      {rows.map((r) => (
        <Row key={r.id} row={r} />
      ))}
    </Portal.Provider>
  );
}

function Row({ row }) {
  return (
    <div>
      {row.item} ${row.price} <ActionRow id={row.id} />
    </div>
  );
}

function ActionRow({ id }) {
  const onDeleteAction = useContext(Portal);
  return (
    <>
      <button onClick={() => onDeleteAction(id)}>Delete</button>
      {/* Other actions */}
    </>
  );
}

export default Table;

{% endhighlight %}

## Put anything into the portal and see what comes out of it

Since context can receive anything, what will happen when you put the `useState` state and state setter into it? 
Exactly what you would expect in intuition. 

In `Table` component Let's put `[rows, setRows]` into the provider:

{% highlight jsx %}
...
<Portal.Provider value={[rows, setRows]}>
...
{% endhighlight %}

And let's move `deleteRow(id)` function from `Table` to the `ActionRow` component, where we can also modify what we expect from the context:


{% highlight jsx %}
function ActionRow({ id }) {
  const [rows, setRows] = useContext(Portal);

  function deleteRow(id) {
    setRows(rows.filter((r) => r.id !== id));
  }

  return (
    <>
      <button onClick={() => deleteRow(id)}>Delete</button>
      {/* Other actions */}
    </>
  );
}
{% endhighlight %}

It's as if we pushed our hand from child component to the parent component so we can directly manipulate with the state!

Heres a full example:

{% highlight jsx %}
import React, { useContext, useState } from "react";

const Portal = React.createContext();

const groceries = [
  { id: 23, item: "Milk", price: 5 },
  { id: 98, item: "Bread", price: 1 },
  { id: 12, item: "Cheese", price: 10 },
  { id: 1, item: "Bananas", price: 2 },
];

function Table() {
  const [rows, setRows] = useState(groceries);

  return (
    <Portal.Provider value={[rows, setRows]}>
      {rows.map((r) => (
        <Row key={r.id} row={r} />
      ))}
    </Portal.Provider>
  );
}

function Row({ row }) {
  return (
    <div>
      {row.item} ${row.price} <ActionRow id={row.id} />
    </div>
  );
}

function ActionRow({ id }) {
  const [rows, setRows] = useContext(Portal);

  function deleteRow(id) {
    setRows(rows.filter((r) => r.id !== id));
  }

  return (
    <>
      <button onClick={() => deleteRow(id)}>Delete</button>
      {/* Other actions */}
    </>
  );
}

export default Table;

{% endhighlight %}

And takeaway from this example is that you can have application level data management. 
You can put the application data on top of the hierarchy and use it anywhere with `useContext`. 
Cleanly. Is this familiar? Are we missing something?

## I miss redux 💔

Another beautiful hook `React` introduced is `useReducer`. Similar to `useState` but setter is a dispatch that a reducer function can receive.

In our example 2, if we replace `useState` with `useReducer` and define a reducer, we can have a behaviour like redux.

Lets put deletion logic into a reducer function:

{% highlight jsx %}
function groceriesReducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
}
{% endhighlight %}

Replace `useState` in `Table` component:

{% highlight jsx %}
const [rows, dispatch] = useReducer(groceriesReducer, groceries);
{% endhighlight %}

Put those two into the provider:

{% highlight jsx %}
<Portal.Provider value={[rows, dispatch]}>
	...
{% endhighlight %}

And use `dispatch` for delegating the logic to reducer, in `ActionRow` component:

{% highlight jsx %}
const [rows, dispatch] = useContext(Portal);

function deleteRow(id) {
  dispatch({type: "DELETE", payload: id})
}
{% endhighlight %}

This might add lines of code, but you can imagine what benefit would this give to a large application with repetitive actions.

Heres the full example:

{% highlight jsx %}
import React, { useContext, useReducer } from "react";

const Portal = React.createContext();

const groceries = [
  { id: 23, item: "Milk", price: 5 },
  { id: 98, item: "Bread", price: 1 },
  { id: 12, item: "Cheese", price: 10 },
  { id: 1, item: "Bananas", price: 2 },
];

function groceriesReducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
}

function Table() {
  const [rows, dispatch] = useReducer(groceriesReducer, groceries);

  return (
    <Portal.Provider value={[rows, dispatch]}>
      {rows.map((r) => (
        <Row key={r.id} row={r} />
      ))}
    </Portal.Provider>
  );
}

function Row({ row }) {
  return (
    <div>
      {row.item} ${row.price} <ActionRow id={row.id} />
    </div>
  );
}

function ActionRow({ id }) {
  const [rows, dispatch] = useContext(Portal);

  function deleteRow(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  return (
    <>
      <button onClick={() => deleteRow(id)}>Delete</button>
      {/* Other actions */}
    </>
  );
}

export default Table;

{% endhighlight %}

Looking back at how `redux` works, if you want to setup a redux `store` like this, you would need to setup descendants so they can receive the store data in `props`, just only so you can use the behaviour of react lifecycle updates.
