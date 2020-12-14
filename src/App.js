import React, { useEffect, useState } from 'react'
import { getPosts } from './bloggerAPI'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import About from './About'
import Blog from './Blog'
import Home from './Home'

const Content = styled.nav`
  margin: 0 auto;
  margin-bottom: 100px;
  max-width: 800px;
  padding: 20px 50px;
`

const Nav = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;

  & li {
    float: left;
  }

  & li a,
  & li div {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 13px 16px;
    text-decoration: none;
    background-color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
  }

  & li a.active {
    border-top: 4px solid var(--clr-selection-gain);
    color: var(--clr-selection-gain);
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  margin-top: 8px;
  margin-left: 8px;
`

function App() {
  const PR = window.PR
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.items)
        PR.prettyPrint()
      })
  }, [])
  return (
    <BrowserRouter>
      <Nav>
        <li>
          <Avatar src="avatar.jpg" alt="Avatar" />
        </li>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/blog">
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/about">
            About
          </NavLink>
        </li>
      </Nav>
      <Content>
        <Switch>
          <Route exact path="/" component={Home} activeClassName="active" />
          <Route exact path="/blog" activeClassName="active">
            <Blog posts={posts} />
          </Route>
          <Route
            exact
            path="/about"
            component={About}
            activeClassName="active"
          />
        </Switch>
      </Content>
    </BrowserRouter>
  )
}

export default App
