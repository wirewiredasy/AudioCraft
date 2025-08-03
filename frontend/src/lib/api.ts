import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes for file processing
})

export interface AudioProcessingResponse {
  message: string
  status: string
  [key: string]: any
}

export const audioApi = {
  // Remove vocals from audio file
  removeVocals: async (file: File): Promise<AudioProcessingResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/remove-vocals', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Adjust pitch and tempo
  adjustPitchTempo: async (
    file: File, 
    pitchShift: number = 0, 
    tempoChange: number = 1
  ): Promise<AudioProcessingResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('pitch_shift', pitchShift.toString())
    formData.append('tempo_change', tempoChange.toString())
    
    const response = await api.post('/adjust-pitch-tempo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Convert audio format
  convertFormat: async (
    file: File, 
    targetFormat: string
  ): Promise<AudioProcessingResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_format', targetFormat)
    
    const response = await api.post('/convert-format', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Cut or join audio
  cutJoinAudio: async (
    file: File,
    operation: 'cut' | 'join',
    startTime?: number,
    endTime?: number,
    joinFile?: File
  ): Promise<AudioProcessingResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('operation', operation)
    
    if (startTime !== undefined) {
      formData.append('start_time', startTime.toString())
    }
    if (endTime !== undefined) {
      formData.append('end_time', endTime.toString())
    }
    if (joinFile) {
      formData.append('join_file', joinFile)
    }
    
    const response = await api.post('/cut-join-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Reduce noise
  reduceNoise: async (
    file: File, 
    noiseReductionStrength: number = 0.5
  ): Promise<AudioProcessingResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('noise_reduction_strength', noiseReductionStrength.toString())
    
    const response = await api.post('/reduce-noise', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get health status
  getHealthStatus: async () => {
    const response = await api.get('/health')
    return response.data
  },

  // Play audio
  playAudio: async (fileId: string) => {
    const response = await api.get(`/play/${fileId}`)
    return response.data
  }
}