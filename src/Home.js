import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Img = styled.img`
  margin-left:25px;
`

export default function Home() {
  return (
    <div className="text-center">
      <h1>Always under development</h1>
      <h3>Goran's web site</h3>
      <Img src="coding-dude.gif" />
      <figcaption>
        Find boomer gifs like this here{' '}
        <a href="https://gifcities.org/">https://gifcities.org/</a>
      </figcaption>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>
        I'm not a public person, but you can find out more about me{' '}
        <Link to="/about">here</Link>
      </p>
    </div>
  )
}
