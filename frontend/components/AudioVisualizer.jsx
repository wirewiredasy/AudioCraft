import React, { useRef, useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export const AudioVisualizer = ({ 
  audioFile, 
  isProcessing = false,
  progress = 0,
  onTimeUpdate,
  showControls = true,
  className = "" 
}) => {
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const animationRef = useRef(null)
  const analyzerRef = useRef(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioContext, setAudioContext] = useState(null)
  const [frequencyData, setFrequencyData] = useState(null)

  // Initialize audio context and analyzer
  useEffect(() => {
    if (audioFile && audioRef.current) {
      const initAudio = async () => {
        try {
          const context = new (window.AudioContext || window.webkitAudioContext)()
          const analyzer = context.createAnalyser()
          
          analyzer.fftSize = 256
          analyzer.smoothingTimeConstant = 0.8
          
          const source = context.createMediaElementSource(audioRef.current)
          source.connect(analyzer)
          analyzer.connect(context.destination)
          
          setAudioContext(context)
          analyzerRef.current = analyzer
          
          const bufferLength = analyzer.frequencyBinCount
          const dataArray = new Uint8Array(bufferLength)
          setFrequencyData(dataArray)
          
        } catch (error) {
          console.error('Error initializing audio context:', error)
        }
      }
      
      initAudio()
    }
    
    return () => {
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [audioFile])

  // Animation loop for waveform visualization
  useEffect(() => {
    if (!canvasRef.current || !analyzerRef.current || !frequencyData) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const analyzer = analyzerRef.current
    
    const animate = () => {
      if (!analyzer || !frequencyData) return
      
      analyzer.getByteFrequencyData(frequencyData)
      
      // Clear canvas
      ctx.fillStyle = 'rgba(17, 24, 39, 0.3)' // bg-gray-900 with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw waveform
      const barWidth = canvas.width / frequencyData.length
      let barHeight
      let x = 0
      
      for (let i = 0; i < frequencyData.length; i++) {
        barHeight = (frequencyData[i] / 255) * canvas.height * 0.8
        
        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, '#3B82F6') // blue-500
        gradient.addColorStop(0.5, '#8B5CF6') // purple-500
        gradient.addColorStop(1, '#EC4899') // pink-500
        
        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)
        
        x += barWidth
      }
      
      // Draw progress overlay if processing
      if (isProcessing) {
        const progressWidth = (progress / 100) * canvas.width
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)' // green overlay
        ctx.fillRect(0, 0, progressWidth, canvas.height)
        
        // Progress text
        ctx.fillStyle = '#ffffff'
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`Processing: ${progress.toFixed(1)}%`, canvas.width / 2, canvas.height / 2)
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    if (isPlaying || isProcessing) {
      animate()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, isProcessing, progress, frequencyData])

  // Audio event handlers
  const handlePlay = async () => {
    if (!audioRef.current) return
    
    try {
      if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume()
      }
      
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      setCurrentTime(current)
      if (onTimeUpdate) {
        onTimeUpdate(current)
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const seekTime = (x / canvas.width) * duration
    
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`relative bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden ${className}`}>
      {/* Audio Element */}
      {audioFile && (
        <audio
          ref={audioRef}
          src={audioFile}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      
      {/* Canvas for Visualization */}
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        onClick={handleSeek}
        className="w-full h-48 cursor-pointer hover:bg-gray-800/20 transition-colors"
        style={{ display: 'block' }}
      />
      
      {/* Progress Timeline */}
      {duration > 0 && (
        <div className="absolute bottom-16 left-0 right-0 mx-4">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            {/* Play/Pause Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                disabled={!audioFile || isProcessing}
                className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              
              {/* Volume Control */}
              <button
                onClick={toggleMute}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Time Display */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Processing Status */}
            {isProcessing && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Processing...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AudioVisualizer