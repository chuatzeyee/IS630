import { Routes, Route, Navigate } from 'react-router-dom'
import NavPill from './components/NavPill'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Topics from './pages/Topics'
import Formulas from './pages/Formulas'
import MockExam from './pages/MockExam'

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
          <Route path="/definitions" element={<Navigate to="/topics?view=definitions" replace />} />
          <Route path="/snippets" element={<Navigate to="/formulas" replace />} />
          <Route path="/formulas" element={<Formulas />} />
          <Route path="/mock" element={<MockExam />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <NavPill />
      <ScrollToTop />
    </div>
  )
}
