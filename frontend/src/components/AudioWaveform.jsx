import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { motion } from 'framer-motion'
import { 
  IconButton, 
  Box, 
  Typography, 
  Slider, 
  Paper,
  LinearProgress 
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Stop,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material'

function AudioWaveform({ audioUrl, height = 128, color = '#2563eb' }) {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (waveformRef.current && audioUrl) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: color,
        progressColor: '#1d4ed8',
        cursorColor: '#ffffff',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: height,
        normalize: true,
        backend: 'WebAudio',
        mediaControls: false,
      })

      wavesurfer.current.load(audioUrl)

      wavesurfer.current.on('ready', () => {
        setIsLoading(false)
        setDuration(wavesurfer.current.getDuration())
        wavesurfer.current.setVolume(volume)
      })

      wavesurfer.current.on('play', () => setIsPlaying(true))
      wavesurfer.current.on('pause', () => setIsPlaying(false))
      wavesurfer.current.on('finish', () => setIsPlaying(false))

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current.getCurrentTime())
      })

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy()
        }
      }
    }
  }, [audioUrl, height, color])

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause()
    }
  }

  const handleStop = () => {
    if (wavesurfer.current) {
      wavesurfer.current.stop()
    }
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100)
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newValue / 100)
    }
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(isMuted ? volume : 0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!audioUrl) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(29, 78, 216, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(37, 99, 235, 0.2)'
        }}
      >
        {/* Waveform Container */}
        <Box sx={{ mb: 2, position: 'relative' }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
              <LinearProgress sx={{ borderRadius: 1 }} />
            </Box>
          )}
          <div 
            ref={waveformRef}
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              opacity: isLoading ? 0.5 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Play/Pause/Stop */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={handlePlayPause}
              disabled={isLoading}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton 
              onClick={handleStop} 
              disabled={isLoading}
            >
              <Stop />
            </IconButton>
          </Box>

          {/* Time Display */}
          <Typography variant="body2" sx={{ minWidth: '80px', fontFamily: 'monospace' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>

          {/* Volume Control */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <IconButton onClick={handleMute} size="small">
              {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              sx={{ maxWidth: 100 }}
              size="small"
            />
          </Box>
        </Box>
      </Paper>
    </motion.div>
  )
}

export default AudioWaveform