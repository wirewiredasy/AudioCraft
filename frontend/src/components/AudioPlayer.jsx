import React, { useState, useRef, useEffect } from 'react'
import { Paper, IconButton, Slider, Typography, Box } from '@mui/material'
import { PlayArrow, Pause, VolumeUp, VolumeDown } from '@mui/icons-material'
import { Howl } from 'howler'

function AudioPlayer({ src, title = 'Audio Track' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const soundRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (src) {
      // Clean up previous sound
      if (soundRef.current) {
        soundRef.current.unload()
      }

      soundRef.current = new Howl({
        src: [src],
        volume: volume,
        onload: () => {
          setDuration(soundRef.current.duration())
        },
        onplay: () => {
          setIsPlaying(true)
          updateProgress()
        },
        onpause: () => {
          setIsPlaying(false)
          clearInterval(intervalRef.current)
        },
        onstop: () => {
          setIsPlaying(false)
          setCurrentTime(0)
          clearInterval(intervalRef.current)
        },
        onend: () => {
          setIsPlaying(false)
          setCurrentTime(0)
          clearInterval(intervalRef.current)
        }
      })
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [src])

  const updateProgress = () => {
    intervalRef.current = setInterval(() => {
      if (soundRef.current && soundRef.current.playing()) {
        setCurrentTime(soundRef.current.seek())
      }
    }, 100)
  }

  const togglePlayPause = () => {
    if (!soundRef.current) return

    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
  }

  const handleSeek = (event, newValue) => {
    if (soundRef.current) {
      soundRef.current.seek(newValue)
      setCurrentTime(newValue)
    }
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue)
    if (soundRef.current) {
      soundRef.current.volume(newValue)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!src) {
    return null
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={togglePlayPause}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Slider
            value={currentTime}
            max={duration || 100}
            onChange={handleSeek}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="caption">
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>

        <VolumeDown />
        <Slider
          value={volume}
          min={0}
          max={1}
          step={0.1}
          onChange={handleVolumeChange}
          sx={{ width: 100 }}
        />
        <VolumeUp />
      </Box>
    </Paper>
  )
}

export default AudioPlayer