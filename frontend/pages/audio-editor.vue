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
            Audio <span class="gradient-text">Editor</span>
          </h1>
          <div class="w-6"></div>
        </div>
        <p class="text-center text-white opacity-70 mt-2">
          Cut, trim, and join audio files with precision timing controls
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 pb-16">
      <div class="max-w-2xl mx-auto">
        <!-- Operation Selection -->
        <div class="glass-card p-8 mb-6">
          <h2 class="text-xl font-semibold text-white mb-6">Choose Operation</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              @click="operation = 'cut'"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-left',
                operation === 'cut'
                  ? 'border-purple-400 bg-purple-500 bg-opacity-20'
                  : 'border-white border-opacity-20 bg-white bg-opacity-5 hover:border-opacity-40'
              ]"
            >
              <div class="flex items-center">
                <svg class="h-8 w-8 text-purple-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-6V8a4 4 0 00-8 0v2m7 4v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1"></path>
                </svg>
                <div>
                  <p class="text-white font-semibold">Cut Audio</p>
                  <p class="text-white opacity-70 text-sm">Extract a segment from audio</p>
                </div>
              </div>
            </button>

            <button
              @click="operation = 'join'"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-left',
                operation === 'join'
                  ? 'border-purple-400 bg-purple-500 bg-opacity-20'
                  : 'border-white border-opacity-20 bg-white bg-opacity-5 hover:border-opacity-40'
              ]"
            >
              <div class="flex items-center">
                <svg class="h-8 w-8 text-blue-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                <div>
                  <p class="text-white font-semibold">Join Audio</p>
                  <p class="text-white opacity-70 text-sm">Combine two audio files</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Upload Section -->
        <div class="glass-card p-8 mb-6">
          <h2 class="text-xl font-semibold text-white mb-6">
            Upload {{ operation === 'join' ? 'First' : '' }} Audio File
          </h2>
          
          <Uploader
            v-model="selectedFile"
            :is-uploading="isProcessing"
            :upload-progress="progress"
            @file-selected="handleFileSelected"
          />
        </div>

        <!-- Second File Upload (for join operation) -->
        <div v-if="operation === 'join' && selectedFile" class="glass-card p-8 mb-6">
          <h2 class="text-xl font-semibold text-white mb-6">Upload Second Audio File</h2>
          
          <Uploader
            v-model="secondFile"
            :is-uploading="isProcessing"
            @file-selected="handleSecondFileSelected"
          />
        </div>

        <!-- Cut Settings -->
        <div v-if="operation === 'cut' && selectedFile && !isProcessing" class="glass-card p-8 mb-6">
          <h3 class="text-xl font-semibold text-white mb-6">Cut Settings</h3>
          
          <div class="space-y-6">
            <!-- Start Time -->
            <div>
              <label class="block text-white font-medium mb-2">Start Time (seconds)</label>
              <input
                v-model="startTime"
                type="number"
                step="0.1"
                min="0"
                placeholder="0"
                class="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <!-- End Time -->
            <div>
              <label class="block text-white font-medium mb-2">End Time (seconds)</label>
              <input
                v-model="endTime"
                type="number"
                step="0.1"
                min="0"
                placeholder="10"
                class="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <!-- Duration Info -->
            <div v-if="startTime && endTime" class="bg-white bg-opacity-10 rounded-lg p-4">
              <p class="text-white font-medium">Duration: {{ (endTime - startTime).toFixed(1) }} seconds</p>
            </div>
          </div>

          <!-- Process Button -->
          <div class="mt-6 text-center">
            <button
              @click="processAudio"
              :disabled="!startTime || !endTime || parseFloat(endTime) <= parseFloat(startTime)"
              class="btn-primary px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cut Audio
            </button>
          </div>
        </div>

        <!-- Join Settings -->
        <div v-if="operation === 'join' && selectedFile && secondFile && !isProcessing" class="glass-card p-8 mb-6">
          <h3 class="text-xl font-semibold text-white mb-6">Join Settings</h3>
          
          <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
            <p class="text-white font-medium mb-2">Files to Join:</p>
            <div class="space-y-2 text-white opacity-80 text-sm">
              <p>1. {{ selectedFile.name }}</p>
              <p>2. {{ secondFile.name }}</p>
            </div>
          </div>

          <!-- Process Button -->
          <div class="text-center">
            <button
              @click="processAudio"
              class="btn-primary px-8 py-3 text-lg font-semibold"
            >
              Join Audio Files
            </button>
          </div>
        </div>

        <!-- Processing Status -->
        <div v-if="isProcessing" class="glass-card p-8 mb-6">
          <div class="text-center">
            <div class="animate-spin inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full mb-4"></div>
            <p class="text-white text-lg font-medium">
              {{ operation === 'cut' ? 'Cutting' : 'Joining' }} audio...
            </p>
            <p class="text-white opacity-70">Processing your request</p>
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
          <h3 class="text-xl font-semibold text-white mb-4">✓ Processing Complete</h3>
          
          <!-- Operation Summary -->
          <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
            <p class="text-white font-medium mb-2">Operation Details:</p>
            <div class="text-white opacity-80 text-sm space-y-1">
              <p>• Operation: {{ result.operation?.toUpperCase() }}</p>
              <p v-if="operation === 'cut'">• Duration: {{ (endTime - startTime).toFixed(1) }} seconds</p>
              <p v-if="operation === 'join'">• Files combined: 2</p>
              <p>• Status: {{ result.message }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-lg">
              <div>
                <p class="text-white font-medium">Processed Audio</p>
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
                <source :src="downloadUrl" type="audio/wav">
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
              Process Another File
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
              <p class="font-medium">Processing Failed</p>
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
          <h3 class="text-lg font-semibold text-white mb-3">Usage Tips</h3>
          <ul class="text-white opacity-80 space-y-2 text-sm">
            <li>• <strong>Cut:</strong> Extract specific segments by setting start and end times</li>
            <li>• <strong>Join:</strong> Combine two audio files in sequence</li>
            <li>• Use decimal values for precise timing (e.g., 1.5 seconds)</li>
            <li>• Joined files will be output in WAV format for compatibility</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Audio Editor - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Cut, trim, and join audio files with precision timing controls.' }
  ]
})

