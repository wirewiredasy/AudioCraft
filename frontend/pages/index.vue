<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <!-- Header -->
    <header class="relative z-10 pt-8 pb-4">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
            ODO<span class="gradient-text">REMOVER</span>
          </h1>
          <p class="text-xl md:text-2xl text-white opacity-80 max-w-2xl mx-auto">
            Professional Audio Processing Suite
          </p>
          <p class="text-lg text-white opacity-60 mt-2">
            Remove vocals, adjust pitch, convert formats, and more
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 pb-16">
      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Vocal Remover -->
        <NuxtLink 
          to="/vocal-remover"
          class="glass-card p-6 hover-scale block group"
        >
          <div class="text-center">
            <div class="mb-4">
              <svg class="mx-auto h-12 w-12 text-purple-300 group-hover:text-purple-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Vocal Remover</h3>
            <p class="text-white opacity-70 text-sm">
              Remove vocals from any audio track using AI-powered center channel extraction
            </p>
          </div>
        </NuxtLink>

        <!-- Pitch Shifter -->
        <NuxtLink 
          to="/pitch-shifter"
          class="glass-card p-6 hover-scale block group"
        >
          <div class="text-center">
            <div class="mb-4">
              <svg class="mx-auto h-12 w-12 text-blue-300 group-hover:text-blue-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Pitch & Tempo</h3>
            <p class="text-white opacity-70 text-sm">
              Adjust pitch and tempo independently with high-quality algorithms
            </p>
          </div>
        </NuxtLink>

        <!-- Format Converter -->
        <NuxtLink 
          to="/format-converter"
          class="glass-card p-6 hover-scale block group"
        >
          <div class="text-center">
            <div class="mb-4">
              <svg class="mx-auto h-12 w-12 text-green-300 group-hover:text-green-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Format Converter</h3>
            <p class="text-white opacity-70 text-sm">
              Convert between all major audio formats with customizable quality
            </p>
          </div>
        </NuxtLink>

        <!-- Audio Editor -->
        <NuxtLink 
          to="/audio-editor"
          class="glass-card p-6 hover-scale block group"
        >
          <div class="text-center">
            <div class="mb-4">
              <svg class="mx-auto h-12 w-12 text-yellow-300 group-hover:text-yellow-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-7-4V8a4 4 0 118 0v2M9 18v1a1 1 0 001 1h4a1 1 0 001-1v-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Audio Editor</h3>
            <p class="text-white opacity-70 text-sm">
              Cut, trim, and join audio files with precision timing controls
            </p>
          </div>
        </NuxtLink>

        <!-- Noise Reducer -->
        <NuxtLink 
          to="/noise-reducer"
          class="glass-card p-6 hover-scale block group"
        >
          <div class="text-center">
            <div class="mb-4">
              <svg class="mx-auto h-12 w-12 text-red-300 group-hover:text-red-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Noise Reducer</h3>
            <p class="text-white opacity-70 text-sm">
              Remove background noise and improve audio clarity with AI
            </p>
          </div>
        </NuxtLink>

        <!-- Audio Player -->
        <div class="glass-card p-6 group opacity-75">
          <div class="text-center">
            <div class="mb-4">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-6V8a4 4 0 00-8 0v2m7 4v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Audio Player</h3>
            <p class="text-white opacity-50 text-sm">
              Advanced audio player with waveform visualization (Coming Soon)
            </p>
          </div>
        </div>
      </div>

      <!-- API Status -->
      <div class="glass-card p-6 max-w-2xl mx-auto">
        <div class="text-center">
          <h3 class="text-xl font-semibold text-white mb-4">API Status</h3>
          <div v-if="apiStatus === 'loading'" class="text-white opacity-70">
            <div class="animate-spin inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Checking API status...
          </div>
          <div v-else-if="apiStatus === 'healthy'" class="text-green-300">
            <svg class="inline w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            All services are running smoothly
          </div>
          <div v-else class="text-red-300">
            <svg class="inline w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            API connection failed
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center text-white opacity-60 pb-8">
      <p>&copy; 2025 ODOREMOVER. Professional Audio Processing Suite.</p>
    </footer>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'ODOREMOVER - Professional Audio Processing Suite',
  meta: [
    { name: 'description', content: 'Professional audio processing tools for vocal removal, pitch shifting, format conversion, and noise reduction.' }
  ]
})

// API health check
const { getHealthStatus } = useApi()
const apiStatus = ref('loading')

// Check API status on mount
onMounted(async () => {
  try {
    await getHealthStatus()
    apiStatus.value = 'healthy'
  } catch (error) {
    console.error('API health check failed:', error)
    apiStatus.value = 'error'
  }
})
</script>