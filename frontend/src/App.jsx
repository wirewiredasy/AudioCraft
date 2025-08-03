import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/NewHomePage'
import ToolsPage from './pages/ToolsPage'
import PrivacyPage from './pages/PrivacyPage'
import HowToUsePage from './pages/HowToUsePage'
import ImprovedVocalRemoverPage from './pages/ImprovedVocalRemoverPage'
import PitchTempoPage from './pages/PitchTempoPage'
import FormatConverterPage from './pages/FormatConverterPage'
import AudioEditorPage from './pages/AudioEditorPage'
import NoiseReductionPage from './pages/NoiseReductionPage'
import HowToUseVocalRemover from './pages/HowToUseVocalRemover'
import HowToUsePitchTempo from './pages/HowToUsePitchTempo'
import HowToUseFormatConverter from './pages/HowToUseFormatConverter'
import VoiceAIStylePage from './pages/VoiceAIStylePage'
import AIFeaturesPage from './pages/AIFeaturesPage'
import ProcessingStudioPage from './pages/ProcessingStudioPage'
import VoiceAILanding from './pages/VoiceAILanding'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#1e293b',
      light: '#475569',
      dark: '#0f172a',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          boxShadow: 'none',
        },
        contained: {
          background: '#2563eb',
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
          '&:hover': {
            background: '#1d4ed8',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
          },
        },
        outlined: {
          borderColor: '#2563eb',
          color: '#2563eb',
          '&:hover': {
            background: 'rgba(37, 99, 235, 0.05)',
            borderColor: '#1d4ed8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid rgba(37, 99, 235, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
            },
          },
        },
      },
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#238636',
      light: '#2ea043',
      dark: '#1a7f37',
    },
    secondary: {
      main: '#1f6feb',
      light: '#388bfd',
      dark: '#0969da',
    },
    background: {
      default: '#0e1418',
      paper: 'rgba(22, 27, 34, 0.9)',
    },
    text: {
      primary: '#f0f6fc',
      secondary: '#7d8590',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #238636 0%, #1f6feb 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2ea043 0%, #388bfd 100%)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(25px)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
})

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.className = isDarkMode ? 'light' : ''
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ 
        margin: 0, 
        padding: 0,
        minHeight: '100vh',
        background: isDarkMode 
          ? 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)'
          : '#f8fafc',
        overflowX: 'hidden'
      }}>
        <Router>
          <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/vocal-remover" element={<ImprovedVocalRemoverPage />} />
            <Route path="/pitch-tempo" element={<PitchTempoPage />} />
            <Route path="/format-converter" element={<FormatConverterPage />} />
            <Route path="/audio-editor" element={<AudioEditorPage />} />
            <Route path="/noise-reduction" element={<NoiseReductionPage />} />
            <Route path="/how-to-use/vocal-remover" element={<HowToUseVocalRemover />} />
            <Route path="/how-to-use/pitch-tempo" element={<HowToUsePitchTempo />} />
            <Route path="/how-to-use/format-converter" element={<HowToUseFormatConverter />} />
            <Route path="/voice-ai-style" element={<VoiceAIStylePage />} />
            <Route path="/ai-features" element={<AIFeaturesPage />} />
            <Route path="/processing-studio" element={<ProcessingStudioPage />} />
            <Route path="/voice-ai-landing" element={<VoiceAILanding />} />
          </Routes>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App