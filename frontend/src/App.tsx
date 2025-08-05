import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import VocalRemover from './pages/VocalRemover'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vocal-remover" element={<VocalRemover />} />
          <Route path="/pitch-tempo" element={<div className="p-8 text-center">Pitch & Tempo - Coming Soon</div>} />
          <Route path="/converter" element={<div className="p-8 text-center">Format Converter - Coming Soon</div>} />
          <Route path="/editor" element={<div className="p-8 text-center">Audio Editor - Coming Soon</div>} />
          <Route path="/noise-reduction" element={<div className="p-8 text-center">Noise Reduction - Coming Soon</div>} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </Router>
  )
}

export default App
