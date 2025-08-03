import React from 'react'
import { motion } from 'framer-motion'
import { Music, Headphones, Settings, Volume2, Filter } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ThemeProvider } from './contexts/ThemeContext'
import { ThemeToggle } from './components/ui/theme-toggle'
import { VocalRemover } from './components/VocalRemover'
import { PitchTempo } from './components/PitchTempo'
import { FormatConverter } from './components/FormatConverter'
import { AudioCutter } from './components/AudioCutter'
import { NoiseReducer } from './components/NoiseReducer'
import { Toaster } from 'sonner'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="audio-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header with dark mode toggle */}
          <motion.header 
            className="relative text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0">
              <ThemeToggle />
            </div>
            
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Audio Processing Suite
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Professional-grade audio tools powered by AI. Remove vocals, adjust pitch & tempo, 
              convert formats, edit audio segments, and reduce noise with industry-standard quality.
            </motion.p>
          </motion.header>

          <motion.div
            className="w-full max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Tabs defaultValue="vocal-remover" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-14 p-1 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger value="vocal-remover" className="flex items-center gap-2 text-sm font-medium">
                  <Headphones className="h-4 w-4" />
                  <span className="hidden sm:inline">Vocal Remover</span>
                  <span className="sm:hidden">Vocals</span>
                </TabsTrigger>
                <TabsTrigger value="pitch-tempo" className="flex items-center gap-2 text-sm font-medium">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Pitch & Tempo</span>
                  <span className="sm:hidden">Pitch</span>
                </TabsTrigger>
                <TabsTrigger value="converter" className="flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Format Converter</span>
                  <span className="sm:hidden">Convert</span>
                </TabsTrigger>
                <TabsTrigger value="cutter" className="flex items-center gap-2 text-sm font-medium">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Cut & Join</span>
                  <span className="sm:hidden">Edit</span>
                </TabsTrigger>
                <TabsTrigger value="noise-reducer" className="flex items-center gap-2 text-sm font-medium">
                  <Music className="h-4 w-4" />
                  <span className="hidden sm:inline">Noise Reducer</span>
                  <span className="sm:hidden">Noise</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="vocal-remover">
                <VocalRemover />
              </TabsContent>

              <TabsContent value="pitch-tempo">
                <PitchTempo />
              </TabsContent>

              <TabsContent value="converter">
                <FormatConverter />
              </TabsContent>

              <TabsContent value="cutter">
                <AudioCutter />
              </TabsContent>

              <TabsContent value="noise-reducer">
                <NoiseReducer />
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.footer 
            className="mt-20 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary/50 to-transparent rounded"></div>
              <Music className="h-4 w-4 text-primary/70" />
              <div className="h-1 w-8 bg-gradient-to-l from-primary/50 to-transparent rounded"></div>
            </div>
            <p>
              Built with FastAPI microservices architecture. 
              All processing happens securely on our servers.
            </p>
          </motion.footer>
        </div>
        <Toaster 
          theme="light" 
          position="top-right"
          expand={false}
          richColors
        />
      </div>
    </ThemeProvider>
  )
}

export default App