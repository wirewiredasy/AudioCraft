import axios from 'axios'

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const api = axios.create({
    baseURL: apiBase,
    timeout: 300000, // 5 minutes for long audio processing
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // Upload file with progress tracking
  const uploadFile = async (
    endpoint: string, 
    file: File, 
    additionalData: Record<string, any> = {},
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData()
    formData.append('file', file)
    
    // Add additional form data
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key])
    })

    try {
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })
      return response.data
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  // Remove vocals from audio
  const removeVocals = async (file: File, onProgress?: (progress: number) => void) => {
    return uploadFile('/remove-vocals', file, {}, onProgress)
  }

  // Adjust pitch and tempo
  const adjustPitchTempo = async (
    file: File, 
    pitchShift: number = 0, 
    tempoChange: number = 1,
    onProgress?: (progress: number) => void
  ) => {
    return uploadFile('/adjust-pitch-tempo', file, {
      pitch_shift: pitchShift,
      tempo_change: tempoChange
    }, onProgress)
  }

  // Convert audio format
  const convertFormat = async (
    file: File, 
    targetFormat: string,
    onProgress?: (progress: number) => void
  ) => {
    return uploadFile('/convert-format', file, {
      target_format: targetFormat
    }, onProgress)
  }

  // Cut or join audio
  const cutJoinAudio = async (
    file: File,
    operation: 'cut' | 'join',
    options: {
      startTime?: number
      endTime?: number
      joinFile?: File
    } = {},
    onProgress?: (progress: number) => void
  ) => {
    const additionalData: Record<string, any> = { operation }
    
    if (options.startTime !== undefined) additionalData.start_time = options.startTime
    if (options.endTime !== undefined) additionalData.end_time = options.endTime

    const formData = new FormData()
    formData.append('file', file)
    formData.append('operation', operation)
    
    if (options.startTime !== undefined) formData.append('start_time', options.startTime.toString())
    if (options.endTime !== undefined) formData.append('end_time', options.endTime.toString())
    if (options.joinFile) formData.append('join_file', options.joinFile)

    try {
      const response = await api.post('/cut-join-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })
      return response.data
    } catch (error) {
      console.error('Cut/Join error:', error)
      throw error
    }
  }

  // Reduce noise
  const reduceNoise = async (
    file: File,
    strength: number = 0.5,
    onProgress?: (progress: number) => void
  ) => {
    return uploadFile('/reduce-noise', file, {
      noise_reduction_strength: strength
    }, onProgress)
  }

  // Get API health status
  const getHealthStatus = async () => {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      console.error('Health check error:', error)
      throw error
    }
  }

  // Get download URL
  const getDownloadUrl = (filename: string) => {
    return `${apiBase}/download/${filename}`
  }

  return {
    removeVocals,
    adjustPitchTempo,
    convertFormat,
    cutJoinAudio,
    reduceNoise,
    getHealthStatus,
    getDownloadUrl
  }
}