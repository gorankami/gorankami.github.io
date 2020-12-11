import { useEffect, useState } from 'react'
import About from './About'
import Blog from './Blog'
import getPosts from './blog/getPosts'
import Home from './Home'
const PAGE_HOME = 'PAGE_HOME'
const PAGE_BLOG = 'PAGE_BLOG'
const PAGE_ABOUT = 'PAGE_ABOUT'

function App() {
  const [currentPage, setCurrentPage] = useState(PAGE_HOME)
  const [blogPosts, setBlogPosts] = useState([])
  useEffect(() => {
    try {
      const posts = getPosts()
      posts[0].then((res) => {
        setBlogPosts(
          posts.map((p, i) => ({ ...posts[1][i], markdown: res[i] })),
        )
      })
    } catch (e) {
      console.warn(e)
    }
  })

  return (
    <>
      <header>
        <ul className="nav">
          <li>
            <img src="avatar.jpg" alt="Avatar" className="home-avatar" />
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={currentPage === PAGE_HOME ? 'active' : ''}
              onClick={() => setCurrentPage(PAGE_HOME)}
            >
              Goran Antić
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={currentPage === PAGE_BLOG ? 'active' : ''}
              onClick={() => setCurrentPage(PAGE_BLOG)}
            >
              Blog
            </a>
          </li>
          {/* <li><a href="javascript:void(0)">Projects</a></li>
        <li><a href="javascript:void(0)">Music</a></li>
        <li><a href="javascript:void(0)">Photography</a></li>
        <li><a href="javascript:void(0)">References</a></li> */}
          <li>
            <a
              href="javascript:void(0)"
              className={currentPage === PAGE_ABOUT ? 'active' : ''}
              onClick={() => setCurrentPage(PAGE_ABOUT)}
            >
              About
            </a>
          </li>
        </ul>
      </header>
      <div className="main-content">
        {currentPage === PAGE_HOME && <Home />}
        {currentPage === PAGE_BLOG && <Blog posts={blogPosts}/>}
        {currentPage === PAGE_ABOUT && <About />}
      </div>
    </>
  )
}

export default App
