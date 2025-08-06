import axios from 'axios'

export const useApi = () => {
  const config = useRuntimeConfig()

  // Try multiple API endpoints with proper URLs
  const apiUrls = [
    config.public.apiBase,
    'http://0.0.0.0:5000',
    'http://localhost:5000',
    window.location.origin.replace(':3000', ':5000')
  ]

  const api = axios.create({
    timeout: 30000, // 30 seconds timeout
    headers: {
      'Content-Type': 'application/json',
    },
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

    // Try to find a working API endpoint
    let workingBaseUrl: string | null = null;
    for (const baseURL of apiUrls) {
      try {
        // First, check health to ensure the endpoint is responsive
        await axios.get(`${baseURL}/health`, { timeout: 5000 });
        workingBaseUrl = baseURL;
        break; // Found a working endpoint
      } catch (error) {
        console.warn('⚠️ Health check failed for:', baseURL);
      }
    }

    if (!workingBaseUrl) {
      throw new Error('Backend not accessible');
    }

    try {
      const response = await api.post(`${workingBaseUrl}${endpoint}`, formData, {
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

    // Try to find a working API endpoint
    let workingBaseUrl: string | null = null;
    for (const baseURL of apiUrls) {
      try {
        await axios.get(`${baseURL}/health`, { timeout: 5000 });
        workingBaseUrl = baseURL;
        break;
      } catch (error) {
        console.warn('⚠️ Health check failed for:', baseURL);
      }
    }

    if (!workingBaseUrl) {
      throw new Error('Backend not accessible');
    }

    try {
      const response = await api.post(`${workingBaseUrl}/cut-join-audio`, formData, {
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

  // Get API health status with fallback
  const getHealthStatus = async () => {
    const errors = []

    for (const baseURL of apiUrls) {
      try {
        const response = await axios.get(`${baseURL}/health`, { timeout: 10000 })
        console.log('✅ API Connection Success:', baseURL, response.data)
        return response.data
      } catch (error) {
        console.warn('⚠️ API Failed:', baseURL)
        errors.push({ url: baseURL, error })
      }
    }

    console.error('❌ All API endpoints failed:', errors)
    throw new Error('Backend not accessible')
  }

  // Get download URL
  const getDownloadUrl = (filename: string) => {
    // Attempt to find a working URL for download
    // In a real app, you might want to store the working URL from getHealthStatus
    for (const baseURL of apiUrls) {
      // Basic check: if the URL seems valid and has a port
      if (baseURL && baseURL.includes(':')) {
        return `${baseURL}/download/${filename}`;
      }
    }
    // Fallback if no working URL found (though getHealthStatus should have thrown an error)
    return `${config.public.apiBase}/download/${filename}`;
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