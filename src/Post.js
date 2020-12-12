import moment from 'moment'
import React from 'react'

export default function Post({ post }) {
  return (
    <>
      <h2>
        {post.title + ' '}
        <small>{moment(post.published).fromNow()}</small>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <hr/>
    </>
  )
}
