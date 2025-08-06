<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-background min-h-screen flex items-center justify-center px-4 relative">
      <!-- Floating Shapes -->
      <div class="floating-shapes">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      
      <div class="max-w-6xl mx-auto text-center relative z-10">
        <div class="animate-slide-up">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Transform Your
            <span class="gradient-text-2 block">Audio Experience</span>
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional-grade audio processing tools powered by AI. Remove vocals, adjust pitch, 
            convert formats, and enhance your sound quality with studio-level precision.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <NuxtLink to="/vocal-remover" class="btn-primary text-lg font-semibold px-10 py-4 animate-pulse-glow">
              🎵 Start Processing Now
            </NuxtLink>
            <NuxtLink to="/tools" class="btn-secondary text-lg font-semibold px-10 py-4">
              🛠️ Explore All Tools
            </NuxtLink>
          </div>
          
          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="feature-card text-center animate-scale-in">
              <div class="text-3xl font-bold gradient-text mb-2">1M+</div>
              <div class="text-gray-600">Files Processed</div>
            </div>
            <div class="feature-card text-center animate-scale-in" style="animation-delay: 0.1s">
              <div class="text-3xl font-bold gradient-text mb-2">50K+</div>
              <div class="text-gray-600">Happy Users</div>
            </div>
            <div class="feature-card text-center animate-scale-in" style="animation-delay: 0.2s">
              <div class="text-3xl font-bold gradient-text mb-2">99.9%</div>
              <div class="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="py-20 px-4 bg-white/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20 animate-slide-up">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Powerful <span class="gradient-text">Audio Tools</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your audio with our comprehensive suite of AI-powered tools. 
            Each tool is designed for professional results with consumer-friendly simplicity.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Vocal Remover -->
          <NuxtLink to="/vocal-remover" class="tool-card group animate-scale-in">
            <div class="tool-icon bg-gradient-to-br from-blue-500 to-purple-600">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">🎤 Vocal Remover</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Extract vocals from any song using advanced AI algorithms. Perfect for creating karaoke tracks, 
              instrumentals, or isolating specific audio elements.
            </p>
            <div class="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
              <span>Start Removing</span>
              <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
          </NuxtLink>

          <!-- Pitch & Tempo -->
          <NuxtLink to="/pitch-shifter" class="tool-card group animate-scale-in" style="animation-delay: 0.1s">
            <div class="tool-icon bg-gradient-to-br from-green-500 to-blue-500">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">🎵 Pitch & Tempo</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Adjust pitch and tempo independently with studio-quality algorithms. Change key without affecting 
              speed, or vice versa, for perfect audio manipulation.
            </p>
            <div class="flex items-center text-green-600 font-semibold group-hover:text-blue-600 transition-colors">
              <span>Start Adjusting</span>
              <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
          </NuxtLink>

          <!-- Format Converter -->
          <NuxtLink to="/format-converter" class="tool-card group animate-scale-in" style="animation-delay: 0.2s">
            <div class="tool-icon bg-gradient-to-br from-purple-500 to-pink-500">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">🔄 Format Converter</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Convert between all major audio formats (MP3, WAV, FLAC, AAC, OGG) with customizable 
              quality settings and batch processing capabilities.
            </p>
            <div class="flex items-center text-purple-600 font-semibold group-hover:text-pink-600 transition-colors">
              <span>Start Converting</span>
              <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
          </NuxtLink>

          <!-- Audio Editor -->
          <NuxtLink to="/audio-editor" class="tool-card group animate-scale-in" style="animation-delay: 0.3s">
            <div class="tool-icon bg-gradient-to-br from-orange-500 to-red-500">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">✂️ Audio Editor</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Cut, trim, merge, and join audio files with precision timing controls. 
              Professional editing made simple with waveform visualization.
            </p>
            <div class="flex items-center text-orange-600 font-semibold group-hover:text-red-600 transition-colors">
              <span>Start Editing</span>
              <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
          </NuxtLink>

          <!-- Noise Reducer -->
          <NuxtLink to="/noise-reducer" class="tool-card group animate-scale-in" style="animation-delay: 0.4s">
            <div class="tool-icon bg-gradient-to-br from-red-500 to-purple-600">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">🔇 Noise Reducer</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Remove background noise, hums, and unwanted sounds using advanced AI-powered 
              noise reduction algorithms. Clean up your recordings instantly.
            </p>
            <div class="flex items-center text-red-600 font-semibold group-hover:text-purple-600 transition-colors">
              <span>Start Cleaning</span>
              <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
          </NuxtLink>

          <!-- Coming Soon -->
          <div class="tool-card animate-scale-in opacity-75" style="animation-delay: 0.5s">
            <div class="tool-icon bg-gradient-to-br from-gray-400 to-gray-600">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-600 mb-3">🚀 More Tools</h3>
            <p class="text-gray-500 mb-6 leading-relaxed">
              Exciting new audio processing tools are in development. Stay tuned for 
              AI mastering, vocal synthesis, and advanced audio analysis features.
            </p>
            <div class="flex items-center text-gray-400 font-semibold">
              <span>Coming Soon</span>
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
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