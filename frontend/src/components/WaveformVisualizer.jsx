import React, { useEffect, useRef, useState } from 'react'
import { Paper, Box, Typography } from '@mui/material'
import WaveSurfer from 'wavesurfer.js'

function WaveformVisualizer({ audioFile, onReady, height = 128 }) {
  const waveformRef = useRef(null)
  const wavesurferRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (waveformRef.current) {
      // Initialize WaveSurfer
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#06b6d4',
        progressColor: '#3b82f6',
        cursorColor: '#ef4444',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: height,
        normalize: true,
        backend: 'WebAudio',
        mediaControls: false,
      })

      // Event listeners
      wavesurferRef.current.on('ready', () => {
        setIsLoading(false)
        if (onReady) onReady(wavesurferRef.current)
      })

      wavesurferRef.current.on('loading', (percent) => {
        setIsLoading(true)
      })
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy()
      }
    }
  }, [height, onReady])

  useEffect(() => {
    if (audioFile && wavesurferRef.current) {
      setIsLoading(true)
      
      if (audioFile instanceof File) {
        // Load from File object
        wavesurferRef.current.loadBlob(audioFile)
      } else if (typeof audioFile === 'string') {
        // Load from URL
        wavesurferRef.current.load(audioFile)
      }
    }
  }, [audioFile])

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Audio Waveform
      </Typography>
      
      <Box 
        ref={waveformRef}
        sx={{
          width: '100%',
          minHeight: height,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 1,
          position: 'relative',
        }}
      />
      
      {isLoading && (
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <div className="processing-spinner" />
          <Typography variant="body2">Loading waveform...</Typography>
        </Box>
      )}
    </Paper>
  )
}

export default WaveformVisualizer