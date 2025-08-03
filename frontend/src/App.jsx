import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import ModernHomePage from './pages/ModernHomePage'
import ToolsPage from './pages/ToolsPage'
import PrivacyPage from './pages/PrivacyPage'
import HowToUsePage from './pages/HowToUsePage'
import ModernVocalRemoverPage from './pages/ModernVocalRemoverPage'
import PitchTempoPage from './pages/PitchTempoPage'
import FormatConverterPage from './pages/FormatConverterPage'
import AudioEditorPage from './pages/AudioEditorPage'
import NoiseReductionPage from './pages/NoiseReductionPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ModernHomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/how-to-use" element={<HowToUsePage />} />
          <Route path="/vocal-remover" element={<ModernVocalRemoverPage />} />
          <Route path="/pitch-tempo" element={<PitchTempoPage />} />
          <Route path="/format-converter" element={<FormatConverterPage />} />
          <Route path="/audio-editor" element={<AudioEditorPage />} />
          <Route path="/noise-reduction" element={<NoiseReductionPage />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0'
          }
        }}
      />
    </Router>
  )
}

export default App