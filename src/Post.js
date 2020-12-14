import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

const PostTitle = styled.h2`
  line-height: 1;
  margin-left: -25px;
`

const TimeAgo = styled.small`
  margin-left: -25px;
  color: var(--clr-text-secondary);
`

export default function Post({ post }) {
  return (
    <>
      <TimeAgo>{moment(post.published).fromNow()}</TimeAgo>
      <PostTitle>{post.title + ' '}</PostTitle>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <hr />
    </>
  )
}
