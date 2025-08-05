import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import VocalRemoverPage from './pages/VocalRemoverPage'
import PitchTempoPage from './pages/PitchTempoPage'
import ConverterPage from './pages/ConverterPage'
import EditorPage from './pages/EditorPage'
import NoiseReductionPage from './pages/NoiseReductionPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vocal-remover" element={<VocalRemoverPage />} />
            <Route path="/pitch-tempo" element={<PitchTempoPage />} />
            <Route path="/converter" element={<ConverterPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/noise-reduction" element={<NoiseReductionPage />} />
          </Routes>
        </main>
        <Toaster position="top-right" richColors theme="dark" />
      </div>
    </Router>
  )
}

export default App