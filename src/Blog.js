import React from 'react'
import Post from './Post'

export default function Blog({posts}) {

  return (
    <>
      {posts.map((p, i) => (
        <Post key={i} post={p} />
      ))}
    </>
  )
}
