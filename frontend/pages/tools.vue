<template>
  <div class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Audio Processing Tools
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional-grade audio tools designed for creators, musicians, and audio enthusiasts.
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
            Use Tool →
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
            Use Tool →
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
            Use Tool →
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
            Use Tool →
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
            Use Tool →
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Audio Processing Tools - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Complete suite of professional audio processing tools including vocal removal, pitch shifting, format conversion, and more.' }
  ]
})
</script>