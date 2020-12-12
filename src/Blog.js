import React, { useEffect, useState } from 'react'
import { getPosts } from './bloggerAPI'
import Post from './Post'

var cache = []

export default function Blog() {
  const PR = window.PR
  const [posts, setPosts] = useState(cache)

  useEffect(() => {
    getPosts()
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.items)
        cache = res.items
        PR.prettyPrint()
      })
  }, [])

  return (
    <>
      {posts.map((p, i) => (
        <Post key={i} post={p} />
      ))}
    </>
  )
}
