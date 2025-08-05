import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Toaster } from 'sonner'

// Import pages
import HomePage from './pages/HomePage'
import CleanHomePage from './pages/CleanHomePage'
import SimpleTest from './components/SimpleTest'
import VocalRemoverPage from './pages/VocalRemoverPage'
import CleanVocalRemoverPage from './pages/CleanVocalRemoverPage'
import PitchTempoPage from './pages/PitchTempoPage'
import FormatConverterPage from './pages/FormatConverterPage'
import AudioEditorPage from './pages/AudioEditorPage'
import NoiseReductionPage from './pages/NoiseReductionPage'
import CleanToolsPage from './pages/CleanToolsPage'

// Footer pages
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import HelpPage from './pages/HelpPage'
import DocsPage from './pages/DocsPage'
import CommunityPage from './pages/CommunityPage'
import CookiesPage from './pages/CookiesPage'

// How-to pages
import HowToUseVocalRemover from './pages/HowToUseVocalRemover'
import HowToUsePitchTempo from './pages/HowToUsePitchTempo'
import HowToUseFormatConverter from './pages/HowToUseFormatConverter'
import HowToUseAudioEditor from './pages/HowToUseAudioEditor'
import HowToUseNoiseReduction from './pages/HowToUseNoiseReduction'

import Layout from './components/Layout'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4ade80',
    },
    secondary: {
      main: '#3b82f6',
    },
    background: {
      default: '#0f0f23',
      paper: '#1a1a2e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CleanHomePage />} />
            <Route path="/vocal-remover" element={<CleanVocalRemoverPage />} />
            <Route path="/pitch-tempo" element={<PitchTempoPage />} />
            <Route path="/format-converter" element={<FormatConverterPage />} />
            <Route path="/audio-editor" element={<AudioEditorPage />} />
            <Route path="/noise-reduction" element={<NoiseReductionPage />} />
            <Route path="/tools" element={<CleanToolsPage />} />

            {/* Footer pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/cookies" element={<CookiesPage />} />

            {/* How-to pages */}
            <Route path="/how-to-use-vocal-remover" element={<HowToUseVocalRemover />} />
            <Route path="/how-to-use-pitch-tempo" element={<HowToUsePitchTempo />} />
            <Route path="/how-to-use-format-converter" element={<HowToUseFormatConverter />} />
            <Route path="/how-to-use-audio-editor" element={<HowToUseAudioEditor />} />
            <Route path="/how-to-use-noise-reduction" element={<HowToUseNoiseReduction />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App