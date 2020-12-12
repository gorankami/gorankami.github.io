import { useState } from 'react'
import About from './About'
import Blog from './Blog'
import Home from './Home'
const PAGE_HOME = 'PAGE_HOME'
const PAGE_BLOG = 'PAGE_BLOG'
const PAGE_ABOUT = 'PAGE_ABOUT'

function App() {
  const [currentPage, setCurrentPage] = useState(PAGE_HOME)
  

  return (
    <>
      <header>
        <ul className="nav">
          <li>
            <img src="avatar.jpg" alt="Avatar" className="home-avatar" />
          </li>
          <li>
            <button 
              className={"btn-link " + (currentPage === PAGE_HOME ? 'active' : '')}
              onClick={() => setCurrentPage(PAGE_HOME)}
            >
              Goran Antić
            </button>
          </li>
          <li>
            <button 
              className={"btn-link " + (currentPage === PAGE_BLOG ? 'active' : '')}
              onClick={() => setCurrentPage(PAGE_BLOG)}
            >
              Blog
            </button>
          </li>
          <li>
            <button 
              className={"btn-link " + (currentPage === PAGE_ABOUT ? 'active' : '')}
              onClick={() => setCurrentPage(PAGE_ABOUT)}
            >
              About
            </button>
          </li>
        </ul>
      </header>
      <div className="main-content">
        {currentPage === PAGE_HOME && <Home />}
        {currentPage === PAGE_BLOG && <Blog />}
        {currentPage === PAGE_ABOUT && <About />}
      </div>
    </>
  )
}

export default App
