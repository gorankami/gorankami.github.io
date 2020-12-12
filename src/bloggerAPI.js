function getUrl(
  blogId = '109744485881733343',
  postId,
  apiKey = 'AIzaSyAwIxsT17qAtDK4RCrFhgITGhAvSIfnrwA',
) {
  return `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${
    postId ? postId : ''
  }?key=${apiKey}`
}

export function getPosts() {
  return fetch(getUrl())
}
