
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000'
  : `${window.location.protocol}//${window.location.hostname}:5000`;

export const api = {
  removeVocals: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/remove-vocals`, {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },

  adjustPitchTempo: async (file: File, pitchShift: number, tempoChange: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pitch_shift', pitchShift.toString());
    formData.append('tempo_change', tempoChange.toString());
    
    const response = await fetch(`${API_BASE_URL}/adjust-pitch-tempo`, {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },

  convertFormat: async (file: File, targetFormat: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_format', targetFormat);
    
    const response = await fetch(`${API_BASE_URL}/convert-format`, {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },

  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
};
