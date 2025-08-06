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
          Volume Booster
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Enhance your audio volume with professional normalization and gain boost
        </p>
      </div>

      <!-- Upload Section -->
      <div class="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 mb-8">
        <Uploader 
          @file-selected="handleFileUpload"
          :is-processing="isProcessing"
          accept="audio/*"
          title="Upload Audio File"
          description="Select an audio file to boost its volume"
        />

        <!-- Volume Settings -->
        <div v-if="selectedFile" class="mt-8 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Volume Boost Factor: {{ boostFactor.toFixed(1) }}x
            </label>
            <input 
              type="range" 
              min="1.0" 
              max="5.0" 
              step="0.1"
              v-model="boostFactor"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1.0x (Original)</span>
              <span>5.0x (Maximum)</span>
            </div>
          </div>

          <button
            @click="processAudio"
            :disabled="isProcessing"
            class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
          >
            {{ isProcessing ? 'Boosting Volume...' : 'Boost Volume' }}
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
          <h3 class="text-lg font-semibold text-green-400 mb-2">✅ Volume Boosted Successfully!</h3>
          <p class="text-gray-300 mb-4">{{ result.message }}</p>
          <a 
            :href="api.getDownloadUrl(result.output_file.replace('/download/', ''))"
            download
            class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Download Enhanced Audio
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
  title: 'Volume Booster - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Boost audio volume with professional normalization' }
  ]
})

// Reactive data
const selectedFile = ref(null)
const isProcessing = ref(false)
const uploadProgress = ref(0)
const result = ref(null)
const error = ref(null)
const boostFactor = ref(2.0)

// Methods
const handleFileUpload = (file) => {
  selectedFile.value = file
  result.value = null
  error.value = null
  uploadProgress.value = 0
}

const processAudio = async () => {
  if (!selectedFile.value) return
  
  isProcessing.value = true
  error.value = null
  result.value = null
  
  try {
    const response = await api.uploadFile('/volume-boost', selectedFile.value, {
      boost_factor: boostFactor.value
    }, (progress) => {
      uploadProgress.value = progress
    })
    
    result.value = response
    uploadProgress.value = 100
  } catch (err) {
    error.value = err.message || 'Failed to boost volume'
    uploadProgress.value = 0
  } finally {
    isProcessing.value = false
  }
}
</script>