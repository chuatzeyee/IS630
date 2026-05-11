import { Routes, Route } from 'react-router-dom'
import NavPill from './components/NavPill'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Topics from './pages/Topics'
import Definitions from './pages/Definitions'
import Snippets from './pages/Snippets'
import Practice from './pages/Practice'

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <main
        id="main-content"
        className="pb-24 scroll-smooth"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/definitions" element={<Definitions />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </main>
      <NavPill />
      <ScrollToTop />
    </div>
  )
}
