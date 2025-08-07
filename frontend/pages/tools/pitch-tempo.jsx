import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../../components/Header'
import Upload from '../../components/Upload'
import Player from '../../components/Player'
import { Music, Info } from 'lucide-react'

export default function PitchTempo() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [pitchShift, setPitchShift] = useState(0)
  const [tempoChange, setTempoChange] = useState(1.0)

  const handleFileUpload = (file) => {
    setSelectedFile(file)
    setResult(null)
    setUploadProgress(0)
  }

  const processAudio = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('pitch_shift', pitchShift.toString())
      formData.append('tempo_change', tempoChange.toString())

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/pitch-tempo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          },
        }
      )

      setResult(response.data)
      setUploadProgress(100)
      toast.success('Pitch and tempo adjusted successfully!')
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error(error.response?.data?.detail || 'Failed to adjust pitch/tempo')
      setUploadProgress(0)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Pitch & Tempo Adjuster - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Adjust pitch and tempo independently for creative effects and music production." />
      </Head>

      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pitch & Tempo Adjuster
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Adjust pitch and tempo independently for creative effects and music production. 
              Perfect for creating remixes, slowing down music for practice, or changing key signatures.
            </p>
          </div>

          {/* Info Section */}
          <div className="alert-info mb-8">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">How It Works</h3>
                <div className="text-gray-300 space-y-1">
                  <p>• Pitch: Measured in semitones (+12 = one octave up, -12 = one octave down)</p>
                  <p>• Tempo: Multiplier where 1.0 = original speed, 2.0 = double speed, 0.5 = half speed</p>
                  <p>• Independent processing preserves audio quality</p>
                  <p>• Perfect for DJ work, music practice, and creative projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="glass-card mb-8">
            <Upload 
              onFileSelect={handleFileUpload}
              isProcessing={isProcessing}
              accept="audio/*"
              title="Upload Audio File"
              description="Select an audio file to adjust pitch and tempo"
            />

            {selectedFile && (
              <div className="mt-8 space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pitch Control */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Pitch Shift (semitones): {pitchShift > 0 ? '+' : ''}{pitchShift}
                    </label>
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="1"
                      value={pitchShift}
                      onChange={(e) => setPitchShift(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>-12 (octave down)</span>
                      <span>0 (original)</span>
                      <span>+12 (octave up)</span>
                    </div>
                  </div>

                  {/* Tempo Control */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Tempo: {tempoChange}x speed
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={tempoChange}
                      onChange={(e) => setTempoChange(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>0.5x (half)</span>
                      <span>1.0x (original)</span>
                      <span>2.0x (double)</span>
                    </div>
                  </div>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setPitchShift(0); setTempoChange(1.0); }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => { setPitchShift(2); setTempoChange(1.0); }}
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-sm transition-colors"
                  >
                    +2 Semitones
                  </button>
                  <button
                    onClick={() => { setPitchShift(-2); setTempoChange(1.0); }}
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm transition-colors"
                  >
                    -2 Semitones
                  </button>
                  <button
                    onClick={() => { setPitchShift(0); setTempoChange(0.8); }}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm transition-colors"
                  >
                    Practice Speed
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-400">
                      Pitch: {pitchShift > 0 ? '+' : ''}{pitchShift} semitones, Tempo: {tempoChange}x
                    </p>
                  </div>
                  <button
                    onClick={processAudio}
                    disabled={isProcessing}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Adjust Audio'}
                  </button>
                </div>

                {/* Progress */}
                {uploadProgress > 0 && (
                  <div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{uploadProgress}% complete</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="glass-card">
              <h3 className="text-xl font-semibold text-white mb-6">
                ✅ Audio Processed Successfully!
              </h3>
              
              <Player
                audioUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.output_file}`}
                fileName={`adjusted_${selectedFile?.name || 'audio.wav'}`}
                downloadUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.download_url}`}
              />

              {/* Processing Details */}
              {result.parameters && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Processing Details</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Pitch Shift: {result.parameters.pitch_shift_semitones} semitones</p>
                    <p>Tempo Change: {result.parameters.tempo_multiplier}x speed</p>
                    <p>Sample Rate: {result.parameters.sample_rate} Hz</p>
                    <p>Duration: {result.parameters.duration?.toFixed(2)} seconds</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  )
}