import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Blog({ posts }) {
  return (
    <>
      {posts.map((p, i) => (
        <div key={i}>
          <ReactMarkdown>{p.markdown}</ReactMarkdown>
          <hr />
        </div>
      ))}
    </>
  )
}
