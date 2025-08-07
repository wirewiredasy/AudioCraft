import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../../components/Header'
import Upload from '../../components/Upload'
import Player from '../../components/Player'
import { ShieldCheck, Info } from 'lucide-react'

export default function NoiseReducer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [reductionStrength, setReductionStrength] = useState(0.8)
  const [stationaryNoise, setStationaryNoise] = useState(true)

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
      formData.append('reduction_strength', reductionStrength.toString())
      formData.append('stationary', stationaryNoise.toString())

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/noise-reduction`,
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
      toast.success('Noise reduced successfully!')
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error(error.response?.data?.detail || 'Failed to reduce noise')
      setUploadProgress(0)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Noise Reducer - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Remove background noise and improve audio quality using advanced spectral subtraction algorithms." />
      </Head>

      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Noise Reducer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Remove background noise and improve audio quality using advanced spectral subtraction algorithms. 
              Perfect for cleaning up recordings with hiss, hum, or environmental noise.
            </p>
          </div>

          {/* Info Section */}
          <div className="alert-info mb-8">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">How It Works</h3>
                <div className="text-gray-300 space-y-1">
                  <p>• Analyzes the first 10% of audio to identify noise patterns</p>
                  <p>• Uses spectral subtraction to remove identified noise frequencies</p>
                  <p>• Stationary mode works best for consistent background noise (fans, hum)</p>
                  <p>• Non-stationary mode for varying noise (traffic, crowd noise)</p>
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
              description="Select an audio file to reduce background noise"
            />

            {selectedFile && (
              <div className="mt-8 space-y-6">
                {/* Controls */}
                <div className="space-y-6">
                  {/* Reduction Strength */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Reduction Strength: {Math.round(reductionStrength * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={reductionStrength}
                      onChange={(e) => setReductionStrength(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>10% (gentle)</span>
                      <span>50% (moderate)</span>
                      <span>100% (aggressive)</span>
                    </div>
                  </div>

                  {/* Noise Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Noise Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={stationaryNoise}
                          onChange={() => setStationaryNoise(true)}
                          className="w-4 h-4 text-primary-500"
                        />
                        <div>
                          <div className="font-medium text-white">Stationary Noise</div>
                          <div className="text-sm text-gray-400">Consistent background noise (fan, hum, hiss)</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={!stationaryNoise}
                          onChange={() => setStationaryNoise(false)}
                          className="w-4 h-4 text-primary-500"
                        />
                        <div>
                          <div className="font-medium text-white">Non-Stationary Noise</div>
                          <div className="text-sm text-gray-400">Varying background noise (traffic, crowd, wind)</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setReductionStrength(0.5); setStationaryNoise(true); }}
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-sm transition-colors"
                  >
                    Gentle Cleanup
                  </button>
                  <button
                    onClick={() => { setReductionStrength(0.8); setStationaryNoise(true); }}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm transition-colors"
                  >
                    Standard Reduction
                  </button>
                  <button
                    onClick={() => { setReductionStrength(1.0); setStationaryNoise(false); }}
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm transition-colors"
                  >
                    Aggressive Cleanup
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-400">
                      {Math.round(reductionStrength * 100)}% reduction, {stationaryNoise ? 'Stationary' : 'Non-stationary'} mode
                    </p>
                  </div>
                  <button
                    onClick={processAudio}
                    disabled={isProcessing}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isProcessing ? 'Reducing Noise...' : 'Reduce Noise'}
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
                ✅ Noise Reduced Successfully!
              </h3>
              
              <Player
                audioUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.output_file}`}
                fileName={`noise_reduced_${selectedFile?.name || 'audio.wav'}`}
                downloadUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.download_url}`}
              />

              {/* Processing Details */}
              {result.parameters && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Processing Details</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Reduction Strength: {Math.round(result.parameters.reduction_strength * 100)}%</p>
                    <p>Noise Type: {result.parameters.stationary_noise ? 'Stationary' : 'Non-stationary'}</p>
                    <p>Noise Floor: {result.parameters.noise_floor}</p>
                    <p>Algorithm: Spectral Subtraction</p>
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