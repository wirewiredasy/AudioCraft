import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import VocalRemoverPage from './pages/VocalRemoverPage'
import PitchTempoPage from './pages/PitchTempoPage'
import FormatConverterPage from './pages/FormatConverterPage'
import AudioEditorPage from './pages/AudioEditorPage'
import NoiseReductionPage from './pages/NoiseReductionPage'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.1)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vocal-remover" element={<VocalRemoverPage />} />
              <Route path="/pitch-tempo" element={<PitchTempoPage />} />
              <Route path="/format-converter" element={<FormatConverterPage />} />
              <Route path="/audio-editor" element={<AudioEditorPage />} />
              <Route path="/noise-reduction" element={<NoiseReductionPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App