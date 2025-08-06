<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white py-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Professional Audio
          <span class="text-blue-600">Processing</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your audio with professional-grade tools. Remove vocals, adjust pitch, convert formats, and enhance your sound quality.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/vocal-remover" class="btn-primary px-8 py-4 text-lg font-semibold">
            Get Started Free
          </NuxtLink>
          <NuxtLink to="/tools" class="px-8 py-4 text-lg font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            View All Tools
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="py-20 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Audio Tools
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive suite of audio processing tools designed for professionals and enthusiasts alike.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Vocal Remover -->
          <NuxtLink to="/vocal-remover" class="card p-6 hover:shadow-lg transition-all group">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 ml-4">Vocal Remover</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Remove vocals from any audio track using AI-powered center channel extraction. Perfect for creating karaoke tracks.
            </p>
            <span class="text-blue-600 font-medium group-hover:text-blue-700">
              Try Now →
            </span>
          </NuxtLink>

          <!-- Pitch & Tempo -->
          <NuxtLink to="/pitch-shifter" class="card p-6 hover:shadow-lg transition-all group">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 ml-4">Pitch & Tempo</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Adjust pitch and tempo independently with high-quality algorithms. Change key without affecting speed.
            </p>
            <span class="text-blue-600 font-medium group-hover:text-blue-700">
              Try Now →
            </span>
          </NuxtLink>

          <!-- Format Converter -->
          <NuxtLink to="/format-converter" class="card p-6 hover:shadow-lg transition-all group">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 ml-4">Format Converter</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Convert between all major audio formats including MP3, WAV, FLAC, and more with customizable quality settings.
            </p>
            <span class="text-blue-600 font-medium group-hover:text-blue-700">
              Try Now →
            </span>
          </NuxtLink>

          <!-- Audio Editor -->
          <NuxtLink to="/audio-editor" class="card p-6 hover:shadow-lg transition-all group">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 ml-4">Audio Editor</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Cut, trim, and join audio files with precision timing controls. Professional editing made simple.
            </p>
            <span class="text-blue-600 font-medium group-hover:text-blue-700">
              Try Now →
            </span>
          </NuxtLink>

          <!-- Noise Reducer -->
          <NuxtLink to="/noise-reducer" class="card p-6 hover:shadow-lg transition-all group">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 ml-4">Noise Reducer</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Remove background noise and improve audio clarity using advanced AI algorithms. Clean up your recordings.
            </p>
            <span class="text-blue-600 font-medium group-hover:text-blue-700">
              Try Now →
            </span>
          </NuxtLink>

          <!-- Coming Soon -->
          <div class="card p-6 opacity-75">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-gray-100 rounded-lg">
                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-500 ml-4">More Tools</h3>
            </div>
            <p class="text-gray-500 mb-4">
              Additional audio processing tools are coming soon. Stay tuned for updates!
            </p>
            <span class="text-gray-400 font-medium">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ODOREMOVER?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional-grade audio processing tools designed for ease of use and exceptional results.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="p-4 bg-blue-100 rounded-full inline-block mb-6">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
            <p class="text-gray-600">
              Process your audio files quickly with our optimized algorithms and powerful backend infrastructure.
            </p>
          </div>

          <div class="text-center">
            <div class="p-4 bg-green-100 rounded-full inline-block mb-6">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">High Quality</h3>
            <p class="text-gray-600">
              Maintain the highest audio quality with our professional-grade processing algorithms and techniques.
            </p>
          </div>

          <div class="text-center">
            <div class="p-4 bg-purple-100 rounded-full inline-block mb-6">
              <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
            <p class="text-gray-600">
              Your files are processed securely and automatically deleted after processing. Your privacy is our priority.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- API Status -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="card p-8">
          <div class="text-center">
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">System Status</h3>
            <div v-if="apiStatus === 'loading'" class="text-gray-600">
              <div class="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full mr-2"></div>
              Checking system status...
            </div>
            <div v-else-if="apiStatus === 'healthy'" class="text-green-600">
              <svg class="inline w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-lg font-medium">All systems operational</span>
            </div>
            <div v-else class="text-red-600">
              <svg class="inline w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-lg font-medium">System temporarily unavailable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
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