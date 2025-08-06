<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <!-- Header -->
    <header class="backdrop-blur-md bg-white/10 border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-white">ODOREMOVER</NuxtLink>
          </div>
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">Home</NuxtLink>
            <NuxtLink to="/tools" class="text-gray-300 hover:text-white transition-colors">Tools</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          3-Band Equalizer
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Adjust low, mid, and high frequencies to perfect your audio
        </p>
      </div>

      <!-- Upload Section -->
      <div class="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 mb-8">
        <Uploader 
          @file-selected="handleFileUpload"
          :is-processing="isProcessing"
          accept="audio/*"
          title="Upload Audio File"
          description="Select an audio file to apply equalizer settings"
        />

        <!-- EQ Controls -->
        <div v-if="selectedFile" class="mt-8 space-y-8">
          <!-- Low Frequency -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Low Frequency (0-300 Hz): {{ lowGain.toFixed(1) }} dB
            </label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.5"
              v-model="lowGain"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>-20 dB</span>
              <span>0 dB</span>
              <span>+20 dB</span>
            </div>
          </div>

          <!-- Mid Frequency -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Mid Frequency (300-3000 Hz): {{ midGain.toFixed(1) }} dB
            </label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.5"
              v-model="midGain"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>-20 dB</span>
              <span>0 dB</span>
              <span>+20 dB</span>
            </div>
          </div>

          <!-- High Frequency -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              High Frequency (3000+ Hz): {{ highGain.toFixed(1) }} dB
            </label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.5"
              v-model="highGain"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>-20 dB</span>
              <span>0 dB</span>
              <span>+20 dB</span>
            </div>
          </div>

          <!-- Preset Buttons -->
          <div class="flex flex-wrap gap-2 mb-4">
            <button @click="applyPreset('flat')" class="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
              Flat
            </button>
            <button @click="applyPreset('bass_boost')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
              Bass Boost
            </button>
            <button @click="applyPreset('vocal')" class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
              Vocal
            </button>
            <button @click="applyPreset('treble')" class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
              Treble
            </button>
          </div>

          <button
            @click="processAudio"
            :disabled="isProcessing"
            class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
          >
            {{ isProcessing ? 'Applying EQ...' : 'Apply Equalizer' }}
          </button>
        </div>

        <!-- Progress -->
        <div v-if="uploadProgress > 0" class="mt-4">
          <div class="bg-gray-700 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${uploadProgress}%` }"
            ></div>
          </div>
          <p class="text-sm text-gray-400 mt-1">{{ uploadProgress }}% complete</p>
        </div>

        <!-- Result -->
        <div v-if="result" class="mt-8 p-6 bg-green-500/20 border border-green-500/30 rounded-xl">
          <h3 class="text-lg font-semibold text-green-400 mb-2">✅ EQ Applied Successfully!</h3>
          <p class="text-gray-300 mb-4">{{ result.message }}</p>
          <a 
            :href="api.getDownloadUrl(result.output_file.replace('/download/', ''))"
            download
            class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Download Equalized Audio
          </a>
        </div>

        <!-- Error -->
        <div v-if="error" class="mt-8 p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
          <h3 class="text-lg font-semibold text-red-400 mb-2">❌ Error</h3>
          <p class="text-gray-300">{{ error }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const api = useApi()

// Meta
useHead({
  title: '3-Band Equalizer - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Professional 3-band audio equalizer' }
  ]
})

// Reactive data
const selectedFile = ref(null)
const isProcessing = ref(false)
const uploadProgress = ref(0)
const result = ref(null)
const error = ref(null)
const lowGain = ref(0)
const midGain = ref(0)
const highGain = ref(0)

// Methods
const handleFileUpload = (file) => {
  selectedFile.value = file
  result.value = null
  error.value = null
  uploadProgress.value = 0
}

const applyPreset = (preset) => {
  switch(preset) {
    case 'flat':
      lowGain.value = 0
      midGain.value = 0
      highGain.value = 0
      break
    case 'bass_boost':
      lowGain.value = 8
      midGain.value = 0
      highGain.value = -2
      break
    case 'vocal':
      lowGain.value = -2
      midGain.value = 6
      highGain.value = 2
      break
    case 'treble':
      lowGain.value = -4
      midGain.value = 0
      highGain.value = 8
      break
  }
}

const processAudio = async () => {
  if (!selectedFile.value) return
  
  isProcessing.value = true
  error.value = null
  result.value = null
  
  try {
    const response = await api.uploadFile('/equalizer', selectedFile.value, {
      low_gain: lowGain.value,
      mid_gain: midGain.value,
      high_gain: highGain.value
    }, (progress) => {
      uploadProgress.value = progress
    })
    
    result.value = response
    uploadProgress.value = 100
  } catch (err) {
    error.value = err.message || 'Failed to apply equalizer'
    uploadProgress.value = 0
  } finally {
    isProcessing.value = false
  }
}
</script>