// Composables
const { cutJoinAudio, getDownloadUrl } = useApi()

// Reactive state
const selectedFile = ref(null)
const secondFile = ref(null)
const isProcessing = ref(false)
const progress = ref(0)
const result = ref(null)
const errorMessage = ref('')
const showPreview = ref(false)
const audioPlayer = ref(null)

// Operation settings
const operation = ref('cut')
const startTime = ref('')
const endTime = ref('')

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
}

const handleSecondFileSelected = (file) => {
  secondFile.value = file
}

const processAudio = async () => {
  if (!selectedFile.value) return
  if (operation.value === 'join' && !secondFile.value) return
  if (operation.value === 'cut' && (!startTime.value || !endTime.value)) return

  isProcessing.value = true
  progress.value = 0
  errorMessage.value = ''

  try {
    const options = {}
    
    if (operation.value === 'cut') {
      options.startTime = parseFloat(startTime.value)
      options.endTime = parseFloat(endTime.value)
    } else if (operation.value === 'join') {
      options.joinFile = secondFile.value
    }

    const response = await cutJoinAudio(
      selectedFile.value,
      operation.value,
      options,
      (progressValue) => {
        progress.value = progressValue
      }
    )

    if (response.success) {
      result.value = response
    } else {
      throw new Error(response.error || 'Processing failed')
    }
  } catch (error) {
    console.error('Audio editing error:', error)
    errorMessage.value = error.response?.data?.error || error.message || 'An error occurred during processing'
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
  secondFile.value = null
  startTime.value = ''
  endTime.value = ''
  operation.value = 'cut'
  resetState()
}

const resetState = () => {
  result.value = null
  errorMessage.value = ''
  isProcessing.value = false
  progress.value = 0
  showPreview.value = false
}

// Watch operation change to reset files
watch(operation, () => {
  if (operation.value === 'cut') {
    secondFile.value = null
  }
  resetState()
})
</script>