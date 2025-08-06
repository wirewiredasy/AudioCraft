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
            Vocal <span class="gradient-text">Remover</span>
          </h1>
          <div class="w-6"></div>
        </div>
        <p class="text-center text-white opacity-70 mt-2">
          Remove vocals from any audio track using AI-powered center channel extraction
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

          <!-- Process Button -->
          <div v-if="selectedFile && !isProcessing" class="mt-6 text-center">
            <button
              @click="processAudio"
              class="btn-primary px-8 py-3 text-lg font-semibold"
            >
              Remove Vocals
            </button>
          </div>

          <!-- Processing Status -->
          <div v-if="isProcessing" class="mt-6 text-center">
            <div class="animate-spin inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full mb-4"></div>
            <p class="text-white text-lg font-medium">Removing vocals...</p>
            <p class="text-white opacity-70">This may take a few minutes depending on file size</p>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="result" class="glass-card p-8">
          <h3 class="text-xl font-semibold text-white mb-4">✓ Processing Complete</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-lg">
              <div>
                <p class="text-white font-medium">Vocals Removed Audio</p>
                <p class="text-white opacity-70 text-sm">{{ result.message }}</p>
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
        <div v-if="errorMessage" class="glass-card p-6 border border-red-500 border-opacity-30">
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
        <div class="glass-card p-6 mt-6">
          <h3 class="text-lg font-semibold text-white mb-3">How It Works</h3>
          <ul class="text-white opacity-80 space-y-2 text-sm">
            <li>• Uses center channel extraction to isolate vocals</li>
            <li>• Processes stereo audio by subtracting left from right channel</li>
            <li>• Works best with music that has vocals centered in the mix</li>
            <li>• Results may vary depending on the original recording technique</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Vocal Remover - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Remove vocals from any audio track using AI-powered center channel extraction.' }
  ]
})

// Composables
const { removeVocals, getDownloadUrl } = useApi()

// Reactive state
const selectedFile = ref(null)
const isProcessing = ref(false)
const progress = ref(0)
const result = ref(null)
const errorMessage = ref('')
const showPreview = ref(false)
const audioPlayer = ref(null)

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

const processAudio = async () => {
  if (!selectedFile.value) return

  isProcessing.value = true
  progress.value = 0
  errorMessage.value = ''

  try {
    const response = await removeVocals(
      selectedFile.value,
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
    console.error('Vocal removal error:', error)
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
  resetState()
}

const resetState = () => {
  result.value = null
  errorMessage.value = ''
  isProcessing.value = false
  progress.value = 0
  showPreview.value = false
}
</script>