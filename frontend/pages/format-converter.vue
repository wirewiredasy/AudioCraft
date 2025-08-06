<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <!-- Header -->
    <header class="pt-8 pb-4">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-white hover:text-purple-300 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </NuxtLink>
          <h1 class="text-3xl md:text-4xl font-bold text-white">
            Format <span class="gradient-text">Converter</span>
          </h1>
          <div class="w-6"></div>
        </div>
        <p class="text-center text-white opacity-70 mt-2">
          Convert between all major audio formats with customizable quality
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 pb-16">
      <div class="max-w-2xl mx-auto">
        <!-- Upload Section -->
        <div class="glass-card p-8 mb-6">
          <h2 class="text-xl font-semibold text-white mb-6">Upload Audio File</h2>
          
          <Uploader
            v-model="selectedFile"
            :is-uploading="isProcessing"
            :upload-progress="progress"
            @file-selected="handleFileSelected"
          />
        </div>

        <!-- Format Selection -->
        <div v-if="selectedFile && !isProcessing" class="glass-card p-8 mb-6">
          <h3 class="text-xl font-semibold text-white mb-6">Convert To</h3>
          
          <!-- Current Format Info -->
          <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
            <p class="text-white font-medium mb-2">Current Format</p>
            <p class="text-white opacity-80">{{ getCurrentFormat() }}</p>
          </div>

          <!-- Format Options -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div
              v-for="format in formats"
              :key="format.value"
              @click="selectedFormat = format.value"
              :class="[
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                selectedFormat === format.value
                  ? 'border-purple-400 bg-purple-500 bg-opacity-20'
                  : 'border-white border-opacity-20 bg-white bg-opacity-5 hover:border-opacity-40'
              ]"
            >
              <div class="text-center">
                <p class="text-white font-semibold">{{ format.label }}</p>
                <p class="text-white opacity-60 text-sm">{{ format.description }}</p>
              </div>
            </div>
          </div>

          <!-- Process Button -->
          <div class="text-center">
            <button
              @click="processAudio"
              :disabled="!selectedFormat || selectedFormat === getCurrentFormat()"
              class="btn-primary px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Convert to {{ selectedFormat?.toUpperCase() || 'Format' }}
            </button>
            <p v-if="selectedFormat === getCurrentFormat()" class="text-white opacity-60 text-sm mt-2">
              File is already in {{ selectedFormat }} format
            </p>
          </div>
        </div>

        <!-- Processing Status -->
        <div v-if="isProcessing" class="glass-card p-8 mb-6">
          <div class="text-center">
            <div class="animate-spin inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full mb-4"></div>
            <p class="text-white text-lg font-medium">Converting audio...</p>
            <p class="text-white opacity-70">Converting to {{ selectedFormat?.toUpperCase() }}</p>
            <div v-if="progress > 0" class="mt-4">
              <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  class="progress-bar h-2"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
              <p class="text-sm text-white opacity-75 mt-2">{{ progress }}% complete</p>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="result" class="glass-card p-8 mb-6">
          <h3 class="text-xl font-semibold text-white mb-4">✓ Conversion Complete</h3>
          
          <!-- Conversion Summary -->
          <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
            <p class="text-white font-medium mb-2">Conversion Details:</p>
            <div class="text-white opacity-80 text-sm space-y-1">
              <p>• Original: {{ getFileExtension(selectedFile.name).toUpperCase() }}</p>
              <p>• Converted to: {{ result.target_format?.toUpperCase() }}</p>
              <p>• Status: {{ result.message }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-lg">
              <div>
                <p class="text-white font-medium">Converted Audio</p>
                <p class="text-white opacity-70 text-sm">Ready for download</p>
              </div>
              <div class="flex space-x-2">
                <!-- Preview Button -->
                <button
                  @click="previewAudio"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-6V8a4 4 0 00-8 0v2m7 4v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1"></path>
                  </svg>
                </button>
                <!-- Download Button -->
                <a
                  :href="downloadUrl"
                  download
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8"></path>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Audio Preview -->
            <div v-if="showPreview" class="p-4 bg-white bg-opacity-10 rounded-lg">
              <p class="text-white font-medium mb-2">Audio Preview</p>
              <audio ref="audioPlayer" controls class="w-full">
                <source :src="downloadUrl" :type="'audio/' + result.target_format">
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          <!-- Process Another File -->
          <div class="mt-6 text-center">
            <button
              @click="resetForm"
              class="text-white border border-white border-opacity-30 hover:border-opacity-50 px-6 py-2 rounded-lg transition-colors"
            >
              Convert Another File
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="glass-card p-6 border border-red-500 border-opacity-30 mb-6">
          <div class="flex items-center text-red-300">
            <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="font-medium">Conversion Failed</p>
              <p class="text-sm opacity-75">{{ errorMessage }}</p>
            </div>
          </div>
          <button
            @click="resetForm"
            class="mt-4 text-white border border-white border-opacity-30 hover:border-opacity-50 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Try Again
          </button>
        </div>

        <!-- Info Section -->
        <div class="glass-card p-6">
          <h3 class="text-lg font-semibold text-white mb-3">Format Information</h3>
          <ul class="text-white opacity-80 space-y-2 text-sm">
            <li>• <strong>MP3:</strong> Widely compatible, good compression</li>
            <li>• <strong>WAV:</strong> Uncompressed, highest quality</li>
            <li>• <strong>FLAC:</strong> Lossless compression, high quality</li>
            <li>• <strong>M4A:</strong> Good quality, Apple ecosystem friendly</li>
            <li>• <strong>OGG:</strong> Open source, good compression</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Audio Format Converter - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Convert between all major audio formats with customizable quality.' }
  ]
})

