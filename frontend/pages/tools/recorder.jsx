import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Download, 
  ArrowLeft,
  Volume2,
  Loader2,
  CheckCircle,
  AlertCircle,
  RotateCcw
} from 'lucide-react'

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(audioBlob)
        setAudioUrl(URL.createObjectURL(audioBlob))
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start(100)
      setIsRecording(true)
      setIsPaused(false)
      setRecordingTime(0)
      setError('')
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      
    } catch (err) {
      setError('Could not access microphone. Please check permissions.')
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `recording-${Date.now()}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const reset = () => {
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingTime(0)
    setIsPlaying(false)
    setError('')
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <>
      <Head>
        <title>Audio Recorder - Record High Quality Audio Online</title>
        <meta name="description" content="Record high quality audio directly from your microphone. Free online audio recorder with professional features." />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Audio Recorder</h1>
                    <p className="text-sm text-gray-400">Record High Quality Audio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Audio Recorder</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Record high quality audio directly from your microphone. Perfect for voice notes, 
              music recordings, interviews, and more.
            </p>
          </div>

          {/* Recording Interface */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mb-8">
            {/* Recording Status */}
            <div className="text-center mb-8">
              <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center relative ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse' 
                  : 'bg-gray-700'
              }`}>
                <Mic className="w-16 h-16 text-white" />
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                )}
              </div>
              
              <div className="text-4xl font-mono font-bold mb-2">
                {formatTime(recordingTime)}
              </div>
              
              <p className="text-gray-400">
                {isRecording 
                  ? (isPaused ? 'Recording Paused' : 'Recording...') 
                  : audioBlob ? 'Recording Complete' : 'Ready to Record'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {!isRecording && !audioBlob && (
                <button
                  onClick={startRecording}
                  className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </button>
              )}

              {isRecording && !isPaused && (
                <>
                  <button
                    onClick={pauseRecording}
                    className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                  <button
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </button>
                </>
              )}

              {isRecording && isPaused && (
                <>
                  <button
                    onClick={resumeRecording}
                    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </button>
                  <button
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </button>
                </>
              )}

              {audioBlob && (
                <>
                  <button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadAudio}
                    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  <button
                    onClick={reset}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Audio Player */}
            {audioUrl && (
              <div className="mb-6">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full"
                  controls
                />
              </div>
            )}

            {/* Volume Visualization */}
            {isRecording && (
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div className="flex space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-gradient-to-t from-green-500 to-red-500 rounded-full animate-pulse ${
                        Math.random() > 0.5 ? 'h-6' : 'h-3'
                      }`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">High Quality</h3>
              <p className="text-gray-400 text-sm">Crystal clear audio recording with noise suppression</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Playback</h3>
              <p className="text-gray-400 text-sm">Play back your recording immediately after recording</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Download</h3>
              <p className="text-gray-400 text-sm">Download your recordings in high quality format</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}