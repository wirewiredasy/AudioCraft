import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { ArrowLeft, Upload, Download, Edit3, FileMusic } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function MetadataEditor() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [metadata, setMetadata] = useState({
    title: '',
    artist: '',
    album: '',
    year: ''
  })

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        setProcessedAudio(null)
        toast.success('Audio file ready for metadata editing!')
      } else {
        toast.error('Please select an audio file')
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.ogg', '.m4a', '.aac']
    },
    multiple: false
  })

  const processAudio = async () => {
    if (!audioFile) {
      toast.error('Please select an audio file first')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', audioFile)
    formData.append('title', metadata.title)
    formData.append('artist', metadata.artist)
    formData.append('album', metadata.album)
    formData.append('year', metadata.year)

    try {
      const response = await axios.post('http://localhost:8000/metadata-editor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setProcessedAudio(audioUrl)
      toast.success('Metadata updated successfully!')
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadAudio = () => {
    if (processedAudio) {
      const a = document.createElement('a')
      a.href = processedAudio
      a.download = `${audioFile.name.replace(/\.[^/.]+$/, '')}_updated_metadata.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <>
      <Head>
        <title>Metadata Editor - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Edit audio metadata, MP3 tags, and organize your music library" />
      </Head>

      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <ArrowLeft className="w-5 h-5" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-slate-600 rounded-lg flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Metadata Editor</span>
                </div>
              </Link>
              <div className="text-sm text-gray-500">ODOREMOVER Audio Suite</div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Metadata Editor</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Edit audio metadata, MP3 tags, and organize your music library with professional tagging
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Upload Audio</h2>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-gray-500 bg-gray-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                {audioFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{audioFile.name}</p>
                    <p className="text-gray-500">Ready for metadata editing</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your audio file here</p>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Audio Metadata</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={metadata.title}
                    onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                    placeholder="Song title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
                  <input
                    type="text"
                    value={metadata.artist}
                    onChange={(e) => setMetadata({...metadata, artist: e.target.value})}
                    placeholder="Artist name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Album</label>
                  <input
                    type="text"
                    value={metadata.album}
                    onChange={(e) => setMetadata({...metadata, album: e.target.value})}
                    placeholder="Album name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={metadata.year}
                    onChange={(e) => setMetadata({...metadata, year: e.target.value})}
                    placeholder="Release year"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={processAudio}
                disabled={!audioFile || isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                  !audioFile || isProcessing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {isProcessing ? 'Updating Metadata...' : 'Update Metadata'}
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
              
              {processedAudio ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Audio with Updated Metadata</h3>
                    <audio controls className="w-full mb-4">
                      <source src={processedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button
                      onClick={downloadAudio}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download with Updated Tags</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                  <FileMusic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Updated audio will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}