// Composables
const { convertFormat, getDownloadUrl } = useApi()

// Reactive state
const selectedFile = ref(null)
const isProcessing = ref(false)
const progress = ref(0)
const result = ref(null)
const errorMessage = ref('')
const showPreview = ref(false)
const audioPlayer = ref(null)
const selectedFormat = ref('mp3')

// Format options
const formats = [
  { value: 'mp3', label: 'MP3', description: 'Universal' },
  { value: 'wav', label: 'WAV', description: 'Uncompressed' },
  { value: 'flac', label: 'FLAC', description: 'Lossless' },
  { value: 'm4a', label: 'M4A', description: 'Apple' },
  { value: 'ogg', label: 'OGG', description: 'Open Source' },
  { value: 'aac', label: 'AAC', description: 'Advanced' }
]

// Computed
const downloadUrl = computed(() => {
  if (!result.value) return ''
  const filename = result.value.output_file.replace('/download/', '')
  return getDownloadUrl(filename)
})

// Methods
const handleFileSelected = (file) => {
  selectedFile.value = file
  resetState()
  
  // Set default conversion format based on current format
  const currentFormat = getCurrentFormat()
  selectedFormat.value = currentFormat === 'mp3' ? 'wav' : 'mp3'
}

const getCurrentFormat = () => {
  if (!selectedFile.value) return ''
  return getFileExtension(selectedFile.value.name).toLowerCase().replace('.', '')
}

const processAudio = async () => {
  if (!selectedFile.value || !selectedFormat.value) return

  isProcessing.value = true
  progress.value = 0
  errorMessage.value = ''

  try {
    const response = await convertFormat(
      selectedFile.value,
      selectedFormat.value,
      (progressValue) => {
        progress.value = progressValue
      }
    )

    if (response.success) {
      result.value = response
    } else {
      throw new Error(response.error || 'Conversion failed')
    }
  } catch (error) {
    console.error('Format conversion error:', error)
    errorMessage.value = error.response?.data?.error || error.message || 'An error occurred during conversion'
  } finally {
    isProcessing.value = false
    progress.value = 0
  }
}

const previewAudio = () => {
  showPreview.value = !showPreview.value
  if (showPreview.value && audioPlayer.value) {
    nextTick(() => {
      audioPlayer.value.load()
    })
  }
}

const resetForm = () => {
  selectedFile.value = null
  selectedFormat.value = 'mp3'
  resetState()
}

const resetState = () => {
  result.value = null
  errorMessage.value = ''
  isProcessing.value = false
  progress.value = 0
  showPreview.value = false
}

const getFileExtension = (filename) => {
  return filename.slice(filename.lastIndexOf('.'))
}
</script>