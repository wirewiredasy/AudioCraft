<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <header class="w-full px-6 py-4">
      <nav class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-black rounded transform rotate-45"></div>
          <span class="text-xl font-bold text-black">Odoremover</span>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-600 hover:text-black font-medium">Home</a>
          <a href="#" class="text-gray-600 hover:text-black font-medium">Pricing</a>
          <a href="#" class="text-gray-600 hover:text-black font-medium">Privacy</a>
          <a href="#" class="text-gray-600 hover:text-black font-medium">About</a>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <button class="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button class="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600">
            Eliodier
          </button>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-12">
      <!-- Title -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold text-black mb-6">OdoRemover</h1>
        <div class="flex justify-center space-x-4">
          <button 
            @click="activeTab = 'vulcu'"
            :class="[
              'px-8 py-3 rounded-full font-medium transition-all',
              activeTab === 'vulcu' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            ]"
          >
            Vulcu Hou
          </button>
          <button 
            @click="activeTab = 'devlogy'"
            :class="[
              'px-8 py-3 rounded-full font-medium transition-all',
              activeTab === 'devlogy' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            ]"
          >
            Devlogy
          </button>
        </div>
      </div>

      <!-- Audio Player Section -->
      <div class="bg-white rounded-3xl shadow-xl p-8 mb-12">
        <!-- Audio Controls -->
        <div class="flex items-center justify-between mb-8">
          <!-- Menu Button -->
          <button class="p-2 hover:bg-gray-50 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- File Info -->
          <div class="flex items-center space-x-2 text-sm text-gray-500">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Bode</span>
            <span class="mx-2">|</span>
            <span>Hol cam! atol un alestam or</span>
            <span class="mx-2">|</span>
            <span>Niaal</span>
          </div>

          <!-- Mode Buttons -->
          <div class="flex space-x-2">
            <button class="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
              Voufind
            </button>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
              Gorved
            </button>
            <button class="p-2 hover:bg-gray-50 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Audio Tracks -->
        <div class="space-y-6">
          <!-- Track 1 -->
          <div class="flex items-center space-x-4">
            <div class="w-8 text-center">
              <svg class="w-5 h-5 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a4 4 0 011.414 1.414l-1.102 1.1A6 6 0 015.929 21.07l4-4A6 6 0 0117.071 9.93l-1.1 1.1a4 4 0 01-1.414-1.414l1.1-1.1zm0 0l1.414 1.414" />
              </svg>
            </div>
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span class="text-sm text-gray-500 w-16">Audio</span>
            <div class="flex-1 relative">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gray-400 rounded-full" style="width: 60%;"></div>
                <div class="absolute top-1/2 left-60% w-4 h-4 bg-gray-600 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
            <span class="text-sm text-gray-500 w-16">220.0M</span>
            <span class="text-sm text-gray-500 w-8">/0</span>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>1:50:2n</span>
            </div>
            <button class="p-1 hover:bg-gray-50 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          <!-- Track 2 -->
          <div class="flex items-center space-x-4">
            <div class="w-8 text-center text-sm text-gray-500">G</div>
            <div class="w-10 h-10 bg-gray-100 rounded-lg"></div>
            <span class="text-sm text-gray-500 w-16">F18</span>
            <div class="flex-1 relative">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gray-800 rounded-full" style="width: 30%;"></div>
                <div class="absolute top-1/2 left-30% w-4 h-4 bg-gray-800 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
            <span class="text-sm text-gray-500 w-16">200</span>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>15:60</span>
            </div>
            <button class="p-1 hover:bg-gray-50 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          <!-- Track 3 -->
          <div class="flex items-center space-x-4">
            <div class="w-8 text-center text-sm text-gray-500">B</div>
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <span class="text-sm text-gray-500 w-16">G10</span>
            <div class="flex-1 relative">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: 40%;"></div>
                <div class="absolute top-1/2 left-40% w-4 h-4 bg-blue-500 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
            <span class="text-sm text-gray-500 w-16">39.0M</span>
            <span class="text-sm text-gray-500 w-8">110</span>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>8:00:06</span>
            </div>
            <button class="p-1 hover:bg-gray-50 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-3 gap-4">
        <!-- Row 1 -->
        <button @click="startVocalRemoval" class="bg-red-500 text-white p-6 rounded-xl hover:bg-red-600 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span class="font-medium">Vocal Remover</span>
          </div>
        </button>

        <button class="bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="font-medium">Pitch + Tempo Changer</span>
          </div>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            <span class="font-medium">Audio Converter</span>
          </div>
        </button>

        <!-- Row 2 -->
        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span class="font-medium">Cutter / Joiner</span>
          </div>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span class="font-medium">Noise Reduction</span>
          </div>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span class="font-medium">Fade in in / Normalizer</span>
          </div>
        </button>

        <!-- Row 3 -->
        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span class="font-medium">Volume Ronmalizer</span>
          </div>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span class="font-medium">Volume Boote Out Effect</span>
          </div>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="font-medium">Audio Reverse</span>
          </div>
        </button>

        <!-- Row 4 -->
        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span class="font-medium">MP3 Metadata Editor</span>
          </div>
          <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="font-medium">Fade in Fade</span>
          </div>
        </button>

        <button class="bg-gray-100 text-gray-700 p-6 rounded-xl hover:bg-gray-200 transition-colors text-left">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span class="font-medium">Equalizer</span>
          </div>
        </button>
      </div>
    </main>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold mb-4">Upload Audio File</h3>
        
        <div 
          @drop.prevent="handleFileDrop"
          @dragover.prevent
          @dragenter.prevent
          class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors"
        >
          <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <p class="text-gray-600 mb-2">Drag & drop your audio file here</p>
          <p class="text-sm text-gray-500 mb-4">or</p>
          
          <input 
            ref="fileInput"
            type="file" 
            accept="audio/*" 
            @change="handleFileSelect"
            class="hidden"
          >
          
          <button 
            @click="$refs.fileInput.click()"
            class="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Choose File
          </button>
        </div>

        <div v-if="selectedFile" class="mt-4 p-3 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium">{{ selectedFile.name }}</p>
          <p class="text-xs text-gray-500">{{ (selectedFile.size / (1024 * 1024)).toFixed(2) }} MB</p>
        </div>

        <div v-if="processing" class="mt-4">
          <div class="flex items-center space-x-2 mb-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span class="text-sm text-gray-600">Processing...</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="closeModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="processFile"
            :disabled="!selectedFile || processing"
            class="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Process
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { removeVocals, getHealthStatus } = useApi()

