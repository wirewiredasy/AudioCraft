import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, DownloadIcon } from 'lucide-react'

export default function Player({ 
  audioUrl, 
  fileName = "audio.wav",
  downloadUrl = null,
  showDownload = true,
  className = ""
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={`audio-player ${className}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* File Name */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-white truncate flex-1 mr-4">
          {fileName}
        </h4>
        {showDownload && downloadUrl && (
          <a
            href={downloadUrl}
            download={fileName}
            className="btn-success flex items-center space-x-2"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Download</span>
          </a>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div 
          className="progress-bar cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="audio-controls">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          disabled={!audioUrl}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>

        {/* Volume Controls */}
        <div className="flex items-center space-x-2 flex-1 ml-4">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>

      {/* Waveform Visualization (Placeholder) */}
      <div className="waveform mt-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="waveform-bar"
            style={{
              height: `${Math.random() * 60 + 10}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}