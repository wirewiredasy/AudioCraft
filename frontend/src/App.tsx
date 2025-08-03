import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { VocalRemover } from './components/VocalRemover'
import { PitchTempo } from './components/PitchTempo'
import { FormatConverter } from './components/FormatConverter'
import { AudioCutter } from './components/AudioCutter'
import { NoiseReducer } from './components/NoiseReducer'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Audio Processing Suite
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional audio tools for vocal removal, pitch adjustment, format conversion, 
            audio editing, and noise reduction. Upload your files and transform your audio.
          </p>
        </header>

        <Tabs defaultValue="vocal-remover" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
            <TabsTrigger value="vocal-remover" className="text-sm">
              Vocal Remover
            </TabsTrigger>
            <TabsTrigger value="pitch-tempo" className="text-sm">
              Pitch & Tempo
            </TabsTrigger>
            <TabsTrigger value="converter" className="text-sm">
              Format Converter
            </TabsTrigger>
            <TabsTrigger value="cutter" className="text-sm">
              Cut & Join
            </TabsTrigger>
            <TabsTrigger value="noise-reducer" className="text-sm">
              Noise Reducer
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

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Built with FastAPI microservices architecture. 
            All processing happens securely on our servers.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App