// Component state
const activeTab = ref('vulcu')
const showUploadModal = ref(false)
const selectedFile = ref(null)
const processing = ref(false)
const progress = ref(0)
const apiConnected = ref(false)

// Check API connection on mount
onMounted(async () => {
  try {
    const health = await getHealthStatus()
    console.log('✅ API Connected:', health)
    apiConnected.value = true
  } catch (error) {
    console.error('❌ API Connection Failed:', error)
    apiConnected.value = false
  }
})

// Handle vocal removal tool
const startVocalRemoval = () => {
  showUploadModal.value = true
}

// File handling
const handleFileDrop = (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    selectedFile.value = files[0]
  }
}

const handleFileSelect = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    selectedFile.value = files[0]
  }
}

// Process file
const processFile = async () => {
  if (!selectedFile.value) return
  
  processing.value = true
  progress.value = 0
  
  try {
    const result = await removeVocals(selectedFile.value, (progressValue) => {
      progress.value = progressValue
    })
    
    console.log('Processing complete:', result)
    
    // Download the processed file
    if (result.download_url) {
      const link = document.createElement('a')
      link.href = `http://0.0.0.0:5000${result.download_url}`
      link.download = `vocals_removed_${selectedFile.value.name}`
      link.click()
    }
    
    closeModal()
  } catch (error) {
    console.error('Processing failed:', error)
    alert('Processing failed. Please try again.')
  } finally {
    processing.value = false
    progress.value = 0
  }
}

// Close modal
const closeModal = () => {
  showUploadModal.value = false
  selectedFile.value = null
  processing.value = false
  progress.value = 0
}
</script>

<style scoped>
/* Custom styles for the exact design match */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>