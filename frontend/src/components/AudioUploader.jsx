import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Paper, Typography, Box, Button } from '@mui/material'
import { CloudUpload, AudioFile } from '@mui/icons-material'

function AudioUploader({ onFileSelect, acceptedFormats = ['audio/*'], maxSize = 100 * 1024 * 1024 }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.error('File rejected:', rejectedFiles[0].errors)
      return
    }
    
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.webm']
    },
    maxSize,
    multiple: false
  })

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 4,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : isDragReject ? 'error.main' : 'grey.500',
        backgroundColor: isDragActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'rgba(59, 130, 246, 0.05)',
        }
      }}
    >
      <input {...getInputProps()} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {isDragActive ? (
          <CloudUpload sx={{ fontSize: 64, color: 'primary.main', animation: 'bounce 1s ease-in-out infinite' }} />
        ) : (
          <AudioFile sx={{ fontSize: 64, color: 'grey.400' }} />
        )}
        
        <Box>
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop your audio file here!' : 'Upload Audio File'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Drag & drop an audio file here, or click to select
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            Supported formats: MP3, WAV, FLAC, M4A, AAC, OGG, WebM
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB
          </Typography>
        </Box>
        
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Choose File
        </Button>
      </Box>
    </Paper>
  )
}

export default AudioUploader