import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { CleanCard, CleanCardContent, CleanCardHeader, CleanCardTitle, CleanCardDescription } from '../components/ui/CleanCard'
import CleanButton from '../components/ui/CleanButton'
import CleanHeader from '../components/CleanHeader'

const CleanVocalRemoverPage = () => {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    }
  }

  const handleRemoveVocals = async () => {
    if (!file) return

    setProcessing(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/remove-vocals', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Processing failed')
      }
    } catch (err) {
      setError('Failed to process audio file')
    } finally {
      setProcessing(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CleanHeader />
      
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728m-5.657-2.829a3 3 0 010-4.242M12 8v8" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Vocal Remover
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Remove vocals from any song using advanced AI-powered audio separation technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CleanCard>
                <CleanCardHeader>
                  <CleanCardTitle>Upload Audio File</CleanCardTitle>
                  <CleanCardDescription>
                    Upload your audio file to remove vocals and create instrumental tracks
                  </CleanCardDescription>
                </CleanCardHeader>
                <CleanCardContent>
                  <div className="space-y-6">
                    {/* File Input */}
                    <div 
                      className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        MP3, WAV, FLAC, AAC, OGG (Max 100MB)
                      </p>
                    </div>

                    {/* Selected File */}
                    {file && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {file.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {(file.size / (1024 * 1024)).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={resetForm}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Process Button */}
                    <CleanButton
                      onClick={handleRemoveVocals}
                      disabled={!file || processing}
                      loading={processing}
                      className="w-full"
                      size="lg"
                    >
                      {processing ? 'Removing Vocals...' : 'Remove Vocals'}
                    </CleanButton>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CleanCardContent>
              </CleanCard>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CleanCard>
                <CleanCardHeader>
                  <CleanCardTitle>Processed Audio</CleanCardTitle>
                  <CleanCardDescription>
                    Download your vocal-free instrumental track
                  </CleanCardDescription>
                </CleanCardHeader>
                <CleanCardContent>
                  {result ? (
                    <div className="space-y-6">
                      {/* Success Message */}
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            Vocals removed successfully!
                          </p>
                        </div>
                      </div>

                      {/* Audio Player */}
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                        <audio 
                          controls 
                          className="w-full"
                          src={result.output_file}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>

                      {/* Download Button */}
                      <CleanButton
                        as="a"
                        href={result.download_url}
                        download
                        className="w-full"
                        size="lg"
                      >
                        Download Instrumental Track
                      </CleanButton>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-1v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-1c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-1" />
                        </svg>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Your processed audio will appear here
                      </p>
                    </div>
                  )}
                </CleanCardContent>
              </CleanCard>
            </motion.div>
          </div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <CleanCard>
              <CleanCardHeader>
                <CleanCardTitle>How Vocal Removal Works</CleanCardTitle>
              </CleanCardHeader>
              <CleanCardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Audio Analysis
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Our AI analyzes the stereo channels to identify vocal components
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-green-600">2</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Vocal Separation
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Advanced algorithms separate vocals from instrumental tracks
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Clean Output
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get a high-quality instrumental version of your song
                    </p>
                  </div>
                </div>
              </CleanCardContent>
            </CleanCard>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default CleanVocalRemoverPage